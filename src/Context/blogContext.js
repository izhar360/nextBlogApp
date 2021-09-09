import React, { createContext, useEffect, useState } from "react";
import { fetchposts, fetchSinglePost } from "../api/index";

const PostsContext = createContext();

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
