import { knex } from "../db";

/* knex.schema.createTable('zz_apply_0908', function (table) {
  table.increments()
  table.date("nextRepayDate")
  table.integer("listingId");
  table.decimal("currentRate");
  table.string("creditCode");
  table.integer("owingNumber");
  table.integer("leftRepayDay");
  table.decimal("owingPrincipal");
  table.decimal("owingInterest");
  table.integer("preDebtdealId");
  table.integer("pastDueNumber");
  table.integer("pastDueDay");
  table.decimal("priceForSale");
}) */
knex.schema.createTable('zz_bad', function (table) {
  table.increments()
  table.date("nextRepayDate")
  table.integer("listingId");
  table.decimal("currentRate");
  table.string("creditCode");
  table.integer("owingNumber");
  table.integer("tnumber");
  table.integer("currentDueDay");
  table.decimal("owingPrincipal");
  table.decimal("owingInterest");
  table.integer("preDebtdealId");
  table.integer("pastDueNumber");
  table.integer("pastDueDay");
  table.decimal("priceForSale");
})


//债转(已转出)列表
/* knex.schema.createTable('bid_zz', function (table) {
  table.increments()
  table.integer("debtDealId");
  table.string("creditCode");
  table.integer("listingId");
  table.decimal("currentRate");
  table.decimal("owingPrincipal");
  table.decimal("priceForSale");
  table.date("closeBidDate");
  table.integer("statusId");
})   */

.then(() => {
  console.log('success');
  knex.destroy()
})

