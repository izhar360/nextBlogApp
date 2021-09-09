import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import postsRoutes from "./routes/posts.js";
import userRouter from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 100000,
  })
);
app.use(
  bodyParser.json({
    limit: "50mb",
    parameterLimit: 100000,
  })
);

app.use("/user", userRouter);
app.use("/posts", postsRoutes);
app.use("/comments", commentRoutes);

// mongodb://localhost:27017/mernSite
//"mongodb+srv://mernSite:mernSite123@cluster0.hmolp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const CONNECTION_URL = "mongodb://localhost:27017/mernSite";
const PORT = 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message, "ss"));

mongoose.set("useFindAndModify", false);
