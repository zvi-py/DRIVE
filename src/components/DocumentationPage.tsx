import React, { useState } from 'react';
import { ArrowLeft, Download, ExternalLink, Copy, Check } from 'lucide-react';

interface DocumentationPageProps {
  onBack: () => void;
}

export const DocumentationPage: React.FC<DocumentationPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'docs' | 'pdf'>('docs');
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const pdfUrl = '/assets/aistudio/DriveAR_Research_Paper_Final_121e8319.pdf';

  const handleCopyCitation = () => {
    const bibtex = `@inproceedings{mulla2026drivear,
  title={Drive-AR: Skipping Transformer Layers Without Dropping Their Updates},
  author={Mulla, Zaveriya and Dehalvi, Ayman},
  booktitle={International Conference on Machine Learning (ICML)},
  year={2026}
}`;
    navigator.clipboard?.writeText(bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#06040c] text-slate-100 font-sans selection:bg-purple-900/40">
      {/* 1. STICKY LUXURY HEADER BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/85 border-b border-white/[0.08] px-6 sm:px-12 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-white/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to DRIVE</span>
          </button>

          <div className="hidden sm:flex items-center gap-2.5 text-xs font-mono text-white/40 border-l border-white/10 pl-4">
            <span className="text-white/90 font-medium">Drive-AR</span>
            <span>&middot;</span>
            <span>ICML 2026 Technical Paper &amp; Protocol</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/[0.04] p-1 rounded-full border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('docs')}
              className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === 'docs' ? 'bg-white/15 text-white font-medium shadow-sm' : 'text-white/40 hover:text-white'
              }`}
            >
              Documentation
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === 'pdf' ? 'bg-white/15 text-white font-medium shadow-sm' : 'text-white/40 hover:text-white'
              }`}
            >
              14-Page PDF
            </button>
          </div>

          <a
            href={pdfUrl}
            download="DriveAR_Research_Paper_Final.pdf"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-mono font-medium hover:bg-slate-200 transition-all shadow-sm cursor-pointer"
          >
            <Download size={12} />
            <span className="hidden sm:inline">Download PDF</span>
          </a>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
            title="Open in new window"
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </header>

      {/* 2. MAIN DOCUMENTATION BODY (THE SAME EXACT THING ON A DEDICATED FULL PAGE) */}
      <main className="max-w-5xl mx-auto px-5 sm:px-10 py-12">
        {activeTab === 'pdf' ? (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-white/50 px-1">
              <span>DriveAR_Research_Paper_Final_121e8319.pdf &middot; 14 Pages &middot; 1.6 MB</span>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
                Open raw PDF file in new window
              </a>
            </div>
            <div className="w-full h-[85vh] rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl">
              <object data={`${pdfUrl}#toolbar=1&navpanes=0`} type="application/pdf" className="w-full h-full">
                <iframe src={`${pdfUrl}#toolbar=1`} title="Drive-AR PDF" className="w-full h-full border-0" />
              </object>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Top Documentation Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.025] border border-white/10 space-y-4 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-semibold text-xl sm:text-2xl text-white tracking-wide">
                    Drive-AR Documentation
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-medium">
                    ICML 2026
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyCitation}
                    className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedBibtex ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedBibtex ? 'BibTeX Copied' : 'Copy BibTeX'}</span>
                  </button>
                  <span>&middot;</span>
                  <a
                    href={pdfUrl}
                    download="DriveAR_Research_Paper_Final.pdf"
                    className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Download size={12} />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>

              <div>
                <h1 className="text-lg sm:text-xl font-heading font-semibold text-white/95 tracking-tight">
                  Drive-AR: Skipping Transformer Layers Without Dropping Their Updates
                </h1>
                <p className="text-xs font-mono text-white/50 pt-1.5">
                  Complete Technical Specifications &middot; Zaveriya Mulla (zaveriya.edu@gmail.com) &middot; Ayman Dehalvi (aymandehalvi63@gmail.com)
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-purple-300 pt-2">
                  <a href="https://www.linkedin.com/in/zaveriya/" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                    LinkedIn: Zaveriya Mulla
                    <ExternalLink size={10} />
                  </a>
                  <span>&middot;</span>
                  <a href="https://www.linkedin.com/in/ayman-dehalvi-a76698326/" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                    LinkedIn: Ayman Dehalvi
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>

            {/* Abstract Callout */}
            <div className="p-6 sm:p-8 rounded-2xl bg-purple-950/20 border border-purple-500/25 space-y-3">
              <div className="text-xs font-mono text-purple-300 uppercase tracking-widest font-semibold">
                Abstract &middot; Depth-wise AutoRegressive Update Prediction
              </div>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans">
                Layer skipping makes Transformer inference cheaper by deleting entire residual blocks, but the operator
                it uses assumes the missing residual update is exactly zero, and it is not: much of that update is predictable
                from the updates preceding it. We introduce <b>Drive-AR</b> (Depth-wise AutoRegressive update prediction),
                which replaces a skipped block with a closed-form, per-channel autoregressive forecast of its update, fitted
                on unlabeled text with no gradient training and adding <b>0.64% to prefill latency</b>. It recovers <b>4.6% to 23.3%</b> of
                the language-modelling damage skipping causes at light budgets across Qwen2.5-0.5B, 1.5B and 7B, and up to <b>70.0%</b>
                under severe damage. Downstream the gains are real but conditional: at 28.6% of blocks skipped on Qwen2.5-7B,
                under the deployable selection rule, Drive-AR answers 89 more questions correctly out of 900 than plain skipping (z = 4.31),
                one of four results surviving Bonferroni correction over all 63 comparisons.
              </p>
            </div>

            {/* Table 4: Frontier Compression Cells (WikiText-2 Test) - EXACTLY AS IN SCREENSHOT */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-emerald-300 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Table 4: Frontier Compression Cells (WikiText-2 Test)</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 shadow-xl">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] text-white/50">
                      <th className="p-3">Model</th>
                      <th className="p-3">k Skipped</th>
                      <th className="p-3">% Skipped</th>
                      <th className="p-3">Plain NLL</th>
                      <th className="p-3">Drive-AR NLL</th>
                      <th className="p-3">Drive-AR Rec.</th>
                      <th className="p-3">Cross-Token Rec.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-white/80">
                    <tr>
                      <td className="p-3 font-medium">Qwen2.5-0.5B</td>
                      <td className="p-3">6</td>
                      <td className="p-3">25.0%</td>
                      <td className="p-3">4.45</td>
                      <td className="p-3 text-emerald-400">4.15</td>
                      <td className="p-3 text-emerald-400">+18.0%</td>
                      <td className="p-3 text-white/40">-</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Qwen2.5-0.5B</td>
                      <td className="p-3">10</td>
                      <td className="p-3">41.7%</td>
                      <td className="p-3">10.29</td>
                      <td className="p-3 text-emerald-400">7.09</td>
                      <td className="p-3 text-emerald-400 font-bold">+42.6%</td>
                      <td className="p-3 text-white/40">-</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Qwen2.5-1.5B</td>
                      <td className="p-3">8</td>
                      <td className="p-3">28.6%</td>
                      <td className="p-3">4.08</td>
                      <td className="p-3 text-emerald-400">3.89</td>
                      <td className="p-3 text-emerald-400">+11.1%</td>
                      <td className="p-3 text-sky-400">+11.6%</td>
                    </tr>
                    <tr className="bg-purple-950/25 font-semibold text-white">
                      <td className="p-3 text-purple-300">Qwen2.5-7B</td>
                      <td className="p-3">8</td>
                      <td className="p-3">28.6%</td>
                      <td className="p-3">3.71</td>
                      <td className="p-3 text-emerald-400">3.05</td>
                      <td className="p-3 text-emerald-400 font-bold">+38.1%</td>
                      <td className="p-3 text-sky-400 font-bold">+38.1%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Qwen2.5-7B</td>
                      <td className="p-3">12</td>
                      <td className="p-3">42.9%</td>
                      <td className="p-3">6.18</td>
                      <td className="p-3 text-rose-400">6.43 (-6.0%)</td>
                      <td className="p-3 text-rose-400">Breaks down</td>
                      <td className="p-3 text-sky-400 font-bold">+7.1% (Rescues)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 6: Qwen3 Out-of-Family Generalization - EXACTLY AS IN SCREENSHOT */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-sky-300 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span>Table 6: Qwen3 Out-of-Family Generalization (k = 4)</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 shadow-xl">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] text-white/50">
                      <th className="p-3">Model</th>
                      <th className="p-3">Dense NLL</th>
                      <th className="p-3">Plain Skip NLL</th>
                      <th className="p-3">Damage (nats)</th>
                      <th className="p-3">Drive-AR Rec.</th>
                      <th className="p-3">Cross-Token Rec.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-white/80">
                    <tr>
                      <td className="p-3 font-medium">Qwen3-0.6B</td>
                      <td className="p-3">3.17</td>
                      <td className="p-3">3.61</td>
                      <td className="p-3">0.44</td>
                      <td className="p-3 text-emerald-400">+20.5%</td>
                      <td className="p-3 text-sky-400 font-semibold">+21.2%</td>
                    </tr>
                    <tr className="text-rose-300/80">
                      <td className="p-3 font-medium">Qwen3-1.7B</td>
                      <td className="p-3">2.91</td>
                      <td className="p-3">3.53</td>
                      <td className="p-3">0.61</td>
                      <td className="p-3 text-rose-400">-1.9%</td>
                      <td className="p-3 text-rose-400">-2.7%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Qwen3-4B</td>
                      <td className="p-3">2.71</td>
                      <td className="p-3">2.81</td>
                      <td className="p-3">0.10</td>
                      <td className="p-3 text-emerald-400">+4.7%</td>
                      <td className="p-3 text-sky-400 font-semibold">+6.2%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Qwen3-8B</td>
                      <td className="p-3">2.38</td>
                      <td className="p-3">2.54</td>
                      <td className="p-3">0.16</td>
                      <td className="p-3 text-emerald-400">+12.7%</td>
                      <td className="p-3 text-sky-400 font-semibold">+13.2%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/40 font-mono">
                * Qwen3-1.7B is the diagnosed failure mode where 4 layers that each individually repair to better than dense fail to compose due to compounding errors.
              </p>
            </div>

            {/* SECTION 4: SYSTEM ARCHITECTURE & PROTOCOL - EXACTLY AS IN SCREENSHOT */}
            <div className="space-y-4 pt-4">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                <span className="text-purple-400 text-lg font-mono mr-2">4.</span>
                System Architecture &amp; Protocol
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-2.5">
                  <div className="text-xs font-mono font-semibold text-purple-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span>Hardware &amp; Precision Setup</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                    0.5B runs evaluated in FP32 on NVIDIA TITAN X (Pascal). 1.5B, 7B, and Qwen3 runs evaluated in BF16 on a single
                    NVIDIA RTX 3090. Coefficients fitted in FP64 without gradient backpropagation.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-2.5">
                  <div className="text-xs font-mono font-semibold text-emerald-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Prefill Latency Measurement</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                    Measured via forward passes with use_cache=False, batch size 8, 10 warmup + 30 timed iterations with
                    torch.cuda.synchronize(). Drive-AR overhead is 4.9 ms on sequence length 512 (+0.64%) and 1.0 ms on 2048.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-2.5">
                  <div className="text-xs font-mono font-semibold text-sky-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                    <span>Six Correctness Verifications</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                    Dense wrapper reproduces unmodified model logits bit-exactly (max absolute logit diff 0.0).
                    Residual updates captured to max error 3.8e-6 against 1.7e3 hidden state scale.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-2.5">
                  <div className="text-xs font-mono font-semibold text-amber-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Two Taps Buy Nothing</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                    Evaluating a 2-tap variant (Δ̂_ℓ = α_ℓ Δ_{'{ℓ-1}'} + β_ℓ Δ_{'{ℓ-2}'}) yields only +0.0009 recovery improvement.
                    The effective axis of capacity is across hidden width (d dimensions), not back in depth.
                  </p>
                </div>
              </div>

              {/* Conclusion Box */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5 mt-6">
                <h3 className="text-base font-heading font-semibold text-white">
                  Conclusion: Repair Pays Off Where Pruning Bites
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                  Plain skipping assumes a skipped block&apos;s residual update is zero. It is not: much of it is predictable,
                  and Drive-AR recovers a substantial share of the likelihood skipping destroys, in closed form, at 0.64% of prefill latency.
                  Downstream, significant gains appear only where the damage is severe: repair pays off where pruning bites.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
