import * as knexInit from "knex";

export const knex = knexInit({
  client: 'sqlite3',
  connection: {
    filename: "../ppd.db"
  }
});
