import React from "react";
import { uploadImageFile } from "../../logic/images.logic";

export const UploadImageInput = () => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageFile(file);

    if (data) {
      alert(data);
    } else {
      console.error("failed to upload image data");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept="image/*" />
    </div>
  );
};
