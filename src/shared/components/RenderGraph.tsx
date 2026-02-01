import { useEffect, useState } from 'react';
import { AreaChart, Area, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';

const EVENT_NAME = 'perf-metrics-update';

interface PerfDetail {
  id: string;
  actualDuration: number;
}

interface GraphData {
  index: number;
  duration: number;
}

export const RenderGraph = () => {
  const [data, setData] = useState<GraphData[]>(Array(50).fill({ index: 0, duration: 0 }));
  
  useEffect(() => {
    let count = 0;
    const handleUpdate = (e: Event) => {
      const detail = (e as CustomEvent<PerfDetail>).detail;
      
      setData(prev => {
        const newData = [...prev.slice(1), { index: count++, duration: detail.actualDuration }];
        return newData;
      });
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    return () => window.removeEventListener(EVENT_NAME, handleUpdate);
  }, []);

  // Calculate average
  const avg = data.reduce((acc, curr) => acc + curr.duration, 0) / data.filter(d => d.duration > 0).length || 0;
  const max = Math.max(...data.map(d => d.duration));

  return (
    <div className="w-full bg-surface-subtle/30 rounded-lg border border-white/5 relative overflow-hidden group flex flex-col">
       <div className="px-3 py-2 flex items-center justify-between border-b border-white/5 bg-surface/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
             <div className="flex flex-col">
                <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">Average</span>
                <span className={`text-sm font-mono font-bold ${avg > 16 ? 'text-status-bad' : 'text-status-good'}`}>
                   {avg.toFixed(1)}<span className="text-[10px] text-text-dim ml-0.5">ms</span>
                </span>
             </div>
             <div className="w-px h-6 bg-white/10" />
             <div className="flex flex-col">
                <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">Peak</span>
                <span className={`text-sm font-mono font-bold ${max > 100 ? 'text-status-bad' : 'text-text-muted'}`}>
                   {max.toFixed(0)}<span className="text-[10px] text-text-dim ml-0.5">ms</span>
                </span>
             </div>
          </div>
          <div className="text-[9px] text-text-dim font-mono opacity-50">
             Last 50 Renders
          </div>
       </div>

       <div className="h-24 sm:h-32 w-full relative">
          {/* Custom Grid Lines labels */}
          <div className="absolute right-2 top-2 z-10 flex flex-col items-end gap-[18px] pointer-events-none">
             <span className="text-[9px] text-status-bad font-mono bg-surface/80 px-1 rounded backdrop-blur">100ms</span>
          </div>
          <div className="absolute right-2 bottom-[20%] z-10 flex flex-col items-end pointer-events-none">
             <span className="text-[9px] text-status-good font-mono bg-surface/80 px-1 rounded backdrop-blur">16ms</span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} onMouseMove={() => {}}>
                <defs>
                  <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  cursor={{ stroke: '#fff', strokeOpacity: 0.1, strokeWidth: 1 }}
                  isAnimationActive={true}
                  animationDuration={300}
                  animationEasing="ease-out"
                  position={{ y: 0 }} // Force tooltip to stay at top, following X only
                  content={(props: any) => {
                    const { active, payload } = props;
                    if (active && payload && payload.length) {
                      const val = payload[0].value as number;
                      return (
                         <div className="bg-surface-elevated/90 border border-white/10 p-2.5 rounded-lg shadow-xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 ml-4 pointer-events-none">
                           <div className="flex items-center gap-2 mb-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${val > 100 ? 'bg-status-bad' : val > 16 ? 'bg-text-main' : 'bg-status-good'}`} />
                              <span className="text-[9px] text-text-muted uppercase tracking-wider font-bold">Render Time</span>
                           </div>
                           <div className={`font-mono font-bold text-lg leading-none ${val > 100 ? 'text-status-bad' : val > 16 ? 'text-text-main' : 'text-status-good'}`}>
                             {Number(val).toFixed(1)}<span className="text-xs opacity-50 ml-0.5">ms</span>
                           </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <YAxis hide domain={[0, 200]} />
                <ReferenceLine y={16} stroke="#10b981" strokeDasharray="3 3" opacity={0.5} />
                <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="3 3" opacity={0.5} />
                <Area 
                  type="monotone" 
                  dataKey="duration" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorDuration)" 
                  isAnimationActive={false} 
                  activeDot={{ r: 4, fill: '#fff', stroke: '#6366f1', strokeWidth: 2 }}
                />
              </AreaChart>
           </ResponsiveContainer>
       </div>
    </div>
  );
};
