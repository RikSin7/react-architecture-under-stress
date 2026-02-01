import { useMemo } from 'react';
import type { Item, ItemFilter } from '../../data/types';
import { filterItems } from '../../shared/utils/filters';

// This is the "Selector" - it computes derived data.
// It uses useMemo to ensure that we ONLY re-calculate the list
// when the input data (items, search, filters) changes.
// We DO NOT include "selectedIds" here. Selecting an item should NOT re-filter the list.
export const useFilteredItems = (
  items: Item[], 
  search: string, 
  filters: ItemFilter
) => {
  return useMemo(() => {
    return filterItems(items, search, filters);
  }, [items, search, filters]);
};
