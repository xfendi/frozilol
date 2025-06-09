export default interface Product {
  id: number;
  icon: string;
  color: string;
  gift: false;
  name: string;
  description: string;
  price: string; // Price in USD
  features: string[];
}
