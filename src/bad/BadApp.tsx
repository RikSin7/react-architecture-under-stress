import { BadStateProvider } from './BadStateProvider';
import { BadListPage } from './BadListPage';

export const BadApp = () => {
  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="bg-status-bad/10 p-4 border-b border-status-bad/20">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-status-bad shadow-[0_0_8px_var(--color-status-bad)] animate-pulse" />
          <h1 className="text-sm font-bold text-status-bad uppercase tracking-widest">Version A: Monolithic State</h1>
        </div>
        <p className="text-xs text-status-bad/70 mt-1 ml-5">
           Single Context • Prop Drilling • Unoptimized Renders
        </p>
      </div>
      
      <BadStateProvider>
        <BadListPage />
      </BadStateProvider>
    </div>
  );
};
