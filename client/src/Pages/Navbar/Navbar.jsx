import React, { useEffect, useState, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ForumIcon from "@mui/icons-material/Forum";
import { AuthContext } from "../../Context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
const Navbar = ({ toggle }) => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [disable, setdisable] = useState(false);
  const URL = process.env.REACT_APP_Url;
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <div className="search"></div>
        <div className="menu">
          <img
            className="img-user"
            src={user.profileImg}
            alt="..."
            onError={(event) => {
              event.target.src = `${URL}/public/images/7.jpeg`;
              event.onerror = null;
            }}
          />
          <p className="name-user">{user.Firstname}</p>
          <div className="logout" onClick={logout}>
            <LogoutIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
