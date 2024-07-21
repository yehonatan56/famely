import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import AddForm from "./add";
import "./index.css";
import List from "./list";
import { getUserMembersSelector } from "../../store/selectors/user.selector";
import { useSelector } from "react-redux";
import SaveBtn from "../generalComponents/saveBtn";
import { addFamilyMember } from "../../logic/members.logic";

export default function FamilyMembers() {
  // ask hadriel if create neww component for family members state
  const [addForm, setAddForm] = useState(false);
  const members = useSelector(getUserMembersSelector);

  return (
    <div>
      <Navbar />
      <h1 id="headLine">Family Members</h1>
      {addForm ? (
        <AddForm addFamilyMember={() => addFamilyMember(members)} />
      ) : (
        <>
          <List />
          <button onClick={() => setAddForm(true)}>Add Family Member</button>
          <SaveBtn />
        </>
      )}
    </div>
  );
}
