import { getErrorMessage } from "../../utils/contents";
import apiInstance from "../apiInstance";
import { API_URLs } from "../apiUrls";

export const fetchSetting = async (search = "") => {
  try {
    const response = await apiInstance.get(API_URLs.settings);
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const updateSetting = async (reqBody) => {
  try {
    const response = await apiInstance.post(API_URLs.settings, reqBody);
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
