import express from "express";
import {
  getposts,
  createPost,
  getSinglePost,
  likePost,
  DislikePost,
  checklikePost,
  deletePost,
} from "../controller/posts.js";
//import { protect } from "./../controller/authController.js";

const router = express.Router();
//protect ===> before getposts

router.route("/").get(getposts).post(createPost);

router.route("/checklike").post(checklikePost);
router.route("/like").post(likePost);
router.route("/dislike").post(DislikePost);

router.route("/:id").get(getSinglePost).delete(deletePost);

export default router;
