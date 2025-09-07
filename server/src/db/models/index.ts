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
export type CityModelType = typeof City;
export type CountryModelType = typeof Country;
export type StateModelType = typeof State;
export type UserModelType = typeof User;
