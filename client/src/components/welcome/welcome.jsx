import React from "react";
import { useSelector } from "react-redux";
import { getUserDataSelector } from "../../store/selectors/user.selector";

export default function Welcome() {
  const user = useSelector((state) => getUserDataSelector(state));

  return <div>Welcome {user.name} famely</div>;
}
