import { getErrorMessage } from "../../utils/contents";
import apiInstance from "../apiInstance";
import { API_URLs } from "../apiUrls";

export const fetchEstimates = async () => {
  try {
    const response = await apiInstance.get(API_URLs.estimateList);
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const createEstimates = async (reqBody) => {
  try {
    const response = await apiInstance.post(API_URLs.createEstimate, reqBody);

    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const updateEstimate = async (reqBody, id) => {
  try {
    const response = await apiInstance.put(
      `${API_URLs.createEstimate}/${id}`,
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
export const deleteEstimates = async (id) => {
  try {
    const response = await apiInstance.delete(
      `${API_URLs.createEstimate}/${id}`,
    );
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const approvedEstimates = async (id, reqBody) => {
  try {
    const response = await apiInstance.post(
      `${API_URLs.approvedEstimate}/${id}`,
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
