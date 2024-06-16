// import MOCK_IMAGES from "../IMAGES";

export const uploadImageFile = async (file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const data = await fetch("http://localhost:3009/upload", {
      method: "POST",
      body: formData,
    }).then((response) => response.json());

    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const getUserImagesByPage = async (images, page = 1) => {
  // return MOCK_IMAGES;

  const imagesFromDB = images.map((item) => ({
    url: item.url,
    metadata: {
      page: item.page,
      top: item.top,
      left: item.left,
      width: item.width,
      height: item.height,
      name: item.name,
      description: item.description,
      birthdate: item.birthdate,
    },
  }));

  return imagesFromDB;
};
