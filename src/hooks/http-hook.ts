import axios, { AxiosRequestConfig } from "axios";
import { HttPContent } from '../interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { toastActions } from '../store/toast';
import useAuth from './auth-hook';
import { BASE_URL } from '../constant';


const useHttpClient = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();
  const { renewToken } = useAuth();
  const makeRequest = async (content: HttPContent) => {
    const { url, method, params, data, onUploadProgress, toastMessage } = content;
    const options: AxiosRequestConfig = {
      url: `${BASE_URL}${url}`,
      method: method,
    };

    if (data) options.data = data;
    if (params) options.params = params;
    if (token && token.length) options.headers = {
      'Authorization': `Bearer ${token}`
    };
    if (onUploadProgress) options.onUploadProgress = onUploadProgress;
    try {
      const response = await axios(options);
      toastMessage && dispatch(toastActions.setToast({
        severity: 'success',
        message: `${toastMessage}`
      }));
      return response.data;
    } catch (err) {
      if (err.response.data.statusCode === 401 || err.response.data.statusCode === 403) {
        renewToken();
      } else {
        dispatch(toastActions.setToast({
          severity: 'error',
          message: `${err.response.data.statusCode} - ${err.response.data.message}`
        }));
      }
    }
  };

  return { makeRequest };
};

export default useHttpClient;

