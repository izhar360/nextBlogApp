import axios from "axios";

const URL = "http://localhost:5000/posts";
const COMMENTS_URL = "http://localhost:5000/comments";
const USER_URL = "http://localhost:5000/user";

export const SignUpUser = (user) => axios.post(`${USER_URL}/signup`, user);
export const SignInUser = (user) => axios.post(`${USER_URL}/login`, user);

export const fetchposts = () => axios.get(URL);

export const fetchSinglePost = (id) => axios.get(`${URL}/${id}`);

export const DeleteSinglePost = (id) => axios.delete(`${URL}/${id}`);

export const checklikes = (data) => axios.post(`${URL}/checklike`, data);
export const likePost = (data) => axios.post(`${URL}/like`, data);
export const dislikePost = (data) => axios.post(`${URL}/dislike`, data);

export const createPost = (newPost) => axios.post(URL, newPost);

export const fetchComments = (id) =>
  axios.get(`${COMMENTS_URL}/comments/${id}`);

export const recentComments = () => axios.get(`${COMMENTS_URL}/recent`);

export const submitCommentApi = (newcomment) =>
  axios.post(`${COMMENTS_URL}/comments`, newcomment);

export const updateComment = ({ updateId, author, text }) =>
  axios.put(`${COMMENTS_URL}/comments/${updateId}`, { author, text });

export const deleteComment = (updateId) =>
  axios.delete(`${COMMENTS_URL}/comments/${updateId}`);

//   fetch(`api/comments/${id}`, { method: "DELETE" })
//   .then((res) => res.json())
//   .then((res) => {
//     if (!res.success) this.setState({ error: res.error });
//   });

// fetch(`/api/comments/${updateId}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ author, text }),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       if (!res.success)
//         this.setState({ error: res.error.message || res.error });
//       else this.setState({ author: "", text: "", updateId: null });
//     });
