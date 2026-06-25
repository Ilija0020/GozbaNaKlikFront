import { get } from "react-hook-form";
import AxiosConfig from "../../../core/services/apiAxios";

const RESOURCE = "/api/Users";

const getAllUsers = async () => {
  try {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getOwners = async () => {
  const response = await AxiosConfig.get(`${RESOURCE}/owners`);
  return response.data;
};

export const adminService = {
  getAllUsers,
  getOwners,
};
