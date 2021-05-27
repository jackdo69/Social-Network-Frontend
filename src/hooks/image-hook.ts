import useHttpClient from "./http-hook";
import { UploadProgress } from '../interfaces';


export default function useImageService() {
  const { makeRequest } = useHttpClient();
  const uploadImage = (file: File, uploadProgress: UploadProgress) => {
    let formData = new FormData();
    formData.append("file", file);
    return makeRequest({
      method: 'post',
      url: "/file/upload",
      data: formData,
      onUploadProgress: uploadProgress,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  return { uploadImage };
}
