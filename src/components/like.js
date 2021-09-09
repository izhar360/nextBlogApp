import React, { Component } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { dislikePost, likePost, checklikes } from "../api";

class Like extends Component {
  constructor() {
    super();
    this.state = {
      liked: false,
      likeCount: "",
      id: "",
    };
  }
  toggle = async () => {
    let localLiked = this.state.liked;

    // Toggle the state variable liked
    localLiked = !localLiked;
    this.setState({ liked: localLiked });

    const likecounter = this.state.likeCount;

    const obj = {
      postId: this.props.id,
      userId: this.state.id,
    };
    try {
      if (localLiked) {
        const { data } = await likePost(obj);
        this.setState({ likeCount: likecounter + 1 });
      } else {
        const data = await dislikePost(obj);
        this.setState({ likeCount: likecounter - 1 });
      }
    } catch (e) {
      console.log("error liking/disliking...", e);
    }
  };

  async componentDidMount() {
    if (localStorage.getItem("userData")) {
      const { _id } = JSON.parse(localStorage.getItem("userData"));
      this.setState({ id: _id });

      try {
        const obj = {
          postId: this.props.id,
          userId: _id,
        };
        const { data } = await checklikes(obj);
        if (data) {
          this.setState({ likeCount: data.liked.likeCount });
        }
        if (data.liked.likes.length > 0) {
          this.setState({ liked: true });
        }
      } catch (e) {
        console.log("error check likes...", e);
      }
    }
  }
  render() {
    return (
      <div>
        <center>
          <p>Did you like the Article?</p>
          <div style={{ width: "90px" }} onClick={() => this.toggle()}>
            {this.state.liked === false ? (
              <FavoriteBorderIcon
                color="primary"
                style={{ fontSize: "40px" }}
              />
            ) : (
              <FavoriteIcon color="primary" style={{ fontSize: "40px" }} />
            )}
            <h4 style={{ marginTop: "0" }}>{this.state.likeCount}</h4>
          </div>
        </center>
      </div>
    );
  }
}

export default Like;
