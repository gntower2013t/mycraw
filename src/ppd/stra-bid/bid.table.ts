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

/* knex.schema.createTable('bid_black', function (table) {
  table.increments()
  table.string("borrowerName");
  table.decimal("overduePrincipal");
  table.decimal("repayAmount");
  table.decimal("principal");
  table.integer("overdueDays");
  table.integer("maxOverdueDays");
  table.integer("listingId");
}) */

knex.schema.createTable('bid_zz', function (table) {
  table.increments()
  table.integer("debtDealId");
  table.string("creditCode");
  table.integer("listingId");
  table.decimal("currentRate");
  table.decimal("owingPrincipal");
  table.decimal("priceForSale");
  table.date("closeBidDate");
  table.integer("statusId");
})

  .then(() => {
    console.log('success');
    knex.destroy()
  })
