// Comment.js
import React, { useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";

const Comment = (props) => {
  const [email, setEmail] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const { email } = JSON.parse(localStorage.getItem("userData"));
      setEmail(email);
    }
    // console.log("ttt", props.author, email, "ttt");
  }, []);
  return (
    <div className="singleComment">
      <img
        alt="user_image"
        className="userImage"
        src={`https://picsum.photos/70?random=${props.id}`}
      />
      <div className="textContent">
        <div className="singleCommentContent">
          <h3>{props.author}</h3>
          {/* <ReactMarkdown source={props.children} /> */}
          <p>{props.children} </p>
        </div>
        <div className="singleCommentButtons">
          <span className="time">{moment(props.timestamp).fromNow()}</span>
          {/* <a
          onClick={() => {
            props.handleUpdateComment(props.id);
          }}
        >
          update
        </a> */}
          {props.email === email && (
            <a
              onClick={() => {
                props.handleDeleteComment(props.id);
              }}
            >
              delete
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleUpdateComment: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Comment;
