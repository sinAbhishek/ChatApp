import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import "./sentrequest.css";
const SentRequest = ({ sent }) => {
  const { user } = useContext(AuthContext);
  const [data, setdata] = useState([]);
  const URL = process.env.REACT_APP_Url;
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`${URL}/api/Auth/${sent}`);
      setdata(res.data);
    };
    sent && call();
  }, [sent]);
  return (
    <div>
      {data[0] &&
        data.map((cr) => (
          <div className="pe-wrapper">
            <div className="pe-userdet">
              <img
                className="img-pe"
                src={cr.profileImg}
                alt="..."
                onError={(event) => {
                  event.target.src = `${URL}/public/images/7.jpeg`;
                  event.onerror = null;
                }}
              />
              <p>{cr.Firstname}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SentRequest;
