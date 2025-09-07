import mongoose from "mongoose";
import { type Request, type Response } from "express";
import { BaseController } from "./BaseController.js";
import { City, Country, State } from "../../../db/models/index.js";
import { CountrySchemaType } from "../../../db/schemas/CountrySchema.js";
import { StateSchemaType } from "../../../db/schemas/StateSchema.js";
import { CitySchemaType } from "../../../db/schemas/CitySchema.js";
import db from "../../../db/Database.js";
import { ServerError } from "../lib/ServerError.js";

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

  create = async (req: Request, res: Response): Promise<void> => {
    const data = this.getValidatedData(req, res);
    if (!data) return;
    try {
      const exists = await db.exists(this.model, data);
      if (exists) {
        this.sendJSON(res, { errno: "33", type: "validation" });
        return;
      }
      const newInstance = await db.create(this.model, data);
      this.sendJSON(res, {
        type: "success",
        data: [newInstance.toObject],
      });
    } catch (err) {
      this.sendJSON(res, {
        type: "server",
        data: [{ error: JSON.stringify(err, ServerError.SerialiseFn, 2) }],
      });
      return;
    }
  };
  read = async (req: Request, res: Response): Promise<void> => {};
  delete = async (req: Request, res: Response): Promise<void> => {};
  update = async (req: Request, res: Response): Promise<void> => {};
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
