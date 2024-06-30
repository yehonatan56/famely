import React from "react";
import ImageModalForm from "./ImageModalForm";
import { useImagesManagement } from "./hooks/useImagesManagement";
import { uploadImageFile } from "../../logic/images.logic";

export const UploadImageInput = ({ closeForm }) => {
  const { addImage } = useImagesManagement();

  return (
    <ImageModalForm
      closePopup={() => closeForm()}
      addImage={addImage}
      onSubmit={(values) => uploadImageFile(values)}
    />
  );
};
