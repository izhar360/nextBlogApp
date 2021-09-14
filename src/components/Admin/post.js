import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
/**
 * @author
 * @function Post
 **/

const useStyles = makeStyles((theme) => ({
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
}));
const Post = (props) => {
  const { title, selectedFile, _id, likeCount, createdAt, tags, comments } =
    props.data;
  const key = props.index;

  console.log(props);
  const classes = useStyles();

  const GetFormattedDate = (d) => {
    const date = new Date(d);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    return day + "/" + month + "/" + year;
  };

  return (
    <Grid item container spacing={2} className={classes.dataBar}>
      <Grid item xs container justifyContent="flex-start" alignItems="center">
        <div className={classes.Number}>{key + 1}</div>
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
          <img src={selectedFile} className={classes.img} />
        </Grid>
        <Grid item xs={8} className={classes.title}>
          {title}
        </Grid>
      </Grid>
      <Grid item xs className={classes.center}>
        {GetFormattedDate(createdAt)}
      </Grid>
      <Grid item xs={2}>
        <div
          className={
            key % 2 == 0
              ? `${classes.category} ${classes.backgroundCategory}`
              : `${classes.category} ${classes.backgroundCategory2}`
          }
        >
          {tags[0]}
        </div>
      </Grid>
      <Grid item xs className={classes.center}>
        {comments.length}
      </Grid>
      <Grid item xs className={classes.center}>
        {likeCount}
      </Grid>
      <Grid item xs>
        <IconButton aria-haspopup="true" onClick={(e) => handleClick(e, _id)}>
          <MoreVertIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Post;
