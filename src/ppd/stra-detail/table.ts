import { knex } from "../db";

/* knex.schema.createTable('sta_month', function (table) {
  table.increments()
  table.integer("strategyId")
  table.decimal("bidRateAverage");
  table.decimal("bidDurationAverage");
  table.date("dateMonth");
  table.decimal("overdueRate30Average");
  table.decimal("overdueRate90Average");
  table.integer("overdue30ListingCount");
  table.integer("overdue90ListingCount");
  table.integer("bidAmount");
  table.integer("bidCount");
  // table.integer("inserttime");
  table.string("overdueRate30AverageStr");
  table.string("overdueRate90AverageStr");
  table.integer("satisfyOverdue30ListingCount");
  table.integer("satisfyOverdue90ListingCount");
}) */

knex.schema.createTable('sta_real', function (table) {
  table.increments()
  table.integer("strategyId")
  table.decimal("realOverdueRate30Average");
  table.decimal("realOverdueRate90Average");
  table.decimal("realBidRateAverage");
  table.decimal("realBidAmountAverage");
  table.decimal("realBidDurationAverage");

})

  .then(() => {
    console.log('success');
    knex.destroy()
  })
