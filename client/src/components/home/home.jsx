import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { useSelector } from "react-redux";
import { isUserLoginSelector } from "../../store/selectors/user.selector";
import Welcome from "../welcome/welcome";

const Home = () => {
  const isExists = useSelector((state) => isUserLoginSelector(state));

  return (
    <div className="home-container">
      {isExists ? <Welcome /> : <Link to={"/login"}>Login</Link>}
    </div>
  );
};

export default Home;
