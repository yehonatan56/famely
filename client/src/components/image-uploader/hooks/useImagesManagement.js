import React, { useCallback, useState } from 'react'
import { useImagesPagination } from './useImagesPagination';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../store/store';
import { setImagesAction } from '../../../store/slices/images.slice';

export function useImagesManagement() {
  const {currentPage} = useImagesPagination();
  const setImagesState = useCallback((newState) => {
    dispatch(setImagesAction(newState)) 
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
