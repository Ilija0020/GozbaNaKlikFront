import AxiosConfig from "../../../core/services/apiAxios";

const RESTAURANTS_RESOURCE = "/api/restaurants";
const ALLERGENS_RESOURCE = "/api/meals/allergens";

const getMealsByRestaurant = async (restaurantId) => {
  const response = await AxiosConfig.get(
    `${RESTAURANTS_RESOURCE}/${restaurantId}/meals`,
  );
  return response.data;
};

const getAllergens = async () => {
  const response = await AxiosConfig.get(ALLERGENS_RESOURCE);
  return response.data;
};

const createMeal = async (restaurantId, mealData) => {
  const response = await AxiosConfig.post(
    `${RESTAURANTS_RESOURCE}/${restaurantId}/meals`,
    mealData,
  );
  return response.data;
};

const updateMeal = async (restaurantId, mealId, mealData) => {
  const response = await AxiosConfig.put(
    `${RESTAURANTS_RESOURCE}/${restaurantId}/meals/${mealId}`,
    mealData,
  );

  return response.data;
};

const deleteMeal = async (restaurantId, mealId) => {
  const response = await AxiosConfig.delete(
    `${RESTAURANTS_RESOURCE}/${restaurantId}/meals/${mealId}`,
  );

  return response.data;
};

const uploadMealPhoto = async (restaurantId, mealId, file) => {
  const formData = new FormData();
  formData.append("photo", file);

  const response = await AxiosConfig.post(
    `${RESTAURANTS_RESOURCE}/${restaurantId}/meals/${mealId}/upload-photo`,
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
