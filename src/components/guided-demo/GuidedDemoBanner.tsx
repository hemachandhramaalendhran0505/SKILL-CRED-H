import React from 'react';
import { useApp, DEMO_STEPS } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

export const GuidedDemoBanner: React.FC = () => {
  const { 
    guidedDemoActive, 
    guidedDemoStep, 
    nextDemoStep, 
    prevDemoStep, 
    stopGuidedDemo,
    setActiveTab,
    setCurrentRole
  } = useApp();

  if (!guidedDemoActive) return null;

  const currentStep = DEMO_STEPS[guidedDemoStep];
  const isLast = guidedDemoStep === DEMO_STEPS.length - 1;

  return (
    <div className="bg-slate-900 border-b border-indigo-500/40 text-white px-4 py-2.5 z-40 sticky top-16 shadow-md transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Step Indicator & Info */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
            {guidedDemoStep + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                SIH Jury Evaluation Walkthrough ({guidedDemoStep + 1} of {DEMO_STEPS.length})
              </span>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 px-1.5 py-0.2 rounded border border-indigo-700/50">
                Active Role: {currentStep.role}
              </span>
            </div>
            <div className="text-sm font-semibold text-white">
              {currentStep.title}
            </div>
            <div className="text-xs text-slate-300 line-clamp-1 hidden lg:block">
              {currentStep.description}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            onClick={prevDemoStep}
            disabled={guidedDemoStep === 0}
            className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded border border-slate-700 font-medium transition-colors ${
              guidedDemoStep === 0 ? 'opacity-40 cursor-not-allowed text-slate-500' : 'hover:bg-slate-800 text-slate-200'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={nextDemoStep}
            className="flex items-center gap-1 text-xs px-3.5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-xs transition-colors"
          >
            <span>{isLast ? 'Complete Demo' : 'Next Step'}</span>
            {!isLast && <ChevronRight className="w-3.5 h-3.5" />}
            {isLast && <CheckCircle2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={stopGuidedDemo}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors ml-1"
            title="Exit Walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
