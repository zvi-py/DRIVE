import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  X,
  FileCode,
  ArrowRight,
  Sparkles,
  Server,
  Terminal,
  Activity,
  ChevronRight,
  Download,
  Copy,
} from 'lucide-react';

interface RedTeamWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WorkflowStep {
  id: string;
  phase: string;
  agent: string;
  status: 'pending' | 'running' | 'completed' | 'alert';
  title: string;
  details: string;
  artifact?: string;
}

const SAMPLE_QUESTIONS = [
  'Does Speculative Decoding with draft-model 8B yield 2.8x speedup on Llama-3-70B across all sequence lengths?',
  'Does FP8 KV-Cache compression maintain perplexity parity on 32k context needle-in-a-haystack tasks?',
  'Does Mamba-2 state space recurrence outperform FlashAttention-2 in memory bandwidth on A100 SXM4?',
];

export const RedTeamWorkflowModal: React.FC<RedTeamWorkflowModalProps> = ({ isOpen, onClose }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(SAMPLE_QUESTIONS[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const steps: WorkflowStep[] = [
    {
      id: 'plan',
      phase: '1. Research Plan',
      agent: 'Research Agent (Discovers & Investigates)',
      status: currentStepIndex > 0 ? 'completed' : currentStepIndex === 0 && isRunning ? 'running' : 'pending',
      title: 'Hypothesis Formulation & Hardware Allocation',
      details: 'Defined experimental protocol: batch size 1-16, prompt lengths [512, 2048, 8192], 8x H100 80GB nodes assigned.',
      artifact: 'PLAN_v1.md',
    },
    {
      id: 'evidence',
      phase: '2. Evidence Gathering',
      agent: 'Research Agent',
      status: currentStepIndex > 1 ? 'completed' : currentStepIndex === 1 ? 'running' : 'pending',
      title: 'Benchmark Run on Cluster Fleet',
      details: 'Executed 120 forward evaluation passes. Logged generation latency (t/s), acceptance rate alpha, and memory bandwidth utilization.',
      artifact: 'results/exp_042_eval.json',
    },
    {
      id: 'initial_finding',
      phase: '3. Initial Finding',
      agent: 'Research Agent',
      status: currentStepIndex > 2 ? 'completed' : currentStepIndex === 2 ? 'running' : 'pending',
      title: 'Claim: 2.85x Global Speedup Reported',
      details: '"Speculative decoding achieves consistent 2.85x latency reduction with acceptance rate alpha = 0.74."',
      artifact: 'draft_claims.md#claim-1',
    },
    {
      id: 'red_team_challenge',
      phase: '4. Red-Team Challenge',
      agent: 'Experiment Agent (Challenges & Validates)',
      status: currentStepIndex > 3 ? 'completed' : currentStepIndex === 3 ? 'alert' : 'pending',
      title: 'CHALLENGE: Sequence Length Degradation Ignored',
      details: 'OBJECTION: Initial sweep only tested prompts <= 1024 tokens. At 8192 context, KV-cache reload bandwidth saturates memory bus. Self-reported 2.85x speedup is invalid for production context windows.',
      artifact: 'DECISIONS.md#veto-84',
    },
    {
      id: 'counter_evidence',
      phase: '5. Counter-Evidence Gathering',
      agent: 'Experiment Agent',
      status: currentStepIndex > 4 ? 'completed' : currentStepIndex === 4 ? 'running' : 'pending',
      title: 'Stress-Test with 8K-32K Needle-in-a-Haystack Sequences',
      details: 'Dedicated stress benchmark on 8192 token sequences reveals acceptance rate alpha collapses from 0.74 to 0.28 due to attention degradation, dropping effective speedup to 1.14x.',
      artifact: 'results/exp_049_stress.json',
    },
    {
      id: 'verification_gate',
      phase: '6. Verification Gate',
      agent: 'Verification Engine',
      status: currentStepIndex > 5 ? 'completed' : currentStepIndex === 5 ? 'running' : 'pending',
      title: 'Gate Verdict: CLAIM OVERRIDDEN & CONSTRAINED',
      details: 'Automated verification check blocked premature report publication. Guessed/generalized claims eliminated. Strict parametric boundary applied.',
      artifact: 'VERIFICATION_GATE_PASSED.json',
    },
    {
      id: 'updated_finding',
      phase: '7. Updated Verified Finding',
      agent: 'Writing Agent (Synthesizes & Reports)',
      status: currentStepIndex >= 6 ? 'completed' : 'pending',
      title: 'Final Verified Ground-Truth Finding',
      details: '"Speculative decoding provides 2.85x speedup only for sequence lengths <= 2048 tokens. For context >= 8192 tokens, speedup degrades to 1.14x unless paired with asynchronous speculative caching."',
      artifact: 'final_report_verified.json',
    },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && currentStepIndex < steps.length) {
      timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 1600);
    } else if (currentStepIndex >= steps.length) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStepIndex, steps.length]);

  const handleStartRun = () => {
    setCurrentStepIndex(0);
    setIsRunning(true);
  };

  const handleCopyReport = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#090810] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(139,108,255,0.4)]">
              <ShieldAlert size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-semibold text-white text-base">
                  DRIVE — Red-Team Verification Engine
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  LIVE RUNNER
                </span>
              </div>
              <p className="text-[11px] text-[#8c8aa0]">
                Autonomous multi-agent research pipeline with adversarial red-team verification gates.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Question Selector */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <label className="text-[11px] font-mono text-[#8c8aa0] uppercase tracking-wider block">
              Target Research Question (User Prompt)
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {SAMPLE_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setSelectedQuestion(q);
                    setCurrentStepIndex(0);
                    setIsRunning(false);
                  }}
                  className={`text-left text-xs p-2.5 rounded-lg border transition-all ${
                    selectedQuestion === q
                      ? 'bg-violet-950/40 border-violet-500/50 text-white shadow-sm'
                      : 'bg-black/30 border-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <Activity size={13} className="text-violet-400" />
                <span>Verification Protocol: RFC-942 Adversarial Gate</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentStepIndex(0);
                    setIsRunning(false);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-white/[0.1] text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] flex items-center gap-1.5"
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleStartRun}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white text-xs font-semibold shadow-[0_0_15px_rgba(139,108,255,0.4)] flex items-center gap-1.5 transition-all"
                >
                  <Play size={12} className={isRunning ? 'animate-spin' : ''} />
                  <span>{isRunning ? 'Verifying...' : 'Verify Claims Pipeline'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Core Pipeline Visualization: Initial Finding -> Red Team -> Counter Evidence -> Gate -> Updated Finding */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
                Autonomous Verification Stages
              </span>
              <span className="text-[11px] font-mono text-violet-300">
                Phase {Math.min(steps.length, currentStepIndex + 1)} of {steps.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {steps.map((st, i) => {
                const isActive = currentStepIndex === i && isRunning;
                const isDone = currentStepIndex > i;
                const isChallenge = st.id === 'red_team_challenge';
                const isFinal = st.id === 'updated_finding';

                return (
                  <div
                    key={st.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isChallenge && (isDone || isActive)
                        ? 'bg-amber-950/20 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                        : isFinal && isDone
                        ? 'bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                        : isDone
                        ? 'bg-white/[0.02] border-white/[0.08]'
                        : isActive
                        ? 'bg-violet-950/30 border-violet-500/40 shadow-[0_0_15px_rgba(139,108,255,0.15)]'
                        : 'bg-black/20 border-white/[0.04] opacity-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono shrink-0 font-bold ${
                            isDone
                              ? isChallenge
                                ? 'bg-amber-500 text-black'
                                : isFinal
                                ? 'bg-emerald-400 text-black'
                                : 'bg-violet-600 text-white'
                              : isActive
                              ? 'bg-violet-500/40 border border-violet-400 text-violet-200 animate-pulse'
                              : 'bg-white/[0.06] text-slate-400'
                          }`}
                        >
                          {isDone ? (
                            isChallenge ? (
                              <AlertTriangle size={12} strokeWidth={3} />
                            ) : (
                              <CheckCircle2 size={13} strokeWidth={3} />
                            )
                          ) : (
                            i + 1
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-[#8c8aa0] uppercase">
                              {st.phase} · {st.agent}
                            </span>
                            {isChallenge && (
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold">
                                Adversarial Veto
                              </span>
                            )}
                            {isFinal && isDone && (
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold">
                                100% Proven
                              </span>
                            )}
                          </div>
                          <h4
                            className={`text-xs font-semibold ${
                              isChallenge ? 'text-amber-200' : isFinal ? 'text-emerald-200' : 'text-slate-100'
                            }`}
                          >
                            {st.title}
                          </h4>
                        </div>
                      </div>

                      {st.artifact && (
                        <div className="flex items-center gap-1 font-mono text-[10px] text-violet-400 bg-violet-950/60 border border-violet-500/20 px-2 py-0.5 rounded shrink-0">
                          <FileCode size={11} />
                          <span>{st.artifact}</span>
                        </div>
                      )}
                    </div>

                    <p className="mt-2 pl-8 text-xs text-[#8c8aa0] leading-relaxed font-sans">
                      {st.details}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Final Verified Finding Output Banner (shown when complete) */}
          {currentStepIndex >= steps.length && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-violet-950/30 to-black/60 border border-emerald-500/40 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Research Verification Complete — Zero Unverified Claims</span>
                </div>
                <button
                  onClick={handleCopyReport}
                  className="px-2.5 py-1 rounded bg-white/[0.08] hover:bg-white/[0.14] text-[11px] text-slate-200 flex items-center gap-1 transition-all"
                >
                  <Copy size={11} />
                  <span>{copied ? 'Copied' : 'Copy Verdict'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono bg-black/40 p-3 rounded-lg border border-white/[0.06]">
                STATUS: VERIFIED · CLAIMS: 1 · COUNTER-EVALS: 1 · PROVENANCE: results/exp_049_stress.json
                <br />
                &gt; &quot;Speculative decoding provides 2.85x speedup only for sequence lengths &lt;= 2048 tokens. For context &gt;= 8192 tokens, speedup degrades to 1.14x unless paired with asynchronous speculative caching.&quot;
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-white/[0.08] flex items-center justify-between bg-black/40 text-xs text-slate-400">
          <span className="font-mono text-[11px]">
            DRIVE Engine v2.4 · Multi-Agent Contract Engine
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
