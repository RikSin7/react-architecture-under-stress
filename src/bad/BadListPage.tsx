import { useBadState } from './BadStateProvider';
import { Toolbar } from '../shared/components/Toolbar';
import { StatsPanel } from '../shared/components/StatsPanel';
import { ItemRow } from '../shared/components/ItemRow';
import { RenderCounter } from '../shared/components/RenderCounter';
import { TrackRender } from '../shared/components/RenderPerfMonitor';

export const BadListPage = () => {
  const { 
    search, setSearch, 
    filters, setFilters, 
    filteredItems, 
    selectedIds, toggleSelection,
    stats
  } = useBadState();

  return (
    <div className="flex flex-col h-full">
      <div className="bg-surface z-10 shadow-lg shadow-black/20">
        <Toolbar 
          searchValue={search} 
          onSearchChange={setSearch} 
          filters={filters} 
          onFilterChange={(k, v) => setFilters({ ...filters, [k]: v })} 
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
           <div className="bg-status-bad/10 border border-status-bad/20 text-status-bad px-2 py-1 rounded-md text-[10px] font-mono backdrop-blur-md">
              Whole List <RenderCounter />
           </div>
        </div>
        
        <div className="divide-y divide-white/5">
          <TrackRender id="bad-list">
            {filteredItems.map(item => (
              <ItemRow 
                key={item.id} 
                item={item} 
                isSelected={selectedIds.includes(item.id)}
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
