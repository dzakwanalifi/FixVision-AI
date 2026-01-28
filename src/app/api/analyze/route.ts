import { NextRequest, NextResponse } from "next/server";
import { GeminiService, ImageService } from "@/lib/services";

// Lazy-loaded services (avoid build-time initialization)
let gemini: GeminiService | null = null;
let imageService: ImageService | null = null;

function getServices() {
    if (!gemini) gemini = new GeminiService();
    if (!imageService) imageService = new ImageService();
    return { gemini, imageService };
}

export async function POST(request: NextRequest) {
    try {
        const { gemini, imageService } = getServices();

        const formData = await request.formData();
        const image = formData.get("image") as File | null;
        const query = formData.get("query") as string | null;

        if (!image) {
            return NextResponse.json(
                { error: "No image provided" },
                { status: 400 }
            );
        }

        if (!query) {
            return NextResponse.json(
                { error: "No query provided" },
                { status: 400 }
            );
        }

        // Convert file to buffer and base64
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");

        // Resize if needed to avoid API limits
        const resizedBuffer = await imageService.resizeIfNeeded(buffer);

        // Analyze with Gemini Agentic Vision
        console.log("Analyzing device with Gemini...");
        const analysis = await gemini.analyzeDevice(base64, query);
        console.log("Analysis complete:", analysis.device, analysis.issue);

        // Annotate image with bounding boxes
        let annotatedImageBase64 = "";
        if (analysis.annotations && analysis.annotations.length > 0) {
            console.log(`Annotating image with ${analysis.annotations.length} boxes...`);
            const annotatedBuffer = await imageService.annotateImage(
                resizedBuffer,
                analysis.annotations
            );
            annotatedImageBase64 = annotatedBuffer.toString("base64");
        } else {
            // Return original if no annotations
            annotatedImageBase64 = resizedBuffer.toString("base64");
        }

        return NextResponse.json({
            success: true,
            device: analysis.device,
            issue: analysis.issue,
            annotations: analysis.annotations,
            steps: analysis.steps,
            annotatedImage: `data:image/jpeg;base64,${annotatedImageBase64}`,
        });
    } catch (error) {
        console.error("Error in analyze API:", error);
        return NextResponse.json(
            {
                error: "Failed to analyze image",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
