import { GoogleGenAI } from "@google/genai";

interface AnalysisResult {
    device: string;
    issue: string;
    annotations: Annotation[];
    steps: string[];
    thinking?: string;
    code?: string;
}

interface Annotation {
    box_2d: [number, number, number, number]; // [y1, x1, y2, x2] normalized 0-1000
    label: string;
}

export class GeminiService {
    private client: GoogleGenAI;

    constructor() {
        this.client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    }

    async analyzeDevice(
        imageBase64: string,
        query: string
    ): Promise<AnalysisResult> {
        const response = await this.client.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: imageBase64,
                            },
                        },
                        { text: this.buildPrompt(query) },
                    ],
                },
            ],
            config: {
                tools: [{ codeExecution: {} }],
            },
        });

        return this.parseResponse(response);
    }

    private buildPrompt(query: string): string {
        return `You are an electronics repair expert with Agentic Vision capabilities.

USER QUERY: ${query}

INSTRUCTIONS:
1. **THINK**: Carefully analyze the device image. Identify the device type, model (if visible), and any visible issues like error codes, indicator lights, physical damage, or misaligned parts.

2. **ACT**: If you need to examine a specific area more closely, generate Python code to crop/zoom into that region using PIL. The code should help you investigate small details like:
   - Error codes on displays
   - LED indicator patterns
   - Serial numbers or model numbers
   - Small components or connectors

3. **OBSERVE**: Based on your investigation, provide actionable repair guidance.

RESPOND WITH VALID JSON ONLY (no markdown, no code blocks):
{
  "device": "detected device name and model",
  "issue": "identified problem based on visual analysis",
  "annotations": [
    {
      "box_2d": [y1, x1, y2, x2],
      "label": "description of this area"
    }
  ],
  "steps": [
    "Step 1: First action to take",
    "Step 2: Second action to take",
    "..."
  ]
}

ANNOTATION FORMAT:
- box_2d coordinates are normalized to 0-1000 scale
- y1, x1 = top-left corner; y2, x2 = bottom-right corner
- Include annotations for:
  1. The problem area (if visible)
  2. Parts to open/access
  3. Components to check or replace

Be specific and actionable. Reference visual elements directly.`;
    }

    private parseResponse(response: unknown): AnalysisResult {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const resp = response as any;
            const text =
                resp.candidates?.[0]?.content?.parts?.[0]?.text ||
                resp.text ||
                JSON.stringify(resp);

            // Try to extract JSON from the response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            // Fallback if no valid JSON
            return {
                device: "Unknown device",
                issue: text,
                annotations: [],
                steps: ["Unable to parse structured response. Raw analysis: " + text],
            };
        } catch (error) {
            console.error("Error parsing Gemini response:", error);
            return {
                device: "Unknown",
                issue: "Error analyzing image",
                annotations: [],
                steps: ["Please try again with a clearer image"],
            };
        }
    }
}

export type { AnalysisResult, Annotation };
