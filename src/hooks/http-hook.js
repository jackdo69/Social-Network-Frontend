import { useState, useCallback } from "react";
import axios from "axios";

const baseURL = "http://localhost:4000";

export default function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();

  const makeRequest = useCallback(async (content) => {
    const { url, method, params, data, headers, onUploadProgress } = content;
    setIsLoading(true);
    const options = {
      url: `${baseURL}${url}`,
      method: method,
    };

    if (data) options.data = data;
    if (params) options.params = params;
    if (headers) options.headers = headers;
    if (onUploadProgress) options.onUploadProgress = onUploadProgress;
    try {
      const response = await axios(options);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setErrors(err.message);
      setIsLoading(false);
      throw err;
    }
  },[]);

  const clearErrors = () => {
    setErrors(null);
  };

  return { isLoading, errors, makeRequest, clearErrors };
}
