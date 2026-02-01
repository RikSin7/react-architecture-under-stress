import { memo } from 'react';
import { useItems } from './state/useItems';
import { useSearch } from './state/useSearch';
import { useFilters } from './state/useFilters';
import { useSelection } from './state/useSelection';
import { useFilteredItems } from './selectors/useFilteredItems';
import { useStats } from './selectors/useStats';

import { Toolbar } from '../shared/components/Toolbar';
import { StatsPanel } from '../shared/components/StatsPanel';
import { ItemRow } from '../shared/components/ItemRow';
import { RenderCounter } from '../shared/components/RenderCounter';
import { TrackRender } from '../shared/components/RenderPerfMonitor';

const MemoizedItemRow = memo(ItemRow);

export const GoodListPage = () => {
  const { items } = useItems();
  const { search, setSearch } = useSearch();
  const { filters, updateFilter } = useFilters();
  const { selectedIds, toggleSelection } = useSelection();

  const filteredItems = useFilteredItems(items, search, filters);
  const stats = useStats(items, filteredItems, selectedIds.size);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-surface z-10 shadow-lg shadow-black/20">
        <Toolbar 
          searchValue={search} 
          onSearchChange={setSearch} 
          filters={filters} 
          onFilterChange={updateFilter} 
        />
        <StatsPanel 
          totalCount={stats.total} 
          filteredCount={stats.filtered}
          domCount={stats.filtered} // All filtered items are in DOM
          selectedCount={stats.selected} 
          averagePrice={stats.avgPrice} 
        />
      </div>

      <div className="flex-1 overflow-auto bg-surface relative scroll-smooth pt-14">
        <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-80">
           <div className="bg-status-good/10 border border-status-good/20 text-status-good px-2 py-1 rounded-md text-[10px] font-mono backdrop-blur-md">
              Whole List <RenderCounter />
           </div>
        </div>
        
        <div className="divide-y divide-white/5">
          <TrackRender id="good-list">
            {filteredItems.map(item => (
              <MemoizedItemRow 
                key={item.id} 
                item={item} 
                isSelected={selectedIds.has(item.id)} 
                onToggle={toggleSelection}
              />
            ))}
          </TrackRender>
        </div>

        {filteredItems.length === 0 && (
          <div className="p-20 text-center">
             <div className="text-text-dim mb-2 text-4xl opacity-20">∅</div>
             <div className="text-text-muted">No items found</div>
          </div>
        )}
      </div>
    </div>
  );
};
