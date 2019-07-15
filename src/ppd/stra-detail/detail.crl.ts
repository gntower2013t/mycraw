import * as Crawler from "crawler";
import { knex } from "../db";
import { StaMonthList, convertData } from "./stra-detail.model";

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

function reqId(id: number) {
  const req = { ...reqTemplate }
  const data = { ...formData, id }
  req.form = { ...req.form, RequestBody: `${JSON.stringify(data)}`}

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

      // console.log(res.body);

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

    done();
  }
});

// Queue just one URL, with default callback
knex.select("strategyId").from("strategy")
.then(
  ids => {
    ids.forEach(id => {
      c.queue(reqId(id.strategyId))
      // console.log(id.strategyId);
    })
  },
  // () => { },
  err => { console.log(err); knex.destroy() },
)

// c.queue(reqTemplate);

process.on('exit', () => {
  console.log("end===");
  knex.destroy()
});
