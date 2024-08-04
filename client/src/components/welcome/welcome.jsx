import React from "react";
import { useSelector } from "react-redux";
import { getUserDataSelector } from "../../store/selectors/user.selector";
import FamilyTree from "../family-tree/FamilyTree";

export default function Welcome() {
  const user = useSelector((state) => getUserDataSelector(state));

  return (
    <div>
      <div
        style={{
          fontSize: "100px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Welcome {user.name} famely
      </div>
      {/* <FamilyTree /> */}
    </div>
  );
}
