import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useSelector } from "react-redux";
import { isUserLoginSelector } from "../../store/selectors/user.selector";
import { logoutUser } from "../../logic/user.logic";

const Navbar = () => {
  const isExists = useSelector((state) => isUserLoginSelector(state));

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        {/* <li><Link to="/calendar">Calendar</Link></li> */}
        <li>
          <Link to="/image-uploader">Image Uploader</Link>
        </li>

        {isExists && (
          <li>
            <button onClick={logoutUser}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
