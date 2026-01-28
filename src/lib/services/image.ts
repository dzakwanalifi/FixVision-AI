import sharp from "sharp";
import type { Annotation } from "./gemini";

export class ImageService {
    async annotateImage(
        imageBuffer: Buffer,
        annotations: Annotation[]
    ): Promise<Buffer> {
        const image = sharp(imageBuffer);
        const metadata = await image.metadata();
        const { width = 1000, height = 1000 } = metadata;

        if (!annotations || annotations.length === 0) {
            return imageBuffer;
        }

        // Create SVG overlay with annotations
        const svgOverlay = this.createSvgOverlay(annotations, width, height);

        return image
            .composite([
                {
                    input: Buffer.from(svgOverlay),
                    top: 0,
                    left: 0,
                },
            ])
            .toBuffer();
    }

    private createSvgOverlay(
        annotations: Annotation[],
        width: number,
        height: number
    ): string {
        const boxes = annotations
            .map((ann, index) => {
                const [y1, x1, y2, x2] = ann.box_2d;

                // Convert normalized coordinates (0-1000) to actual pixels
                const absX1 = Math.round((x1 / 1000) * width);
                const absY1 = Math.round((y1 / 1000) * height);
                const absX2 = Math.round((x2 / 1000) * width);
                const absY2 = Math.round((y2 / 1000) * height);

                const boxWidth = absX2 - absX1;
                const boxHeight = absY2 - absY1;

                // Choose color based on index for variety
                const colors = ["#FF3B30", "#FF9500", "#34C759", "#007AFF", "#AF52DE"];
                const color = colors[index % colors.length];

                return `
        <!-- Box ${index + 1}: ${ann.label} -->
        <rect 
          x="${absX1}" 
          y="${absY1}" 
          width="${boxWidth}" 
          height="${boxHeight}" 
          fill="none" 
          stroke="${color}" 
          stroke-width="4"
          rx="4"
        />
        <rect 
          x="${absX1}" 
          y="${Math.max(0, absY1 - 28)}" 
          width="${Math.min(ann.label.length * 10 + 16, width - absX1)}" 
          height="26" 
          fill="${color}"
          rx="4"
        />
        <text 
          x="${absX1 + 8}" 
          y="${Math.max(18, absY1 - 8)}" 
          fill="white" 
          font-family="Arial, sans-serif"
          font-size="14" 
          font-weight="bold"
        >${this.escapeXml(ann.label)}</text>
      `;
            })
            .join("");

        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${boxes}</svg>`;
    }

    private escapeXml(text: string): string {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    }

    async resizeIfNeeded(
        imageBuffer: Buffer,
        maxWidth = 1920,
        maxHeight = 1080
    ): Promise<Buffer> {
        const metadata = await sharp(imageBuffer).metadata();

        if (
            metadata.width &&
            metadata.height &&
            (metadata.width > maxWidth || metadata.height > maxHeight)
        ) {
            return sharp(imageBuffer)
                .resize(maxWidth, maxHeight, { fit: "inside", withoutEnlargement: true })
                .toBuffer();
        }

        return imageBuffer;
    }
}
