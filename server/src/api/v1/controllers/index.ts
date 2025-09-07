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

  /**
   * Create request handler
   * @param {Express.Request} req - request object
   * @param {Express.Response} res - response object
   * @returns {Promise<void>} - Promise resolving to void
   */
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

  /**
   * Delete request handler
   * @param req
   * @param res
   */
  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deleted = await db.updateOne(this.model, { _id: id }, req.body);
      if (!deleted) {
        this.sendJSON(res, { errno: "34", type: "validation" });
        return;
      }
      this.sendJSON(res, {
        type: "success",
        errno: "02",
      });
    } catch (err) {
      this.sendJSON(res, {
        type: "server",
        data: [{ error: JSON.stringify(err, ServerError.SerialiseFn, 2) }],
      });
    }
    return;
  };

  /**
   * Read request handler
   * @param req
   * @param res
   */
  read = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      if (id) {
        const instance = await db.getOne(this.model, { _id: id });
        this.sendJSON(res, {
          type: "success",
          data: instance ? [instance] : [],
        });
        return;
      }
      const instances = await db.getMany(this.model, {});
      this.sendJSON(res, {
        type: "success",
        data: instances,
      });
      return;
    } catch (err) {
      this.sendJSON(res, {
        type: "server",
        data: [{ error: JSON.stringify(err, ServerError.SerialiseFn, 2) }],
      });
    }
    return;
  };

  /**
   * Update request handler
   * @param req
   * @param res
   */
  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const updated = await db.updateOne(this.model, { _id: id }, req.body);
      if (!updated) {
        this.sendJSON(res, { errno: "34", type: "validation" });
        return;
      }
      this.sendJSON(res, {
        type: "success",
        data: [updated],
      });
    } catch (err) {
      this.sendJSON(res, {
        type: "server",
        data: [{ error: JSON.stringify(err, ServerError.SerialiseFn, 2) }],
      });
    }
    return;
  };
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
