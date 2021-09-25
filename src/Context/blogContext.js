import React, { createContext, useEffect, useState } from "react";
import { fetchposts } from "../api/index";

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
  const [loading, setLoading] = useState(false);
  const [Posts, setPosts] = useState([]);
  const [error, setError] = useState();

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
        setLoading(false);
        setError(error);
        console.log(error, "llal");
      }
    };
    getpost();
  }, []);

  // useEffect(() => {
  //   if (Posts.length > 0) {
  //     let PopularPosts = [...Posts];
  //     PopularPosts = PopularPosts.sort((a, b) =>
  //       a.likeCount > b.likeCount ? 1 : b.likeCount > a.likeCount ? -1 : 0
  //     );
  //     PopularPosts = PopularPosts.sort((a, b) =>
  //       a.comments.length > b.comments.length
  //         ? 1
  //         : b.comments.length > a.comments.length
  //         ? -1
  //         : 0
  //     );

  //     setPopularPosts(PopularPosts);
  //   }
  // }, [Posts]);

  useEffect(() => {
    setPostData(getEditPostfromLocalStrorage());
    localStorage.removeItem("editPost");
  }, []);

  return (
    <PostsContext.Provider
      value={{
        Posts,
        postData,
        setPostData,
        error,
        loading,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export { PostsContextProvider, PostsContext };
