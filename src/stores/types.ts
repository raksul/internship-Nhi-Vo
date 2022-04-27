export type Brand = {
  id: number;
  name: string;
};

export type Model = {
  id: number;
  brand: Brand;
  name: string;
  year: number;
  display: number;
};

export type Option = {
  id: number;
  name: string;
};

export type Inventory = {
  id: number;
  model: Model;
  os_version: Option;
  memory_size: number;
  color: Option;
  condition: string;
  price: number;
  is_sold: boolean;
  warranty_expiry: string;
  images: Array<string>;
};
