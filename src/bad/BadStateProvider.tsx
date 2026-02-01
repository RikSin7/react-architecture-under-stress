import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Item, ItemFilter } from '../data/types';
import { generateItems } from '../data/generateItems';
import { filterItems } from '../shared/utils/filters';
import { ITEMS_COUNT } from '../app/constants';

interface BadState {
  items: Item[];
  filteredItems: Item[];
  search: string;
  filters: ItemFilter;
  selectedIds: string[];
  stats: {
    total: number;
    filtered: number;
    selected: number;
    avgPrice: number;
  };
  setSearch: (s: string) => void;
  setFilters: (f: ItemFilter) => void;
  toggleSelection: (id: string) => void;
}

const BadContext = createContext<BadState | null>(null);

export const BadStateProvider = ({ children }: { children: ReactNode }) => {
  // ANTI-PATTERN: One giant state object (or multiple states that trigger generic re-renders)
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<ItemFilter>({ category: '', status: '' });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Initialize data
  useEffect(() => {
    setItems(generateItems(ITEMS_COUNT));
  }, []);

  // ANTI-PATTERN: Derived state in effect (causes chaining re-renders)
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [stats, setStats] = useState({ total: 0, filtered: 0, selected: 0, avgPrice: 0 });

  useEffect(() => {
    // Heavy calculation runs on every render if not careful, but here we put it in effect
    // which effectively delays it but still updates state causing another render
    const result = filterItems(items, search, filters);
    setFilteredItems(result);
  }, [items, search, filters]);

  useEffect(() => {
    // Another effect purely for stats!
    const total = items.length;
    const filtered = filteredItems.length;
    const selected = selectedIds.length;
    const avgPrice = filteredItems.reduce((acc, item) => acc + item.price, 0) / (filtered || 1);
    
    setStats({ total, filtered, selected, avgPrice });
  }, [items, filteredItems, selectedIds]);


  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const value = {
    items,
    filteredItems, // Passing this down means everyone consuming context re-renders when list changes
    search,
    filters,
    selectedIds, // Passing this down means search box re-renders when you select an item!
    stats,
    setSearch,
    setFilters,
    toggleSelection
  };

  return (
    <BadContext.Provider value={value}>
      {children}
    </BadContext.Provider>
  );
};

export const useBadState = () => {
  const context = useContext(BadContext);
  if (!context) throw new Error("useBadState must be used within BadStateProvider");
  return context;
};
