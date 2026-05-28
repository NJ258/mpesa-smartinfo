import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
}

const BottomSheet = ({ title, children, footer, onClose }: BottomSheetProps) => {
  return (
    <>
      {/* Backdrop */}
      {onClose && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-[1010] bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        />
      )}
      
      {/* Sheet panel */}
      <div className="fixed inset-x-0 bottom-0 z-[1020] rounded-t-[2.5rem] bg-white px-6 pb-28 md:pb-8 pt-5 shadow-[0_-10px_40px_rgba(0,0,0,0.12)] border-t border-slate-100 animate-slide-up max-w-lg mx-auto max-h-[85vh] overflow-y-auto no-scrollbar">
        {/* Handle bar */}
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-slate-200" />
        
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-base font-bold text-slate-800 tracking-tight">{title}</p>
          {onClose && (
            <button 
              type="button" 
              onClick={onClose} 
              className="rounded-full bg-slate-100 p-1.5 text-slate-500 hover:bg-slate-200 transition"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4 text-slate-600 text-sm leading-relaxed">{children}</div>
        
        {/* Footer */}
        {footer ? <div className="mt-6">{footer}</div> : null}
      </div>
    </>
  );
};

export default BottomSheet;
