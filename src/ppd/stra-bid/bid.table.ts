import { knex } from "../db";

knex.schema.createTable('bid_list', function (table) {
  table.increments()
  table.date("bidDate")
  table.decimal("owingAmount");
  table.decimal("owingPrincipal");
  table.decimal("principal");
  table.integer("listingId");
  table.decimal("rate");
  table.decimal("repayAmount");
})

  .then(() => {
    console.log('success');
    knex.destroy()
  })
