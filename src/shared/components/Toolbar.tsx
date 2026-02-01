import { RenderCounter } from './RenderCounter';
import type { ItemFilter } from '../../data/types';

interface ToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters: ItemFilter;
  onFilterChange: (key: keyof ItemFilter, value: string) => void;
}

export const Toolbar = ({ searchValue, onSearchChange, filters, onFilterChange }: ToolbarProps) => {
  return (
    <div className="h-14 px-4 border-b border-border bg-surface-subtle/80 backdrop-blur-xl flex items-center justify-between gap-4 sticky top-0 z-10 transition-all duration-300">
      
      {/* 1. Search Area (Grow) */}
      <div className="flex-1 max-w-md relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-dim group-focus-within:text-brand-primary transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search items..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-14 sm:pr-16 py-1.5 rounded-lg bg-surface-elevated border border-white/5 focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all text-sm text-text-main placeholder-text-dim/50"
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
            <div className="text-[9px] text-text-muted font-mono bg-surface-muted/50 px-1.5 rounded border border-white/5 opacity-50 flex items-center gap-1">
                IN <RenderCounter />
            </div>
        </div>
      </div>

      {/* 2. Filters Area (Fixed) */}
      <div className="flex items-center gap-2">
        <select 
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="h-8 px-2 rounded-lg border border-white/5 bg-surface-elevated text-xs text-text-main focus:ring-1 focus:ring-brand-primary outline-none cursor-pointer hover:bg-surface-muted transition-colors appearance-none min-w-[110px]"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
          <option value="Office">Office</option>
          <option value="Books">Books</option>
        </select>

        <select 
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="h-8 px-2 rounded-lg border border-white/5 bg-surface-elevated text-xs text-text-main focus:ring-1 focus:ring-brand-primary outline-none cursor-pointer hover:bg-surface-muted transition-colors appearance-none min-w-[90px]"
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="archived">Archived</option>
        </select>

        <div className="ml-1 text-[9px] text-text-muted font-mono bg-surface-muted/50 px-1.5 py-1 rounded border border-white/5 opacity-50 flex items-center gap-1">
            FLT <RenderCounter />
        </div>
      </div>
    </div>
  );
};
