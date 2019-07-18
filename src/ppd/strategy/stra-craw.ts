import * as Crawler from "crawler";
import { SList, sExample, converters } from "./strategy.model";
import { knex } from "../db";
import { convert } from "../util";

const pageSize = 100
const formData = {
  "pageIndex": 1, pageSize, "rangeList": [],
  "nickName": "", "sort": "",
  "runDays": "2", "strategyType": "1"
}

const reqTemplate = {
  uri: 'https://strategy.ppdai.com/forward/forwardreq',
  method: "POST",
  // strictSSL: false,
  // userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
  referer: "https://invstrat.ppdai.com/strategyList",
  headers: {
    Origin: "https://invstrat.ppdai.com",
    // accept: "application/json, text/plain, */*",
    // "content-type": "application/x-www-form-urlencoded",
    // "Accept-Encoding": "gzip, deflate, br",
  },
  form: {
    Target: "strategyList-queryStrategyListNew",
    RequestBody: `${JSON.stringify(formData)}`
  }
}

function reqPage(index: number) {
  const req = { ...reqTemplate }
  const data = { ...formData, pageIndex: index }
  req.form = { ...req.form, RequestBody: `${JSON.stringify(data)}`}

  return req
}

let init = true;
const c = new Crawler({
  // maxConnections: 10,
  rateLimit: 100,
  // proxy: "http://127.0.0.1:8888",
  preRequest: function (options, done) {
    // 'options' here is not the 'options' you pass to 'c.queue', instead, it's the options that is going to be passed to 'request' module
    console.log(options.form.RequestBody);
    // when done is called, the request will start
    done();
  },
  // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      // var $ = res.$;
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      // console.log($("title").text());
      // console.log(res.statusCode);
      // console.log(res.body);
      const rr: SList = JSON.parse(res.body).data
      console.log("total: " + rr.totalCount);

      rr.strategyList.forEach(str => {
        console.log(str.strategyId);
        knex('strategy').insert(convert(str, sExample, converters)).then(
          // () => console.log('success'),
          () => { },
          err => { console.log(err); knex.destroy() },
        )
      })

      if (init) {
        const page =
          Math.ceil(rr.totalCount / pageSize)
        console.log(`page total ${page}`);

        for (let index = 2; index <= page; index++) {
          c.queue(reqPage(index))
        }
        init = false

      }



    }

    done();
  }
});

// Queue just one URL, with default callback
c.queue(reqTemplate);


process.on('exit', () => {
  console.log("end===");
  knex.destroy()
});
