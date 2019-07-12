import { knex } from "./db";

knex.schema.createTable('strategy', function (table) {
  table.increments()
  table.integer("strategyId");
  table.integer("userId");
  table.string("nickName");
  table.string("strategyTitle");
  table.decimal("rate")
  table.decimal("overdueRate30");
  table.decimal("overdueRate60");
  table.decimal("overdueRate90");
  table.integer("level");
  table.integer("strategyType");
  table.integer("bidAmountAverage");
  table.integer("bidDurationAverage");
  table.decimal("feeRate");
  table.integer("funding");
  table.integer("runDays");
})

  .then(() => {
    console.log('success');
    knex.destroy()
  })
