import { GoodListPage } from './GoodListPage';

export const GoodApp = () => {
  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="bg-status-good/10 p-4 border-b border-status-good/20">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-status-good shadow-[0_0_8px_var(--color-status-good)]" />
          <h1 className="text-sm font-bold text-status-good uppercase tracking-widest">Version B: Atomic State</h1>
        </div>
        <p className="text-xs text-status-good/70 mt-1 ml-5">
           Split Hooks • Memoized Selectors • Isolated Render Cycles
        </p>
      </div>
      
      <GoodListPage />
    </div>
  );
};