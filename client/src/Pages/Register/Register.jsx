import React from "react";

import { useState } from "react";
import axios from "axios";
import { FaUpload, FaLocationArrow } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./register.css";
import { red } from "@mui/material/colors";

const Register = () => {
  const URL = process.env.REACT_APP_Url;
  const navigate = useNavigate();
  const [Loading, setloading] = useState(false);
  const [active, setActive] = useState(false);
  const [image, setimage] = useState({ name: "Upload image" });
  const [Registerdetails, setRegisterdetails] = useState({
    username: "",
    Firstname: "",
    Lastname: "",
    email: "",
    password: "",
    image: "",
  });
  const handleChange = (e) => {
    setRegisterdetails((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const fileChange = (e) => {
    setimage(e.target.files[0]);
    setRegisterdetails((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const register = async (e) => {
    e.preventDefault();
    if (
      Registerdetails.email.length == 0 ||
      Registerdetails.username.length == 0 ||
      Registerdetails.Firstname.length == 0 ||
      Registerdetails.Lastname.length == 0 ||
      Registerdetails.password.length == 0 ||
      Registerdetails.image.length == 0
    ) {
      setActive(true);
    } else {
      setloading(true);
      const formdata = new FormData();

      formdata.append("username", Registerdetails.username);
      formdata.append("Firstname", Registerdetails.Firstname);
      formdata.append("Lastname", Registerdetails.Lastname);
      formdata.append("email", Registerdetails.email);
      formdata.append("password", Registerdetails.password);
      formdata.append("image", Registerdetails.image);
      try {
        const res = await axios.post(URL + "/api/Auth/register", formdata);
        navigate("/");
      } catch (err) {
        setloading(false);
        console.log(err);
      }
    }
  };

  return (
    <div className="register-container">
      <h1 className="log-h1">REGISTER</h1>
      <div className="register-form">
        <form
          className="reg-form"
          onSubmit={register}
          encType="multipart/form-data"
        >
          <input
            className="register-input"
            placeholder="Enter username"
            type="text"
            id="username"
            onChange={handleChange}
          />
          {active && Registerdetails.username.length == 0 && (
            <label>Username cannot be empty</label>
          )}
          <input
            className="register-input"
            placeholder="Enter your First name"
            type="text"
            id="Firstname"
            onChange={handleChange}
          />
          {active && Registerdetails.Firstname.length == 0 && (
            <label>Firstname cannot be empty</label>
          )}
          <input
            className="register-input"
            placeholder="Enter your Last name"
            type="text"
            id="Lastname"
            onChange={handleChange}
          />
          {active && Registerdetails.Lastname.length == 0 && (
            <label>Lastname cannot be empty</label>
          )}
          <input
            className="register-input"
            placeholder="Enter your Email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          {active && Registerdetails.email.length == 0 && (
            <label>Email cannot be empty</label>
          )}
          <input
            className="register-input"
            placeholder="Enter password"
            type="text"
            id="password"
            onChange={handleChange}
          />
          {active && Registerdetails.password.length == 0 && (
            <label>Password cannot be empty</label>
          )}
          <input
            className="upload-input"
            name="image"
            type="file"
            id="file"
            onChange={fileChange}
          />
          <label className="imglabel" htmlFor="file">
            <FaUpload /> {image.name}
          </label>
          {active && Registerdetails.image.length == 0 && (
            <label>Please select image</label>
          )}
          <button className="register-btn" type="submit">
            Register
          </button>
          {Loading && (
            <div className="scalelod">
              <ScaleLoader
                color={"#03ff46"}
                loading={Loading}
                width={"3px"}
                height={"20px"}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </form>
        <div className="direct">
          Alread registered?{" "}
          <NavLink to={"/"}>
            <p> Login here</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
