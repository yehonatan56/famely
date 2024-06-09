import React, { useState } from "react";
import { uploadImageFile } from "../../logic/images.logic";

export const ImageModalForm = ({}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [formDetails, setFormDetails] = useState({
    name: "",
    description: "",
  });

  // Function to save changes to the server via a PUT request
  const saveChangesToServer = async () => {
    let images = [];

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

    let user = { family: { images: [] } };

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
    // const updatedImages = [...images];
    // updatedImages[editingIndex].metadata = {
    //   ...updatedImages[editingIndex].metadata,
    //   ...formDetails,
    //   page: currentPage,
    // };
    // setImages(updatedImages);
    setShowPopup(false); // Close the popup
  };

  // Handle form field changes
  const handleFormChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  if (!showPopup) return null;
  return (
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

        <button type="submit">Save</button>
        <button type="button" onClick={() => setShowPopup(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};
