import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({ name: String });

export { UserSchema };
