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

export const updatePriorityStatusJobSheets = async (id, reqBody) => {
  try {
    const response = await apiInstance.post(
      `${API_URLs.updatePriorityJobSheets}/${id}`,
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
export const updateStatusJobSheets = async (id, reqBody) => {
  try {
    const response = await apiInstance.post(
      `${API_URLs.updateStatusJobSheets}/${id}`,
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

export const updateJobSheets = async (reqBody, id) => {
  try {
    const response = await apiInstance.put(
      `${API_URLs.updateJobSheets}/${id}`,
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
