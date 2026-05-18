import AxiosConfig from "../../../core/services/apiAxios";

const RESOURCE = '/api/Auth';

const login = async (username, password) => {

  const payload = {
    username: username,
    password: password,
    name: "-",
    surname: "-",
    email: "test@test.com"
  };

  const response = await AxiosConfig.post(`${RESOURCE}/login`, payload);
  return response.data;
};

const register = async (userData) => {
  const response = await AxiosConfig.post(`${RESOURCE}/register`, userData);
  return response.data;
};

const registerByAdmin = async (userData) => {
  const response = await AxiosConfig.post(`${RESOURCE}/register-admin`, userData);
  return response.data;
};

export const authService = {
  login,
  register,
  registerByAdmin
};
