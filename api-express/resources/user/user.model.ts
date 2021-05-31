import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Za-z0-9_-]*$/,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      sparse: true,
      minLength: 5,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const userModelName = "User";

const User = mongoose.model(userModelName, userSchema);

export default User;
