import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import Image from "./image";
import { getUserImagesByPage } from "../../logic/images.logic";
import { useImageEvents } from "./hooks/useImageEvents";
import { useImagesPagination } from "./hooks/useImagesPagination";
import { getUserDataSelector, getUserImagesSelector } from "../../store/selectors/user.selector";
import { dispatch } from "../../store/store";
import { updateImagesAction } from "../../store/slices/user.slice";

export const UserImages = () => {
  
  const user = useSelector((state) => getUserDataSelector(state));


  const images = useSelector((state) => getUserImagesSelector(state));
  
  const { currentPage, totalPages, onPageChange } = useImagesPagination();
  const { handleImageClick, handleMouseDown, handleResizeStart } =
    useImageEvents({
      images,
      updateImages: (updatedImages) => dispatch(updateImagesAction(updatedImages)),
    });

  useEffect(() => {
    getUserImagesByPage(images, currentPage)
      .then((userImages) => {
          dispatch(updateImagesAction(userImages))
      })
      .catch((error) => console.error("failed to getUserImagesByPage", error));
  }, []);

  
  return (
    
    <div className="user-images-container">
      <div className="user-images">
        {images
          ?.filter((img) => img.page === currentPage)
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
