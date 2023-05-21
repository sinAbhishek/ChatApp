import React from "react";
import "./messages.css";
const Messages = ({ prop, chk }) => {
  const date = new Date(prop.createdAt).toLocaleTimeString();

  return chk ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <div className="txtCon">
          <p className="messageText colorWhite">{prop.message}</p>
          <div className="time">
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <div className="txtCon">
          <p className="messageText colorDark">{prop.message}</p>
          <div className="time2">
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
