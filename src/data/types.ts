export interface Item {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'active' | 'inactive' | 'archived';
  description: string;
}

export type ItemFilter = {
  category: string;
  status: string;
};
