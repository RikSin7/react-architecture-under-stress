import { useMemo } from 'react';
import type { Item } from '../../data/types';

export const useStats = (items: Item[], filteredItems: Item[], selectedCount: number) => {
  return useMemo(() => {
    const total = items.length;
    const filtered = filteredItems.length;
    const avgPrice = filteredItems.reduce((acc, item) => acc + item.price, 0) / (filtered || 1);
    
    return {
      total,
      filtered,
      selected: selectedCount,
      avgPrice
    };
  }, [items.length, filteredItems, selectedCount]);
};
