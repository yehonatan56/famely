import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useImagesManagement } from "../hooks/useImagesManagement.js";
export default function Delete({ imageId }) {
  const { deleteImage } = useImagesManagement();
  return (
    <div
      style={{
        position: "relative",
        left: "0",
        top: "0",
        cursor: "pointer",
        backgroundColor: "red",
        padding: "10px",
        color: "white",
      }}
      onClick={() => deleteImage(imageId)}
    >
      <RiDeleteBin2Line />
    </div>
  );
}
