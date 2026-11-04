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
  Lock,
  Cpu,
  Zap,
  Activity,
  Box,
  FileText,
} from 'lucide-react';

interface DriveBrowserWorkspaceProps {
  onBackToIntro: () => void;
}

const RESEARCH_PROMPTS = [
  'benchmark depth-ar on mobile ARKit mesh stream',
  'train low-to-high resolution autoregressive depth tokens on NYU Depth v2',
  'reconstruct real-time 3D occlusion mesh from 60 FPS camera feed',
  'evaluate zero-shot metric depth: Depth-AR vs Depth Anything v2 on Apple Silicon',
];

export const DriveBrowserWorkspace: React.FC<DriveBrowserWorkspaceProps> = ({ onBackToIntro }) => {
  const [prompt, setPrompt] = useState(RESEARCH_PROMPTS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'autoregressive' | 'benchmark' | 'mesh'>('autoregressive');
  const [executionOutput, setExecutionOutput] = useState<{
    status: string;
    absRel: string;
    rmse: string;
    fps: string;
    latency: string;
    tokens: string;
    notes: string;
  } | null>({
    status: 'Verified SOTA',
    absRel: '0.059',
    rmse: '0.281 m',
    fps: '60.9 FPS',
    latency: '16.4 ms',
    tokens: '64² → 128² → 256² → 512²',
    notes: 'Patch-wise causal attention mask verified. Metric depth streamed to ARKit occlusion layer with zero temporal flicker.',
  });
  const [copiedCode, setCopiedCode] = useState(false);

  const handleRun = (textToRun: string) => {
    setPrompt(textToRun);
    setIsRunning(true);
    setExecutionOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setExecutionOutput({
        status: 'Benchmark Complete',
        absRel: '0.059',
        rmse: '0.281 m',
        fps: '60.9 FPS',
        latency: '16.4 ms',
        tokens: '64² → 128² → 256² → 512²',
        notes: `Executed pipeline for "${textToRun}". Autoregressive tokens converged with scale-invariant metric loss on Apple Silicon GPU / CUDA.`,
      });
    }, 900);
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
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1.2px, transparent 1.2px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* 1. LUXURY MINIMAL HEADER BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/75 border-b border-white/[0.08] px-6 sm:px-12 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={onBackToIntro}
            className="group flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-white/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all cursor-pointer"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Cinematic Engine</span>
          </button>

          <div className="flex items-center gap-2.5">
            <img
              src="/assets/aistudio/image_aee5510e.png"
              alt="DRIVE Logo"
              className="w-5 h-5 rounded object-cover border border-white/20 shadow-sm"
            />
            <span className="font-heading font-semibold text-sm tracking-[0.28em] text-white uppercase">
              DRIVE
            </span>
            <span className="text-[10px] font-mono text-white/40 border-l border-white/15 pl-2.5">
              depth-ar
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/assets/aistudio/DRIVE_Research_Paper_Final_310ecd38.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 hover:border-purple-500/50 transition-all shadow-sm"
          >
            <FileText size={12} />
            <span className="hidden sm:inline">Paper (PDF)</span>
            <ExternalLink size={10} className="text-white/40" />
          </a>

          <a
            href="https://github.com/happyhappy-jun/depth-ar"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-white/90 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-white/30 transition-all shadow-sm"
          >
            <Github size={13} />
            <span className="hidden sm:inline">happyhappy-jun/depth-ar</span>
            <ExternalLink size={10} className="text-white/40" />
          </a>
        </div>
      </header>

      {/* 2. THE MAIN SPACIOUS LUXURY BROWSER WINDOW */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-24">
        <div className="relative">
          {/* Subtle Companions Perched on Top Edge */}
          <div className="relative w-full z-20 pointer-events-none select-none">
            {/* Left Pair */}
            <div className="absolute -top-12 left-10 flex items-end gap-1.5 pointer-events-auto">
              <DriveCompanion id="purple-cone" size={50} />
              <DriveCompanion id="blue-cube" size={44} />
            </div>

            {/* Right Pair */}
            <div className="absolute -top-12 right-12 flex items-end gap-1.5 pointer-events-auto">
              <DriveCompanion id="green-tree" size={48} />
              <DriveCompanion id="coral-bean" size={46} />
            </div>
          </div>

          {/* Minimalist Glass Browser Chrome Frame */}
          <div className="w-full backdrop-blur-3xl bg-[#090714]/90 border border-white/[0.12] rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col">
            {/* Window Tabs Bar */}
            <div className="bg-white/[0.03] border-b border-white/[0.08] px-5 py-3 flex items-center justify-between gap-4 select-none">
              {/* macOS Traffic Lights */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 inline-block shadow-sm"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 inline-block shadow-sm"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 inline-block shadow-sm"></span>
              </div>

              {/* Clean Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto flex-1 max-w-xl no-scrollbar">
                <button
                  onClick={() => setActiveTab('autoregressive')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                    activeTab === 'autoregressive'
                      ? 'bg-white/[0.09] text-white border border-white/20 shadow-sm'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  <Code2 size={13} className="text-purple-400" />
                  <span>models/autoregressive.py</span>
                </button>

                <button
                  onClick={() => setActiveTab('benchmark')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                    activeTab === 'benchmark'
                      ? 'bg-white/[0.09] text-white border border-white/20 shadow-sm'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  <Layers size={13} className="text-sky-400" />
                  <span>benchmarks/nyu_kitti.py</span>
                </button>

                <button
                  onClick={() => setActiveTab('mesh')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                    activeTab === 'mesh'
                      ? 'bg-white/[0.09] text-white border border-white/20 shadow-sm'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  <Box size={13} className="text-emerald-400" />
                  <span>arkit/occlusion_mesh.py</span>
                </button>
              </div>

              {/* Live Status */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] font-mono tracking-wider text-white/50">Active 60 FPS</span>
              </div>
            </div>

            {/* Omnibar Row */}
            <div className="bg-white/[0.015] border-b border-white/[0.06] px-5 py-2.5 flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-white/40">
                <button className="p-1 hover:text-white rounded transition-colors cursor-pointer">
                  <ChevronLeft size={15} />
                </button>
                <button className="p-1 hover:text-white rounded transition-colors cursor-pointer">
                  <ChevronRight size={15} />
                </button>
                <button
                  onClick={() => handleRun(prompt)}
                  className="p-1 hover:text-white rounded transition-colors cursor-pointer"
                >
                  <RefreshCw size={13} className={isRunning ? 'animate-spin text-white' : ''} />
                </button>
              </div>

              {/* Minimal Omnibar Address */}
              <div className="flex-1 flex items-center bg-white/[0.035] border border-white/[0.08] rounded-xl px-3.5 py-1.5 text-xs text-white/80 font-mono shadow-inner">
                <Lock size={11} className="text-white/40 mr-2 shrink-0" />
                <span className="text-white/30 mr-1.5">https://github.com/</span>
                <span className="text-white font-medium">happyhappy-jun/depth-ar</span>
              </div>
            </div>

            {/* Center Canvas */}
            <div className="p-8 sm:p-14 lg:p-16 flex flex-col items-center justify-center min-h-[440px] relative">
              {/* Center Companion */}
              <div className="flex flex-col items-center mb-6">
                <DriveCompanion id="coral-bean" size={72} />
                <div className="flex items-center gap-1.5 text-xs font-mono text-white/60 mt-2.5">
                  <span className="text-white/90 font-medium tracking-wider">Simon &middot; Depth Pilot</span>
                  <span className="text-[10px] text-purple-300 font-medium px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">v1.4</span>
                </div>
              </div>

              {/* Minimal Luxury Prompt Pill Bar (Matching Reference Image 5) */}
              <div className="w-full max-w-xl bg-white/[0.04] border border-white/[0.14] hover:border-white/30 focus-within:border-white/50 rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all">
                <div className="px-2 pt-1 pb-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRun(prompt)}
                    placeholder="benchmark depth-ar on mobile ARKit mesh stream..."
                    className="w-full bg-transparent border-none outline-none text-white text-sm font-sans placeholder:text-white/30"
                  />
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.06] px-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRun(RESEARCH_PROMPTS[1])}
                      className="p-1.5 rounded-lg hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors cursor-pointer"
                      title="Add multi-resolution token configuration"
                    >
                      <Plus size={14} />
                    </button>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] text-[11px] font-mono text-white/50 border border-white/[0.06]">
                      <span>Causal Mask</span>
                      <span className="text-[9px]">⌵</span>
                    </div>
                  </div>

                  {/* Coral Red Circular Submit Button ↑ */}
                  <button
                    onClick={() => handleRun(prompt)}
                    disabled={isRunning}
                    className="w-8 h-8 rounded-full bg-[#e07a75] hover:bg-[#c9645f] text-white flex items-center justify-center transition-all duration-200 shadow-md shadow-rose-950/50 cursor-pointer hover:scale-105 active:scale-95"
                    title="Run depth-ar evaluation"
                  >
                    <ArrowUp size={15} />
                  </button>
                </div>
              </div>

              {/* Minimal Suggested Prompts with Lightbulbs */}
              <div className="w-full max-w-xl mt-6 space-y-2 font-sans text-xs">
                {RESEARCH_PROMPTS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRun(item)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/15 text-white/60 hover:text-white transition-all text-left cursor-pointer"
                  >
                    <Lightbulb size={13} className="text-white/30 shrink-0" />
                    <span className="truncate">{item}</span>
                  </button>
                ))}
              </div>

              {/* Live SOTA Depth-AR Benchmark Ledger Output */}
              {executionOutput && (
                <div className="w-full max-w-xl mt-8 p-5 rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/15 text-white font-mono text-xs space-y-4 shadow-2xl animate-in fade-in duration-300">
                  <div className="flex items-center justify-between text-[11px] text-white/50 border-b border-white/[0.08] pb-2">
                    <span className="text-white/90 font-semibold tracking-wider flex items-center gap-1.5">
                      <Zap size={13} className="text-yellow-400" />
                      depth-ar Runtime Benchmark Ledger
                    </span>
                    <button onClick={handleCopy} className="hover:text-white flex items-center gap-1 cursor-pointer">
                      {copiedCode ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="text-[10px] text-white/40 uppercase">AbsRel Error</div>
                      <div className="text-sm font-bold text-emerald-400 mt-0.5">{executionOutput.absRel}</div>
                      <div className="text-[9px] text-emerald-400/70">-14.2% (SOTA)</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="text-[10px] text-white/40 uppercase">RMSE</div>
                      <div className="text-sm font-bold text-sky-400 mt-0.5">{executionOutput.rmse}</div>
                      <div className="text-[9px] text-sky-400/70">NYU Depth v2</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="text-[10px] text-white/40 uppercase">Inference</div>
                      <div className="text-sm font-bold text-purple-400 mt-0.5">{executionOutput.fps}</div>
                      <div className="text-[9px] text-purple-400/70">{executionOutput.latency}</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="text-[10px] text-white/40 uppercase">Status</div>
                      <div className="text-sm font-bold text-white mt-0.5">Stable</div>
                      <div className="text-[9px] text-white/50">Zero Flicker</div>
                    </div>
                  </div>

                  <p className="text-[11px] leading-relaxed text-white/70 bg-black/40 p-3 rounded-xl border border-white/[0.05]">
                    &gt; {executionOutput.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Understated Luxury Logos Bar */}
          <div className="mt-8 text-center">
            <p className="text-[11px] font-mono text-white/30 uppercase tracking-[0.2em] mb-3">
              Trusted by fast-growing AI research labs worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs font-mono text-white/40 opacity-70">
              <span>Tandem</span>
              <span>IIElevenLabs</span>
              <span>ANTHROP\C</span>
              <span>stripe</span>
              <span>Lovable</span>
              <span>EQT</span>
            </div>
          </div>
        </div>

        {/* 3. MINIMAL "MEET YOUR COMPANION" SECTION (IMAGE 4) */}
        <section className="mt-28 text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-medium tracking-tight text-white">
            Meet your companion
          </h2>

          <p className="max-w-lg mx-auto text-xs sm:text-sm text-white/50 leading-relaxed font-sans">
            DRIVE includes personal AI assistants designed to evaluate and train{' '}
            <a
              href="https://github.com/happyhappy-jun/depth-ar"
              target="_blank"
              rel="noreferrer"
              className="text-white underline hover:text-white/80"
            >
              happyhappy-jun/depth-ar
            </a>{' '}
            across multi-resolution autoregressive depth tokens.
          </p>

          <div className="flex justify-center pt-2">
            <a
              href="https://github.com/happyhappy-jun/depth-ar"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-200 text-black font-medium text-xs tracking-wider transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Download Model Weights (.pt)</span>
            </a>
          </div>

          {/* Companions at Glass Desks */}
          <div className="pt-10 flex items-end justify-center gap-10 sm:gap-16">
            <div className="flex flex-col items-center">
              <DriveCompanion id="purple-cone" size={76} withDesk={true} />
              <span className="text-[11px] font-mono text-purple-300/80 mt-2.5 tracking-wider">Autoregressive</span>
            </div>

            <div className="flex flex-col items-center">
              <DriveCompanion id="coral-bean" size={76} withDesk={true} />
              <span className="text-[11px] font-mono text-rose-300/80 mt-2.5 tracking-wider">Depth Pilot</span>
            </div>

            <div className="flex flex-col items-center">
              <DriveCompanion id="blue-cube" size={76} withDesk={true} />
              <span className="text-[11px] font-mono text-sky-300/80 mt-2.5 tracking-wider">Mesh Evaluator</span>
            </div>
          </div>
        </section>

        {/* 4. THREE MINIMAL COMMAND CARDS (IMAGE 3) */}
        <section className="mt-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl backdrop-blur-xl bg-white/[0.025] border border-white/[0.08] hover:border-white/25 p-5 flex flex-col justify-between transition-all group">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-white/[0.05] text-white/70 font-mono text-xs border border-white/[0.08]">
                  /benchmark-monocular-depth
                </span>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 h-28 relative flex items-center justify-between overflow-hidden">
                  <div className="flex items-center gap-1.5 absolute top-2.5 left-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <div className="w-16 h-1.5 rounded-full bg-white/[0.08] absolute top-3 left-12"></div>

                  <div className="w-full text-[10px] font-mono text-white/40 pl-1 pt-4">
                    NYU Depth v2 · AbsRel 0.059
                  </div>

                  <div className="absolute right-3 bottom-1">
                    <DriveCompanion id="green-tree" size={40} isAnimated={false} />
                  </div>
                </div>

                <h3 className="font-heading font-medium text-base text-white group-hover:text-purple-300 transition-colors">
                  Benchmark Monocular Depth
                </h3>

                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  Evaluate zero-shot metric depth estimation against NYU Depth v2 and KITTI with low-to-high resolution causal masks.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/[0.05] mt-4 text-[10px] font-mono text-white/40">
                <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300">PyTorch</span>
                <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300">CUDA</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.05] text-white/70">ARKit</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl backdrop-blur-xl bg-white/[0.025] border border-white/[0.08] hover:border-white/25 p-5 flex flex-col justify-between transition-all group">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-white/[0.05] text-white/70 font-mono text-xs border border-white/[0.08]">
                  /train-autoregressive-tokens
                </span>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 h-28 relative flex items-center justify-between overflow-hidden">
                  <div className="flex items-center gap-1.5 absolute top-2.5 left-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <div className="w-16 h-1.5 rounded-full bg-white/[0.08] absolute top-3 left-12"></div>

                  <div className="w-full text-[10px] font-mono text-white/40 pl-1 pt-4">
                    Multi-res Tokens · Causal Attention
                  </div>

                  <div className="absolute right-3 bottom-1">
                    <DriveCompanion id="blue-cube" size={40} isAnimated={false} />
                  </div>
                </div>

                <h3 className="font-heading font-medium text-base text-white group-hover:text-purple-300 transition-colors">
                  Train Autoregressive Tokens
                </h3>

                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  Convert multi-resolution depth maps into discrete tokens using scalable patch-wise causal autoregression.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/[0.05] mt-4 text-[10px] font-mono text-white/40">
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300">KITTI</span>
                <span className="px-2 py-0.5 rounded bg-sky-950/60 text-sky-300">NYUv2</span>
                <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-300">W&amp;B</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl backdrop-blur-xl bg-white/[0.025] border border-white/[0.08] hover:border-white/25 p-5 flex flex-col justify-between transition-all group">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-white/[0.05] text-white/70 font-mono text-xs border border-white/[0.08]">
                  /spatial-mesh-reconstruction
                </span>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 h-28 relative flex items-center justify-between overflow-hidden">
                  <div className="flex items-center gap-1.5 absolute top-2.5 left-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <div className="w-16 h-1.5 rounded-full bg-white/[0.08] absolute top-3 left-12"></div>

                  <div className="w-full text-[10px] font-mono text-white/40 pl-1 pt-4">
                    60 FPS Mesh · Occlusion Handling
                  </div>

                  <div className="absolute right-3 bottom-1">
                    <DriveCompanion id="purple-cone" size={40} isAnimated={false} />
                  </div>
                </div>

                <h3 className="font-heading font-medium text-base text-white group-hover:text-purple-300 transition-colors">
                  Spatial Mesh &amp; Occlusion
                </h3>

                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  Real-time 3D geometry densification for occlusion-aware augmented reality, virtual collisions, and dynamic shadow casting.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/[0.05] mt-4 text-[10px] font-mono text-white/40">
                <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300">ARCore</span>
                <span className="px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300">Three.js</span>
                <span className="px-2 py-0.5 rounded bg-teal-950/60 text-teal-300">WebGL</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
