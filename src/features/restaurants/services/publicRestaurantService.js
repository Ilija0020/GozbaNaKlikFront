import AxiosConfig from "../../../core/services/apiAxios";

const RESOURCE = "/api/Restaurants";

const getRestaurants = async (
  name = "",
  address = "",
  sortType = 0,
  page = 1,
) => {
  const response = await AxiosConfig.get(`${RESOURCE}/paging`, {
    params: {
      name,
      address,
      sortType,
      page,
    },
  });

  return response.data;
};

const getRestaurantById = async (id) => {
  const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
  return response.data;
};

const getRestaurantMeals = async (restaurantId) => {
  const response = await AxiosConfig.get(`${RESOURCE}/${restaurantId}/meals`);

  return response.data;
};

export const publicRestaurantService = {
  getRestaurants,
  getRestaurantById,
  getRestaurantMeals,
};
