import AxiosConfig from "../../../core/services/apiAxios";


const RESOURCE = "api/Restaurants/owners/"

const getRestaurantsByOwner = async (ownerId) => {
    const response = await AxiosConfig.get(RESOURCE + ownerId);
    return response.data;
};

const updateRestaurantByOwner = async (id, ownerId, restaurantData) => {
    const response = await AxiosConfig.put(RESOURCE + ownerId + "/restaurants/" + id, restaurantData);
    return response.data;
};

const uploadRestaurantPhoto = async (id, ownerId, file) => {
    const formData = new FormData();
    formData.append("photo", file);
    const response = await AxiosConfig.post(`${RESOURCE}${ownerId}/restaurants/${id}/upload-photo`, formData);
    return response.data;
}

const updateRestaurantWorkingHours = async (id, ownerId, workingHoursData) => {
    const response = await AxiosConfig.put(`${RESOURCE}${ownerId}/restaurants/${id}/working-hours`, workingHoursData);
    return response.data;
}

const updateRestaurantNonWorkingDays = async (id, ownerId, nonWorkingDaysData) => {
    const response = await AxiosConfig.put(`${RESOURCE}${ownerId}/restaurants/${id}/non-working-days`, nonWorkingDaysData);
    return response.data;
}

export const ownerRestaurantService = {
    getRestaurantsByOwner,
    updateRestaurantByOwner,
    uploadRestaurantPhoto,
    updateRestaurantWorkingHours,
    updateRestaurantNonWorkingDays
}


