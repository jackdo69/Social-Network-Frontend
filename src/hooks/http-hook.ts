import axios, { AxiosRequestConfig } from "axios";
import { HttPContent } from '../interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { toastActions } from '../store/toast';
import { useHistory } from "react-router-dom";


const BASE_URL = "http://localhost:4000";
const useHttpClient = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();
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
      dispatch(toastActions.setToast({
        severity: 'error',
        message: `${err.response.data.statusCode} - ${err.response.data.message}`
      }));
      if (err.response.data.statusCode === 401 || err.response.data.statusCode === 403) {
        history.push('/auth')
      }
    }
  };

  return { makeRequest };
};

export default useHttpClient;

