import React, { useState } from "react";
import ImageModalForm from "./ImageModalForm";
import { useImagesManagement } from "./hooks/useImagesManagement";

export const UploadImageInput = () => {
  const [popup, setPopup] = useState(false);
  const { addImage } = useImagesManagement();

  return (
    <div>
      {!popup && <button onClick={() => setPopup(true)}> add image</button>}
      {popup && (
        <ImageModalForm
          closePopup={() => setPopup(false)}
          addImage={addImage}
        />
      )}
    </div>
  );
};
