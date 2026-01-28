import { NextRequest, NextResponse } from "next/server";
import { GeminiService } from "@/lib/services/gemini";

const geminiService = new GeminiService();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { messages, deviceContext } = body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 }
            );
        }

        const response = await geminiService.chat(messages, deviceContext);

        return NextResponse.json(response);
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "Failed to process chat request" },
            { status: 500 }
        );
    }
}
