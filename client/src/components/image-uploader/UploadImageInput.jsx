import React, { useState } from "react";
import { uploadImageFile } from "../../logic/images.logic";
import ImageModalForm from "./ImageModalForm";

export const UploadImageInput = () => {
  const [popup, setPopup] = useState(false);
  const [url, seturl] = useState()
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageFile(file);

    if (data) {
      setPopup(true);
      seturl(data)
    } else {
      console.error("failed to upload image data");
    }
  };

  return (
    <div>
      {popup ? <ImageModalForm closePopup={() => setPopup(false)} url={url}/> :''}
      <input type="file" onChange={handleFileUpload} accept="image/*" />
    </div>
  );
};
