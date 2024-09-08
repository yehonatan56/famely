import React, { useState } from "react";
import { UploadImageInput } from "./UploadImageInput.jsx";
import { UserImages } from "./UserImages.jsx";
import "react-responsive-pagination/themes/classic.css";
import "../css/ImageUploader.css";
import Navbar from "../../navbar/navbar.jsx";
import SaveBtn from "../../generalComponents/saveBtn.jsx";
import MenuComp from "../menu/index.jsx";
const ImageUploaderLayout = () => {
  const [popup, setPopup] = useState(false);

  return (
    <div className="image-uploader-container">
      <Navbar />

      {popup ? (
        <UploadImageInput closeForm={() => setPopup(false)} />
      ) : (
        <>
          <MenuComp open={() => setPopup(true)} />
          <UserImages />
          <SaveBtn />
        </>
      )}
    </div>
  );
};

export default ImageUploaderLayout;
