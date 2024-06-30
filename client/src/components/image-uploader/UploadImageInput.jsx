import React from "react";
import ImageModalForm from "./ImageModalForm";
import { useImagesManagement } from "./hooks/useImagesManagement";

export const UploadImageInput = ({ closeForm }) => {
  const { addImage } = useImagesManagement();

  return <ImageModalForm closePopup={() => closeForm()} addImage={addImage} />;
};
