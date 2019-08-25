import { knex } from "../db";

knex.schema.createTable('bid_receive', function (table) {
  table.increments()
  table.date("dueDate")
  table.integer("listingId");
  table.decimal("owingAmount");
  table.decimal("owingPrincipal");
  table.decimal("owingInterest");
  table.integer("overdue");
  table.integer("currentStatus");
})

.then(() => {
  console.log('success');
  knex.destroy()
})
