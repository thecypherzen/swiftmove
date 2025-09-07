import mongoose, { InferSchemaType } from "mongoose";
import * as uuid from "uuid";

const { v7: uuidv7 } = uuid;

export const StateSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv7,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameCode: {
      // e.g., "ENU" for Enugu
      type: String,
      trim: true,
    },
    countryId: {
      // FK to Country
      type: String,
      ref: "Country",
      required: true,
    },
  },
  { timestamps: true }
);

StateSchema.virtual("id").get(function () {
  return this._id;
});

StateSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    const { _id, __v, ...rest } = ret;
    return { ...rest, id: _id };
  },
});

StateSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    const { _id, __v, ...rest } = ret;
    return { ...rest, id: _id };
  },
});

export type StateSchemaType = InferSchemaType<typeof StateSchema>;

export type StateSchemaObjectType = Omit<StateSchemaType, "_id"> & {
  id: string;
};
