export const uploadImageFileRequest = async (file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const data = await fetch("http://localhost:3009/upload", {
      method: "POST",
      body: formData,
    }).then((response) => response.json());

    return data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const updateImageMetaDataRequest = async (values) => {
  if (!values) return;

  try {
    // todo: implement api
    const data = await fetch("http://localhost:3009/upload", {
      method: "POST",
      body: formData,
    }).then((response) => response.json());

    return data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
