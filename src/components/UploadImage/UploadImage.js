import React from "react";
import useHttpClient from "../../hooks/http-hook";

export default function UploadImage() {
  const { isLoading, errors, makeRequest, clearErrors } = useHttpClient();
  const upload = (file, uploadProgress) => {
    let formData = new FormData();
    formData.append("file", file);
    return makeRequest({
      data: formData,
      onUploadProgress: uploadProgress,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  return <div></div>;
}
