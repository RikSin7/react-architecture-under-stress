import { BestListPage } from "./BestListPage";


export const BestApp = () => {
  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="bg-status-best/10 p-4 border-b border-status-best/20">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-status-best shadow-[0_0_8px_var(--color-status-best)]" />
          <h1 className="text-sm font-bold text-status-best uppercase tracking-widest">Version C: Virtualized</h1>
        </div>
        <p className="text-xs text-status-best/70 mt-1 ml-5">
           Zero-Lag Rendering • 100k+ Items Support • Smart Windowing
        </p>
      </div>
      
      <BestListPage />
    </div>
  );
};
