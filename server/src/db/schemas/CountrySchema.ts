import mongoose from "mongoose";
import * as uuid from "uuid";

const { v7: uuidv7 } = uuid;

export const CountrySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv7,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameCode: {
      // e.g., "US", "NG"
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phoneCode: {
      // e.g., "+1", "+234"
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Virtual for id
CountrySchema.virtual("id").get(function () {
  return this._id;
});

// Ensure virtuals are included in toJSON and toObject
CountrySchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    const { _id, __v, ...rest } = ret;
    return { ...rest, id: _id };
  },
});

CountrySchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    const { _id, __v, ...rest } = ret;
    return { ...rest, id: _id };
  },
});

export type CountrySchemaType = {
  _id: string;
  name: string;
  nameCode: string;
  phoneCode: string;
};

export type CountrySchemaObjectType = Omit<CountrySchemaType, "_id"> & {
  id: string;
};
