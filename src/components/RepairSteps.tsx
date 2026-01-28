import { motion, Variants } from "framer-motion";
import styles from "./RepairSteps.module.css";

interface RepairStepsProps {
    device: string;
    issue: string;
    steps: string[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};

export default function RepairSteps({ device, issue, steps }: RepairStepsProps) {
    return (
        <motion.div
            className={styles.container}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div className={styles.header} variants={itemVariants}>
                <div className={styles.deviceInfo}>
                    <span className={styles.label}>Device Detected</span>
                    <h3 className={styles.device}>{device}</h3>
                </div>
                <div className={styles.issueInfo}>
                    <span className={styles.label}>Issue Identified</span>
                    <p className={styles.issue}>{issue}</p>
                </div>
            </motion.div>

            <div className={styles.stepsSection}>
                <motion.h4 className={styles.stepsTitle} variants={itemVariants}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                    Repair Steps
                </motion.h4>
                <motion.ol className={styles.stepsList} variants={containerVariants}>
                    {steps.map((step, index) => (
                        <motion.li
                            key={index}
                            className={styles.step}
                            variants={itemVariants}
                            whileHover={{ x: 10, backgroundColor: "rgba(62, 123, 255, 0.05)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <span className={styles.stepNumber}>{index + 1}</span>
                            <span className={styles.stepText}>{step}</span>
                        </motion.li>
                    ))}
                </motion.ol>
            </div>

            <motion.div className={styles.disclaimer} variants={itemVariants}>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>
                    Always disconnect power before attempting repairs. If unsure, consult a
                    professional technician.
                </span>
            </motion.div>
        </motion.div>
    );
}
