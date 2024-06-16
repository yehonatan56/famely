import React, { useEffect, useState } from "react";
import Image from "./image";
import ResponsivePagination from "react-responsive-pagination";
import { getUserImagesByPage } from "../../logic/images.logic";
import { useImageEvents } from "./hooks/useImageEvents";
import { useImagesPagination } from "./hooks/useImagesPagination";
import { useSelector } from "react-redux";

export const UserImages = ({}) => {
  const user = useSelector(state => state.user).user;
  const [images, setImages] = useState([]);

  const { currentPage, totalPages, onPageChange } = useImagesPagination();
  const { handleImageClick, handleMouseDown, handleResizeStart } =
    useImageEvents({
      images,
      updateImages: (updatedImages) => setImages(updatedImages),
    });

  useEffect(() => {
    getUserImagesByPage(user, currentPage)
      .then((userImages) => {
        setImages(userImages);
      })
      .catch((error) => console.error("failed to getUserImagesByPage", error));
  }, [user, currentPage]);

  

  return (
    <div className="user-images-container">
      <div className="user-images">
        {images
          ?.filter((img) => img.metadata.page === currentPage)
          .map((img, index) => (
            <Image
              key={index}
              img={img}
              index={index}
              handleMouseDown={handleMouseDown}
              handleImageClick={handleImageClick}
              handleResizeStart={handleResizeStart}
            />
          ))}
      </div>
      {images.length ? (
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={onPageChange}
        />
      ) : null}
      ;
    </div>
  );
};
