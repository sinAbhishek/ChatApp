import React, { useEffect, useState } from "react";
import axios from "axios";
import "./online.css";
const Online = ({ pro }) => {
  const [user, setuser] = useState("");
  const URL = process.env.REACT_APP_Url;
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`${URL}/api/Auth/${pro}`);
      setuser(res.data);
    };
    pro ? call() : console.log("lsll");
  }, [pro]);

  return (
    <div>
      {user && (
        <div className="online-profile">
          <img
            className="img-modal"
            src={user[0].profileImg}
            alt="..."
            onError={(event) => {
              event.target.src = `${URL}/public/images/7.jpeg`;
              event.onerror = null;
            }}
          />
          <h3>{user[0].Firstname}</h3>
        </div>
      )}
    </div>
  );
};

export default Online;
