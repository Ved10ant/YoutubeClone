import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./route/route.js";
import connectDB from "./config/dbConnection.js";

// Load environment variables FIRST
dotenv.config();

import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
});

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// CORS configuration - allow requests from frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes with /user prefix
app.use("/user", routes);

app.get("/", (req, res) => {
  res.send("Hello Everyone");
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded");
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal);
	});
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
