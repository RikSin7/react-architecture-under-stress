import { memo, useState } from 'react';
import { Virtuoso, type ListRange } from 'react-virtuoso';
import { useItems } from '../good/state/useItems';
import { useSearch } from '../good/state/useSearch';
import { useFilters } from '../good/state/useFilters';
import { useSelection } from '../good/state/useSelection';
import { useFilteredItems } from '../good/selectors/useFilteredItems';
import { useStats } from '../good/selectors/useStats';

import { Toolbar } from '../shared/components/Toolbar';
import { StatsPanel } from '../shared/components/StatsPanel';
import { ItemRow } from '../shared/components/ItemRow';
import { RenderCounter } from '../shared/components/RenderCounter';
import { TrackRender } from '../shared/components/RenderPerfMonitor';

const MemoizedItemRow = memo(ItemRow);

export const BestListPage = () => {
  const { items } = useItems();
  const { search, setSearch } = useSearch();
  const { filters, updateFilter } = useFilters();
  const { selectedIds, toggleSelection } = useSelection();

  const filteredItems = useFilteredItems(items, search, filters);
  const stats = useStats(items, filteredItems, selectedIds.size);
  
  const [visibleCount, setVisibleCount] = useState(0);

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
          domCount={visibleCount} 
          selectedCount={stats.selected} 
          averagePrice={stats.avgPrice} 
        />
      </div>

      <div className="flex-1 overflow-hidden bg-surface relative h-full pt-14">
        <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-80">
           <div className="bg-status-best/10 border border-status-best/20 text-status-best px-2 py-1 rounded-md text-[10px] font-mono backdrop-blur-md">
              Virtualized List <RenderCounter />
           </div>
        </div>
        
        {filteredItems.length === 0 ? (
            <div className="p-20 text-center">
              <div className="text-text-dim mb-2 text-4xl opacity-20">∅</div>
              <div className="text-text-muted">No items found</div>
            </div>
        ) : (
          <TrackRender id="best-list-virtual">
            <Virtuoso
              style={{ height: '100%' }}
              data={filteredItems}
              overscan={200}
              rangeChanged={(range: ListRange) => {
                 setVisibleCount(range.endIndex - range.startIndex);
              }}
              itemContent={(_index, item) => (
                <div className="border-b border-white/5">
                    <MemoizedItemRow 
                      item={item} 
                      isSelected={selectedIds.has(item.id)} 
                      onToggle={toggleSelection}
                    />
                </div>
              )}
            />
          </TrackRender>
        )}
      </div>
    </div>
  );
};
