import React, { createContext, useEffect, useState } from "react";
import { fetchposts, fetchSinglePost } from "../api/index";

const PostsContext = createContext();

const getEditPostfromLocalStrorage = () => {
  return localStorage.getItem("editPost")
    ? JSON.parse(localStorage.getItem("editPost"))
    : {
        creator: null,
        title: null,
        message: null,
        tags: null,
        selectedFile: null,
        blocks: null,
      };
};

function PostsContextProvider({ children }) {
  const [name, setname] = useState("bros");
  const [loading, setLoading] = useState(false);
  const [Posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState({});

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    setPostData(getEditPostfromLocalStrorage());
    localStorage.removeItem("editPost");
  }, []);

  useEffect(() => {
    const getpost = async () => {
      try {
        setLoading(true);
        const { data } = await fetchposts();

        setPosts(data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getpost();
  }, []);

  return (
    <PostsContext.Provider value={{ Posts, postData, setPostData }}>
      {children}
    </PostsContext.Provider>
  );
}

export { PostsContextProvider, PostsContext };
