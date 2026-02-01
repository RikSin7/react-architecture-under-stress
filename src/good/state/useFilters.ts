import { useState } from 'react';
import type { ItemFilter } from '../../data/types';

export const useFilters = () => {
  const [filters, setFilters] = useState<ItemFilter>({
    category: '',
    status: ''
  });

  const updateFilter = (key: keyof ItemFilter, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return { filters, updateFilter };
};
