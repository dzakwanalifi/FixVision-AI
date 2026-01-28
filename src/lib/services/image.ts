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

                // Calculate label dimensions
                const labelText = ann.label || `Area ${index + 1}`;
                const labelWidth = Math.max(labelText.length * 9 + 20, 60);
                const labelHeight = 28;

                // Position label: prefer above the box, but if too close to top, put inside
                let labelY = absY1 - labelHeight - 4;
                let labelTextY = absY1 - 12;

                if (labelY < 0) {
                    // Put label inside the box at the top
                    labelY = absY1 + 4;
                    labelTextY = absY1 + labelHeight - 6;
                }

                // Ensure label doesn't go off the right edge
                const labelX = Math.min(absX1, width - labelWidth - 4);

                return `
        <!-- Box ${index + 1}: ${labelText} -->
        <rect 
          x="${absX1}" 
          y="${absY1}" 
          width="${boxWidth}" 
          height="${boxHeight}" 
          fill="none" 
          stroke="${color}" 
          stroke-width="4"
          rx="6"
        />
        <rect 
          x="${labelX}" 
          y="${labelY}" 
          width="${labelWidth}" 
          height="${labelHeight}" 
          fill="${color}"
          rx="4"
        />
        <text 
          x="${labelX + 10}" 
          y="${labelTextY + 6}" 
          fill="white" 
          font-family="Arial, Helvetica, sans-serif"
          font-size="15" 
          font-weight="700"
          dominant-baseline="middle"
        >${this.escapeXml(labelText)}</text>
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
