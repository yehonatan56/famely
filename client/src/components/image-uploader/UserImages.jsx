import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import Image from "./image";
import { getUserImagesByPage } from "../../logic/images.logic";
import { useImageEvents } from "./hooks/useImageEvents";
import { useImagesPagination } from "./hooks/useImagesPagination";
import { getUserImagesSelector } from "../../store/selectors/user.selector";
import { dispatch } from "../../store/store";
import { setImagesAction } from "../../store/slices/images.slice";
import { getImagesSelector } from "../../store/selectors/images.selector";

export const UserImages = () => {
  
  const userImages = useSelector((state) => getUserImagesSelector(state));


  const images = useSelector(getImagesSelector)
  const { currentPage, totalPages, onPageChange } = useImagesPagination();
  const { handleImageClick, handleMouseDown, handleResizeStart } =
    useImageEvents({
      images,
      updateImages: (updatedImages) => dispatch(setImagesAction(updatedImages)),
    });

  useEffect(() => {
    getUserImagesByPage(userImages, currentPage)
      .then((userImages) => {
        dispatch(setImagesAction(userImages))
      })
      .catch((error) => console.error("failed to getUserImagesByPage", error));
  }, []);

  
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
      {/* {images.length ? (
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={onPageChange}
        />
      ) : null}
      ; */}
    </div>
  );
};
