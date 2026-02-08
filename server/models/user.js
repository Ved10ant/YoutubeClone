import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, require: true },
  name: String,
  email: { type: String, unique: true },
  description: String,
  channelname: String,
  image: String,
  joindate: {
    type: Date,
    default: Date.now,
  },
});

const users = mongoose.model("users", userSchema);
export default users;
