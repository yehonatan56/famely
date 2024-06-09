import React from "react";
import { useNavigate } from "react-router-dom";

import { UploadImageInput } from "./UploadImageInput";
import { UserImages } from "./UserImages";
import { ImageModalForm } from "./ImageModalForm";

import "react-responsive-pagination/themes/classic.css";
import "./ImageUploader.css";

const ImageUploaderUnsafe = () => {
  return (
    <div className="image-uploader-container">
      <h2>Image Uploader Page</h2>
      <UploadImageInput />

      <UserImages />

      <ImageModalForm />

      {/*<button onClick={saveChangesToServer}>Save Changes</button>*/}
    </div>
  );
};
// אני יפריד
// האמת  הרוב AI

const ImageUploader = (props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = getFromStore("user");
  //   if (!user) navigate("/");
  // }, []);

  return ImageUploaderUnsafe(props);
};

export default ImageUploader;
