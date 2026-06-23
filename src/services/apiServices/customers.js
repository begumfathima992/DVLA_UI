import { getErrorMessage } from "../../utils/contents";
import apiInstance from "../apiInstance";
import { API_URLs } from "../apiUrls";

export const fetchCustomers = async (search = "") => {
  try {
    const response = await apiInstance.get(
      `${API_URLs.getCustomerList}/?search=${search}`,
    );
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const createCustomers = async (reqBody) => {
  try {
    const response = await apiInstance.post(API_URLs.createCustomer, reqBody);

    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const updateCustomers = async (reqBody, id) => {
  try {
    const response = await apiInstance.put(
      `${API_URLs.updateCustomer}/${id}`,
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
export const deleteCustomers = async (id) => {
  try {
    const response = await apiInstance.delete(
      `${API_URLs.updateCustomer}/${id}`,
    );
    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
