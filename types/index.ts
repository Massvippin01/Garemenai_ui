export interface SizeMeasurement {
  chest?: number;
  waist?: number;
  hips?: number;
  inseam?: number;
  length?: number;
  shoulder?: number;
  outseam?: number;
  thigh?: number;
  rise?: number;
  legOpening?: number;
  [key: string]: any;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  description: string;
  colors: string[];
  sizes: string[];
  sizeMeasurements?: Record<string, SizeMeasurement>;
  images: string[];
  category: string;
  recommendationScore?: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  verified: boolean;
  date: string;
  text: string;
}
