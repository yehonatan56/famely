import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { useSelector } from "react-redux";
import { isAuthenticatedUserSelector } from "../../store/selectors/user.selector";
import Welcome from "../welcome/welcome";
import Navbar from "../navbar/navbar";

const Home = () => {
  const isAuthenticated = useSelector((state) =>
    isAuthenticatedUserSelector(state)
  );

  return (
    <div className="home-container">
      <Navbar />
      {/* <Welcome /> */}
      {isAuthenticated ? <Welcome /> : <Link to={"/login"}>Login</Link>}
    </div>
  );
};

export default Home;
