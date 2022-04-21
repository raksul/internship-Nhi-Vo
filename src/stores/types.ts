export type Brand = {
  id: number;
  name: string;
};

export type Model = {
  id: number;
  brand: number;
  name: string;
  year: number;
  display: number;
};

export type OS = {
  id: number;
  name: string;
};

export type Inventory = {
  id: number;
  model: Model;
  os_version: string;
  memory_size: number;
  color: string;
  condition: string;
  price: number;
  is_sold: boolean;
  warranty_expiry: string;
  images: Array<string>;
};
