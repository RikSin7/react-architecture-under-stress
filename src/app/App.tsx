import { useState } from 'react';
import { BadApp } from '../bad/BadApp';
import { GoodApp } from '../good/GoodApp';
import { BestApp } from '../best/BestApp';
import { InfoModal } from '../shared/components/InfoModal';

export const App = () => {
  const [mode, setMode] = useState<'bad' | 'good' | 'best'>('bad');

  return (
    <div className="h-screen flex flex-col bg-surface text-text-main font-display selection:bg-brand-primary/30">
      <header className="fixed top-0 inset-x-0 h-14 glass-panel z-50 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
             <img src="/logo1.png" alt="Logo" className="h-8 w-8" />
             <div>
               <h1 className="font-bold text-sm tracking-wide text-text-main hidden sm:block">PerfMatch</h1>
               <div className="text-[10px] text-text-muted font-mono uppercase tracking-widest opacity-70 hidden sm:block">Benchmarks</div>
             </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-surface-subtle/50 p-1 rounded-lg border border-white/5">
              {[ 
                { id: 'bad', label: 'Legacy', sub: '(Context)', activeColor: 'text-status-bad' },
                { id: 'good', label: 'Modern', sub: '(Atomic)', activeColor: 'text-status-good' },
                { id: 'best', label: 'Hyper', sub: '(Virtual)', activeColor: 'text-status-best' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setMode(tab.id as any)}
                  className={`px-3 sm:px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                    mode === tab.id 
                      ? `bg-surface-muted ${tab.activeColor} shadow-sm ring-1 ring-white/10` 
                      : 'text-text-muted hover:text-text-main hover:bg-white/5'
                  }`}
                >
                  {tab.label} <span className="opacity-40 ml-1 font-mono hidden sm:inline">{tab.sub}</span>
                </button>
              ))}
            </div>
            
            <div className="w-px h-6 bg-white/10" />
            <InfoModal />
          </div>
      </header>
      
      {/* Main Content Area - with top padding for fixed header */}
      <main className="flex-1 pt-14 overflow-hidden relative">
        <div key={mode} className="h-full animate-in fade-in duration-500 slide-in-from-bottom-2">
           {mode === 'bad' && <BadApp />}
           {mode === 'good' && <GoodApp />}
           {mode === 'best' && <BestApp />}
        </div>
      </main>
    </div>
  );
};
