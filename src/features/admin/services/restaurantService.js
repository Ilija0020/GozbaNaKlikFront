import AxiosConfig from "../../../core/services/apiAxios";

const RESOURCE = "/api/Restaurant";

const getAllRestaurants = async () => {
  const response = await AxiosConfig.get(RESOURCE);
  return response.data;
};

const createRestaurant = async (restaurantData) => {
  const response = await AxiosConfig.post(RESOURCE, restaurantData);
  return response.data;
};

const updateRestaurant = async (id, restaurantData) => {
  const response = await AxiosConfig.put(`${RESOURCE}/${id}`, restaurantData);
  return response.data;
};

const deleteRestaurant = async (id) => {
  const response = await AxiosConfig.delete(`${RESOURCE}/${id}`);
  return response.data;
};

export const restaurantService = {
  getAllRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};