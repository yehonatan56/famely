// import MOCK_IMAGES from "../IMAGES";

import { uploadImageFileRequest } from "../requests/image.proxy";

export const uploadImageFile = async (imageData) => {
  const { file, ...metaData } = imageData;
  const url = await uploadImageFileRequest(file);
  return url;
};

export const getUserImagesByPage = async (images, page = 1) => {
  // return MOCK_IMAGES;

  const imagesFromDB = images.map((item) => ({
    url: item.url,
      page: item.page,
      top: item.top,
      left: item.left,
      width: item.width,
      height: item.height,
      name: item.name,
      description: item.description,
  }));

  return imagesFromDB;
};
