// CommentBox.js
import React, { Component } from "react";
import "whatwg-fetch";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import {
  fetchComments,
  updateComment,
  submitCommentApi,
  deleteComment,
} from "../../api";

class CommentBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      author: "",
      text: "",
      comment: "",
      updateId: null,
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    this.setState({ author: this.props.user.firstName });
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  onUpdateComment = (id) => {
    const oldComment = this.state.data.find((c) => c._id === id);
    if (!oldComment) return;
    this.setState({
      author: oldComment.author,
      text: oldComment.text,
      updateId: id,
    });
  };

  onDeleteComment = async (id) => {
    const i = this.state.data.findIndex((c) => c._id === id);
    const data = [
      ...this.state.data.slice(0, i),
      ...this.state.data.slice(i + 1),
    ];
    this.setState({ data });
    try {
      await deleteComment(id);
      console.log("comment deleted");
    } catch (err) {
      console.log("could not deleted!");
    }
  };

  submitComment = (e) => {
    e.preventDefault();

    const { author, text, updateId } = this.state;
    if (!author || !text) return;
    if (updateId) {
      this.submitUpdatedComment();
    } else {
      this.submitNewComment();
    }
  };

  submitNewComment = async () => {
    const { author, text } = this.state;
    const { id } = this.props;
    const data = [
      ...this.state.data,
      { author, text, _id: Date.now().toString() },
    ];
    this.setState({ data });
    try {
      const data = await submitCommentApi({ id, author, text });
      console.log("successfully updated!");
    } catch (err) {
      console.log(err);
    }
  };

  submitUpdatedComment = async () => {
    const { author, text, updateId } = this.state;
    try {
      const data = await updateComment({ updateId, author, text });
      console.log("successfully updated!");
    } catch (err) {
      console.log(err);
    }
  };

  loadCommentsFromServer = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

    const getpost = async () => {
      const { id } = this.props;
      try {
        const { data } = await fetchComments(id);
        this.setState({ data: data.data });
      } catch (error) {
        console.log(error);
        this.setState({ error: error.message });
      }
    };
    getpost();
  };

  render() {
    return (
      <div className="containerComment">
        <div className="comments">
          <h2>Comments:</h2>
          <CommentList
            data={this.state.data}
            handleDeleteComment={this.onDeleteComment}
            handleUpdateComment={this.onUpdateComment}
          />
        </div>
        <div className="formComment">
          <CommentForm
            // author={this.state.author}
            text={this.state.text}
            token={this.props.user.token}
            handleChangeText={this.onChangeText}
            submitComment={this.submitComment}
          />
        </div>
        {this.state.error && (
          <p style={{ color: "#fff" }}>{this.state.error}</p>
        )}
      </div>
    );
  }
}

export default CommentBox;
