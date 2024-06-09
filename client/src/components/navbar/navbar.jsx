import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
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
      </ul>
    </nav>
  );
};

export default Navbar;
