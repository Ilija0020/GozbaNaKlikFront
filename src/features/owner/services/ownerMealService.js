import AxiosConfig from "../../../core/services/apiAxios";

const RESOURCE = "/api/Meals";

const getMealsByRestaurant = async (ownerId, restaurantId) => {
  const response = await AxiosConfig.get(
    `${RESOURCE}/owners/${ownerId}/restaurants/${restaurantId}/meals`,
  );
  return response.data;
};

const getAllergens = async () => {
  const response = await AxiosConfig.get(`${RESOURCE}/allergens`);
  return response.data;
};

const createMeal = async (ownerId, restaurantId, mealData) => {
  const response = await AxiosConfig.post(
    `${RESOURCE}/owners/${ownerId}/restaurants/${restaurantId}/meals`,
    mealData,
  );
  return response.data;
};

const updateMeal = async (ownerId, restaurantId, mealId, mealData) => {
  const response = await AxiosConfig.put(
    `${RESOURCE}/owners/${ownerId}/restaurants/${restaurantId}/meals/${mealId}`,
    mealData,
  );
  return response.data;
};

const deleteMeal = async (ownerId, restaurantId, mealId) => {
  const response = await AxiosConfig.delete(
    `${RESOURCE}/owners/${ownerId}/restaurants/${restaurantId}/meals/${mealId}`,
  );
  return response.data;
};

const uploadMealPhoto = async (ownerId, restaurantId, mealId, file) => {
  const formData = new FormData();
  formData.append("photo", file);

  const response = await AxiosConfig.post(
    `${RESOURCE}/owners/${ownerId}/restaurants/${restaurantId}/meals/${mealId}/upload-photo`,
    formData,
  );

  return response.data;
};

export const ownerMealService = {
  getMealsByRestaurant,
  getAllergens,
  createMeal,
  updateMeal,
  deleteMeal,
  uploadMealPhoto,
};
