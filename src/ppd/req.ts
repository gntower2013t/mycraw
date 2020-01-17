// var request = require('request');
// require('request-debug')(request);

import * as Crawler from "crawler";

export const cookie =
  `__fp=fp; __vid=1113609172.1545916993381; _ppdaiWaterMark=15459169944781; ppdaiRole=4; gr_user_id=f3647cb4-da64-4c1a-9a10-f719acaf3292; aliyungf_tc=AQAAAMvU+2WzsgYA6vam3001mBdfV06U; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22pdu0544991993%22%2C%22%24device_id%22%3A%22167efd5495714c-0f2a60cdc88f37-3a3a5d0c-1310720-167efd54958ad3%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC(%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80)%22%7D%2C%22first_id%22%3A%22167efd5495714c-0f2a60cdc88f37-3a3a5d0c-1310720-167efd54958ad3%22%7D; __tsid=225271519; __vsr=1570896320713.refSite%3Dhttps%3A//tz.ppdai.com/account/indexV3%7Cmd%3Dreferral%7Ccn%3Dreferral%3B1570974937395.src%3Ddirect%7Cmd%3Ddirect%7Ccn%3Ddirect%3B1573737397009.refSite%3Dhttps%3A//tz.ppdai.com/invest-bid-record/receipt%7Cmd%3Dreferral%7Ccn%3Dreferral%3B1573744909631.refSite%3Dhttps%3A//transfer.ppdai.com/menu/applyDebt/queryCanApplyListWithOverDueNew%7Cmd%3Dreferral%7Ccn%3Dreferral%3B1574478310441.src%3Ddirect%7Cmd%3Ddirect%7Ccn%3Ddirect; regSourceId=0; referID=0; fromUrl=; referDate=2020-1-16%2022%3A50%3A29; currentUrl=https%3A%2F%2Ftz.ppdai.com%2Faccount%2Findexv3; uniqueid=a49f059d-d576-4f1a-8369-8d5af0cd67e0; Hm_lvt_f87746aec9be6bea7b822885a351b00f=1579186232; Hm_lpvt_f87746aec9be6bea7b822885a351b00f=1579186232; openId=65b76bf8914ed82d55b3fea5f362ee4c; token=7adf8435594cfea5efa66b78fa093f57a2a94ac9961733e5a6fe223906abbde59d882b32ab1b8b5675; __sid=1579223496215.2.1579223556879; Hm_lvt_74a3c81b1c5ae79424a0d778a7f2ab06=1579223557; Hm_lpvt_74a3c81b1c5ae79424a0d778a7f2ab06=1579223557; waterMarkTimeCheck1=01%2F17%2F2020+09%3A12%3A20; Hm_lvt_4e00f1263e6cf5ac725bbcf3d5df4be2=1579186266,1579186309,1579223899; Hm_lpvt_4e00f1263e6cf5ac725bbcf3d5df4be2=1579223899`

export function createCrawler(
  onRes: (res) => any = res => console.log(res.body),
  options: any = {}) {
  const opt = {
    // maxConnections: 10,
    rateLimit: 100,
    jquery: false,
    // proxy: "http://127.0.0.1:8888",
    // strictSSL: false,
    preRequest: function (options, done) {
      // console.log(options.form.RequestBody);
      done();
    },

    callback: function (error, res, done) {
      if (error) {
        console.error(error);
      } else {
        // console.log("Code: "+ res.statusCode);
        // console.log(res.body);
        onRes(res);
      }

      done();
    },

    ...options
  }

  const c = new Crawler(opt)
  c.setLimiterProperty('slow', 'rateLimit', 45000)
  return c;
}
