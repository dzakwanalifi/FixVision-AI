"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import styles from "./Chat.module.css";

interface ChatMessage {
    role: "user" | "model";
    content: string;
}

interface GroundingSource {
    title: string;
    uri: string;
}

interface ChatProps {
    deviceContext?: {
        device: string;
        issue: string;
    };
}

export default function Chat({ deviceContext }: ChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sources, setSources] = useState<GroundingSource[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: "user", content: input.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    deviceContext,
                }),
            });

            const data = await response.json();

            if (data.reply) {
                setMessages((prev) => [
                    ...prev,
                    { role: "model", content: data.reply },
                ]);
                if (data.sources) {
                    setSources(data.sources);
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "model", content: "Sorry, I encountered an error. Please try again." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </div>
                <span>Follow-up Chat</span>
                <div className={styles.badge}>Gemini</div>
            </div>

            {deviceContext && (
                <div className={styles.contextBanner}>
                    🔧 Discussing: <strong>{deviceContext.device}</strong>
                </div>
            )}

            <div className={styles.messages} ref={messagesContainerRef}>
                {messages.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Ask me anything about repairing your device!</p>
                        <div className={styles.suggestions}>
                            <button onClick={() => setInput("Where can I buy replacement parts?")}>
                                🛒 Where to buy parts?
                            </button>
                            <button onClick={() => setInput("What tools do I need?")}>
                                🔧 Tools needed?
                            </button>
                            <button onClick={() => setInput("Is it safe to do this repair myself?")}>
                                ⚠️ Is it safe?
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <AnimatePresence>
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    className={`${styles.message} ${styles[msg.role]}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {msg.role === "model" ? (
                                        <div className={styles.markdown}>
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.content
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isLoading && (
                            <div className={`${styles.message} ${styles.model} ${styles.loading}`}>
                                <span className={styles.dot} />
                                <span className={styles.dot} />
                                <span className={styles.dot} />
                            </div>
                        )}
                    </>
                )}
                <div ref={messagesEndRef} />
            </div>

            {sources.length > 0 && (
                <div className={styles.sources}>
                    <span className={styles.sourcesLabel}>Sources:</span>
                    {sources.slice(0, 3).map((source, i) => (
                        <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                            {source.title}
                        </a>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.inputArea}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a follow-up question..."
                    className={styles.input}
                    disabled={isLoading}
                />
                <button type="submit" className={styles.sendBtn} disabled={isLoading || !input.trim()}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                </button>
            </form>
        </div>
    );
}
