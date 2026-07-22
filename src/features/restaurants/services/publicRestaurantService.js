import AxiosConfig from "../../../core/services/apiAxios";

const RESOURCE = "/api/Restaurants/paging";

const getRestaurants = async (
  name = "",
  address = "",
  sortType = 0,
  page = 1,
) => {
  const response = await AxiosConfig.get(RESOURCE, {
    params: {
      name,
      address,
      sortType,
      page,
    },
  });

  return response.data;
};

export const publicRestaurantService = {
  getRestaurants,
};
