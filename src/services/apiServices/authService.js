// import { getErrorMessage } from "../../utils/content";
import { getErrorMessage } from "../../utils/contents";
import apiInstance from "../apiInstance";
import { API_URLs } from "../apiUrls";

export const loginAPI = async (reqBody) => {
  try {
    const response = await apiInstance.post(API_URLs.login, reqBody);

    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
