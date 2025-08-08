/**
 * Defines and exposes the Database class
 */
import { MongoClient, ServerApiVersion } from "mongodb";
import config from "../config.js";
const { DB_URI, DB_NAME } = config;

/**
 * Define the db class as a singleton
 */
class Database {
  #client: MongoClient | null = null;
  #db_name = DB_NAME;

  /**
   * @method init Initialise database
   * Also tests connection
   */
  init() {
    if (!this.#client) {
      this.#client = new MongoClient(DB_URI as string, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
    }
    this.#test().catch(console.error);
  }

  /**
   * @private @method test Tests client connection
   */
  async #test() {
    console.log("testing connection...");
    try {
      await this.client.db(this.#db_name).command({ ping: 1 });
      console.log("db connection successful");
    } catch (err) {
      console.error("db connection failed");
    } finally {
      this.client.close();
    }
  }

  /**
   * Gets the db client
   * @returns {Database.client}
   */
  get client() {
    if (!this.#client) {
      this.init();
    }
    return this.#client as MongoClient;
  }
}

const db = new Database();

export default db;
