import React from "react";
import { useSelector } from "react-redux";
import { getEdit } from "../../../store/selectors/edit.selector.js";
import Delete from "./delete.jsx";

export default function Image(props) {
  const edit = useSelector(getEdit);
  return (
    <div key={props.index}>
      {edit && <Delete imageId={props.index} />}
      <img src={props.img.url} alt={`Uploaded ${props.index}`} />
    </div>
  );
}
