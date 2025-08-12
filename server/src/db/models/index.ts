import mongoose from "mongoose";
import { UserSchema } from "../schemas/index.js";

export const User = mongoose.model("User", UserSchema);

export type UserModelType = mongoose.Model<typeof User>;
