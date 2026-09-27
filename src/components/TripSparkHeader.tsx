import React from 'react';
import { MMTLogo } from './MMTLogo';
import { Sparkles, Smartphone, Monitor, RotateCcw, Compass } from 'lucide-react';

interface TripSparkHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  deviceMode: 'mobile' | 'responsive';
  onToggleDeviceMode: () => void;
  onReset: () => void;
  isDemoNavOpen: boolean;
  onToggleDemoNav: () => void;
}

export const TripSparkHeader: React.FC<TripSparkHeaderProps> = ({
  currentStep,
  totalSteps,
  stepTitle,
  deviceMode,
  onToggleDeviceMode,
  onReset,
  isDemoNavOpen,
  onToggleDemoNav,
}) => {
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Micro-Bar for Evaluation / Judges */}
      <div className="bg-[#FAFAFA] border-b border-slate-100 text-[11px] text-[#6B6B6B] py-1 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Step {currentStep} of {totalSteps}:</span>
              <strong className="text-slate-900">{stepTitle}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Demo Screen Navigator Switch */}
            <button
              type="button"
              onClick={onToggleDemoNav}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                isDemoNavOpen
                  ? 'bg-slate-900 text-white'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              }`}
              title="Jump to any screen for evaluation"
            >
              <Compass className="w-3 h-3 text-amber-500" />
              <span>Screens (1–9)</span>
            </button>

            {/* Viewport switch: Mobile Frame vs Responsive */}
            <button
              type="button"
              onClick={onToggleDeviceMode}
              className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-slate-200/70 hover:bg-slate-300 text-slate-700 font-medium transition-colors cursor-pointer text-[10px]"
              title="Toggle Phone Frame / Responsive View"
            >
              {deviceMode === 'mobile' ? (
                <>
                  <Monitor className="w-3 h-3 text-[#008CFF]" />
                  <span>Desktop View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3 h-3 text-purple-600" />
                  <span>Phone Frame</span>
                </>
              )}
            </button>

            {/* Reset to Step 1 */}
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-red-600 cursor-pointer transition-colors"
              title="Reset flow to Step 1"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Locked Header Layout:
          [Original MakeMyTrip logo] | TripSpark ✨
          See it. Plan it. Book it.
      */}
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center cursor-pointer focus:outline-none"
            title="MakeMyTrip TripSpark Home"
          >
            <MMTLogo className="h-7 sm:h-8 w-auto" />
          </button>

          <span className="text-slate-300 text-lg select-none font-light">|</span>

          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 flex items-center gap-1">
              <span>TripSpark</span>
              <span className="text-amber-500 text-xs">✨</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 leading-none">
              See it. Plan it. Book it.
            </span>
          </div>
        </div>

        {/* Step Progress Pills on Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === currentStep
                  ? 'w-6 bg-gradient-to-r from-[#42B8F5] to-[#008CFF]'
                  : s < currentStep
                  ? 'w-2 bg-emerald-500'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  );
};
