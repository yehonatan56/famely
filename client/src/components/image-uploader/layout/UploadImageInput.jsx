import React from "react";
import ImageModalForm from "../modal/ImageModalForm.jsx";
import { useImagesManagement } from "../hooks/useImagesManagement.js";
import { uploadImageFile } from "../../../logic/images.logic.jsx";

export const UploadImageInput = ({ closeForm }) => {
  const { addImage } = useImagesManagement();

  return (
    <ImageModalForm
      addImage={addImage}
      onSubmit={async (values) => {
        closeForm();
        const url = await uploadImageFile(values);
        addImage({
          members: values.members,
          url: url,
        });
      }}
    />
  );
};
