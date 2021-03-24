import { useState, useCallback } from "react";
import axios from "axios";

const baseURL = "http://localhost:4000";

export default function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();

  const makeRequest = useCallback(async (content) => {
    const { url, method, params, data } = content;
    setIsLoading(true);
    const options = {
      url: `${baseURL}${url}`,
      method: method,
    };

    if (params) options.params = params;
    if (data) options.data = data;
    try {
      const response = await axios(options);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setErrors(err.message);
      setIsLoading(false);
      throw err;
    }
  });

  const clearErrors = () => {
    setErrors(null);
  };

  return { isLoading, errors, makeRequest, clearErrors };
}
