import users from "../models/user.js";
import mongoose from "mongoose";

export const login = async (req, res) => {
  const { name, username, email, image } = req.body;
  
  // Check if database is connected
  if (mongoose.connection.readyState !== 1) {
    console.error("Database not connected. Connection state:", mongoose.connection.readyState);
    return res.status(503).json({ 
      message: "Database connection not available. Please check your MongoDB connection.",
      error: "Database not connected"
    });
  }
  
  // Support both 'name' (from frontend) and 'username' fields
  const userName = username || name;
  
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  
  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      try {
        const newUser = await users.create({ 
          username: userName, 
          name: userName,
          email, 
          image 
        });
        res.status(200).json({ result: newUser });
      } catch (err) {
        console.error(`Error creating user: ${err.message}`);
        res.status(500).json({ message: "Error creating user", error: err.message });
        return;
      }
    } else {
      // User exists, return the existing user
      res.status(200).json({ result: existingUser });
    }
  } catch (err) {
    console.error(`Error in login: ${err.message}`);
    res.status(500).json({ message: "Error occurred", error: err.message });
    return;
  }
};

export const createChannel = async (req, res) => {
  const { userId, channelName } = req.body;
  try {
    const updatedUser = await users.findByIdAndUpdate(
      userId,
      { channelname: channelName },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ result: updatedUser });
  } catch (err) {
    console.log(`Error Occurred: ${err}`);
    res.status(500).json({ message: "Error occurred while creating channel" });
  }
};
