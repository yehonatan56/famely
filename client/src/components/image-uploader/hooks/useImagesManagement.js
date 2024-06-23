import React, { useCallback, useState } from 'react'
import { useImagesPagination } from './useImagesPagination';

export function useImagesManagement() {
  const [images, setImages] = useState([]);
  const {currentPage} = useImagesPagination();
  const setImagesState = useCallback((newState) => {
    setImages(newState)
  }, [])


  const addImage = item => {
    setImages([...images, {
      url: item.url,
      metadata: {
        page: currentPage,
        top: item.top,
        left: item.left,
        width: item.width,
        height: item.height,
        name: item.name,
        description: item.description,
      },
    }])
  }
  return {
    images,
    setImagesState,
    addImage
    // getImageInfo etc
}
}
