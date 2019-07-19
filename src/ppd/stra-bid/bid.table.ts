import { knex } from "../db";

/* knex.schema.createTable('bid_list', function (table) {
  table.increments()
  table.date("bidDate")
  table.decimal("owingAmount");
  table.decimal("owingPrincipal");
  table.decimal("principal");
  table.integer("listingId");
  table.decimal("rate");
  table.decimal("repayAmount");
}) */
/* knex.schema.createTable('bid_payoff', function (table) {
  table.increments()
  table.date("bidDate")
  table.decimal("principal");
  table.integer("listingId");
  table.decimal("rate");
  table.decimal("repayAmount");
}) */
knex.schema.createTable('bid_black', function (table) {
  table.increments()
  table.string("borrowerName");
  table.decimal("overduePrincipal");
  table.decimal("repayAmount");
  table.decimal("principal");
  table.integer("overdueDays");
  table.integer("maxOverdueDays");
  table.integer("listingId");
})

  .then(() => {
    console.log('success');
    knex.destroy()
  })
