import { Profiler, useEffect, useRef } from 'react';

// --- Events ---
const EVENT_NAME = 'perf-metrics-update';

interface PerfDetail {
  id: string;
  actualDuration: number;
  baseDuration: number;
}

// --- Display Component ---
export const RenderPerfMonitor = () => {
  const durationRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const detail = (e as CustomEvent<PerfDetail>).detail;
      
      if (durationRef.current) {
        // Format: "12.4ms"
        const ms = detail.actualDuration.toFixed(1);
        durationRef.current.innerText = `${ms}ms`;
        
        // Color coding
        if (detail.actualDuration > 100) {
            durationRef.current.style.color = '#f87171'; // red-400
        } else if (detail.actualDuration > 16) {
            durationRef.current.style.color = '#fbbf24'; // amber-400
        } else {
            durationRef.current.style.color = '#34d399'; // emerald-400
        }
      }

      if (labelRef.current) {
        labelRef.current.innerText = `Last Render (${detail.id})`;
      }

      if (barRef.current) {
        // Visual bar, max out at 200ms for scale
        const pct = Math.min((detail.actualDuration / 200) * 100, 100);
        barRef.current.style.width = `${pct}%`;
        
        if (detail.actualDuration > 100) {
            barRef.current.style.backgroundColor = '#ef4444'; 
        } else if (detail.actualDuration > 16) {
            barRef.current.style.backgroundColor = '#f59e0b';
        } else {
            barRef.current.style.backgroundColor = '#10b981';
        }
      }
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    return () => window.removeEventListener(EVENT_NAME, handleUpdate);
  }, []);

  return (
    <div className="bg-surface-subtle/50 rounded-lg border border-border-subtle p-2 min-w-[120px]">
      <div ref={labelRef} className="text-[9px] text-text-dim uppercase tracking-wider font-bold mb-1">
        Last Render
      </div>
      <div className="flex items-end gap-2 mb-1">
        <div ref={durationRef} className="text-lg font-mono font-bold text-text-main leading-none">
          --ms
        </div>
      </div>
      <div className="h-1 w-full bg-surface-muted rounded-full overflow-hidden">
        <div ref={barRef} className="h-full w-0 bg-text-muted transition-all duration-300 ease-out" />
      </div>
    </div>
  );
};

// --- Tracker Component ---
interface TrackRenderProps {
  id: string;
  children: React.ReactNode;
}

export const TrackRender = ({ id, children }: TrackRenderProps) => {
  const onRender = (
    id: string,
    _phase: 'mount' | 'update' | 'nested-update',
    actualDuration: number,
    baseDuration: number,
    _startTime: number,
    _commitTime: number
  ) => {
    // Dispatch event to avoid React State update loops
    const event = new CustomEvent(EVENT_NAME, {
      detail: { id, actualDuration, baseDuration }
    });
    window.dispatchEvent(event);
  };

  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
};
