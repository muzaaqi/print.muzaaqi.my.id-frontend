import AxiosInstance from "../lib/AxiosInstance";

export const getAllServices = async () => {
  const response = await AxiosInstance.get("/service");
  return response.data;
};
