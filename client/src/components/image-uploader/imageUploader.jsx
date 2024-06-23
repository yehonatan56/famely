import React from "react";
import { UploadImageInput } from "./UploadImageInput";
import { UserImages } from "./UserImages";
import "react-responsive-pagination/themes/classic.css";
import "./ImageUploader.css";
import CheckUser from "../auth/generalSecurity/checkUser";

const ImageUploader = () => {
  return (
    <div className="image-uploader-container">
      <h2>Image Uploader Page</h2>
      <CheckUser/>
      <UploadImageInput />

      <UserImages />
    </div>
  );
};

export default ImageUploader;
