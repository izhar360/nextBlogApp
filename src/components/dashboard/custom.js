import React, { useContext } from "react";
import EditorJS from "@editorjs/editorjs";
import { useRouter } from "next/router";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import CodeTool from "@editorjs/code";
import list from "@editorjs/list";
import quote from "@editorjs/quote";
import raw from "@editorjs/raw";
import embed from "@editorjs/embed";
import SimpleImage from "@editorjs/simple-image";
import { Button } from "@material-ui/core";

import { PostsContext } from "../../Context/blogContext";
import { createPost } from "../../api/index";

/**
 * @author
 * @function Custom
 **/

const editor = new EditorJS({
  holder: "editorjs",

  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },
    list: list,
    code: {
      class: CodeTool,
    },
    image: SimpleImage,
    quote: quote,
    embed: embed,
    raw: raw,
  },
});

const Custom = (props) => {
  
  const { postData } = React.useContext(PostsContext);
  const router = useRouter();
  
  const sumbitArticle = async () => {
    editor
      .save()
      .then(async (savedData) => {
        try {
          const obj = {
            ...postData,
            blockContent: savedData.blocks,
          };

          console.log("the obj", obj, "ooooooo");

          const data = await createPost(obj);

          if (data) {
            console.log("data saved in database!", data);
            router.push("/");
          }
        } catch (e) {
          console.log("couldnot save data to DB", e);
        }
      })
      .catch((error) => {
        console.error("Saving error", error);
      });
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        style={{ position: "fixed", right: "20px", top: "15px" }}
        onClick={() => sumbitArticle()}
      >
        Post Article
      </Button>
    </>
  );
};

export default Custom;
