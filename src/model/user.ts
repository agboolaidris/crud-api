import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name_prefix: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    date_of_birth: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model("users", userSchema);
