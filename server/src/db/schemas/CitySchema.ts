import mongoose, { InferSchemaType } from "mongoose";
import * as uuid from "uuid";
const { v7: uuidv7 } = uuid;

export const CitySchema = new mongoose.Schema(
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
    stateId: {
      // FK to State
      type: String,
      ref: "State",
      required: true,
    },
    countryId: {
      // denormalized for faster lookups
      type: String,
      ref: "Country",
      required: true,
    },
  },
  { timestamps: true }
);

// add virtual id field
CitySchema.virtual("id").get(function () {
  return this._id;
});

// mask _id in toJSON
CitySchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    const { _id, __v, ...rest } = ret;
    return { ...rest, id: _id };
  },
});

// mask _id in toObject
CitySchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    const { _id, __v, ...rest } = ret;
    return { ...rest, id: _id };
  },
});

// types
export type CitySchemaType = InferSchemaType<typeof CitySchema>;

export type CitySchemaObjectType = Omit<CitySchemaType, "_id"> & {
  id: string;
};
