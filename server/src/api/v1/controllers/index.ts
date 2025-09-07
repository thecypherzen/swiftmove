import mongoose from "mongoose";
import { BaseController } from "./BaseController.js";
import { City, Country, State } from "../../../db/models/index.js";
import { CountrySchemaType } from "../../../db/schemas/CountrySchema.js";
import { StateSchemaType } from "../../../db/schemas/StateSchema.js";
import { CitySchemaType } from "../../../db/schemas/CitySchema.js";

class CrudController<T> extends BaseController {
  #name: string;
  #model: mongoose.Model<T>;

  constructor(name: string, model: mongoose.Model<T>) {
    super();
    this.#name = name;
    this.#model = model;
  }

  get name() {
    return this.#name;
  }

  get model() {
    return this.#model;
  }
}

/**
 * Defines a CityController Class
 * @class CityController
 */
export class CityController extends CrudController<CitySchemaType> {
  constructor() {
    super("CityController", City);
  }
}
/**
 * Defines a CountryController Class
 * @class CountryController
 */
export class CountryController extends CrudController<CountrySchemaType> {
  constructor() {
    super("CountryController", Country);
  }
}
/**
 * Defines a StateController Class
 * @class StateController
 */
export class StateController extends CrudController<StateSchemaType> {
  constructor() {
    super("StateController", State);
  }
}
