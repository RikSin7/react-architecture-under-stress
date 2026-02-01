import { useState } from 'react';

// Separate atom for search. 
// Changing this DOES NOT compel the Item list to re-render 
// UNLESS the Item List subscribes to the *result* of the search.
export const useSearch = () => {
  const [search, setSearch] = useState('');
  return { search, setSearch };
};
