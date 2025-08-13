import mongoose from "mongoose";
import * as uuid from "uuid";

const { v4: uuidv4 } = uuid;

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
  termsAccepted: {
    type: Boolean,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
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
    const { _id, __v, password, ...rest } = ret;
    return { ...rest, id: _id };
  },
});

UserSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    const { _id, __v, password, ...rest } = ret;
    return { ...rest, id: _id };
  },
});

export { UserSchema };
