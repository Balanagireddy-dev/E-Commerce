export interface CartLine {
  productId: string;
  qty: number;
}

export interface CartItemView extends CartLine {
  name: string;
  slug: string;
  unit: string;
  image: string;
  priceInPaise: number;
  stock: number;
  lineTotalInPaise: number;
}
