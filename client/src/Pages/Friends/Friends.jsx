import React, { useEffect, useState, useContext } from "react";
import "./friends.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AuthContext } from "../../Context/AuthContext";
const Friends = ({
  current,
  change,
  online,
  refresh,
  changeconvo,
  remove,
  toggle1,
}) => {
  const { user } = useContext(AuthContext);
  const [User, setUser] = useState("hello");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const URL = process.env.REACT_APP_Url;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const isonline = online.some((cr) => cr.userId === current);

  useEffect(() => {
    const getuser = async () => {
      const res = await axios.get(`${URL}/api/Auth/${current}`);
      setUser(res.data);
    };

    getuser();
  }, []);
  const handleOpen = (curruser) => {
    setOpen(true);
  };
  const removefriendside = async () => {
    try {
      const res = await axios.put(
        `${URL}/api/Auth/remove/${User[0]._id}/${user._id}`
      );
      change();
      refresh();
      remove(User[0]._id);
    } catch (err) {
      console.log(err);
    }
  };
  const removefriend = async () => {
    try {
      const res = await axios.put(
        `${URL}/api/Auth/remove/${user._id}/${User[0]._id}`
      );
      removefriendside();
    } catch (err) {
      console.log(err);
    }
  };
  const call = () => {
    changeconvo(current);
    toggle1();
  };
  return (
    <div className="m1">
      {User[0] && (
        <div onClick={handleOpen} className="c1">
          <img
            className="img-m1"
            src={User[0].profileImg}
            alt="..."
            onError={(event) => {
              event.target.src = `${URL}/public/images/7.jpeg`;
              event.onerror = null;
            }}
          />
          <div
            className={isonline ? "statusOn status" : "statusOff status"}
          ></div>
        </div>
      )}

      {User[0] && (
        <div onClick={() => call()} className="fr-title">
          <h2 className="friend-name">{User[0].Firstname}</h2>
        </div>
      )}

      {User[0] && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="fr-det">
              <img
                className="img-m1"
                src={User[0].profileImg}
                alt="..."
                onError={(event) => {
                  event.target.src = `${URL}/public/images/7.jpeg`;
                  event.onerror = null;
                }}
              />
              <h3>{User[0].Firstname}</h3>
              <button onClick={removefriend}>Remove Friend</button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Friends;
