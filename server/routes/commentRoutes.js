import express from "express";
const router = express.Router();
import { updateComment } from "./../controller/commentAuth.js";
import {
  getComments,
  createComments,
  recentComments,
  deleteComment,
} from "./../controller/posts.js";

router.route("/comments/:commentId").get(getComments);
router.route("/recent").get(recentComments);
router.route("/comments").post(createComments);
router.route("/comments/:id/:CommentId").delete(deleteComment);

router.route("/comments/:commentId").put(updateComment);
// router.route("/comments/").delete(deleteComment);

//   router.get('/comments', (req, res) => {
//     Comment.find((err, comments) => {
//       if (err) return res.json({ success: false, error: err });
//       return res.json({ success: true, data: comments });
//     });
//   });

//   router.post('/comments', (req, res) => {
//     const comment = new Comment();
//     // body parser lets us use the req.body
//     const { author, text } = req.body;
//     if (!author || !text) {
//       // we should throw an error. we can do this check on the front end
//       return res.json({
//         success: false,
//         error: 'You must provide an author and comment'
//       });
//     }
//     comment.author = author;
//     comment.text = text;
//     comment.save(err => {
//       if (err) return res.json({ success: false, error: err });
//       return res.json({ success: true });
//     });
//   });

//   router.put('/comments/:commentId', (req, res) => {
//     console.log(req.params);
//     const { commentId } = req.params;
//     if (!commentId) {
//       return res.json({ success: false, error: 'No comment id provided' });
//     }
//     Comment.findById(commentId, (error, comment) => {
//       if (error) return res.json({ success: false, error });
//       const { author, text } = req.body;
//       if (author) comment.author = author;
//       if (text) comment.text = text;
//       comment.save(error => {
//         if (error) return res.json({ success: false, error });
//         return res.json({ success: true });
//       });
//     });
//   });

//   router.delete('/comments/:commentId', (req, res) => {
//     const { commentId } = req.params;
//     if (!commentId) {
//       return res.json({ success: false, error: 'No comment id provided' });
//     }
//     Comment.remove({ _id: commentId }, (error, comment) => {
//       if (error) return res.json({ success: false, error });
//       return res.json({ success: true });
//     });
//   });

export default router;
