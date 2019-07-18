import { knex } from "../db";

knex.schema.createTable('stra_bid', function (table) {
  table.increments()
  table.string("strategyTitle");
  table.string("listingid");
  table.integer("bidAmount");
  table.decimal("feeAmount");
  table.integer("finalStatus");
  table.string("finalStatusString");
  table.date("bidDateTime");
  table.integer("currentRate");
})

  .then(() => {
    console.log('success');
    knex.destroy()
  })
