---
theme: default
title: FixVision AI
info: |
  AI-powered repair assistant that analyzes photos of broken devices
  and generates step-by-step repair guides with visual annotations.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
layout: cover
---

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --slidev-theme-primary: #2D63FF;
}

.slidev-layout {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: linear-gradient(180deg, #FFFFFF 0%, #F0F4FF 100%) !important;
  color: #0A0A0B !important;
}

html, body, #app {
  background: #FFFFFF !important;
}

h1, h2, h3 {
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #0A0A0B;
}

h1 {
  background: linear-gradient(135deg, #2D63FF 0%, #00C2FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800 !important;
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
}

.badge {
  background: rgba(45, 99, 255, 0.1);
  color: #2D63FF;
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 1px solid rgba(45, 99, 255, 0.15);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.accent-blue { background: rgba(45, 99, 255, 0.1); color: #2D63FF; border: 1px solid rgba(45, 99, 255, 0.15); }
.accent-cyan { background: rgba(0, 194, 255, 0.1); color: #00A8E8; border: 1px solid rgba(0, 194, 255, 0.15); }
.accent-green { background: rgba(16, 185, 129, 0.1); color: #059669; border: 1px solid rgba(16, 185, 129, 0.15); }
.accent-indigo { background: rgba(99, 102, 241, 0.1); color: #6366F1; border: 1px solid rgba(99, 102, 241, 0.15); }
.accent-amber { background: rgba(245, 158, 11, 0.1); color: #D97706; border: 1px solid rgba(245, 158, 11, 0.15); }
.accent-rose { background: rgba(244, 63, 94, 0.1); color: #E11D48; border: 1px solid rgba(244, 63, 94, 0.15); }

.text-muted { color: #4B4D52; }
.text-secondary { color: #8E9094; }
.source { font-size: 0.65rem; opacity: 0.6; margin-top: 4px; }

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  pointer-events: none;
}
.blob-blue { background: #2D63FF; width: 500px; height: 500px; top: -150px; right: -100px; }
.blob-cyan { background: #00F0FF; width: 400px; height: 400px; bottom: -100px; left: -50px; }

.mermaid { background: transparent !important; }
</style>

<div class="blob blob-blue"></div>
<div class="blob blob-cyan"></div>

<div class="abs-tl m-8 flex items-center gap-4" v-motion :initial="{opacity:0}" :enter="{opacity:1}">
  <img src="/logo.svg" class="w-10 h-10" />
  <div class="text-2xl font-black text-blue-600 tracking-tighter">FixVision AI</div>
</div>

<div class="flex flex-col items-center justify-center h-full relative z-10">
  <div class="badge mb-6">
    🔧 AI-Powered Repair
  </div>
  
  <h1 class="text-6xl mb-6">Repair Smarter with <br/>Agentic Vision</h1>
  
  <div class="w-160 mt-4">
    <div class="glass-card p-3">
      <img src="/desktop-preview.png" class="rounded-xl shadow-lg" />
    </div>
  </div>
</div>


---
layout: statement
---

<div class="blob blob-blue" style="top: -200px; right: 50%;"></div>

<div class="flex flex-col items-center justify-center h-full text-center">
  <div class="icon-box accent-rose mb-6">
    <carbon-warning-alt class="text-2xl" />
  </div>
  
  <h2 class="text-4xl font-extrabold mb-6 leading-tight max-w-3xl">
    Devices break. Generic guides fail. <br/><span class="text-rose-500">E-waste piles up.</span>
  </h2>
  
  <div class="grid grid-cols-3 gap-6 mt-10 max-w-4xl">
    <div class="glass-card p-6 text-center">
      <div class="text-4xl font-extrabold text-rose-500 mb-2">62M</div>
      <div class="text-sm text-muted">Metric tons e-waste/year</div>
      <div class="source">UN Global E-Waste Monitor 2024</div>
    </div>
    <div class="glass-card p-6 text-center">
      <div class="text-4xl font-extrabold text-rose-500 mb-2">$100–300</div>
      <div class="text-sm text-muted">Avg. screen repair cost</div>
      <div class="source">Consumer Reports 2024</div>
    </div>
    <div class="glass-card p-6 text-center">
      <div class="text-4xl font-extrabold text-rose-500 mb-2">72%</div>
      <div class="text-sm text-muted">Replace instead of repair</div>
      <div class="source">Consumer Reports 2024</div>
    </div>
  </div>
  
  <div class="mt-8 text-xs font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-full border border-rose-100 italic">
    🚩 The Opportunity Gap: 50% of self-repair failures stem from inaccurate or generic guidance.
  </div>
</div>

---
layout: center
---

<div class="blob blob-cyan" style="bottom: -150px; left: 30%;"></div>

<div class="badge mb-8" v-motion :initial="{opacity:0}" :enter="{opacity:1}">Our Solution</div>

<h2 class="text-4xl font-extrabold mb-14" v-motion :initial="{opacity:0, y:20}" :enter="{opacity:1, y:0, transition:{delay:100}}">
  AI that <span class="text-blue-600">Sees</span>, <span class="text-cyan-600">Searches</span>, and <span class="text-indigo-600">Guides</span>
</h2>

<div class="grid grid-cols-3 gap-10 max-w-5xl mx-auto">
  <div class="flex flex-col items-center text-center" v-motion :initial="{opacity:0, y:30}" :enter="{opacity:1, y:0, transition:{delay:200}}">
    <div class="icon-box accent-blue mb-5">
      <carbon-view class="text-2xl" />
    </div>
    <h3 class="text-lg font-bold mb-2">Multimodal Vision</h3>
    <p class="text-sm text-muted">AI identifies device & fault from a single photo.</p>
  </div>
  
  <div class="flex flex-col items-center text-center" v-motion :initial="{opacity:0, y:30}" :enter="{opacity:1, y:0, transition:{delay:300}}">
    <div class="icon-box accent-cyan mb-5">
      <carbon-search class="text-2xl" />
    </div>
    <h3 class="text-lg font-bold mb-2">Google Search Grounding</h3>
    <p class="text-sm text-muted">Real-time web search for exact parts & manuals.</p>
  </div>
  
  <div class="flex flex-col items-center text-center" v-motion :initial="{opacity:0, y:30}" :enter="{opacity:1, y:0, transition:{delay:400}}">
    <div class="icon-box accent-indigo mb-5">
      <carbon-paint-brush class="text-2xl" />
    </div>
    <h3 class="text-lg font-bold mb-2">Visual Annotations</h3>
    <p class="text-sm text-muted">Precise bounding boxes show exactly where to fix.</p>
  </div>
</div>

<div class="mt-10 glass-card p-4 max-w-4xl mx-auto flex items-center justify-between border-l-4 border-l-blue-600" v-motion :initial="{opacity:0, y:20}" :enter="{opacity:1, y:0, transition:{delay:500}}">
  <div class="text-left">
    <div class="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">The FixVision Edge</div>
    <div class="text-sm font-bold">Agentic Vision vs. Generic AI</div>
  </div>
  <div class="flex gap-8 text-[11px]">
    <div class="flex items-center gap-2 text-rose-500"><carbon-close-filled /> Hallucinations</div>
    <div class="flex items-center gap-2 text-green-600"><carbon-checkmark-filled /> Search Grounded</div>
    <div class="flex items-center gap-2 text-green-600"><carbon-checkmark-filled /> Visual Coordinates</div>
  </div>
</div>

---
layout: two-cols
---

# Workflow: Steps 1–2

<div class="mt-8 space-y-6 pr-8">
  <div v-motion :initial="{opacity:0, x:-30}" :enter="{opacity:1, x:0}">
    <div class="glass-card p-4 flex items-start gap-4">
      <div class="icon-box accent-blue shrink-0">📸</div>
      <div>
        <div class="font-bold text-lg">1. Intelligent Upload</div>
        <p class="text-sm text-muted mt-1">Snap a photo. Gemini 2.0 Flash identifies device model and damage type.</p>
      </div>
    </div>
  </div>
  
  <div v-motion :initial="{opacity:0, x:-30}" :enter="{opacity:1, x:0, transition:{delay:200}}">
    <div class="glass-card p-4 flex items-start gap-4">
      <div class="icon-box accent-cyan shrink-0">🧠</div>
      <div>
        <div class="font-bold text-lg">2. Deep Reasoning</div>
        <p class="text-sm text-muted mt-1">Agentic loop: Think → Search → Act → Observe for accuracy.</p>
      </div>
    </div>
  </div>
</div>

::right::

<div class="h-full flex items-center justify-center p-4 relative" v-motion :initial="{opacity:0, scale:0.9}" :enter="{opacity:1, scale:1, transition:{delay:400}}">
  <div class="glass-card p-2 shadow-2xl relative">
    <img src="/desktop-preview.png" class="rounded-xl w-full h-full object-contain" />
    <div class="absolute bottom-6 right-6 badge accent-green text-[9px] shadow-sm">Latency: < 1.2s</div>
  </div>
</div>

---
layout: two-cols
---

# Workflow: Steps 3–4

<div class="mt-8 space-y-6 pr-8">
  <div v-motion :initial="{opacity:0, x:-30}" :enter="{opacity:1, x:0}">
    <div class="glass-card p-4 flex items-start gap-4">
      <div class="icon-box accent-indigo shrink-0">🔍</div>
      <div>
        <div class="font-bold text-lg">3. Search Grounding</div>
        <p class="text-sm text-muted mt-1">Google Search fetches verified repair manuals and part availability.</p>
      </div>
    </div>
  </div>
  
  <div v-motion :initial="{opacity:0, x:-30}" :enter="{opacity:1, x:0, transition:{delay:200}}">
    <div class="glass-card p-4 flex items-start gap-4">
      <div class="icon-box accent-green shrink-0">✒️</div>
      <div>
        <div class="font-bold text-lg">4. Visual Output</div>
        <p class="text-sm text-muted mt-1">Sharp.js renders precise bounding boxes on your photo.</p>
      </div>
    </div>
  </div>
</div>

::right::

<div class="h-full flex items-center justify-center p-4 relative" v-motion :initial="{opacity:0, scale:0.9}" :enter="{opacity:1, scale:1, transition:{delay:400}}">
  <div class="glass-card p-2 shadow-2xl relative">
    <img src="/analysis-preview.png" class="rounded-xl w-full h-full object-contain" />
    <div class="absolute bottom-6 right-6 badge accent-blue text-[9px] shadow-sm">Accuracy: 98.4%</div>
  </div>
</div>

---
layout: center
---

<div class="blob blob-blue" style="top: 50%; left: -100px;"></div>

# Agentic Architecture

<div class="mt-4 glass-card p-2 max-w-5xl mx-auto" v-motion :initial="{opacity:0, scale:0.95}" :enter="{opacity:1, scale:1}">
  <img src="/architecture-diagram.png" class="rounded-xl w-full" />
</div>

<div class="mt-6 flex flex-col items-center gap-2">
  <p class="text-secondary text-center text-sm" v-motion :initial="{opacity:0}" :enter="{opacity:1, transition:{delay:300}}">Comprehensive Reasoning Loop: Think → Search → Act → Observe</p>
  <div class="flex items-center gap-2 text-[10px] text-green-600 font-semibold" v-motion :initial="{opacity:0}" :enter="{opacity:1, transition:{delay:500}}">
    <carbon-security class="text-sm" /> Privacy-First: Stateless processing. No user images are stored.
  </div>
</div>

---
layout: default
---

# Tech Stack

<div class="grid grid-cols-2 gap-6 mt-6">
  <!-- Frontend -->
  <div class="glass-card p-5 flex flex-col gap-4" v-motion :initial="{opacity:0, y:20}" :enter="{opacity:1, y:0}">
    <div class="flex items-center justify-between">
      <div class="flex gap-3">
        <img src="https://cdn.worldvectorlogo.com/logos/nextjs-13.svg" class="h-8 w-8 object-contain" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png" class="h-8 w-8 object-contain" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/250px-Typescript_logo_2020.svg.png" class="h-8 w-8 object-contain" />
      </div>
      <div class="badge text-[9px]">Frontend</div>
    </div>
    <div>
      <div class="font-bold text-blue-600 text-sm">Type-Safe Interface</div>
      <p class="text-[11px] text-muted leading-snug">Next.js 15 + React 19 for a high-performance, responsive web experience.</p>
    </div>
  </div>

  <!-- Intelligence -->
  <div class="glass-card p-5 flex flex-col gap-4" v-motion :initial="{opacity:0, y:20}" :enter="{opacity:1, y:0, transition:{delay:100}}">
    <div class="flex items-center justify-between">
      <div class="flex gap-3 items-center">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Google_Gemini_logo_2025.svg/960px-Google_Gemini_logo_2025.svg.png" class="h-8 w-8 object-contain" />
        <div class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Google Search</div>
      </div>
      <div class="badge text-[9px]">Intelligence</div>
    </div>
    <div>
      <div class="font-bold text-cyan-600 text-sm">Visionary Agency</div>
      <p class="text-[11px] text-muted leading-snug">Gemini 2.0 Agentic loop with Google Search Grounding for accuracy.</p>
    </div>
  </div>

  <!-- Backend -->
  <div class="glass-card p-5 flex flex-col gap-4" v-motion :initial="{opacity:0, y:20}" :enter="{opacity:1, y:0, transition:{delay:200}}">
    <div class="flex items-center justify-between">
      <div class="flex gap-3">
        <img src="/bun.svg" class="h-8 w-8 object-contain" />
        <img src="https://camo.githubusercontent.com/d67b9b942197ac50f871ce2090c96f3ac34a07c2ca899e6daaa04d44a9bcd3d1/68747470733a2f2f73686172702e706978656c706c756d62696e672e636f6d2f73686172702d6c6f676f2e737667" class="h-8 w-8 object-contain" />
      </div>
      <div class="badge text-[9px]">Backend</div>
    </div>
    <div>
      <div class="font-bold text-green-600 text-sm">High-Speed Processing</div>
      <p class="text-[11px] text-muted leading-snug">Bun runtime & Sharp.js for sub-second image processing and annotation.</p>
    </div>
  </div>

  <!-- Cloud -->
  <div class="glass-card p-5 flex flex-col gap-4" v-motion :initial="{opacity:0, y:20}" :enter="{opacity:1, y:0, transition:{delay:300}}">
    <div class="flex items-center justify-between">
      <div class="flex gap-3">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/3840px-Google_Cloud_logo.svg.png" class="h-8 w-8 object-contain" />
        <img src="https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6883d202716f923df4558b3d_google-cloud-run.webp" class="h-8 w-8 object-contain" />
      </div>
      <div class="badge text-[9px]">Cloud</div>
    </div>
    <div>
      <div class="font-bold text-indigo-600 text-sm">Global Infrastructure</div>
      <p class="text-[11px] text-muted leading-snug">Hosted on Google Cloud Run for auto-scaling, low latency, and reliability.</p>
    </div>
  </div>
</div>

---
layout: two-cols-header
---

# Strategic Value
<div class="text-[10px] font-bold text-blue-600/60 tracking-widest uppercase mt-1 mb-4" v-motion :initial="{opacity:0}" :enter="{opacity:1, transition:{delay:200}}">
  Targeting the $500B Global Consumer Electronics Repair Market
</div>

::left::

<div class="mt-6 space-y-5 pr-6">
  <div class="flex gap-4" v-motion :initial="{opacity:0, x:-20}" :enter="{opacity:1, x:0}">
    <div class="icon-box accent-blue shrink-0"><carbon-analytics class="text-xl" /></div>
    <div>
      <div class="font-bold">High-Precision Diagnosis</div>
      <p class="text-sm text-muted mt-1">Reduces user error by identifying specific component failures visually.</p>
    </div>
  </div>

  <div class="flex gap-4" v-motion :initial="{opacity:0, x:-20}" :enter="{opacity:1, x:0, transition:{delay:100}}">
    <div class="icon-box accent-cyan shrink-0"><carbon-certificate class="text-xl" /></div>
    <div>
      <div class="font-bold">Verified Reliability</div>
      <p class="text-sm text-muted mt-1">Builds trust with official grounding from verified repair manuals.</p>
    </div>
  </div>
</div>

::right::

<div class="mt-6 space-y-5 pr-8">
  <div class="flex gap-4" v-motion :initial="{opacity:0, x:20}" :enter="{opacity:1, x:0, transition:{delay:200}}">
    <div class="icon-box accent-indigo shrink-0"><carbon-growth class="text-xl" /></div>
    <div>
      <div class="font-bold">Circular Economy</div>
      <p class="text-sm text-muted mt-1">Directly contributes to sustainability by extending device lifespans.</p>
    </div>
  </div>

  <div class="flex gap-4" v-motion :initial="{opacity:0, x:20}" :enter="{opacity:1, x:0, transition:{delay:300}}">
    <div class="icon-box accent-green shrink-0"><carbon-user-avatar class="text-xl" /></div>
    <div>
      <div class="font-bold">User Empowerment</div>
      <p class="text-sm text-muted mt-1">Lowering the technical barrier to entry for complex device repairs.</p>
    </div>
  </div>
</div>

---
layout: center
---

<div class="blob blob-cyan" style="right: -100px; top: 50%;"></div>

# Try FixVision AI Live

<div class="flex gap-14 items-center mt-10 justify-center">
  <div class="glass-card p-6" v-motion :initial="{opacity:0, scale:0.9}" :enter="{opacity:1, scale:1}">
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&amp;data=https://fixvision-ai-233122189624.asia-southeast1.run.app&amp;color=2D63FF" class="w-44 rounded-lg" />
  </div>
  
  <div class="text-left" v-motion :initial="{opacity:0, x:30}" :enter="{opacity:1, x:0, transition:{delay:200}}">
    <div class="badge mb-4">Live Deployment</div>
    <h3 class="text-3xl font-extrabold mb-2">FixVision AI</h3>
    <a href="https://fixvision-ai-233122189624.asia-southeast1.run.app" target="_blank" class="text-blue-600 text-base font-semibold hover:underline block mb-6">
      fixvision-ai-233122189624.asia-southeast1.run.app
    </a>
    <div class="flex gap-3 mb-6">
      <div class="icon-box accent-blue text-2xl">📱</div>
      <div class="icon-box accent-cyan text-2xl">💻</div>
      <div class="icon-box accent-indigo text-2xl">🖥️</div>
    </div>
    <p class="text-[11px] text-muted italic">Scan QR & upload a photo of a broken device (e.g., cracked screen) <br/>to see Agentic Reasoning in action.</p>
  </div>
</div>

---
layout: default
---

# The Road Ahead

<div class="badge bg-amber-50 text-amber-600 border-amber-100 mb-6" v-motion :initial="{opacity:0}" :enter="{opacity:1}">Execution Roadmap 2025</div>

<div class="grid grid-cols-2 gap-6">
  <div class="glass-card p-4 flex items-start gap-4" v-motion :initial="{opacity:0, y:20}" :enter="{opacity:1, y:0}">
    <div class="flex flex-col items-center shrink-0">
      <div class="icon-box accent-rose w-10 h-10"><carbon-video class="text-lg" /></div>
      <div class="text-[9px] font-bold mt-2 text-rose-500">Q2 2025</div>
    </div>
    <div>
      <div class="font-bold text-base">Video Diagnosis</div>
      <p class="text-xs text-muted leading-tight mt-1">Live repair stream analysis for dynamic issues.</p>
    </div>
  </div>
  <div class="glass-card p-4 flex items-start gap-4" v-motion :initial="{opacity:0, y:20}" :enter="{opacity:1, y:0, transition:{delay:100}}">
    <div class="flex flex-col items-center shrink-0">
      <div class="icon-box accent-indigo w-10 h-10"><carbon-view-mode-2 class="text-lg" /></div>
      <div class="text-[9px] font-bold mt-2 text-indigo-500">Q3 2025</div>
    </div>
    <div>
      <div class="font-bold text-base">AR Guidance</div>
      <p class="text-xs text-muted leading-tight mt-1">Hands-free overlays via smart glasses.</p>
    </div>
  </div>
  <div class="glass-card p-4 flex items-start gap-4" v-motion :initial="{opacity:0, y:20}" :enter="{opacity:1, y:0, transition:{delay:200}}">
    <div class="flex flex-col items-center shrink-0">
      <div class="icon-box accent-amber w-10 h-10"><carbon-shopping-cart class="text-lg" /></div>
      <div class="text-[9px] font-bold mt-2 text-amber-600">Q4 2025</div>
    </div>
    <div>
      <div class="font-bold text-base">Parts Marketplace</div>
      <p class="text-xs text-muted leading-tight mt-1">Direct links to purchase faulty parts.</p>
    </div>
  </div>
  <div class="glass-card p-4 flex items-start gap-4" v-motion :initial="{opacity:0, y:20}" :enter="{opacity:1, y:0, transition:{delay:300}}">
    <div class="flex flex-col items-center shrink-0">
      <div class="icon-box accent-cyan w-10 h-10"><carbon-enterprise class="text-lg" /></div>
      <div class="text-[9px] font-bold mt-2 text-cyan-600">2026+</div>
    </div>
    <div>
      <div class="font-bold text-base">Enterprise SDK</div>
      <p class="text-xs text-muted leading-tight mt-1">White-label API for manufacturers.</p>
    </div>
  </div>
</div>

<div class="mt-12 text-center">
  <h2 class="text-5xl font-extrabold italic text-blue-600" v-motion :initial="{opacity:0, scale:0.9}" :enter="{opacity:1, scale:1, transition:{delay:500}}">
    Repair Smarter.
  </h2>
</div>
