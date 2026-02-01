import type { Item, ItemFilter } from '../../data/types';

export const filterItems = (items: Item[], search: string, filters: ItemFilter): Item[] => {
  return items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                         item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filters.category === '' || item.category === filters.category;
    const matchesStatus = filters.status === '' || item.status === filters.status;

    return matchesSearch && matchesCategory && matchesStatus;
  });
};
