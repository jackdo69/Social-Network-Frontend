import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";

const baseURL = "http://localhost:4000";

type HttPContent = {
  url?: string,
  method?: Method,
  params?: any,
  data?: object,
  headers?: object,
  onUploadProgress?: (progressEvent: any) => void;
};

export default function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const makeRequest = useCallback(async (content: HttPContent) => {
    const { url, method, params, data, headers, onUploadProgress } = content;
    setIsLoading(true);
    const options: AxiosRequestConfig = {
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
  }, []);

  const clearErrors = () => {
    setErrors(null);
  };

  return { isLoading, errors, makeRequest, clearErrors };
}
