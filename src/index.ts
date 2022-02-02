import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv-safe";
import user from "./routes/user";
import cors from "cors";

dotenv.config();

async function main() {
  const app = express();
  const PORT = process.env.PORT || 5000;
  try {
    if (process.env.DATABASE_URL !== undefined)
      await mongoose.connect(process.env.DATABASE_URL);
    else {
      throw "Parameter is not a number!";
    }

    //config cors
    app.use(
      cors({
        origin: "*",
      })
    );

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
