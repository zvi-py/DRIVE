import React from 'react';
import { X, Search, ShieldAlert, FileText, FolderGit2, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export type AgentType = 'research' | 'experiment' | 'writing' | 'hub' | null;

interface AgentDetailModalProps {
  agentType: AgentType;
  onClose: () => void;
  onOpenPipeline?: () => void;
}

export const AgentDetailModal: React.FC<AgentDetailModalProps> = ({
  agentType,
  onClose,
  onOpenPipeline,
}) => {
  if (!agentType) return null;

  const contentMap = {
    research: {
      tag: 'DISCOVERS & INVESTIGATES',
      name: 'Research Agent',
      icon: Search,
      themeColor: 'text-violet-400',
      bgColor: 'bg-violet-950/40 border-violet-500/40',
      description: 'Breaks the question into research tasks, runs experiments/searches, gathers evidence, and investigates the problem.',
      metrics: [
        { label: 'Role', value: 'Discovery & Investigation' },
        { label: 'Execution', value: 'Task Decomposition' },
        { label: 'Evidence Gathered', value: '1,284 artifacts' },
        { label: 'Contract File', value: 'tasks/plan.json' },
      ],
      details: [
        'Decomposes multi-faceted user research questions into discrete, testable sub-hypotheses.',
        'Executes autonomous web, paper, and benchmark investigations to collect empirical source material.',
        'Commits all initial findings directly to timestamped evidence files without subjective filtering.',
      ],
    },
    experiment: {
      tag: 'CHALLENGES & VALIDATES',
      name: 'Experiment Agent',
      icon: ShieldAlert,
      themeColor: 'text-blue-400',
      bgColor: 'bg-blue-950/40 border-blue-500/40',
      description: 'Tests the initial findings, searches for counter-evidence, detects failures/contradictions, and decides what needs further investigation.',
      metrics: [
        { label: 'Role', value: 'Adversarial Validation' },
        { label: 'Counter-Tests', value: 'Active Stress Gating' },
        { label: 'Contradictions Detected', value: '14 flagged' },
        { label: 'Contract File', value: 'results/eval.json' },
      ],
      details: [
        'Subject initial findings to adversarial edge-case stress benchmarks and distribution shifts.',
        'Actively searches for counter-evidence, boundary condition failures, and measurement artifacts.',
        'Determines whether claims require further investigation or must be formally constrained.',
      ],
    },
    writing: {
      tag: 'SYNTHESIZES & REPORTS',
      name: 'Writing Agent',
      icon: FileText,
      themeColor: 'text-teal-400',
      bgColor: 'bg-teal-950/40 border-teal-500/40',
      description: 'Turns the verified research into a structured final report, connects claims to evidence, and maintains the research/decision record.',
      metrics: [
        { label: 'Role', value: 'Synthesis & Archival' },
        { label: 'Provenance', value: '100% File Backed' },
        { label: 'Decision Record', value: 'DECISIONS.md' },
        { label: 'Output Artifact', value: 'report_verified.md' },
      ],
      details: [
        'Synthesizes validated findings into structured, presentation-ready intelligence briefings.',
        'Connects every single quantitative number and claim to an immutable, measured file hash.',
        'Maintains a complete audit ledger of all decisions, revisions, and verified milestones.',
      ],
    },
    hub: {
      tag: 'SHARED FILE CONTRACT',
      name: 'POSIX File State Hub',
      icon: FolderGit2,
      themeColor: 'text-indigo-300',
      bgColor: 'bg-indigo-950/40 border-indigo-500/40',
      description: 'Shared file state volume: STATUS.md · DECISIONS.md · results/*.json. No direct chat between agents — every handoff is an immutable file.',
      metrics: [
        { label: 'Protocol', value: 'File-Based Contract' },
        { label: 'Direct Chat', value: 'BLOCKED (Disabled)' },
        { label: 'Audit Trail', value: 'Git Commit Linked' },
        { label: 'Verification Rate', value: '100%' },
      ],
      details: [
        'STATUS.md: Live heartbeat and active task allocation for each autonomous worker.',
        'DECISIONS.md: Ledger of accepted hypotheses, adversarial challenges, and supervisor vetos.',
        'results/: Immutable directory of empirical benchmarks and counter-evidence logs.',
      ],
    },
  };

  const current = contentMap[agentType];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#090810] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${current.bgColor}`}>
              <Icon size={18} className={current.themeColor} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                  {current.tag}
                </span>
              </div>
              <h3 className="font-heading font-bold text-white text-base mt-0.5">
                {current.name}
              </h3>
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
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs font-sans">
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-300 leading-relaxed">
            {current.description}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {current.metrics.map((m, i) => (
              <div key={i} className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
                <small className="block text-[10px] font-mono text-[#8c8aa0] uppercase mb-1">
                  {m.label}
                </small>
                <b className="font-mono text-xs text-white">
                  {m.value}
                </b>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.06] space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Core Responsibilities & Guarantees
            </span>
            <ul className="space-y-1.5 pl-1">
              {current.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-400">
                  <span className="text-violet-400 mt-0.5">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-white/[0.08] flex items-center justify-between bg-black/40 text-xs">
          <span className="text-[11px] font-mono text-[#8c8aa0]">DRIVE Multi-Agent System</span>
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
