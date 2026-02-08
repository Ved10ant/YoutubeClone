import express from "express";
import { login, createChannel } from "../controller/auth.js";
import {
  getComments,
  createComment,
  likeComment,
  dislikeComment,
  deleteComment,
} from "../controller/comment.js";

const routes = express.Router();

// Auth routes
routes.post("/login", login);
routes.post("/create-channel", createChannel);

// Comment routes
routes.get("/comments/:videoId", getComments);
routes.post("/comments", createComment);
routes.post("/comments/:commentId/like", likeComment);
routes.post("/comments/:commentId/dislike", dislikeComment);
routes.delete("/comments/:commentId", deleteComment);

export default routes;
