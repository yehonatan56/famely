import React, { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserDataSelector } from "../../../store/selectors/user.selector";

export default function CheckUser() {
  const [loader, setLoader] = useState(true);
  const userState = useSelector(getUserDataSelector);
  const navigate = useNavigate();

  useEffect(() => {
    setInterval(() => {
      if (userState.user === null) {
        navigate("/errorConnect");
      } else {
        setLoader(false);
      }
    }, 3000);
  }, []);

  return <div>{loader ? <Loader color="blue" size="xl" /> : ""}</div>;
}
