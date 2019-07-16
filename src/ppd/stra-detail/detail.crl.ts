import * as Crawler from "crawler";
import { knex } from "../db";
import { StaMonthList, convertData, StaReal, convertStaReal } from "./stra-detail.model";

const pageSize = 50
const formData = { "page": 1, "rows": pageSize, "id": "899" }

const reqTemplate = {
  uri: 'https://strategy.ppdai.com/forward/forwardreq',
  method: "POST",
  // strictSSL: false,
  referer: "https://invstrat.ppdai.com/strategyDetail/",
  headers: {
    Origin: "https://invstrat.ppdai.com",
  },
  form: {
    Target: "strategydetail-v15-getMonthRunStates",
    RequestBody: `${JSON.stringify(formData)}`
  }
}

const staRealParam = { "id": 8455 }
const staRealTarget = "strategydetail-v15-getStrategyDetail"
const staRealTemplate = {
  uri: 'https://strategy.ppdai.com/forward/forwardreq',
  method: "POST",
  // strictSSL: false,
  referer: "https://invstrat.ppdai.com/strategyDetail/",
  headers: {
    Origin: "https://invstrat.ppdai.com",
  },
  form: {
    Target: staRealTarget,
    RequestBody: `${JSON.stringify(staRealParam)}`
  }
}

function reqId(id: number) {
  const req = { ...reqTemplate }
  const data = { ...formData, id }
  req.form = { ...req.form, RequestBody: `${JSON.stringify(data)}`}

  return req
}

function reqIdReal(id: number) {
  const req = { ...staRealTemplate }
  req.form = { ...req.form, RequestBody: `{"id": ${id}}`}
  return req
}

let init = true;
const c = new Crawler({
  // maxConnections: 10,
  rateLimit: 100,
  jquery: false,
  // proxy: "http://127.0.0.1:8888",
  preRequest: function (options, done) {
    console.log(options.form.RequestBody);
    done();
  },

  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      onRes(res)
    }
    done();
  }

});

function onRes(res) {
  // console.log(res.body);

  if (res.options.form.Target === staRealTarget) {
    const rr: StaReal = JSON.parse(res.body).data
    const id = JSON.parse(res.options.form.RequestBody).id
    knex('sta_real').insert(convertStaReal(rr, id)).then(
      () => console.log('success'),
      // () => { },
      err => { console.log(err); knex.destroy() },
    )

  } else {
    const rr: StaMonthList = JSON.parse(res.body).data
    const id = JSON.parse(res.options.form.RequestBody).id
    console.log(`for ${id}: total: ${rr.totalSize} in page ${rr.totalPage}`);

    rr.list.forEach(data => {
      knex('sta_month').insert(convertData(data, id)).then(
        // () => console.log('success'),
        () => { },
        err => { console.log(err); knex.destroy() },
      )
    })
  }
}

// Queue just one URL, with default callback
knex.select("strategyId").from("strategy")
.then(
  ids => {
    ids.forEach(id => {
      // c.queue(reqId(id.strategyId))
      c.queue(reqIdReal(id.strategyId))
      // console.log(id.strategyId);
    })
  },
  // () => { },
  err => { console.log(err); knex.destroy() },
)

// c.queue(staRealTemplate);

process.on('exit', () => {
  console.log("end===");
  knex.destroy()
});
