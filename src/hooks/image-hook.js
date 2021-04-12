import useHttpClient from "./http-hook";

export default function useImageService() {
  const { makeRequest } = useHttpClient();
  const uploadImage = (file, uploadProgress) => {
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
