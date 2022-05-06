import httpClient from "../common/httpClient";

export const getInventories = async () => {
  return await httpClient.get(`inventories`);
};

export const getInventoryById = async (id: string) => {
  return await httpClient.get(`inventories/${id}`);
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

export const getBrands = async () => {
  return await httpClient.get(`brands`);
};

export const getBrandById = async (id: string) => {
  return await httpClient.get(`brands/${id}`);
};

export const getColors = () => {
  return httpClient.get(`colors`);
};
