import React, { useState, useCallback, useEffect, useMemo } from "react";
import "./ImageUploader.css"; // Assume we have a dedicated CSS file for styles
import Image from "./image";
import { initImages } from "../../logic/initImages";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { getFromStore } from "../../logic/store";
import { useNavigate } from "react-router-dom";

const ImageUploaderUnsafe = () => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [resizingIndex, setResizingIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [sizeOffset, setSizeOffset] = useState({ width: 0, height: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [formDetails, setFormDetails] = useState({
    name: "",
    description: "",
    birthdate: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const user = getFromStore("user");
  const [images, setImages] = useState(
    user ? initImages(user, currentPage) : ""
  );

  console.log({ user });

  // 2. יש בקומפוננטה הזאת כמות גדולה של ניהול סטייט מכמה סוגים וזה דורש גישה קצת יותר משוכללת ו/או מודולרית לניהול הסטייט
  // כן
  // Function to handle file uploadss
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3009/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setEditingIndex(images.length);
      setImages([
        ...images,
        {
          url: data.url,
          metadata: {
            top: 50,
            left: 50,
            width: 100,
            height: 100,
            name: "",
            description: "",
            birthdate: "",
          },
        },
      ]);
      setShowPopup(true); // Show the popup after upload
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Function to handle starting a drag operation
  const handleMouseDown = (event, index) => {
    setDraggingIndex(index);
    const img = images[index];
    setDragOffset({
      x: event.clientX - img.metadata.left,
      y: event.clientY - img.metadata.top,
    });
  };

  // Function to start resizing
  const handleResizeStart = (event, index) => {
    setResizingIndex(index);
    const img = images[index];
    setSizeOffset({
      width: event.clientX - img.metadata.width,
      height: event.clientY - img.metadata.height,
    });
    event.stopPropagation(); // Prevent starting drag instead
  };

  // Function to update image position during a drag
  const handleMouseMove = useCallback(
    (event) => {
      if (draggingIndex !== null) {
        const updatedImages = [...images];
        updatedImages[draggingIndex].metadata.left =
          event.clientX - dragOffset.x;
        updatedImages[draggingIndex].metadata.top =
          event.clientY - dragOffset.y;
        setImages(updatedImages);
      }

      if (resizingIndex !== null) {
        const updatedImages = [...images];
        updatedImages[resizingIndex].metadata.width =
          event.clientX - sizeOffset.width;
        updatedImages[resizingIndex].metadata.height =
          event.clientY - sizeOffset.height;
        setImages(updatedImages);
      }
    },
    [draggingIndex, resizingIndex, dragOffset, sizeOffset, images]
  );

  // Function to end the drag and resize operation
  const handleMouseUp = () => {
    setDraggingIndex(null);
    setResizingIndex(null);
  };

  // Attach global mouse listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  // Function to save changes to the server via a PUT request
  const saveChangesToServer = async () => {
    const updatedData = images.map((img) => ({
      url: img.url,
      top: img.metadata.top,
      left: img.metadata.left,
      width: img.metadata.width,
      height: img.metadata.height,
      name: img.metadata.name,
      description: img.metadata.description,
      birthdate: img.metadata.birthdate,
      page: img.metadata.page,
    }));
    user.famely.images = updatedData;
    try {
      const response = await fetch(
        `http://localhost:3009/famelys/${props.user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      const result = await response.json();
      console.log("Save result:", result);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Handle metadata form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedImages = [...images];
    updatedImages[editingIndex].metadata = {
      ...updatedImages[editingIndex].metadata,
      ...formDetails,
      page: currentPage,
    };
    setImages(updatedImages);
    setShowPopup(false); // Close the popup
  };

  // Handle form field changes
  const handleFormChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  // Show metadata popup when clicking an image
  const handleImageClick = (index) => {
    setEditingIndex(index);
    setFormDetails(images[index].metadata);
    setShowPopup(true);
  };

  const onPageChange = React.useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // הערות כלליות
  // 1. כדאי שתתחיל לכתוב typescript זה ישדרג את האיכות של העבודה שלך ואת הביטחון שלך במהלך העבודה
  // 2. יש בקומפוננטה הזאת כמות גדולה של ניהול סטייט מכמה סוגים וזה דורש גישה קצת יותר משוכללת ו/או מודולרית לניהול הסטייט
  // כן
  return (
    <div>
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={onPageChange}
      />
      <input type="file" onChange={handleFileUpload} accept="image/*" />
      {images.map((img, index) => {
        if (img.metadata.page == currentPage)
          return (
            <Image
              img={img}
              index={index}
              handleMouseDown={handleMouseDown}
              handleImageClick={handleImageClick}
              handleResizeStart={handleResizeStart}
            />
          );
      })}
      <button onClick={saveChangesToServer}>Save Changes</button>

      {showPopup && (
        <div className="popup">
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formDetails.name}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formDetails.description}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Birthdate:``
              <input
                type="date"
                name="birthdate"
                value={formDetails.birthdate}
                onChange={handleFormChange}
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
// אני יפריד
// האמת  הרוב AI

const ImageUploader = (props) => {
  const user = getFromStore("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  });

  if (!user) return null;

  return ImageUploaderUnsafe(props);
};

export default ImageUploader;
