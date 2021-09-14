import React, { useState, useEffect, useContext } from "react";
// import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { PostsContext } from "../src/Context/blogContext";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";

import useStyles from "../src/components/dashboard/style";

const Editor = dynamic(() => import("../src/components/dashboard/custom.js"), {
  ssr: false,
});

const Form = () => {
  const { postData, setPostData } = React.useContext(PostsContext);
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant="h6">Post a Blog</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <div></div>
      </form>
      <div
        id="editorjs"
        style={{
          width: "100%",
          height: "auto",
          margin: "30px 0px 10px 10px",
          border: "1px solid #ccc",
          color: "#666",
          fontFamily: "Hoefler Text Georgia serif",
          padding: "10px 20px",
        }}
      >
        Descriptions:
      </div>
      <Editor />
    </Paper>
  );
};

export default Form;
