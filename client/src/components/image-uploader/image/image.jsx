import React from "react";
import Delete from "./delete.jsx";

export default function Image(props) {
  return (
    <div key={props.index}>
      <Delete imageId={props.index} />
      <img src={props.img.url} alt={`Uploaded ${props.index}`} />
    </div>
  );
}
