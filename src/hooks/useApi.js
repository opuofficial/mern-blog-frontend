import { useState } from "react";
import api from "../api";

const useApi = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = async (method, url, requestData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.request({
        method,
        url,
        data: requestData,
      });

      setData(response);
      setIsLoading(false);
      return response;
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, sendRequest };
};

export default useApi;
