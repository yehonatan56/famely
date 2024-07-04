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
          metadata: {
            name: values.name,
            description: values.description,
            width: 100,
            height: 100,
            top: 50,
            left: 50,
          }
        });

      }}
    />
  );
};
