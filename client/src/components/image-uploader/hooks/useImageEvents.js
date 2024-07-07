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
      x: event.clientX - img.left,
      y: event.clientY - img.top,
    });
  };

  // Function to start resizing
  const handleResizeStart = (event, index) => {
    event.stopPropagation(); // Prevent starting drag instead

    const img = images[index];

    setResizingIndex(index);
    setSizeOffset({
      width: event.clientX - img.width,
      height: event.clientY - img.height,
    });
  };

  // Function to update image position during a drag
   const handleMouseMove = useCallback(
    (event) => {
      if (draggingIndex !== null) {
        let updatedImages = [...images];
        const [newLeft, newTop] = [
          event.clientX - dragOffset.x,
          event.clientY - dragOffset.y,
        ];

        updatedImages[draggingIndex] = {
          ...updatedImages[draggingIndex],
          left: newLeft,
          top: newTop,
        };

        updateImages?.(updatedImages);
      }

      if (resizingIndex !== null) {
        const updatedImages = [...images];
        const width = event.clientX - sizeOffset.width;
        const height = event.clientY - sizeOffset.height;
        // todo : change to [width, height] variables
        updatedImages[resizingIndex] = {
          ...updatedImages[resizingIndex],
          width: width,
          height: height,
        };
        updateImages?.(updatedImages);

        // todo: add question dot checking before using
        updateImages?.(updatedImages);
      }
    },
    [draggingIndex, resizingIndex, dragOffset, sizeOffset, images]
  );

  // Function to end the drag and resize operation
  const handleMouseUp = () => {
    setDraggingIndex(null);
    setResizingIndex(null);
  };

  // Show popup when clicking an image
  const handleImageClick = (index) => {
    setEditingIndex(index);
    // setFormDetails(images[index]);
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
