import { useState } from 'react';
import { RenderCounter } from './RenderCounter';
import { RenderPerfMonitor } from './RenderPerfMonitor';
import { RenderGraph } from './RenderGraph';

interface StatsPanelProps {
  totalCount: number;
  filteredCount: number;
  domCount: number; // New prop for visual confirmation of virtualization
  selectedCount: number;
  averagePrice: number;
}

export const StatsPanel = ({ totalCount, filteredCount, domCount, selectedCount }: StatsPanelProps) => {
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="bg-surface border-b border-border transition-all duration-300">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 p-3">
        <StatBox label="Total Items" value={totalCount} />
        <StatBox label="Visible" value={filteredCount} />
        <StatBox label="DOM Nodes" value={domCount} highlight={true} />
        <StatBox label="Selected" value={selectedCount} />
        
        <div className="col-span-2 lg:col-span-1 flex items-center gap-2 h-full">
           <div className="flex-1">
              <RenderPerfMonitor />
           </div>
           <button 
             onClick={() => setShowGraph(!showGraph)}
             className={`h-full px-3 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
               showGraph 
               ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary shadow-[0_0_10px_rgba(99,102,241,0.2)]' 
               : 'bg-surface-subtle/50 border-white/5 text-text-muted hover:bg-white/5 hover:text-text-main hover:border-white/10'
             }`}
           >
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
             </svg>
             <span className="text-[9px] font-bold uppercase tracking-wider">Graph</span>
           </button>
        </div>
      </div>
      
      {showGraph && (
        <div className="px-3 pb-3 animate-in slide-in-from-top-2 fade-in duration-300">
           <RenderGraph />
        </div>
      )}

      <div className="px-3 pb-2 flex justify-end items-center gap-2">
        <span className="text-[10px] text-text-dim uppercase tracking-widest opacity-40">Stats Renders</span> <RenderCounter />
      </div>
    </div>
  );
};

const StatBox = ({ label, value, highlight = false }: { label: string; value: string | number, highlight?: boolean }) => (
  <div className={`p-2 sm:p-3 rounded-xl border transition-all duration-300 ${
      highlight 
      ? 'bg-surface-elevated border-border-subtle shadow-sm' 
      : 'bg-surface-subtle/50 border-white/5'
  }`}>
    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-text-muted mb-0.5 font-bold opacity-70">{label}</div>
    <div className={`text-lg sm:text-xl font-mono font-bold tracking-tight ${highlight ? 'text-text-main' : 'text-text-dim'}`}>
      {value}
    </div>
  </div>
);
