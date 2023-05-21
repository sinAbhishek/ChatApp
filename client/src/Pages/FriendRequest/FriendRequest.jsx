import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./friendrequest.css";
import { AuthContext } from "../../Context/AuthContext";
const FriendRequest = ({ req, change, accept, pending }) => {
  const { user } = useContext(AuthContext);
  const [data, setdata] = useState([]);
  const [refresh, setrefresh] = useState(req);
  const URL = process.env.REACT_APP_Url;
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`${URL}/api/Auth/${req}`);
      setdata(res.data);
    };
    req && call();
  }, [req]);

  const removeFriendRequest = async (cr) => {
    try {
      const res = await axios.put(
        `${URL}/api/Auth/removerequest/${user._id}/${cr._id}`
      );
      change();
      accept(cr._id);
      pending(cr._id);
    } catch (err) {
      console.log(err);
    }
  };
  const removePending = async (cr) => {
    try {
      const res = await axios.put(
        `${URL}/api/Auth/removepending/${cr._id}/${user._id}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  const addfriend = async (cr) => {
    try {
      const res = await axios.put(`${URL}/api/Auth/${cr._id}/${user._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const checkconversation = async (cr) => {
    try {
      const res = await axios.get(
        `${URL}/api/Conversation/${cr._id}/${user._id}`
      );
      !res.data[0] && createconversation(cr);
    } catch (err) {
      console.log(err);
    }
  };
  const createconversation = async (cr) => {
    try {
      const res = await axios.post(URL + "/api/Conversation/", {
        userid: user._id,
        friendid: cr._id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handle = async (cr) => {
    try {
      const res = await axios.put(`${URL}/api/Auth/${user._id}/${cr._id}`);
      addfriend(cr);
      removePending(cr);
      removeFriendRequest(cr);
      checkconversation(cr);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {data[0] &&
        data.map((cr) => (
          <div className="fr-wrapper">
            <div className="userdet">
              <img
                className="img-fr"
                src={cr.profileImg}
                alt="..."
                onError={(event) => {
                  event.target.src = `${URL}/public/images/7.jpeg`;
                  event.onerror = null;
                }}
              />
              <p>{cr.Firstname}</p>
            </div>
            <div className="btnfrReq">
              <button onClick={() => handle(cr)}>Accept</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FriendRequest;
