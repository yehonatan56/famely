import { useCallback, useEffect, useState } from "react";

export const useImageEvents = ({ images, updateImages }) => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [resizingIndex, setResizingIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [sizeOffset, setSizeOffset] = useState({ width: 0, height: 0 });
  const [editingIndex, setEditingIndex] = useState(null);

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
    event.stopPropagation(); // Prevent starting drag instead

    const img = images[index];

    setResizingIndex(index);
    setSizeOffset({
      width: event.clientX - img.metadata.width,
      height: event.clientY - img.metadata.height,
    });
  };

  // Function to update image position during a drag
  const handleMouseMove = useCallback(
    (event) => {
      if (draggingIndex !== null) {
        const updatedImages = images?.slice(0) ?? [];

        const [left, top] = [
          event.clientX - dragOffset.x,
          event.clientY - dragOffset.y,
        ];

        updatedImages[draggingIndex].metadata.left = left;
        updatedImages[draggingIndex].metadata.top = top;

        updateImages?.(updatedImages);
      }

      if (resizingIndex !== null) {
        const updatedImages = [...images];

        // todo : change to [width, height] variables
        updatedImages[resizingIndex].metadata.width =
          event.clientX - sizeOffset.width;
        updatedImages[resizingIndex].metadata.height =
          event.clientY - sizeOffset.height;

        // todo: add question dot checking before using
        updateImages(updatedImages);
      }
    },
    [draggingIndex, resizingIndex, dragOffset, sizeOffset, images]
  );

  // Function to end the drag and resize operation
  const handleMouseUp = () => {
    setDraggingIndex(null);
    setResizingIndex(null);
  };

  // Show metadata popup when clicking an image
  const handleImageClick = (index) => {
    setEditingIndex(index);
    // setFormDetails(images[index].metadata);
    // setShowPopup(true);
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

  return {
    handleMouseDown,
    handleResizeStart,
    handleImageClick,
  };
};
