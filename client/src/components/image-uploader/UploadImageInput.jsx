import React from "react";
import ImageModalForm from "./ImageModalForm";
import { useImagesManagement } from "./hooks/useImagesManagement";
import { uploadImageFile } from "../../logic/images.logic";

export const UploadImageInput = ({ closeForm }) => {
  const { addImage } = useImagesManagement();


  return (
    <ImageModalForm
      addImage={addImage}
      onSubmit={async(values) => {
        closeForm();
        const url = await uploadImageFile(values);
        addImage({
          url: url,
          members: values.members,

          });

      }}
    />
  );
};
