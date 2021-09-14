import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { PostsContext } from "../../Context/blogContext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "react-reveal/Fade";

import { DeleteSinglePost, fetchSinglePost } from "../../api";
import Post from "./post";
import Pagination from "./pagination";

const useStyles = makeStyles((theme) => ({
  Recent: {
    width: "88%",
    background: "#fff",
    ...theme.borderWithShadow,
    padding: "15px",
    borderRadius: "5px",
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

  center: {
    display: "flex",
    alignItems: "center",
  },
}));

const Recent = (props) => {
  const classes = useStyles();
  const router = useRouter();

  const [error, setError] = useState("");
  const { Posts, setPostData } = React.useContext(PostsContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedPost, setselectedPost] = React.useState(null);

  const handleClick = (e, id) => {
    setAnchorEl(e.currentTarget);
    setselectedPost(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editPostfunc = async (id) => {
    try {
      const { data } = await fetchSinglePost(id);
      // const { creator, title, selectedFile, message, tags } = data;

      localStorage.setItem("editPost", JSON.stringify(data));
    } catch (e) {
      console.log("error fetching single post...", e);
    }
    setAnchorEl(null);
    router.push("/dashboard");
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

        {Posts.length > 0 ? (
          <>
            <Pagination
              data={Posts}
              RenderComponent={Post}
              title="Posts"
              pageLimit={5}
              dataLimit={5}
            />
          </>
        ) : (
          <h1>No Posts to display</h1>
        )}

        {/* {Posts.map((post, i) => (
          <Fade key={i} bottom delay={parseInt(`${i * 100}`)}>
            <Post post={post} i={i} handleClick={handleClick} />
          </Fade>
        ))} */}
      </Grid>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => editPostfunc(selectedPost)}>Edit</MenuItem>
        <MenuItem onClick={() => deletePostfunc(selectedPost)}>Delete</MenuItem>
      </Menu>
    </Grid>
  );
};

export default Recent;
