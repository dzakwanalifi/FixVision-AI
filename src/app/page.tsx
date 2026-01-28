"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ImageUploader, AnnotatedImage, RepairSteps } from "@/components";
import styles from "./page.module.css";

interface AnalysisResult {
  device: string;
  issue: string;
  annotations: Array<{ box_2d: number[]; label: string }>;
  steps: string[];
  annotatedImage: string;
}

// Framer Motion Variants
const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const heroTransition: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Custom hook for mouse parallax
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
};

// Animated Pulse Component
const HeroOrb = () => {
  const mouse = useMousePosition();

  return (
    <div className={styles.orbWrapper}>
      <motion.div
        className={styles.orbPulse}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={styles.orbPulse}
        animate={{
          scale: [1, 2.2, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className={styles.orbCore}
        animate={{
          x: mouse.x * 0.5,
          y: mouse.y * 0.5,
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          x: { type: "spring", stiffness: 50, damping: 20 },
          y: { type: "spring", stiffness: 50, damping: 20 },
          rotate: { duration: 6, repeat: Infinity }
        }}
      >
        <Image src="/images/premium_asset.png" alt="FixVision Core" width={400} height={400} />
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("What's wrong? How do I fix it?");

  const handleImageSelect = useCallback((file: File, preview: string) => {
    setSelectedImage(preview);
    setSelectedFile(file);
    setResult(null);
    setError(null);
  }, []);

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("query", query);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className={styles.page}>
      <div className="bg_canvas">
        <div className="blob blob_cyan" />
        <div className="blob blob_blue" />
      </div>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="28" height="28" viewBox="0 0 413 351" fill="none">
                <rect y="70.3716" width="70.3716" height="70.3716" fill="currentColor" />
                <rect x="70.3716" width="140.743" height="70.3716" fill="currentColor" />
                <rect x="70.3716" y="140.743" width="69.5135" height="69.5135" fill="currentColor" />
                <rect y="210.257" width="70.3716" height="70.3716" fill="currentColor" />
                <rect x="139.885" y="210.257" width="70.3716" height="70.3716" fill="currentColor" />
                <rect x="210.257" y="280.628" width="70.3716" height="70.3716" fill="currentColor" />
                <path d="M317.843 280.628H280.628V170.401L325.799 70.3716H412.79L317.843 280.628Z" fill="currentColor" />
              </svg>
            </div>
            <span>FixVision</span>
          </div>
          <div className={styles.navBadge}>
            <span className={styles.navDot} />
            <span>Agentic Vision Active</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <AnimatePresence mode="wait">
          {!selectedImage ? (
            <motion.section
              key="hero"
              className={styles.hero}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={heroTransition}
            >
              {/* High-Fidelity Static Orbit System (Micro-Animations Only) */}
              <div className={styles.orbitSystem}>
                <svg className={styles.orbitSvg} viewBox="0 0 500 500">
                  {/* Static Orbit Paths */}
                  <circle cx="250" cy="250" r="240" className={styles.orbitPathLine} />
                  <circle cx="250" cy="250" r="160" className={styles.orbitPathLine} />

                  {/* Trace Glow (Static highlight) */}
                  <circle cx="250" cy="10" r="2" fill="var(--accent)" filter="blur(2px)" />
                  <circle cx="90" cy="410" r="2" fill="var(--accent)" filter="blur(2px)" />
                </svg>

                {/* Secure Segment - Static Position with Micro-float */}
                <motion.div
                  className={styles.orbitElement}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -10, 0]
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.8 },
                    scale: { duration: 0.8 }
                  }}
                  style={{
                    top: '50%',
                    left: '50%',
                    x: 0,
                    y: -240,
                    marginTop: -22,
                    marginLeft: -22,
                    position: 'absolute'
                  }}
                >
                  <div className={styles.glassIcon}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  </div>
                  <span className={styles.glassLabel}>Level 5 Secure</span>
                </motion.div>

                {/* Cognitive Segment - Re-positioned for visibility */}
                <motion.div
                  className={styles.orbitElement}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: [1, 1.05, 1],
                    y: [-120, -128, -120]
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.8, delay: 0.2 }
                  }}
                  style={{
                    top: '50%',
                    left: '50%',
                    x: -120,
                    y: 0,
                    marginTop: -22,
                    marginLeft: -22,
                    position: 'absolute'
                  }}
                >
                  <div className={styles.glassIcon}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  </div>
                  <span className={styles.glassLabel}>Cognitive Analysis</span>
                </motion.div>
              </div>

              <motion.div className={styles.heroBadge} variants={itemVariants}>
                <span style={{ opacity: 0.6 }}>✨</span>
                <span>AI-Powered Repair Technician</span>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={itemVariants}>
                Repair Smarter with <br />
                <span className={styles.heroHighlight}>Intelligent Vision.</span>
              </motion.h1>

              <motion.p className={styles.heroSubtitle} variants={itemVariants}>
                Turn complex repairs into simple step-by-step guides. Just upload a photo
                and let our agentic AI identify the problem.
              </motion.p>

              <motion.div className={styles.uploaderWrapper} variants={itemVariants}>
                <ImageUploader onImageSelect={handleImageSelect} isLoading={isLoading} />
              </motion.div>
            </motion.section>
          ) : (
            <motion.section
              key="analysis"
              className={styles.analysis}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className={styles.visualCol}>
                <div className={styles.analysisHeader}>
                  <button onClick={handleReset} className={styles.backBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span>New Scan</span>
                  </button>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Diagnosis Report
                  </div>
                </div>

                <div className={styles.imageViewport}>
                  <AnnotatedImage
                    src={result?.annotatedImage || selectedImage}
                    alt="Device scan"
                  />
                </div>

                <div className={styles.queryArea}>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.queryInput}
                    placeholder="Ask follow-up repair questions..."
                  />
                  <button onClick={handleAnalyze} className={styles.analyzeBtn} disabled={isLoading}>
                    {isLoading ? "Thinking..." : "Consult AI"}
                  </button>
                </div>
              </div>

              <motion.aside
                className={styles.stepsCol}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {error ? (
                  <div style={{ color: 'var(--error)', padding: '20px', background: '#FEF2F2', borderRadius: '16px', fontWeight: 600 }}>
                    {error}
                  </div>
                ) : result ? (
                  <RepairSteps
                    device={result.device}
                    issue={result.issue}
                    steps={result.steps}
                  />
                ) : (
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '20px', opacity: 0.5 }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', border: '2px dashed var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Analysis Pending</h3>
                      <p style={{ fontSize: '0.9rem' }}>Click &quot;Consult AI&quot; to generate <br /> step-by-step repair instructions.</p>
                    </div>
                  </div>
                )}
              </motion.aside>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
