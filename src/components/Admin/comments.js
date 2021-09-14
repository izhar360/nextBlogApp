import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";
import { recentComments } from "../../api";

/**
 * @author
 * @function Comments
 **/

const useStyles = makeStyles((theme) => ({
  CommentsBox: {
    background: "#fff",
    color: "#222",
    padding: "10px",
    ...theme.borderWithShadow,
    width: "90%",
    margin: "50px 0px 0px 0px",
    borderRadius: "10px",
  },
  comment: {
    padding: "5px",
    marginTop: "6px",
  },
  UserImg: {
    width: "100%",
    borderRadius: "10px",
    // height: '100px'
  },
  user: {
    color: "#878FA5",
  },
  username: {
    color: "#F82585",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
}));
const Comments = (props) => {
  const classes = useStyles();
  const [Comments, setComments] = React.useState(null);

  useEffect(() => {
    const CommentsRecent = async () => {
      try {
        const { data } = await recentComments();
        let sortedOne = data.data.sort((a, b) => {
          let da = new Date(a.createdAt),
            db = new Date(b.createdAt);
          return da - db;
        });
        //  console.log(data);
        if (data) setComments(sortedOne.reverse().slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };
    CommentsRecent();
  }, []);
  return (
    <Grid container direction="column" className={classes.CommentsBox}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item style={{ marginLeft: "5px" }}>
          Recent Comments
        </Grid>
        <Grid item>
          <MoreHorizIcon />
        </Grid>
      </Grid>

      {Comments &&
        Comments.map((comment, i) => (
          <Grid key={i} item container spacing={1} className={classes.comment}>
            <Grid item xs={2}>
              <img
                alt="user_image"
                className={classes.UserImg}
                src={`https://picsum.photos/70?random=${Math.floor(
                  Math.random() * 20
                )}`}
              />
            </Grid>
            <Grid item container direction="column" xs={10}>
              <Grid item className={classes.user}>
                <span className={classes.username}>{comment.author}</span> has
                commented
              </Grid>
              <Grid item>{comment.text}</Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default Comments;
