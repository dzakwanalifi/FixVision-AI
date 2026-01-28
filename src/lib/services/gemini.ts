import { GoogleGenAI } from "@google/genai";

interface AnalysisResult {
    device: string;
    issue: string;
    annotations: Annotation[];
    steps: string[];
    thinking?: string;
    code?: string;
    sources?: GroundingSource[];
}

interface Annotation {
    box_2d: [number, number, number, number]; // [y1, x1, y2, x2] normalized 0-1000
    label: string;
}

interface GroundingSource {
    title: string;
    uri: string;
}

interface ChatMessage {
    role: "user" | "model";
    content: string;
}

interface ChatResponse {
    reply: string;
    sources?: GroundingSource[];
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
                tools: [
                    { codeExecution: {} },
                    { googleSearch: {} }
                ],
            },
        });

        return this.parseResponse(response);
    }

    async chat(
        messages: ChatMessage[],
        deviceContext?: { device: string; issue: string }
    ): Promise<ChatResponse> {
        const systemPrompt = deviceContext
            ? `You are FixVision AI, a specialized repair assistant. You are STRICTLY LIMITED to helping with the following device repair:

**DEVICE**: ${deviceContext.device}
**ISSUE**: ${deviceContext.issue}

RULES:
1. ONLY answer questions directly related to repairing this specific device and issue.
2. If the user asks about ANYTHING unrelated to this device repair (general knowledge, other topics, jokes, coding, etc.), politely decline and redirect them back to the repair topic.
3. Example decline response: "I'm focused on helping you fix your ${deviceContext.device}. Is there anything specific about this repair I can help with?"
4. Be concise, practical, and safety-conscious in your repair advice.
5. Use Google Search to find current repair guides, part numbers, and prices when helpful.
6. Always warn about safety risks (electrical, sharp parts, etc.).

Stay focused. Only discuss this repair.`
            : `You are FixVision AI. You can only help with device repairs. If no device context is provided, ask the user to scan a device first using the upload feature.`;

        const contents = [
            {
                role: "user" as const,
                parts: [{ text: systemPrompt }],
            },
            ...messages.map((msg) => ({
                role: msg.role as "user" | "model",
                parts: [{ text: msg.content }],
            })),
        ];

        const response = await this.client.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        return this.parseChatResponse(response);
    }

    private buildPrompt(query: string): string {
        return `You are an electronics repair expert with Agentic Vision capabilities. Use Google Search to find the latest repair guides, error codes, and troubleshooting steps for the specific device model.

USER QUERY: ${query}

INSTRUCTIONS:
1. **THINK**: Carefully analyze the device image. Identify the device type, model (if visible), and any visible issues like error codes, indicator lights, physical damage, or misaligned parts.

2. **SEARCH**: Use Google Search to find relevant repair information, official documentation, and community solutions for this specific device and issue.

3. **ACT**: If you need to examine a specific area more closely, generate Python code to crop/zoom into that region using PIL.

4. **OBSERVE**: Based on your investigation and search results, provide actionable repair guidance with sources.

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
            const candidate = resp.candidates?.[0];
            const text =
                candidate?.content?.parts?.[0]?.text ||
                resp.text ||
                JSON.stringify(resp);

            // Extract grounding sources if available
            const groundingChunks = candidate?.groundingMetadata?.groundingChunks || [];
            const sources: GroundingSource[] = groundingChunks
                .filter((chunk: { web?: { uri: string; title: string } }) => chunk.web)
                .map((chunk: { web: { uri: string; title: string } }) => ({
                    title: chunk.web.title,
                    uri: chunk.web.uri,
                }));

            // Try to extract JSON from the response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                return { ...parsed, sources };
            }

            // Fallback if no valid JSON
            return {
                device: "Unknown device",
                issue: text,
                annotations: [],
                steps: ["Unable to parse structured response. Raw analysis: " + text],
                sources,
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

    private parseChatResponse(response: unknown): ChatResponse {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const resp = response as any;
            const candidate = resp.candidates?.[0];
            const text =
                candidate?.content?.parts?.[0]?.text ||
                resp.text ||
                "I couldn't generate a response. Please try again.";

            // Extract grounding sources if available
            const groundingChunks = candidate?.groundingMetadata?.groundingChunks || [];
            const sources: GroundingSource[] = groundingChunks
                .filter((chunk: { web?: { uri: string; title: string } }) => chunk.web)
                .map((chunk: { web: { uri: string; title: string } }) => ({
                    title: chunk.web.title,
                    uri: chunk.web.uri,
                }));

            return {
                reply: text,
                sources: sources.length > 0 ? sources : undefined,
            };
        } catch (error) {
            console.error("Error parsing chat response:", error);
            return {
                reply: "Sorry, I encountered an error. Please try again.",
            };
        }
    }
}

export type { AnalysisResult, Annotation, ChatMessage, ChatResponse, GroundingSource };
