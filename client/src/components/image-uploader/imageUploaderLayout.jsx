import React, { useState } from "react";
import { UploadImageInput } from "./UploadImageInput";
import { UserImages } from "./UserImages";
import "react-responsive-pagination/themes/classic.css";
import "./css/ImageUploader.css";
import Navbar from "../navbar/navbar";
import SaveBtn from "../generalComponents/saveBtn";
import { FaCirclePlus } from "react-icons/fa6";
const ImageUploaderLayout = () => {
  const [popup, setPopup] = useState(false);

  return (
    <div className="image-uploader-container">
      <Navbar />

      {popup ? (
        <UploadImageInput closeForm={() => setPopup(false)} />
      ) : (
        <>
          <FaCirclePlus
            style={{
              fontSize: "50px",
              color: "blue",
              cursor: "pointer",
              position: "absolute",
              right: "20px",
              bottom: "20px",
            }}
            onClick={() => setPopup(true)}
          />
          <UserImages />
          <SaveBtn />
        </>
      )}
    </div>
  );
};

export default ImageUploaderLayout;
