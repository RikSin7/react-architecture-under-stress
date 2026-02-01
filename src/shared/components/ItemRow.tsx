import type { Item } from '../../data/types';
import { RenderCounter } from './RenderCounter';

interface ItemRowProps {
  item: Item;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const ItemRow = ({ item, isSelected, onToggle }: ItemRowProps) => {
  return (
    <div 
      onClick={() => onToggle(item.id)}
      className={`group flex items-center p-4 border-b border-white/5 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'bg-brand-primary/5 hover:bg-brand-primary/10' 
          : 'bg-transparent hover:bg-white/2'
      }`}
    >
      {/* Selection Dot */}
      <div className={`mr-4 h-5 w-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
        isSelected 
          ? 'bg-brand-primary border-brand-primary shadow-[0_0_10px_var(--color-brand-glow)] scale-110' 
          : 'border-white/10 bg-transparent group-hover:border-white/20'
      }`}>
        {isSelected && <div className="h-2 w-2 rounded-full bg-white shadow-sm" />}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
           <span className={`text-sm font-medium truncate transition-colors ${
              isSelected ? 'text-brand-primary' : 'text-text-main group-hover:text-white'
           }`}>
              {item.name}
           </span>
           <span className={`text-[10px] px-1.5 py-px rounded-full font-mono uppercase tracking-wide border ${
              item.status === 'active' ? 'bg-status-good/5 text-status-good border-status-good/10' : 
              item.status === 'inactive' ? 'bg-surface-muted text-text-dim border-white/5' : 'bg-status-bad/5 text-status-bad border-status-bad/10'
           }`}>
              {item.status}
           </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-text-muted">
           <span className="truncate max-w-[280px] text-text-dim group-hover:text-text-muted transition-colors">
              {item.description}
           </span>
           <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
           <span className="text-text-dim opacity-70">{item.category}</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="pl-4 flex items-center gap-4">
        <span className="font-mono text-sm text-text-dim group-hover:text-text-main transition-colors">
          ${item.price.toFixed(2)}
        </span>
        
        <div className="w-8 flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <RenderCounter />
        </div>
      </div>
    </div>
  );
};
