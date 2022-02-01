import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv-safe";
import user from "./routes/user";
dotenv.config();

async function main() {
  const app = express();
  const PORT = process.env.PORT || 5000;
  try {
    await mongoose.connect("mongodb://localhost/my_database");
    app.use(express.json());
    app.use(express.urlencoded());
    app.use("/api", user);
    app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
