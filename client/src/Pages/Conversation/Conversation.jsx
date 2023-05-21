import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Friends from "../Friends/Friends.jsx";
import FriendRequest from "../FriendRequest/FriendRequest";
import SentRequest from "../SentRequest/SentRequest";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import axios from "axios";
import Messages from "../Messages/Messages.jsx";
import Online from "../Online/Online";
import "./conversation.css";
import { io } from "socket.io-client";
import StarBorder from "@mui/icons-material/StarBorder";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import PendingIcon from "@mui/icons-material/Pending";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Autocomplete from "@mui/material/Autocomplete";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Navbar from "../Navbar/Navbar";
import AddFriend from "../Add friend/AddFriend";
import Topbar from "../Topbar/Topbar";
const Conversaton = () => {
  const [friends, setfriends] = useState([]);
  const [number, setnumber] = useState(1);
  const [active, setactive] = useState(false);
  const [conversationactive, setconversationactive] = useState(false);
  const [request, setrequest] = useState(false);
  const [pending, setpending] = useState(false);
  const [online, setonline] = useState([]);
  const [open, setOpen] = useState(false);
  const [array, setarray] = useState();
  const [User, setUser] = useState("");
  const [trigger, settrigger] = useState(true);
  const [refresh, setrefresh] = useState(true);
  const [alusers, setalusers] = useState(null);
  const [messages, setmessages] = useState([]);
  const [setchat, changechat] = useState("");
  const [arrivalmsg, setarrivalmsg] = useState(null);
  const [socket, setsocket] = useState(null);
  const [allusers, setallusers] = useState(null);
  const [conversation, setconversation] = useState("");
  const [search, setsearch] = useState("abs");
  const [friendrequest, setfriendrequest] = useState([]);
  const [sentrequest, setsentrequest] = useState([]);
  const element = useRef(null);
  const [toggle, settoggle] = useState(false);
  const [hide, sethide] = useState(true);
  const [userdetail, setuserdetail] = useState();
  const [onlinefilter, setonlinefilter] = useState([]);
  const [toggletop, settoggletop] = useState(false);
  const [addfr, setaddfr] = useState(false);
  const [activefriend, setactivefriend] = useState(false);
  const [topbarid, settopbarid] = useState("");
  const [oil, setoil] = useState("");
  const [frqNotif, setfrqNotif] = useState(false);
  let receiverId = "";
  let updatedrequest = "";
  const URL = process.env.REACT_APP_Url;
  const [newmsg, setnewmsg] = useState({
    newmessage: "",
  });

  const tog = () => {
    if (toggle === false) {
      settoggle(true);
      sethide(false);
    } else {
      settoggle(false);
      sethide(true);
    }
  };

  const toggletopbar = () => {
    setactive(false);
    if (toggletop === false && active === false) {
      settoggletop(true);
    } else {
      settoggletop(false);
    }
  };

  const handleadd = () => {
    setaddfr(true);
    setactive(true);
    setrequest(false);
    setpending(false);
    console.log(friends);
    tog();
  };
  const handlereq = () => {
    setaddfr(false);
    setactive(true);
    setrequest(true);
    setpending(false);
    tog();
  };
  const handlepending = () => {
    setaddfr(false);
    setactive(true);
    setpending(true);
    setrequest(false);
    tog();
  };
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const call = () => {
      setfrqNotif(true);
      setnumber(friendrequest.length);
    };
    !friendrequest[0] && setfrqNotif(false);
    friendrequest[0] && call();
  }, [friendrequest]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`${URL}/api/Auth/${user._id}`);
      setUser(res.data);
      setfriendrequest(res.data[0].friendrequest);
    };
    call();
  }, [trigger, refresh]);

  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`${URL}/api/Auth/${user._id}`);
      setsentrequest(res.data[0].requestSent);
    };
    call();
  }, [trigger]);

  useEffect(() => {
    const newsocket = io(URL);
    setsocket(newsocket);
    return () => {
      newsocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("adduser", user._id);
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("test", "kiki");
    socket.on("getUsers", (users) => {
      setonline(users);
    });
  }, [socket]);

  useEffect(() => {
    element.current?.scrollIntoView();
  });
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (data) => {
      console.log(data);
      setarrivalmsg({
        sender: data.senderId,
        message: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    const call = async () => {
      const res = await axios.get(URL + "/api/Auth");
      setallusers(res.data);
    };
    call();
  }, []);
  useEffect(() => {
    allusers && setalusers(allusers.map((cr) => ({ label: cr.username })));
  }, [allusers]);

  useEffect(() => {
    if (User) {
      setfriends(User[0].friends);
    }
  }, [User]);
  useEffect(() => {
    arrivalmsg && setmessages((prev) => [...prev, arrivalmsg]);
  }, [arrivalmsg, trigger]);
  useEffect(() => {
    const fetchuser = () => {
      setuserdetail(allusers.filter((cr) => search.label === cr.username));
    };
    allusers && fetchuser();
  }, [search]);

  const handleClick = () => {
    setOpen(!open);
  };
  const refreshmsg = () => {
    setmessages("");
    setarrivalmsg("");
  };
  const handle = async (c) => {
    setactivefriend(true);
    settopbarid(c);
    setconversationactive(true);
    const res = await axios.get(`${URL}/api/Conversation/${user._id}/${c}`);
    const msg = await axios.get(`${URL}/api/message/${res.data[0]._id}`);
    setconversation(res.data);
    setmessages(msg.data);
    changechat(c);
    setactive(false);
    setrequest(false);
    setpending(false);
    settoggletop(true);
  };
  const confirm = async () => {
    if (newmsg.newmessage) {
      receiverId = conversation[0].members.find(
        (member) => member !== user._id
      );
      socket.emit("sendmessage", {
        senderId: user._id,
        receiverId,
        text: newmsg.newmessage,
      });
      setarrivalmsg({
        senderid: user._id,
        message: newmsg.newmessage,
        createdAt: Date.now(),
      });
      const res = await axios.post(URL + "/api/message", {
        conversationid: conversation[0]._id,
        user_id: user._id,
        message: newmsg.newmessage,
      });
      setnewmsg((prev) => ({
        ...prev,
        newmessage: "",
      }));
    }
  };
  const sendfriendacceptid = (Id) => {
    socket.emit("sendfriendacceptid", {
      friendid: Id,
      ownid: user._id,
    });
  };
  useEffect(() => {
    if (socket === null) return;
    socket.on("getfriendacceptid", (data) => {
      setfriends((prev) => [...prev, data.ownid]);
      setrefresh(!refresh);
    });
  }, [socket]);

  const sendfriendremoveid = (Id) => {
    socket.emit("sendfriendremoveid", {
      friendid: Id,
      ownid: user._id,
    });
  };
  useEffect(() => {
    if (socket === null) return;
    socket.on("getfriendremoveid", (data) => {
      const filter = friends.filter((element) => element != data.ownid);
      setfriends(filter);
      setrefresh(!refresh);
      setmessages([]);
      setarrivalmsg("");
    });
  }, [socket]);

  const sendfriendreqid = (Id) => {
    socket.emit("sendfriendreqid", {
      friendid: Id,
      ownid: user._id,
    });
  };
  useEffect(() => {
    if (socket === null) return;
    socket.on("getfriendreqid", (data) => {
      setfriendrequest((prev) => [...prev, data.ownid]);
    });
  }, [socket]);

  const sendpendingid = (Id) => {
    socket.emit("sendpendingid", {
      friendid: Id,
      ownid: user._id,
    });
  };
  useEffect(() => {}, [sentrequest]);
  useEffect(() => {
    if (socket === null) return;
    socket.on("getpendingid", async (data) => {
      const filter = sentrequest.filter((element) => element != data.ownid);

      setsentrequest(filter);
    });
  }, [socket]);

  const triggerr = () => {
    settrigger(!trigger);
  };
  const handleChange = (e) => {
    e.preventDefault();

    setnewmsg((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  useEffect(() => {
    if (online) {
      const filter = online.filter((onUser) => onUser.userId != user._id);
      friends && onl(filter);
    }
  }, [online, friends]);
  const onl = (filter) => {
    const array = filter.filter((cr) =>
      friends.some((curr) => cr.userId === curr)
    );
    setonlinefilter(array);
  };
  const enterSubmit = (e) => {
    if (e.code === "Enter") {
      confirm();
    }
  };
  return (
    <>
      <div className="main">
        <div
          className={toggletop ? "navbar-hide nav-top" : "navbar-show nav-top"}
        >
          <div
            className={active ? "btn-toggle btn-top" : "btn-hide btn-top"}
            onClick={() => {
              tog();
              toggletopbar();
            }}
          >
            <ArrowBackIcon />
          </div>
          <Navbar toggle={tog} button={active} />
        </div>

        <div className={toggletop ? "visible navtoggle" : "hide navtoggle"}>
          <div
            className="btn-toggle btn-top2"
            onClick={() => {
              tog();
              toggletopbar();
            }}
          >
            <ArrowBackIcon />
          </div>
          <Topbar id={topbarid} toggle={tog} toggletop={toggletopbar} />
        </div>

        <div className="container">
          <div className={hide ? "friends-cont" : "friends-cont ff"}>
            <div className="friendmenu">
              <List
                sx={{ width: "100%", bgcolor: "background.paper" }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Friends" />
                  {frqNotif && <div className="notif">{number}</div>}
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={
                        addfr
                          ? { bgcolor: "#5c5e5d", pl: 4 }
                          : { bgcolor: "background.paper", pl: 4 }
                      }
                      onClick={handleadd}
                    >
                      <ListItemIcon>
                        <PersonAddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Friend" />
                    </ListItemButton>
                    <ListItemButton
                      className="frqBtn"
                      sx={
                        request
                          ? { bgcolor: "#5c5e5d", pl: 4 }
                          : { bgcolor: "background.paper", pl: 4 }
                      }
                      onClick={handlereq}
                    >
                      <ListItemIcon>
                        <ForwardToInboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Friend Request" />
                      {frqNotif && <div className="notif">{number}</div>}
                    </ListItemButton>
                    <ListItemButton
                      sx={
                        pending
                          ? { bgcolor: "#5c5e5d", pl: 4 }
                          : { bgcolor: "background.paper", pl: 4 }
                      }
                      onClick={handlepending}
                    >
                      <ListItemIcon>
                        <PendingIcon />
                      </ListItemIcon>
                      <ListItemText primary="Pending" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </div>
            {friends[0] ? (
              friends.map((c, i) => (
                <div className="friends" key={c}>
                  <Friends
                    key={i}
                    change={triggerr}
                    changeconvo={handle}
                    remove={sendfriendremoveid}
                    online={online}
                    refresh={refreshmsg}
                    toggle1={tog}
                    current={c}
                  />
                </div>
              ))
            ) : (
              <div className="altnofr">No friends</div>
            )}
          </div>
          <div className={toggle ? "ui pew" : "ui"}>
            {active ? (
              request ? (
                friendrequest[0] ? (
                  <div>
                    {friendrequest.map((cr, i) => (
                      <FriendRequest
                        key={i}
                        pending={sendpendingid}
                        accept={sendfriendacceptid}
                        change={triggerr}
                        req={cr}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="alt-text">"No friend request"</div>
                )
              ) : pending ? (
                sentrequest ? (
                  <div>
                    <div className="header">
                      <p className="hd-title">Pending</p>
                      <hr />
                    </div>
                    {sentrequest.map((cr, i) => (
                      <SentRequest key={i} sent={cr} />
                    ))}
                  </div>
                ) : (
                  <div className="alt-text">"No Pending requests"</div>
                )
              ) : (
                <div className="Add friend">
                  <AddFriend
                    change={triggerr}
                    request={sendfriendreqid}
                    user={User[0]}
                  />
                </div>
              )
            ) : conversationactive ? (
              <div className="msg-main">
                {messages[0] ? (
                  <div className="cont-msg">
                    {messages.map((cr, i) => (
                      <div key={cr._id} ref={element} className="messages">
                        <Messages prop={cr} chk={cr.senderid === user._id} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alt-text">"no messages here"</div>
                )}
                <div className="input">
                  <input
                    className="input-field"
                    onKeyUp={enterSubmit}
                    id="newmessage"
                    onChange={handleChange}
                    value={newmsg.newmessage}
                    placeholder="Type your message"
                    type="text"
                  />
                  <div onClick={confirm} className="btn-send">
                    <SendIcon />
                  </div>
                </div>
              </div>
            ) : (
              <div className="alt-text">
                <h1>CLICK TO START A CONVERSATION</h1>
              </div>
            )}
          </div>
          <div className="online-cont">
            <p>Online</p>
            <hr />
            {onlinefilter &&
              onlinefilter.map((cr) => (
                <div className="me">
                  <Online pro={cr.userId} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversaton;
