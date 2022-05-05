import httpClient from "../common/httpClient";

export const getInventories = () => {
  return httpClient.get(`inventories`);
};

export const getInventoryById = (id: string) => {
  return httpClient.get(`inventories/${id}`);
};

export const saveInventory = (data: object) => {
  return httpClient.post(`inventories`, data);
};

export const updateInventory = (id: string, data: object) => {
  return httpClient.put(`inventories/${id}`, data);
};

export const deleteInventory = (id: string) => {
  return httpClient.delete(`inventories/${id}`);
};

export const updateStatus = (id: string) => {
  return httpClient.patch(`inventories/${id}`, { is_sold: true });
};

export const getBrands = () => {
  return httpClient.get(`brands`);
};

export const getBrandById = (id: string) => {
  return httpClient.get(`brands/${id}`);
};

export const getColors = () => {
  return httpClient.get(`colors`);
};
