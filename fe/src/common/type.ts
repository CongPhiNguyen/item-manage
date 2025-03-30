export type Item = {
  id?: string;
  name: string;
  type: string;
  category: string;
  price: number;
  description?: string;
  imageUrl?: string;
  stock: number;
  dateAdded?: string;
}