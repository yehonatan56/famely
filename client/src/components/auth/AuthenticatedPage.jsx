//check this logic
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticatedUserSelector } from "../../store/selectors/user.selector";

export default function AuthenticatedPage(props) {
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthenticatedUserSelector);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return isAuth ? props.children : null;
}
