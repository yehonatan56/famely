import { useCallback } from 'react'
import { useImagesPagination } from './useImagesPagination';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../store/store';
import { updateImagesAction } from '../../../store/slices/user.slice';
import { getUserImagesSelector } from '../../../store/selectors/user.selector';

export function useImagesManagement() {
  const { currentPage } = useImagesPagination();
  const images = useSelector((state) => getUserImagesSelector(state))

  const setImagesState = useCallback((newState) => {
    dispatch(updateImagesAction(newState))
  }, [])


  const addImage = item => {
    dispatch(updateImagesAction([...images, {
      url: item.url,
        page: currentPage,
        top: item.top,
        left: item.left,
        width: item.width,
        height: item.height,
        name: item.name,
        description: item.description,
      
    }]))
  }
  return {
    images,
    setImagesState,
    addImage
    // getImageInfo etc
  }
}
