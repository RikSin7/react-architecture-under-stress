import { useState, useCallback } from 'react';

export const useSelection = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Use Set for O(1) lookup
  // Use useCallback to ensure the function reference itself doesnt change 
  // and cause unnecessary props changes to memoized children.
  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return { selectedIds, toggleSelection };
};
