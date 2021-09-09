import PostMessage from "../models/postMessage.js";

export const getposts = async (req, res) => {
  try {
    console.log("*gettting posts...");
    // old post with plain text, PostMessage
    const postMessage = await PostMessage.find();

    res.status(200).json(postMessage);
    console.log("*done gettting posts...!");
  } catch (err) {
    res.status(404).json(err.message);
  }
};

//  for one post, currently getting for  "description test"
export const getpostsbyID = async (req, res) => {
  try {
    console.log("*gettting posts by id...");
    const postMessage = await PostswithRichEditor.findOne({
      _id: "60f29293bd54203900bad6af",
    });
    // 60f26406ccb55a08c8acfe92 60f165544e792f3180d7fb7f 60f2752d63cbdf2adc9ef2be
    // 60f28e500ac73a3834a3857f
    res.status(200).json(postMessage);
    console.log("*done gettting posts by id...!");
  } catch (err) {
    res.status(404).json(err.message);
  }
};
export const getSinglePost = async (req, res) => {
  try {
    const postMessage = await PostMessage.findById(req.params.id);

    res.status(200).json(postMessage);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

// export const getposts = (req, res) => {
//   user.find((error, data) => {
//       if (error) {
//           return next(error)
//       } else {
//           res.json(data)
//       }
//   })
// }
export const deletePost = (req, res, next) => {
  PostMessage.deleteOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      console.log("deleted successfully!", data);
    }
  });
};

export const createPost = (req, res, next) => {
  PostMessage.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      console.log("fom", data);
    }
  });
};

export const getComments = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comments = await PostMessage.find(
      { _id: commentId },
      { comments: 1 }
    );
    if (comments)
      return res.json({ success: true, data: comments[0].comments });
  } catch (e) {
    return res.json({ success: false, error: e });
  }
};

export const createComments = async (req, res) => {
  // const id = "60fe558a58bb2b2b40ef5842";
  const { id, author, text } = req.body;

  try {
    if (!author || !text) {
      // we should throw an error. we can do this check on the front end
      return res.json({
        success: false,
        error: "You must provide an author and comment",
      });
    }
    const comment = {
      author,
      text,
    };
    const data = await PostMessage.updateOne(
      { _id: id },
      { $push: { comments: comment, autoIndexId: false } }
    );
    return res.json({ success: true, data });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

// export const likePost = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const liked = await PostMessage.findOneAndUpdate(
//       { _id: id },
//       { $inc: { likeCount: 1 }, liked: true }
//     );
//     if (liked) return res.json({ success: true });
//   } catch (e) {
//     return res.json({ success: false, error: e });
//   }
// };
// export const DislikePost = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const liked = await PostMessage.findOneAndUpdate(
//       { _id: id },
//       { $inc: { likeCount: -1 } }
//     );
//     if (liked) return res.json({ success: true, likes: liked.likeCount });
//   } catch (e) {
//     return res.json({ success: false, error: e });
//   }
// };

export const likePost = async (req, res) => {
  const { postId, userId } = req.body;
  // console.log(postId, userId, "pp");

  try {
    const liked = await PostMessage.updateOne(
      {
        _id: postId,
        likes: { $ne: userId },
      },
      {
        $inc: { likeCount: 1 },
        $push: { likes: userId },
      }
    );

    if (liked) return res.json({ success: true, likes: liked.likeCount });
  } catch (e) {
    return res.json({ success: false, error: e });
  }
};

// db.photos.update(
//   {
//       "_id": ObjectId("54bb201aa3a0f26f885be2a3"),
//       "likes": ObjectId("54bb2244a3a0f26f885be2a4")
//   },
//   {
//       "$inc": { "likeCount": -1 },
//       "$pull": { "likes": ObjectId("54bb2244a3a0f26f885be2a4") }
//   }
// )

export const DislikePost = async (req, res) => {
  const { postId, userId } = req.body;
  // console.log(postId, userId, "pp");

  try {
    const liked = await PostMessage.findOneAndUpdate(
      {
        _id: postId,
        likes: userId,
      },
      {
        $inc: { likeCount: -1 },
        $pull: { likes: userId },
      }
    );

    return res.json({ success: true, liked });
  } catch (e) {
    return res.json({ success: false, error: e });
  }
};

export const checklikePost = async (req, res) => {
  const { postId, userId } = req.body;
  console.log(userId, "kkk", postId);

  try {
    const liked = await PostMessage.find(
      {
        _id: postId,
      },
      {
        likeCount: 1,
        likes: {
          $elemMatch: { $eq: userId },
        },
      }
    );

    return res.json({ liked: liked[0] });
  } catch (e) {
    return res.json({ success: false, error: e });
  }
};
