import mongoose from "mongoose";
import { UserSchema } from "../schemas/index.js";

const User = mongoose.model("User", UserSchema);
