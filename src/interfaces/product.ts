export interface Product {
  id?: number | string;
  name?: string;
  description?: string;
  price: string;
  sale: number
  short_description: string
  rating: number
  category: string;
  thumbnail: string;
}

export type FormData = Pick<Product, 'name' | 'description' | 'price' | 'category' | 'thumbnail'>

export interface Category {
  id?: number | string,
  name: string
}