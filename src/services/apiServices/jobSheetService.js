import { getErrorMessage } from "../../utils/contents";
import apiInstance from "../apiInstance";
import { API_URLs } from "../apiUrls";

export const fetchJobSheets = async () => {
  try {
    const response = await apiInstance.get(API_URLs.getJobSheets);
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
