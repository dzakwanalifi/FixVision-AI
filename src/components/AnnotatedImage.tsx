"use client";

import styles from "./AnnotatedImage.module.css";

interface AnnotatedImageProps {
    src: string;
    alt?: string;
}

export default function AnnotatedImage({
    src,
    alt = "Annotated device image",
}: AnnotatedImageProps) {
    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} className={styles.image} />
            </div>
            <p className={styles.caption}>
                <span className={styles.dot}></span>
                Visual annotations show areas of interest
            </p>
        </div>
    );
}
