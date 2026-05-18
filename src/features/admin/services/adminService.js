import AxiosConfig from "../../../core/services/apiAxios";

const RESOURCE = '/api/User';

const getAllUsers = async () => {
  try {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const adminService = {
  getAllUsers
};

