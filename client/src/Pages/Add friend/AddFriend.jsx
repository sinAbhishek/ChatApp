import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { maxWidth } from "@mui/system";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AuthContext } from "../../Context/AuthContext";
import "./addfriend.css";

const AddFriend = ({ user, request, change }) => {
  const [alusers, setalusers] = useState(null);
  const [disable, setdisable] = useState(false);
  const [allusers, setallusers] = useState(null);
  const [search, setsearch] = useState("Search");
  const [data, setdata] = useState(null);
  const [open, setOpen] = useState(false);
  const [friendid, setfriendid] = useState();
  const [currentuser, setcurrentuser] = useState();
  const URL = process.env.REACT_APP_Url;

  const handleOpen = (curruser) => {
    setcurrentuser(curruser);
    setOpen(true);
    setfriendid(curruser._id);
    const isfriend = user.friends.some((cr) => cr === curruser._id);
    if (isfriend) {
      setdisable(true);
    } else if (curruser._id === user._id) {
      setdisable(true);
    } else {
      setdisable(false);
    }
  };

  const handleClose = () => setOpen(false);

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
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(URL + "/api/Auth");
      setallusers(res.data);
    };
    call();
  }, [open]);

  useEffect(() => {
    allusers
      ? setalusers(allusers.map((cr) => ({ label: cr.Firstname })))
      : console.log("koko");
  }, [allusers]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`${URL}/api/Auth?Firstname=${search.label}`);
      setdata(res.data);
    };
    call();
  }, [search]);
  const addrequest = async () => {
    const res = await axios.put(
      `${URL}/api/Auth/request/${friendid}/${user._id}`
    );
    addpending();
    handleClose();
  };
  const addpending = async () => {
    const res = await axios.put(
      `${URL}/api/Auth/pending/${user._id}/${friendid}`
    );
    request(friendid);
    change();
  };

  return (
    <div>
      {alusers && (
        <Autocomplete
          className="combo-box-demo"
          value={search}
          onChange={(event, newValue) => {
            setsearch(newValue);
          }}
          disablePortal
          id="combo-box-demo"
          options={alusers}
          sx={{ width: maxWidth }}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      )}
      {data &&
        data.map((cr) => (
          <div className="searchResult" onClick={() => handleOpen(cr)}>
            <img
              className="img-search"
              src={cr.profileImg}
              alt="..."
              onError={(event) => {
                event.target.src = `${URL}/public/images/7.jpeg`;
                event.onerror = null;
              }}
            />
            <p className="txt-search">{cr.Firstname}</p>
          </div>
        ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {currentuser && (
            <div className="modalcontents">
              <img
                className="img-modal"
                src={currentuser.profileImg}
                alt="..."
                onError={(event) => {
                  event.target.src = `${URL}/public/images/7.jpeg`;
                  event.onerror = null;
                }}
              />
              <p className="text-modal">{currentuser.Firstname}</p>
              {!disable && (
                <button className="btn-modal" onClick={addrequest}>
                  <span className="btn-txt">Add Friend</span>
                </button>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AddFriend;
