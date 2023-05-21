import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./login.css";
const URL = process.env.REACT_APP_Url;
const Login = () => {
  const navigate = useNavigate();
  const [Loading, setloading] = useState(false);
  const { loading, error, dispatch, user } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({
    username: undefined,
    password: undefined,
  });
  useEffect(() => {
    user && navigate("/convo");
  }, []);
  const handleChange = (e) => {
    setLoginDetails((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      setloading(true);
      const res = await axios.post(URL + "/api/Auth/login", loginDetails);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/convo");
    } catch (err) {
      setloading(false);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      console.log(err.response.data.message);
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("pass is wrong");
    }
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="login-container">
      <h1 className="log-h1">LOGIN</h1>
      <div className="login-form">
        <input
          className="login-input"
          placeholder="Enter username"
          type="text"
          id="username"
          onChange={handleChange}
        />
        <input
          className="login-input"
          placeholder="Enter password"
          type="text"
          id="password"
          onChange={handleChange}
        />
        <button className="Login-btn" onClick={handleClick}>
          LOGIN
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
        <div className="direct">
          New User?{" "}
          <NavLink to={"/register"}>
            <p> Register here</p>
          </NavLink>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default Login;
