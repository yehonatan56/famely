import React, { useState } from "react";
import { UploadImageInput } from "./UploadImageInput";
import { UserImages } from "./UserImages";
import "react-responsive-pagination/themes/classic.css";
import "./ImageUploader.css";
import CheckUser from "../auth/AuthenticatedPage";
import Navbar from "../navbar/navbar";

const ImageUploaderLayout = () => {
  const [popup, setPopup] = useState(false);

  return (
    <div className="image-uploader-container">
      <Navbar />

      <h2>Image Uploader Page</h2>

      {popup ? (
        <UploadImageInput closeForm={() => setPopup(false)} />
      ) : (
        <>
          <button onClick={() => setPopup(true)}>add image</button>
          <UserImages />
        </>
      )}
    </div>
  );
};

export default ImageUploaderLayout;
