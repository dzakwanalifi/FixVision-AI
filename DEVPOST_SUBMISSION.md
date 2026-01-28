# FixVision AI — Agentic Repair Technician

> **Turn complex repairs into simple step-by-step guides with intelligent vision.**

🔗 **Live Demo**: [https://fixvision-ai-233122189624.asia-southeast1.run.app](https://fixvision-ai-233122189624.asia-southeast1.run.app)

---

## 💡 Inspiration

Every year, millions of devices end up in landfills simply because users don't know how to fix them. Professional repair services are expensive, and online tutorials are often confusing or irrelevant to the specific problem at hand.

We asked: **What if AI could look at your broken device and tell you exactly how to fix it?**

---

## 🚀 What it does

**FixVision AI** is an agentic AI-powered repair assistant that:

1. **Sees the Problem** — Upload a photo of your broken device (phone, laptop, appliance).
2. **Analyzes with Vision AI** — Our agentic system uses Gemini's multimodal capabilities to identify the issue.
3. **Generates Step-by-Step Guides** — Receive clear, actionable repair instructions tailored to YOUR specific problem.
4. **Annotates Visually** — Get an annotated image highlighting exactly where to focus.

It's like having a professional repair technician in your pocket — available 24/7, for free.

---

## 🛠️ How we built it

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), React 19, Framer Motion |
| **Styling** | Vanilla CSS with Glassmorphism 3.0 design system |
| **AI Engine** | Google Gemini 3 Flash (Agentic Vision) |
| **Image Processing** | Sharp.js for server-side annotation |
| **Deployment** | Google Cloud Run, Artifact Registry, Cloud Build |
| **Runtime** | Bun (ultra-fast builds) + Node.js Alpine (production) |

### Agentic Architecture

Our AI doesn't just respond — it **thinks, acts, and observes** in a loop:
1. **Think**: Analyze the image and identify potential issues.
2. **Act**: Generate repair steps and bounding box coordinates.
3. **Observe**: Validate the output and refine if needed.

This agentic approach ensures high-quality, contextually accurate results every time.

---

## 🧗 Challenges we ran into

- **Bounding Box Precision**: Getting Gemini to return pixel-accurate coordinates required careful prompt engineering.
- **Mobile-First Design**: Fitting a rich experience into a "fit-to-viewport" constraint without scrolling was a UI engineering challenge.
- **Cold Start Optimization**: We implemented a multi-stage Docker build with Bun to achieve sub-4-second dependency installs and tiny production images.

---

## 🏆 Accomplishments we're proud of

- **Sub-2-minute Full Repair Analysis** — From upload to annotated step-by-step guide.
- **Premium UI/UX** — Inspired by high-end Framer designs with glassmorphism, motion, and responsive layouts.
- **Production-Ready Deployment** — Fully containerized and deployed on Google Cloud Run with CI/CD via Cloud Build.
- **Zero External Dependencies** — All processing happens server-side; no client-side API keys exposed.

---

## 📚 What we learned

- **Agentic AI Patterns**: How to structure prompts for multi-step reasoning and tool use.
- **Multimodal Vision**: Leveraging Gemini's vision capabilities for real-world object detection.
- **Cloud-Native Development**: End-to-end deployment with Artifact Registry, Cloud Build, and Cloud Run.
- **Performance Engineering**: Optimizing Docker builds with Bun and Next.js standalone mode.

---

## 🔮 What's next for FixVision AI

- **Video Analysis** — Upload a video of the issue for even more context.
- **Parts Marketplace Integration** — Automatically suggest replacement parts with purchase links.
- **AR Overlay** — Use your phone camera to overlay repair instructions in real-time.
- **Community Repair Database** — Crowdsourced repair tips and success stories.

---

## 🧰 Tech Stack

`Next.js` · `React` · `TypeScript` · `Framer Motion` · `Google Gemini AI` · `Sharp.js` · `Google Cloud Run` · `Cloud Build` · `Bun` · `Docker`

---

## 📸 Screenshots

> *Embed your screenshots here on DevPost*

---

## 👥 Team

- **Your Name** — Full-Stack Developer & AI Engineer

---

## 🔗 Links

- **Live Demo**: [https://fixvision-ai-233122189624.asia-southeast1.run.app](https://fixvision-ai-233122189624.asia-southeast1.run.app)
- **GitHub Repository**: *[Add your repo link here]*
