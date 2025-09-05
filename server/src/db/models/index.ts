import mongoose from "mongoose";
import {
  CitySchema,
  CountrySchema,
  StateSchema,
  UserSchema,
} from "../schemas/index.js";

export const City = mongoose.model("City", CitySchema);
export const Country = mongoose.model("Country", CountrySchema);
export const State = mongoose.model("State", StateSchema);
export const User = mongoose.model("User", UserSchema);

// types
export type CityModelType = mongoose.Model<typeof City>;
export type CountryModelType = mongoose.Model<typeof Country>;
export type StateModelType = mongoose.Model<typeof State>;
export type UserModelType = mongoose.Model<typeof User>;
