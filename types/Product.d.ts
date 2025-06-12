export default interface Product {
  id: number;
  icon: string;
  color: string;
  gift: boolean;
  name: string;
  description: string;
  price: string; // Price in USD
  features: string[];
}
