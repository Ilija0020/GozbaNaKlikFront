import axios from 'axios';

const API_URL = 'http://localhost:5128/api/Auth';

const login = async (username, password) => {

  const payload = {
    username: username,
    password: password,
    name: "-",
    surname: "-",
    email: "test@test.com"
  };

  const response = await axios.post(`${API_URL}/login`, payload);
  return response.data;
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const authService = {
  login,
  register
};
