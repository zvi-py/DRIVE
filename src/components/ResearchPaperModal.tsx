import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

interface ResearchPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchPaperModal: React.FC<ResearchPaperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pdfUrl = '/assets/aistudio/DRIVE_Research_Paper_Final_310ecd38.pdf';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl h-[94vh] bg-[#090812] border border-white/15 rounded-2xl shadow-[0_25px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <div className="text-xs font-mono text-white/80 tracking-wider">
            DRIVE_Research_Paper_Final_310ecd38.pdf &middot; 14 Pages
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink size={12} />
              <span>Open in New Tab</span>
            </a>

            <a
              href={pdfUrl}
              download="DRIVE_Research_Paper_Final.pdf"
              className="px-3 py-1.5 rounded-lg bg-white text-black font-mono text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Download size={12} />
              <span>Download</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Exact Document Full-Bleed Viewer */}
        <div className="flex-1 w-full h-full bg-black">
          <object
            data={`${pdfUrl}#toolbar=1&navpanes=0`}
            type="application/pdf"
            className="w-full h-full"
          >
            <iframe
              src={`${pdfUrl}#toolbar=1`}
              title="Drive-AR Exact Documentation PDF"
              className="w-full h-full border-0"
            />
          </object>
        </div>
      </div>
    </div>
  );
};
