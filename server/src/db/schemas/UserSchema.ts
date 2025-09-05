import mongoose from "mongoose";
import * as uuid from "uuid";
import { UserRoleType } from "../../api/v1/lib/types.js";

const { v7: uuidv7 } = uuid;

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv7,
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
    role: {
      type: String,
      enum: ["admin", "user", "driver"],
      default: "user", // You can also set a default value
    },
  },
  { timestamps: true }
);

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

export type UserSchemaType = {
  _id: string;
  firstName?: string;
  lastname?: string;
  email: string;
  password: string;
  termsAccepted: boolean;
  avatar?: string;
  phoneNumber?: string;
  role: UserRoleType;
  [key: string]: any;
};

export type UserSchemaObjectType = Omit<UserSchemaType, "_id" | "password"> & {
  id: string;
};
export { UserSchema };
