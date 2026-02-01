import { useState, useEffect } from 'react';
import type { Item } from '../../data/types';
import { generateItems } from '../../data/generateItems';
import { ITEMS_COUNT } from '../../app/constants';

// In a real app, this might be React Query or similar.
// For this demo, we just need to confirm that "Items" state is separate from "UI" state.
// We use a simple singleton pattern or module-level state for simplicity if we wanted global,
// but let's stick to a clean hook that doesn't re-run for no reason.

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simmons network delay? No, let's keep it instant but separate.
    const data = generateItems(ITEMS_COUNT); // Same large dataset
    setItems(data);
    setLoading(false);
  }, []);

  return { items, loading };
};
