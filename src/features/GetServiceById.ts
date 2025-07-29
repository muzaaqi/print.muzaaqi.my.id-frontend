import AxiosInstance from "../lib/AxiosInstance";

export const getServiceById = async (id: string) => {
  const response = await AxiosInstance.get(`/service/${id}`);
  return response.data;
};
