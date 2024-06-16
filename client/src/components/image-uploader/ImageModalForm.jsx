import React, { useState } from "react";

export const ImageModalForm = ({}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [formDetails, setFormDetails] = useState({
    name: "",
    description: "",
  });

  // Function to save changes to the server via a PUT request
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
