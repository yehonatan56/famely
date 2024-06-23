import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import Image from "./image";
import { getUserImagesByPage } from "../../logic/images.logic";
import { useImageEvents } from "./hooks/useImageEvents";
import { useImagesManagement } from "./hooks/useImagesManagement";
import { useImagesPagination } from "./hooks/useImagesPagination";
import { getUserImagesSelector } from "../../store/selectors/user.selector";

export const UserImages = () => {
  // const { user } = useSelector((state) => ({
  //   user: getUserDataSelector(state),
  // }));

  const userImages = useSelector((state) => getUserImagesSelector(state));

  const {images , setImagesState} = useImagesManagement();

  const { currentPage, totalPages, onPageChange } = useImagesPagination();
  const { handleImageClick, handleMouseDown, handleResizeStart } =
    useImageEvents({
      images,
      updateImages: (updatedImages) => setImages(updatedImages),
    });

  useEffect(() => {
    getUserImagesByPage(userImages, currentPage)
      .then((userImages) => {
        setImagesState(userImages);
      })
      .catch((error) => console.error("failed to getUserImagesByPage", error));
  }, [userImages, currentPage]);

  
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
