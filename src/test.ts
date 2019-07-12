import * as Crawler from "crawler";
import { SList } from "./strategy.model";

var c = new Crawler({
  maxConnections: 10,
  // proxy: "http://127.0.0.1:8888",
  preRequest: function (options, done) {
    // 'options' here is not the 'options' you pass to 'c.queue', instead, it's the options that is going to be passed to 'request' module
    // console.log(options);
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
      console.log(rr.strategyList[0].strategyTitle);

    }
    done();
  }
});

// Queue just one URL, with default callback
c.queue({
  uri: 'https://strategy.ppdai.com/forward/forwardreq',
  method: "POST",
  // strictSSL: false,
  // userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
  referer: "https://invstrat.ppdai.com/strategyList",
  headers: {
    Origin: "https://invstrat.ppdai.com",
    // accept: "application/json, text/plain, */*",
    // "content-type": "application/x-www-form-urlencoded"
  },
  form: {
    Target: "strategyList-queryStrategyListNew",
    RequestBody: `
    { "pageIndex": 1, "pageSize": 10, "rangeList": [],
      "nickName": "", "sort": "",
      "runDays": "2", "strategyType": "1"
    }`
  }
});


