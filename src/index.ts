import dotenv from "dotenv-safe";
import { add } from "./helpers/add";
dotenv.config();
console.log(add(2, 4));
