import { type Item } from './types';
import { ITEMS_COUNT } from '../app/constants';

const CATEGORIES = ['Electronics', 'Furniture', 'Clothing', 'Office', 'Books'];
const STATUSES = ['active', 'inactive', 'archived'] as const;
const FIRST_NAMES = ['Tech', 'Ergo', 'Super', 'Hyper', 'Pro', 'Ultra', 'Smart', 'Eco', 'Retro', 'Modern'];
const LAST_NAMES = ['Chair', 'Desk', 'Laptop', 'Phone', 'Monitor', 'Lamp', 'Shelf', 'Mug', 'Pen', 'Note'];

export const generateItems = (count: number = ITEMS_COUNT): Item[] => {
  const items: Item[] = [];
  
  for (let i = 0; i < count; i++) {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const name = `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]} ${i}`;
    
    items.push({
      id: `item-${i}`,
      name,
      category,
      price: Math.floor(Math.random() * 1000) + 10,
      status,
      description: `A generic ${category.toLowerCase()} item for testing performance. Includes random hash ${Math.random().toString(36).substring(7)}.`
    });
  }
  
  return items;
};
