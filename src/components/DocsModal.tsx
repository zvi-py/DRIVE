import React from 'react';
import { X, FileText, CheckCircle2, Shield, Cpu, Terminal } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#090810] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600/30 border border-violet-500/40 flex items-center justify-center">
              <FileText size={18} className="text-violet-300" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-base">
                DRIVE Architecture & Specification
              </h3>
              <p className="text-[11px] text-[#8c8aa0]">
                Deep Research Intelligence & Verification Engine · System Whitepaper
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          {/* Section 1 */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-violet-400 uppercase tracking-wider block">
              1. The Zero-Chat Contract Model
            </span>
            <p className="text-xs text-[#8c8aa0] leading-relaxed">
              Standard multi-agent systems communicate via conversational LLM chat, which suffers from hallucination cascades, silent rounding errors, and unreviewed assumptions. DRIVE completely eliminates agent chat. Agents communicate strictly through immutable, timestamped file contracts on a shared POSIX volume.
            </p>
            <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs text-slate-200">
              STATUS.md · DECISIONS.md · results/*.json · claims.lock
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-violet-400 uppercase tracking-wider block">
              2. The Tri-Agent Specialization Hierarchy
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-500/30">
                <span className="text-[10px] font-mono text-violet-400 uppercase font-semibold">Research Agent</span>
                <h4 className="text-xs font-semibold text-white mt-1">Discovers & Investigates</h4>
                <p className="text-[11px] text-[#8c8aa0] mt-1.5 leading-relaxed">
                  Breaks the question into research tasks, runs experiments/searches, gathers evidence, and investigates the problem.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30">
                <span className="text-[10px] font-mono text-blue-400 uppercase font-semibold">Experiment Agent</span>
                <h4 className="text-xs font-semibold text-white mt-1">Challenges & Validates</h4>
                <p className="text-[11px] text-[#8c8aa0] mt-1.5 leading-relaxed">
                  Tests the initial findings, searches for counter-evidence, detects failures/contradictions, and decides what needs further investigation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-500/30">
                <span className="text-[10px] font-mono text-teal-400 uppercase font-semibold">Writing Agent</span>
                <h4 className="text-xs font-semibold text-white mt-1">Synthesizes & Reports</h4>
                <p className="text-[11px] text-[#8c8aa0] mt-1.5 leading-relaxed">
                  Turns the verified research into a structured final report, connects claims to evidence, and maintains the research/decision record.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-violet-400 uppercase tracking-wider block">
              3. Adversarial Red-Team Challenge
            </span>
            <p className="text-xs text-[#8c8aa0] leading-relaxed">
              Before any finding is certified, the Experiment Agent generates adversarial counter-hypotheses and stress-tests edge distributions. If counter-evidence falsifies global generalization, the claim is overridden and parameterized before the Writing Agent synthesizes the verified record.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-white/[0.08] flex items-center justify-between bg-black/40 text-xs">
          <span className="font-mono text-[11px] text-slate-400">
            DRIVE Engine Specification
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
