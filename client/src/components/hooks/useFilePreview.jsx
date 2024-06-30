import { useState, useEffect } from "react";

export const useFilePreview = (file, defaultValue = undefined) => {
  const [preview, setPreview] = useState();

  useEffect(() => {
    const objectUrl =
      file && typeof file !== "string" ? URL.createObjectURL(file) : file;

    setPreview(objectUrl || defaultValue || null);

    // free memory when ever this component is unmounted
    return () => {
      objectUrl && URL.revokeObjectURL(objectUrl);
    };
  }, [file, defaultValue]);

  return preview;
};
