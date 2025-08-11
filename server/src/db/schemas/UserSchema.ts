import mongoose from "mongoose";
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can have the same email
  },
  password: {
    type: String,
    required: true,
  },
  acceptTerms: {
    type: Boolean,
    required: true,
  },
});

// Virtual for id
UserSchema.virtual("id").get(function () {
  return this._id;
});

// Ensure virtuals are included in toJSON and toObject
UserSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    const { _id, __v, ...rest } = ret;
    return { ...rest, id: _id };
  },
});

UserSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    const { _id, __v, ...rest } = ret;
    return { ...rest, id: _id };
  },
});

export { UserSchema };
