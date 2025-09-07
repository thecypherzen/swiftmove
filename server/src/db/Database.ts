import mongoose, { Document, Model } from "mongoose";
import config from "../config.js";
const { DB_URI, DB_NAME } = config;
import {
  City,
  Country,
  State,
  User,
  type CityModelType,
  type CountryModelType,
  type StateModelType,
  type UserModelType,
} from "./models/index.js";
import {
  ServerError,
  ServerErrorPropsType,
} from "../api/v1/lib/ServerError.js";

const Models: ModelsTypeMap = {
  City,
  Country,
  State,
  User,
};

/**
 * Defines and exposes the Database class. Implements the singleton
 * pattern ensuring only one db connection is maintained and
 * used throughout the app, thereby properly utilising system
 * resources
 * @class
 * @name Database
 * @private @property {DBClientType} client - The database client
 * Currently only Mongoose client is supported but can later be
 * updated to support another client.
 * @private @property {string} db_name - The class name
 */
class Database {
  #client: DBClientType | null = null;
  #db_name = DB_NAME;

  /**
   * @constructor Class constructor
   */
  constructor() {
    this.init();
  }

  /**
   * Initialises the database.
   * @method init
   */
  async init() {
    if (!this.#client) {
      this.#client = mongoose;
      await this.#client.connect(DB_URI, { dbName: this.#db_name });
      this.#client.connection.on("connect", () => {
        console.log("DB connection established");
      });
      this.#client.connection.on("error", (err) => {
        console.log("DB connection failed.\nCAUSE\n\t", err);
        throw new DBError({
          message: "DB client failed to connect",
          errno: "52",
          cause: err,
        });
      });
    }
  }

  /**
   * @private @method test Tests client connection
   */
  async test(): Promise<boolean> {
    if (this.#client) {
      if (this.#client.connection.readyState !== 1) {
        console.log("DB connection active");
        return true;
      } else {
        console.error("DB connection inactive");
        return false;
      }
    }
    return false;
  }

  /**
   * Gets the active db client. If none, initialises it
   * before returning.
   * @returns {NonNullable<DBClientType>}
   */
  get client() {
    if (!this.#client) {
      this.init();
    }
    return this.#client;
  }

  /**
   * @function create - Creates a new instance of a model
   * @param {DBModelName} Model - Model name: basically a string
   * @param { Record<string, any>} data - An object representing the
   * data with which to populate the item in db
   * @returns {Promise<Object | DBError>} - A promise that resolves to
   *   created instance's data on success
   *   or DBError on failure
   */
  async create<T>(Model: mongoose.Model<T>, data: Record<string, any>) {
    if (!Model) {
      throw new DBError({ message: "Unknown Model Reference", errno: "53" });
    }
    if (!this.#client) {
      this.init();
    }
    try {
      const newInstance = await Model.create(data);
      return newInstance;
    } catch (err: any) {
      console.error(err);
      throw new DBError({
        message: `${Model.name} creation failed`,
        errno: "53",
        cause: DBError.constructErrorCause(err),
      });
    }
  }

  /**
   * Updates a record in db if it exists.
   * @public
   * @function deleteOne
   * @param {DBModelNameType} Model - the name of db model to search
   * @param {Object} filters - fields to filter by.
   * For now, it expects the filters to match Mongodb search object, which
   * can include conditions, projections and options.
   * @returns {Promise<Model | null>} Promise that resolves to the deleted
   * document if it was found or null otherwise.
   * @throws {DBError} - Error thrown if an error occured during db op
   */
  async deleteOne<T>(Model: mongoose.Model<T>, filters: Record<string, any>) {
    if (!Model) {
      throw new DBError({ message: "Unknown Model Reference", errno: "53" });
    }
    if (!this.#client) {
      this.init();
    }
    try {
      const data = Model.findOneAndDelete(filters);
      return data;
    } catch (err: any) {
      console.error(err);
      throw new DBError({
        message: `Query on ${Model.name} failed`,
        errno: "53",
        cause: DBError.constructErrorCause(err),
      });
    }
  }

  /**
   * Checks if a record exists in the database based on given filters.
   * @public @method exists
   * @param {DBModelNameType} Model - the name of db model to search
   * @param {Object} filters - fields to filter against.
   * For now, it expects the filters to match Mongodb search object, which
   * can include conditions, projections and options.
   * @returns {Promise<boolean>} Promise that resolves to boolean
   *    if record exists or not.
   * @throws {DBError} - Error thrown if an error occured during db access
   */
  async exists<T>(Model: mongoose.Model<T>, filters: Record<string, any>) {
    if (!Model) {
      throw new DBError({ message: "Unknown Model Reference", errno: "53" });
    }
    if (!this.#client) {
      this.init();
    }
    try {
      const data = await Model.findOne(filters);
      return !!data;
    } catch (err: any) {
      console.error(err);
      throw new DBError({
        message: `Query on ${Model.name} failed`,
        errno: "53",
        cause: DBError.constructErrorCause(err),
      });
    }
  }

  /**
   * Retrives a record from the database based on given filters.
   * @public
   * @function getOne
   * @param {DBModelNameType} Model - the name of db model to search
   * @param {Object} filters - fields to filter against.
   * For now, it expects the filters to match Mongodb search object, which
   * can include conditions, projections and options.
   * @returns {Promise<Model | null>} Promise that resolves to the document
   * if found or null otherwise.
   * @throws {DBError} - Error thrown if an error occured during db access
   */
  async getOne<T>(Model: mongoose.Model<T>, filters: Record<string, any>) {
    if (!Model) {
      throw new DBError({ message: "Unknown Model Reference", errno: "53" });
    }
    if (!this.#client) {
      this.init();
    }
    try {
      const data = Model.findOne(filters);
      return data;
    } catch (err: any) {
      console.error(err);
      throw new DBError({
        message: `Query on ${Model.name} failed`,
        errno: "53",
        cause: DBError.constructErrorCause(err),
      });
    }
  }

  /**
   * Retrives a record from the database based on given filters.
   * @public
   * @function getMany
   * @param {DBModelNameType} Model - the name of db model to search
   * @param {Object} filters - fields to filter against.
   * For now, it expects the filters to match Mongodb search object, which
   * can include conditions, projections and options.
   * @returns {Promise<Model | null>} Promise that resolves to the document
   * if found or null otherwise.
   * @throws {DBError} - Error thrown if an error occured during db access
   */
  async getMany<T>(Model: mongoose.Model<T>, filters: Record<string, any>) {
    if (!Model) {
      throw new DBError({ message: "Unknown Model Reference", errno: "53" });
    }
    if (!this.#client) {
      this.init();
    }
    try {
      const data = Model.find(filters);
      return data;
    } catch (err: any) {
      console.error(err);
      throw new DBError({
        message: `Query on ${Model.name} failed`,
        errno: "53",
        cause: DBError.constructErrorCause(err),
      });
    }
  }
  /**
   * Updates a record in db if it exists.
   * @public
   * @function updateOne
   * @param {DBModelNameType} Model - the name of db model to search
   * @param {Object} filters - fields to filter by.
   * For now, it expects the filters to match Mongodb search object, which
   * can include conditions, projections and options.
   * @param {Object} values - the fields to update with
   * @returns {Promise<Model | null>} Promise that resolves to the updated
   * document it was found or null otherwise.
   * @throws {DBError} - Error thrown if an error occured during db op
   */
  async updateOne<T>(
    Model: mongoose.Model<T>,
    filters: Record<string, any>,
    values: Record<string, any>
  ) {
    if (!Model) {
      throw new DBError({ message: "Unknown Model Reference", errno: "53" });
    }
    if (!this.#client) {
      this.init();
    }
    try {
      const data = Model.findOneAndUpdate(filters, values);
      return data;
    } catch (err: any) {
      console.error(err);
      throw new DBError({
        message: `Query on ${Model.name} failed`,
        errno: "53",
        cause: DBError.constructErrorCause(err),
      });
    }
  }
}

/**
 * @class
 * @name DBError
 * @description Defined a Database Error
 * @property {string} message - Error message
 * @optional @property {string} errno - Error's unique error number
 * @optional @property {ServerErrorCauseType} cause - Error'
 */
export class DBError extends ServerError {
  #name: string;

  constructor({ message, errno = "52", cause }: ServerErrorPropsType) {
    super({ message, errno, cause });
    this.#name = "DBError";
  }
}

// types
export type UserDocumentType = Document & {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  termsAccepted: boolean;
  avatar?: string;
  phoneNumber?: string;
};

export type ModelsTypeMap = {
  City: CityModelType;
  Country: CountryModelType;
  State: StateModelType;
  User: UserModelType;
};

export type DBModelNameType = keyof typeof Models;
type DBClientType = typeof mongoose | null;

const db = new Database();

export default db;
