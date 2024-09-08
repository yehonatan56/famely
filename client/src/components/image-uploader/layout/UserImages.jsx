import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import Image from "../image/image.jsx";
import { getUserImagesByPage } from "../../../logic/images.logic.jsx";
import { useImagesPagination } from "../hooks/useImagesPagination.js";
import { getUserImagesSelector } from "../../../store/selectors/user.selector.js";
import { dispatch } from "../../../store/store.js";
import { updateImagesAction } from "../../../store/slices/user.slice.js";

export const UserImages = () => {
  const images = useSelector((state) => getUserImagesSelector(state));
  const { currentPage, totalPages, onPageChange } = useImagesPagination();

  useEffect(() => {
    getUserImagesByPage(images, currentPage)
      .then((userImages) => {
        dispatch(updateImagesAction(userImages));
      })
      .catch((error) => console.error("failed to getUserImagesByPage", error));
  }, []);

  return (
    <div className="user-images-container">
      <div className="user-images">
        {images
          ?.filter((img) => img.page === currentPage)
          .map((img, index) => (
            <Image key={index} img={img} index={index} />
          ))}
      </div>
      {images.length ? (
        <div className="user-images-pagination">
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      ) : null}
    </div>
  );
};
