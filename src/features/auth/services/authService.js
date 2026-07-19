import AxiosConfig from "../../../core/services/apiAxios";

const RESOURCE = "/api/Auth";

const login = async (data) => {
  const response = await AxiosConfig.post(`${RESOURCE}/login`, data);
  return response.data;
};

const register = async (userData) => {
  const response = await AxiosConfig.post(`${RESOURCE}/register`, userData);
  return response.data;
};

const registerByAdmin = async (userData) => {
  const response = await AxiosConfig.post("/api/Users", userData);
  return response.data;
};

export const authService = {
  login,
  register,
  registerByAdmin,
};
