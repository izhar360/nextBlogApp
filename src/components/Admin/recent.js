import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { PostsContext } from "../../Context/blogContext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "react-reveal/Fade";

import { DeleteSinglePost } from "../../api";

const useStyles = makeStyles({
  Recent: {
    width: "88%",
    background: "#fff",
    border: "1px solid #fff",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.24)",
    padding: "15px",
  },
  Article: {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "12px",
    marginTop: "6px",
  },
  topics: {
    color: "#878FA5",
    fontWeight: "500",
    marginBottom: "10px",
  },
  dataBar: {
    marginTop: "14px",
    marginBottom: "5px",
    color: "#878FA5",
    fontWeight: "500",
    fontSize: "13px",
  },
  Number: {
    color: "#fff",
    background: "#1082E8",
    width: "20px",
    textAlign: "center",
    borderRadius: "20%",
  },
  img: {
    width: "100%",
    borderRadius: "15%",
  },
  title: {
    marginLeft: "6px",
  },
  category: {
    color: "#fff",
    height: "100%",
    width: "100%",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  },
  backgroundCategory: {
    background: "#F82485",
  },
  backgroundCategory2: {
    background: "#229EBD",
  },

  center: {
    display: "flex",
    alignItems: "center",
  },
});

const Recent = (props) => {
  const classes = useStyles();
  const { Posts } = React.useContext(PostsContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedPost, setselectedPost] = React.useState(null);

  const handleClick = (e, id) => {
    setAnchorEl(e.currentTarget);
    setselectedPost(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePostfunc = async (id) => {
    try {
      const { data } = await DeleteSinglePost(id);
      console.log("this deleted =>", data);
    } catch (e) {
      console.log("error deleting...", e);
    }
    setAnchorEl(null);
  };

  const GetFormattedDate = (d) => {
    const date = new Date(d);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    return day + "/" + month + "/" + year;
  };
  return (
    <Grid container direction="column" className={classes.Recent}>
      <Grid item className={classes.Article}>
        Recent Articles
      </Grid>

      <Grid item container direction="column">
        <Grid item container spacing={2} className={classes.topics}>
          <Grid item xs className={classes.center}>
            No
          </Grid>
          <Grid item xs={4} className={classes.center}>
            Title
          </Grid>
          <Grid item xs className={classes.center}>
            Date
          </Grid>
          <Grid item xs={2} className={classes.center}>
            Category
          </Grid>
          <Grid item xs className={classes.center}>
            Comments
          </Grid>
          <Grid item xs className={classes.center}>
            Likes
          </Grid>
          <Grid item xs className={classes.center}>
            <IconButton aria-haspopup="true">
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
        {Posts.map((post, i) => (
          <Fade bottom delay={`${i}00`}>
            <Grid
              key={i}
              item
              container
              spacing={2}
              className={classes.dataBar}
            >
              <Grid
                item
                xs
                container
                justifyContent="flex-start"
                alignItems="center"
              >
                <div className={classes.Number}>{i + 1}</div>
              </Grid>
              <Grid
                item
                container
                justifyContent="flex-start"
                alignItems="flex-start"
                xs={4}
                style={{ marginTop: "8px" }}
              >
                <Grid item xs={3}>
                  <img src={post.selectedFile} className={classes.img} />
                </Grid>
                <Grid item xs={8} className={classes.title}>
                  {post.title}
                </Grid>
              </Grid>
              <Grid item xs className={classes.center}>
                {GetFormattedDate(post.createdAt)}
              </Grid>
              <Grid item xs={2}>
                <div
                  className={
                    i % 2 == 0
                      ? `${classes.category} ${classes.backgroundCategory}`
                      : `${classes.category} ${classes.backgroundCategory2}`
                  }
                >
                  {post.tags[0]}
                </div>
              </Grid>
              <Grid item xs className={classes.center}>
                {post.comments.length}
              </Grid>
              <Grid item xs className={classes.center}>
                {post.likeCount}
              </Grid>
              <Grid item xs>
                <IconButton
                  aria-haspopup="true"
                  onClick={(e) => handleClick(e, post._id)}
                >
                  <MoreVertIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Fade>
        ))}
      </Grid>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={() => deletePostfunc(selectedPost)}>Delete</MenuItem>
      </Menu>
    </Grid>
  );
};

export default Recent;
