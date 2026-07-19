import AxiosConfig from "../../../core/services/apiAxios";

const RESOURCE = "/api/owner/restaurants";

const getRestaurantsByOwner = async () => {
  const response = await AxiosConfig.get(RESOURCE);
  return response.data;
};

const updateRestaurantByOwner = async (id, restaurantData) => {
  const response = await AxiosConfig.put(`${RESOURCE}/${id}`, restaurantData);
  return response.data;
};

const uploadRestaurantPhoto = async (id, file) => {
  const formData = new FormData();
  formData.append("photo", file);
  const response = await AxiosConfig.post(
    `${RESOURCE}/${id}/upload-photo`,
    formData,
  );
  return response.data;
};

const updateRestaurantWorkingHours = async (id, workingHoursData) => {
  const response = await AxiosConfig.put(
    `${RESOURCE}/${id}/working-hours`,
    workingHoursData,
  );
  return response.data;
};

const updateRestaurantNonWorkingDays = async (id, nonWorkingDaysData) => {
  const response = await AxiosConfig.put(
    `${RESOURCE}/${id}/non-working-days`,
    nonWorkingDaysData,
  );
  return response.data;
};

export const ownerRestaurantService = {
  getRestaurantsByOwner,
  updateRestaurantByOwner,
  uploadRestaurantPhoto,
  updateRestaurantWorkingHours,
  updateRestaurantNonWorkingDays,
};
