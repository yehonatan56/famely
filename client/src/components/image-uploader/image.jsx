import React from "react";

export default function Image(props) {
  return (
    <div
      key={props.index}
    >
      <img
        src={props.img.url}
        alt={`Uploaded ${props.index}`}
      />

    </div>
  );
}
