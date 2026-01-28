"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "./ImageUploader.module.css";

interface ImageUploaderProps {
    onImageSelect: (file: File, preview: string) => void;
    isLoading?: boolean;
}

export default function ImageUploader({
    onImageSelect,
    isLoading = false,
}: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = useCallback(
        (file: File) => {
            if (!file.type.startsWith("image/")) {
                alert("Please upload an image file");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = e.target?.result as string;
                onImageSelect(file, preview);
            };
            reader.readAsDataURL(file);
        },
        [onImageSelect]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);

            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    return (
        <motion.div
            className={`${styles.uploader} ${isDragging ? styles.dragging : ""} ${isLoading ? styles.loading : ""
                }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            layout
            whileHover={{
                scale: 1.02,
                y: -5,
                boxShadow: "0 20px 40px rgba(62, 123, 255, 0.12)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className={styles.input}
                id="image-upload"
                disabled={isLoading}
            />
            <label htmlFor="image-upload" className={styles.label}>
                <div className={styles.icon}>
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21,15 16,10 5,21" />
                    </svg>
                </div>
                <p className={styles.text}>
                    {isLoading
                        ? "Analyzing..."
                        : "Drop an image of your device here, or click to select"}
                </p>
                <p className={styles.hint}>Supports JPG, PNG, WebP</p>
            </label>
        </motion.div>
    );
}
