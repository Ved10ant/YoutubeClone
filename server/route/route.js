import express from "express";
import { login, createChannel } from "../controller/auth.js";
import {
  getComments,
  createComment,
  likeComment,
  dislikeComment,
  deleteComment,
} from "../controller/comment.js";

import { createOrder, verifyPayment } from "../controller/payment.js";
import { downloadVideo } from "../controller/user.js";

const routes = express.Router();

// Auth routes
routes.post("/login", login);
routes.post("/create-channel", createChannel);

// Payment routes
routes.post("/payment/orders", createOrder);
routes.post("/payment/verify", verifyPayment);

// User routes
routes.post("/user/download", downloadVideo);

// Comment routes
routes.get("/comments/:videoId", getComments);
routes.post("/comments", createComment);
routes.post("/comments/:commentId/like", likeComment);
routes.post("/comments/:commentId/dislike", dislikeComment);
routes.delete("/comments/:commentId", deleteComment);

export default routes;
