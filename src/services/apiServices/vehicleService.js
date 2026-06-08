import { getErrorMessage } from "../../utils/contents";
import apiInstance from "../apiInstance";
import { API_URLs } from "../apiUrls";

export const fetchVehicles = async () => {
  try {
    const response = await apiInstance.get(API_URLs.getVehicleList);
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const createVehicles = async (reqBody) => {
  try {
    const response = await apiInstance.post(API_URLs.createVehicle, reqBody);

    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const updateVehicles = async (reqBody, id) => {
  try {
    const response = await apiInstance.put(
      `${API_URLs.updateVehicle}/${id}`,
      reqBody,
    );
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
export const deleteVehicles = async (id) => {
  try {
    const response = await apiInstance.delete(
      `${API_URLs.updateVehicle}/${id}`,
    );
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
