import React from "react";
import { UploadImageInput } from "./UploadImageInput";
import { UserImages } from "./UserImages";
import "react-responsive-pagination/themes/classic.css";
import "./ImageUploader.css";
import CheckUser from "../auth/AuthenticatedPage";
import Navbar from "../navbar/navbar";

const ImageUploader = () => {
  return (
    <div className="image-uploader-container">
      <Navbar />

      <h2>Image Uploader Page</h2>

      <UploadImageInput />

      <UserImages />
    </div>
  );
};

export default ImageUploader;
