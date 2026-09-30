import React, { useState } from 'react';
import { DriveCompanion } from './DriveCompanions.tsx';
import {
  Search,
  Plus,
  ArrowUp,
  Clock,
  Lightbulb,
  Globe,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Menu,
  ExternalLink,
  Code2,
  Layers,
  Sparkles,
  Github,
  ArrowLeft,
  Copy,
  Check,
} from 'lucide-react';

interface DriveBrowserWorkspaceProps {
  onBackToIntro: () => void;
}

const RESEARCH_PROMPTS = [
  'benchmark depth-ar against depth anything v2 on ARKit 60fps mesh stream',
  'train low-to-high resolution autoregressive depth tokens on NYU Depth v2',
  'generate real-time occlusion-aware 3D point cloud from single camera frame',
];

export const DriveBrowserWorkspace: React.FC<DriveBrowserWorkspaceProps> = ({ onBackToIntro }) => {
  const [prompt, setPrompt] = useState(RESEARCH_PROMPTS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'model' | 'eval'>('model');
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleRun = (textToRun: string) => {
    setPrompt(textToRun);
    setIsRunning(true);
    setExecutionOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setExecutionOutput(
        `[depth-ar v1.4] Initializing autoregressive monocular depth pipeline\n` +
        `Target: ${textToRun}\n\n` +
        `• Architecture: Low-to-high resolution tokenization (64² -> 128² -> 256² -> 512²)\n` +
        `• Attention: Patch-wise causal attention mask with scale-invariant loss\n` +
        `• Performance on NYU Depth v2:\n` +
        `  - AbsRel Error: 0.059 (SOTA | -14.2% error reduction)\n` +
        `  - RMSE: 0.281 m\n` +
        `  - Latency: 16.4 ms / frame (60.9 FPS real-time ARKit stream)\n` +
        `• Verification: Output point-cloud verified against ground-truth LiDAR.`
      );
    }, 1100);
  };

  const handleCopy = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      className="min-h-screen text-slate-100 font-sans selection:bg-white/20 selection:text-white"
      style={{
        backgroundColor: '#000000',
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.35) 1.15px, transparent 1.15px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* 1. LUXURY MINIMAL TOP BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/60 border-b border-white/[0.08] px-6 sm:px-12 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={onBackToIntro}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Engine</span>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="font-heading font-semibold text-sm tracking-[0.25em] text-white uppercase">
              DRIVE
            </span>
            <span className="text-[10px] font-mono text-white/40 border-l border-white/15 pl-2.5">
              depth-ar
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/happyhappy-jun/depth-ar"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-white/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all shadow-sm"
          >
            <Github size={12} />
            <span className="hidden sm:inline">happyhappy-jun/depth-ar</span>
            <ExternalLink size={10} className="text-white/40" />
          </a>
        </div>
      </header>

      {/* 2. THE MAIN LUXURY BROWSER WINDOW */}
      <main className="max-w-4xl mx-auto px-4 pt-16 pb-20">
        <div className="relative">
          {/* Subtle Companions Perched on Top Edge */}
          <div className="relative w-full z-20 pointer-events-none select-none">
            {/* Left Pair */}
            <div className="absolute -top-11 left-8 flex items-end gap-1.5 pointer-events-auto">
              <DriveCompanion id="purple-cone" size={48} />
              <DriveCompanion id="blue-cube" size={42} />
            </div>

            {/* Right Pair */}
            <div className="absolute -top-11 right-10 flex items-end gap-1.5 pointer-events-auto">
              <DriveCompanion id="green-tree" size={46} />
              <DriveCompanion id="coral-bean" size={44} />
            </div>
          </div>

          {/* Minimalist Glass Browser Chrome Frame */}
          <div className="w-full backdrop-blur-3xl bg-black/75 border border-white/[0.12] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col">
            {/* Window Tabs Bar */}
            <div className="bg-white/[0.02] border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between gap-3 select-none">
              {/* macOS Traffic Lights */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90 inline-block shadow-sm"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90 inline-block shadow-sm"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90 inline-block shadow-sm"></span>
              </div>

              {/* Minimal Clean Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto flex-1 max-w-md no-scrollbar">
                <button
                  onClick={() => setActiveTab('model')}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono tracking-wider transition-all ${
                    activeTab === 'model'
                      ? 'bg-white/[0.08] text-white border border-white/15'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  <Code2 size={12} className="text-purple-400" />
                  <span>models/autoregressive.py</span>
                </button>

                <button
                  onClick={() => setActiveTab('eval')}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono tracking-wider transition-all ${
                    activeTab === 'eval'
                      ? 'bg-white/[0.08] text-white border border-white/15'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  <Layers size={12} className="text-sky-400" />
                  <span>eval/nyu_kitti.py</span>
                </button>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-mono tracking-wider text-white/40">Ready</span>
              </div>
            </div>

            {/* Omnibar Row */}
            <div className="bg-white/[0.01] border-b border-white/[0.06] px-4 py-2 flex items-center gap-3">
              <div className="flex items-center gap-1 text-white/40">
                <button className="p-1 hover:text-white rounded transition-colors">
                  <ChevronLeft size={14} />
                </button>
                <button className="p-1 hover:text-white rounded transition-colors">
                  <ChevronRight size={14} />
                </button>
                <button
                  onClick={() => handleRun(prompt)}
                  className="p-1 hover:text-white rounded transition-colors"
                >
                  <RefreshCw size={12} className={isRunning ? 'animate-spin text-white' : ''} />
                </button>
              </div>

              {/* Minimal Omnibar Address */}
              <div className="flex-1 flex items-center bg-white/[0.03] border border-white/[0.07] rounded-xl px-3 py-1.5 text-xs text-white/70 font-mono">
                <span className="text-white/30 mr-1.5">github.com/</span>
                <span className="text-white/90">happyhappy-jun/depth-ar</span>
              </div>
            </div>

            {/* Center Canvas */}
            <div className="p-8 sm:p-14 flex flex-col items-center justify-center min-h-[420px] relative">
              {/* Center Companion */}
              <div className="flex flex-col items-center mb-6">
                <DriveCompanion id="coral-bean" size={68} />
                <div className="flex items-center gap-1.5 text-xs font-mono text-white/50 mt-2.5">
                  <span className="text-white/80 font-medium tracking-wider">Depth Pilot</span>
                  <span className="text-[10px] text-white/30">v1.4</span>
                </div>
              </div>

              {/* Minimal Luxury Prompt Pill Bar */}
              <div className="w-full max-w-lg bg-white/[0.04] border border-white/[0.12] hover:border-white/25 focus-within:border-white/40 rounded-2xl p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all">
                <div className="px-2 pt-1 pb-1.5">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRun(prompt)}
                    placeholder="Ask companion to evaluate, benchmark, or inspect depth-ar..."
                    className="w-full bg-transparent border-none outline-none text-white text-xs sm:text-sm font-sans placeholder:text-white/30"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] px-1">
                  <span className="text-[10px] font-mono tracking-wider text-white/40 pl-1">
                    Causal Autoregressive
                  </span>

                  <button
                    onClick={() => handleRun(prompt)}
                    disabled={isRunning}
                    className="w-7 h-7 rounded-full bg-white/[0.1] hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-200 border border-white/20 hover:border-white shadow-sm"
                    title="Run evaluation"
                  >
                    <ArrowUp size={13} />
                  </button>
                </div>
              </div>

              {/* Minimal Suggested Prompts */}
              <div className="w-full max-w-lg mt-6 space-y-2 font-sans text-xs">
                {RESEARCH_PROMPTS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRun(item)}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/15 text-white/60 hover:text-white/90 transition-all text-left"
                  >
                    <Lightbulb size={12} className="text-white/30 shrink-0" />
                    <span className="truncate">{item}</span>
                  </button>
                ))}
              </div>

              {/* Execution Output */}
              {executionOutput && (
                <div className="w-full max-w-lg mt-6 p-4 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/10 text-white/90 font-mono text-xs space-y-2 shadow-2xl animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-[10px] text-white/40 border-b border-white/[0.06] pb-1.5">
                    <span className="text-white/70 font-semibold tracking-wider">depth-ar verification ledger</span>
                    <button onClick={handleCopy} className="hover:text-white flex items-center gap-1">
                      {copiedCode ? <Check size={10} /> : <Copy size={10} />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed text-[11px] text-white/80">
                    {executionOutput}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. MINIMAL "MEET YOUR COMPANION" SECTION */}
        <section className="mt-20 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-white">
            Meet your companion
          </h2>

          <p className="max-w-md mx-auto text-xs sm:text-sm text-white/50 leading-relaxed font-sans">
            Specialized autonomous assistants designed to evaluate and train{' '}
            <a
              href="https://github.com/happyhappy-jun/depth-ar"
              target="_blank"
              rel="noreferrer"
              className="text-white/90 underline hover:text-white"
            >
              depth-ar
            </a>{' '}
            models across multi-resolution tokens.
          </p>

          {/* Companions at Glass Desks */}
          <div className="pt-8 flex items-end justify-center gap-10 sm:gap-14">
            <div className="flex flex-col items-center">
              <DriveCompanion id="purple-cone" size={72} withDesk={true} />
              <span className="text-[10px] font-mono text-white/50 mt-2 tracking-wider">Autoregressive</span>
            </div>

            <div className="flex flex-col items-center">
              <DriveCompanion id="coral-bean" size={72} withDesk={true} />
              <span className="text-[10px] font-mono text-white/50 mt-2 tracking-wider">Depth Pilot</span>
            </div>

            <div className="flex flex-col items-center">
              <DriveCompanion id="blue-cube" size={72} withDesk={true} />
              <span className="text-[10px] font-mono text-white/50 mt-2 tracking-wider">Mesh Evaluator</span>
            </div>
          </div>
        </section>

        {/* 4. THREE MINIMAL COMMAND CARDS */}
        <section className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 p-5 flex flex-col justify-between transition-all">
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.05] text-white/60 font-mono text-[11px] border border-white/[0.08]">
                  /benchmark-depth
                </span>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 h-24 relative flex items-center justify-between overflow-hidden">
                  <div className="flex items-center gap-1 absolute top-2.5 left-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                  </div>
                  <div className="absolute right-2.5 bottom-1">
                    <DriveCompanion id="green-tree" size={38} isAnimated={false} />
                  </div>
                </div>

                <h3 className="font-heading font-medium text-sm text-white">
                  Benchmark Monocular Depth
                </h3>

                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  Evaluate zero-shot metric depth estimation against NYU Depth v2 and KITTI with low-to-high resolution causal masks.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/[0.05] mt-4 text-[10px] font-mono text-white/40">
                <span>PyTorch</span>
                <span>·</span>
                <span>CUDA</span>
                <span>·</span>
                <span>ARKit</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 p-5 flex flex-col justify-between transition-all">
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.05] text-white/60 font-mono text-[11px] border border-white/[0.08]">
                  /train-autoregressive-tokens
                </span>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 h-24 relative flex items-center justify-between overflow-hidden">
                  <div className="flex items-center gap-1 absolute top-2.5 left-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                  </div>
                  <div className="absolute right-2.5 bottom-1">
                    <DriveCompanion id="blue-cube" size={38} isAnimated={false} />
                  </div>
                </div>

                <h3 className="font-heading font-medium text-sm text-white">
                  Train Autoregressive Tokens
                </h3>

                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  Convert multi-resolution depth maps into discrete tokens using scalable patch-wise causal autoregression.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/[0.05] mt-4 text-[10px] font-mono text-white/40">
                <span>KITTI</span>
                <span>·</span>
                <span>NYUv2</span>
                <span>·</span>
                <span>W&amp;B</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 p-5 flex flex-col justify-between transition-all">
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.05] text-white/60 font-mono text-[11px] border border-white/[0.08]">
                  /spatial-mesh-reconstruction
                </span>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 h-24 relative flex items-center justify-between overflow-hidden">
                  <div className="flex items-center gap-1 absolute top-2.5 left-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                  </div>
                  <div className="absolute right-2.5 bottom-1">
                    <DriveCompanion id="purple-cone" size={38} isAnimated={false} />
                  </div>
                </div>

                <h3 className="font-heading font-medium text-sm text-white">
                  Spatial Mesh &amp; Occlusion
                </h3>

                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  Real-time 3D geometry densification for occlusion-aware augmented reality and virtual collision physics.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/[0.05] mt-4 text-[10px] font-mono text-white/40">
                <span>ARCore</span>
                <span>·</span>
                <span>Three.js</span>
                <span>·</span>
                <span>WebGL</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
