import * as Crawler from "crawler";
import { knex } from "../db";
import { BidList, convertBid } from "./bid.model";

const pageSize = 100
const formData = {
  "pageNum": 1, pageSize, "type": 2,
  "beginTime": "2019-07-01", "endTime": "2019-07-15"
}
//0401-0630 0701-0715

const cookie = "uniqueid=f872e0e3-13b8-40c7-a182-addbdb0527ac; __fp=fp; __vid=370631160.1545819424021; aliyungf_tc=AQAAAH9csx1gLAMAlIJC3mcl/f8eCCFd; _ppdaiWaterMark=15458194255421; __eui=6qCvgquzVzfIJ3vtscCYqQ%3D%3D; __vsr=1558407532691.src%3Ddirect%7Cmd%3Ddirect%7Ccn%3Ddirect%3B1558583476279.refSite%3Dhttps%3A//invest.ppdai.com/menu/AutoBidManage/StrategySetNew/405854%7Cmd%3Dreferral%7Ccn%3Dreferral%3B1558587523930.src%3Ddirect%7Cmd%3Ddirect%7Ccn%3Ddirect%3B1560236144306.refSite%3Dhttps%3A//invest.ppdai.com/loan/listpage%7Cmd%3Dreferral%7Ccn%3Dreferral%3B1560246590313.src%3Ddirect%7Cmd%3Ddirect%7Ccn%3Ddirect; Hm_lvt_74a3c81b1c5ae79424a0d778a7f2ab06=1560743910; Hm_lpvt_74a3c81b1c5ae79424a0d778a7f2ab06=1562905876; regSourceId=0; referID=0; fromUrl=https%3A%2F%2Ftz.ppdai.com%2Faccount%2Findexv3; referDate=2019-7-15%2012%3A28%3A15; currentUrl=https%3A%2F%2Fac.ppdai.com%2Fuser%2Flogin%3Fredirect%3Dhttps%3A%2F%2Ftz.ppdai.com%2Faccount%2Findexv3; Hm_lvt_f87746aec9be6bea7b822885a351b00f=1563164895; Hm_lpvt_f87746aec9be6bea7b822885a351b00f=1563164895; token=78dd8733594cfea5efa66b78fa093f57b8c730c97c97e13e4d1b68026c9230f418ee22e43b541317e3; openid=65b76bf8914ed82d55b3fea5f362ee4c; ppd_uname=pdu0544991993; __tsid=225271519; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22pdu0544991993%22%2C%22%24device_id%22%3A%22167ea04815a18c-010bea210e7b82-3f674706-1310720-167ea04815c5a7%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC(%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80)%22%7D%2C%22first_id%22%3A%22167ea04815a18c-010bea210e7b82-3f674706-1310720-167ea04815c5a7%22%7D; __sid=1563181228452.6.1563182469935; waterMarkTimeCheck1=07%2F15%2F2019+17%3A21%3A11"

const reqTemplate = {
  uri: 'https://strategy.ppdai.com/forward/forwardreq',
  method: "POST",
  // strictSSL: false,
  // userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
  referer: "https://invstrat.ppdai.com/strategyMarket/bidRecord",
  headers: {
    Origin: "https://invstrat.ppdai.com",
    // accept: "application/json, text/plain, */*",
    // "content-type": "application/x-www-form-urlencoded"
    Cookie: cookie
  },
  form: {
    Target: "investorAccount-queryNewBidList",
    RequestBody: `${JSON.stringify(formData)}`
  }
}

function reqPage(index: number) {
  const req = { ...reqTemplate }
  const data = { ...formData, pageNum: index }
  req.form = { ...req.form, RequestBody: `${JSON.stringify(data)}`}

  return req
}

let init = true;
const c = new Crawler({
  // maxConnections: 10,
  rateLimit: 100,
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

      const rr: BidList = JSON.parse(res.body).data
      console.log(`total: ${rr.totalSize} in page ${rr.totalPage}`);

      rr.bidList.forEach(bid => {
        console.log(bid.listingid);
        knex('stra_bid').insert(convertBid(bid)).then(
          // () => console.log('success'),
          () => { },
          err => { console.log(err); knex.destroy() },
        )
      })

      if (init) {
        for (let index = 2; index <= rr.totalPage; index++) {
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
