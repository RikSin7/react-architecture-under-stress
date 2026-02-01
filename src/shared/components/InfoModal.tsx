import { useState } from 'react';

export const InfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="h-8 w-8 rounded-full bg-surface-subtle border border-white/10 text-text-muted hover:text-text-main hover:bg-white/5 flex items-center justify-center transition-all"
        title="About this app"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-surface/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal - Premium Card - Centered with safe margins */}
      <div className="relative w-full max-w-2xl bg-surface-elevated border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh] my-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-linear-to-r from-surface-subtle to-surface-elevated flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-text-main">PerfMatch Guide</h2>
            <p className="text-sm text-text-dim mt-1">Understanding the Benchmarks</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/5 rounded-lg text-text-muted transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar">
          
          {/* Section 1: The "Why" */}
          <section className="bg-surface-subtle/30 p-4 rounded-xl border border-white/5">
            <h3 className="text-sm font-bold text-white mb-2">What is this app?</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              This is a live laboratory for React performance. It renders a heavy dataset (2,500 items) using three different architectural strategies. 
              The goal is to demonstrate how <strong>Optimization Strategies</strong> (Memoization, Virtualization) impact user experience.
            </p>
          </section>

          {/* Section 2: Metrics */}
          <section>
             <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-brand-primary rounded-full"/> Metrics Legend
             </h3>
             <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-3 bg-surface-subtle/50 rounded-lg border border-white/5 group hover:border-brand-primary/30 transition-colors">
                   <div className="font-mono text-xs text-brand-primary mb-1 font-bold">IN (Input Renders)</div>
                   <p className="text-xs text-text-muted leading-relaxed">
                      How many times the search input re-renders. <br/><span className="text-status-bad">High</span> = Wasted CPU. <span className="text-status-good">Low</span> = Efficient.
                   </p>
                </div>
                <div className="p-3 bg-surface-subtle/50 rounded-lg border border-white/5 group hover:border-brand-primary/30 transition-colors">
                   <div className="font-mono text-xs text-status-good mb-1 font-bold">FLT (Filter Renders)</div>
                   <p className="text-xs text-text-muted leading-relaxed">
                      Tracks sidebar re-renders. Should <strong>only</strong> flush when you click a dropdown, never when typing.
                   </p>
                </div>
                <div className="p-3 bg-surface-subtle/50 rounded-lg border border-white/5 group hover:border-brand-primary/30 transition-colors">
                   <div className="font-mono text-xs text-status-best mb-1 font-bold">DOM Nodes</div>
                   <p className="text-xs text-text-muted leading-relaxed">
                      Actual HTML elements in the DOM. <br/>
                      Legacy: <span className="text-status-bad font-mono">2500</span><br/>
                      Virtual: <span className="text-status-good font-mono">~20</span>
                   </p>
                </div>
             </div>
          </section>

          {/* Section 3: Versions */}
          <section>
             <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-violet-500 rounded-full"/> Architectural Versions
             </h3>
             <div className="space-y-4">
                <div className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                   <div className="w-20 pt-1">
                      <span className="text-[10px] font-bold text-status-bad bg-status-bad/10 px-2 py-1 rounded border border-status-bad/20">LEGACY</span>
                   </div>
                   <div className="flex-1 text-sm text-text-dim">
                      <strong className="text-text-main block mb-1">Monolithic State (The "Context Trap")</strong>
                      A single Context holds all state. Typing one letter triggers a re-render of 2,500 components. 
                      <div className="mt-2 text-xs opacity-70">
                         Try: Type "table". Watch the graph spike red (200ms+ lag).
                      </div>
                   </div>
                </div>
                <div className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                   <div className="w-20 pt-1">
                      <span className="text-[10px] font-bold text-status-good bg-status-good/10 px-2 py-1 rounded border border-status-good/20">MODERN</span>
                   </div>
                   <div className="flex-1 text-sm text-text-dim">
                      <strong className="text-text-main block mb-1">Atomic State & Memoization</strong>
                      State is split. Components are wrapped in <code>React.memo</code>. Typing is fast, but the <strong>Initial Mount</strong> is still slow because of 2,500 DOM nodes.
                   </div>
                </div>
                <div className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                   <div className="w-20 pt-1">
                      <span className="text-[10px] font-bold text-status-best bg-status-best/10 px-2 py-1 rounded border border-status-best/20">HYPER</span>
                   </div>
                   <div className="flex-1 text-sm text-text-dim">
                      <strong className="text-text-main block mb-1">Virtualization (Windowing)</strong>
                      Only renders what is visible in the viewport. Constant memory usage. Infinite scalability.
                      <div className="mt-2 text-xs opacity-70">
                         Try: Scroll fast. Check "DOM Nodes" metric staying at ~20.
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* Section 4: Graph */}
          <section>
             <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-emerald-500 rounded-full"/> The Jankometer (Graph)
             </h3>
             <div className="text-sm text-text-dim grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-status-good" />
                   <span><strong>Green Zone (&lt;16ms)</strong>: 60FPS Smooth</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-status-bad" />
                   <span><strong>Red Zone (&gt;100ms)</strong>: Laggy / Jank</span>
                </div>
             </div>
          </section>

        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-surface-subtle flex justify-end shrink-0">
           <button 
             onClick={() => setIsOpen(false)}
             className="px-6 py-2 bg-text-main text-surface font-bold text-sm rounded-lg hover:bg-white transition-colors"
           >
             Close Guide
           </button>
        </div>
      </div>
    </div>
  );
};
