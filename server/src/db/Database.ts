import mongoose, { Document, Model } from "mongoose";
/**
 * Defines and exposes the Database class
 */
import { MongoClient, ServerApiVersion } from "mongodb";
import config from "../config.js";
const { DB_URI, DB_NAME } = config;
import { User, type UserModelType } from "./models/index.js";
import {
  ServerError,
  ServerErrorCauseType,
  ServerErrorPropsType,
} from "../api/v1/lib/errorDefinitions.js";

const Models = {
  User: User,
};
/**
 * Define the db class as a singleton
 */
class Database {
  #client: typeof mongoose | null = null;
  #db_name = DB_NAME;

  /**
   * @method init Initialise database
   * Also tests connection
   */
  constructor() {
    this.init();
  }

  async init() {
    if (!this.#client) {
      this.#client = mongoose;
      await this.#client.connect(DB_URI, { dbName: this.#db_name });
      this.#client.connection.on("connect", () => {
        console.log("DB connection established");
      });
      this.#client.connection.on("error", (err) => {
        console.log("DB connection failed.\nCAUSE\n\t", err);
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
   * Gets the db client
   * @returns {Database.client}
   */
  get client() {
    if (!this.#client) {
      this.init();
    }
    return this.#client;
  }

  async create(model: DBModelNameType, data: Record<string, any>) {
    const Model = Models[model];
    if (!Model) {
      throw new DBError({ message: "Unnown Model Reference", errno: "53" });
    }
    if (!this.#client) {
      this.init();
    }
    try {
      const newInstance = await Model.create(data);
      return newInstance;
    } catch (err: any) {
      const cause: ServerErrorCauseType = {
        name: err?.name ?? "Unknown Error",
        message: err.message ?? "",
      };
      if (err.errno) {
        cause.errno = err.errno;
      }
      console.error(err);
      throw new DBError({
        message: "Model creation failed",
        errno: "52",
        cause,
      });
    }
  }
}

/**
 * @class
 * @name DBError
 * @description Defined a Database Error
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
  User: UserModelType;
};

type DBModelNameType = keyof typeof Models;
const db = new Database();
export default db;
