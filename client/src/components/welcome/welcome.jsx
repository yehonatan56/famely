import React from "react";
import { useSelector } from "react-redux";
import { getUserDataSelector } from "../../store/selectors/user.selector";
import FamilyTree from "../family-tree/FamilyTree";

export default function Welcome() {
  const user = useSelector((state) => getUserDataSelector(state));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        marginTop: "1em",
      }}
    >
      <div>Welcome {user.name} famely</div>
      {/* <FamilyTree /> */}
    </div>
  );
}
