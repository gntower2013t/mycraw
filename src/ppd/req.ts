// var request = require('request');
// require('request-debug')(request);

import * as Crawler from "crawler";

export const cookie =
  "uniqueid=66358638-a5d1-42aa-839e-0b98bd71537d; __fp=fp; __vid=1113609172.1545916993381; _ppdaiWaterMark=15459169944781; ppdaiRole=4; gr_user_id=f3647cb4-da64-4c1a-9a10-f719acaf3292; aliyungf_tc=AQAAAMvU+2WzsgYA6vam3001mBdfV06U; regSourceId=0; referID=0; fromUrl=https%3A%2F%2Ftz.ppdai.com%2Faccount%2Findexv2; referDate=2019-8-11%209%3A41%3A29; currentUrl=https%3A%2F%2Fac.ppdai.com%2Fuser%2Flogin%3Fredirect%3Dhttps%3A%2F%2Ftz.ppdai.com%2Faccount%2Findexv2; Hm_lvt_f87746aec9be6bea7b822885a351b00f=1565487689; openid=65b76bf8914ed82d55b3fea5f362ee4c; ppd_uname=pdu0544991993; Hm_lvt_74a3c81b1c5ae79424a0d778a7f2ab06=1565791132; __tsid=225271519; Hm_lpvt_74a3c81b1c5ae79424a0d778a7f2ab06=1566654252; Hm_lpvt_f87746aec9be6bea7b822885a351b00f=1566697526; token=2b8a8968594cfea5efa66b78fa093f578e1442ba6807e2ac9ad379de9348c8714935c483a679533709; __eui=6qCvgquzVzfIJ3vtscCYqQ%3D%3D; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22pdu0544991993%22%2C%22%24device_id%22%3A%22167efd5495714c-0f2a60cdc88f37-3a3a5d0c-1310720-167efd54958ad3%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC(%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80)%22%7D%2C%22first_id%22%3A%22167efd5495714c-0f2a60cdc88f37-3a3a5d0c-1310720-167efd54958ad3%22%7D; __vsr=1565968267800.src%3Ddirect%7Cmd%3Ddirect%7Ccn%3Ddirect%3B1566002010243.refSite%3Dhttps%3A//tz.ppdai.com/invest-bid-record/receipt%7Cmd%3Dreferral%7Ccn%3Dreferral%3B1566012657808.refSite%3Dhttps%3A//transfer.ppdai.com/menu/negotiable/applyNew%7Cmd%3Dreferral%7Ccn%3Dreferral%3B1566029824134.src%3Ddirect%7Cmd%3Ddirect%7Ccn%3Ddirect%3B1566719686829.refSite%3Dhttps%3A//transfer.ppdai.com/menu/negotiable/applyNew%7Cmd%3Dreferral%7Ccn%3Dreferral; __sid=1566719686829.3.1566719700821; waterMarkTimeCheck1=08%2F25%2F2019+15%3A54%3A46; Hm_lvt_4e00f1263e6cf5ac725bbcf3d5df4be2=1566015100,1566092666,1566697541,1566719730; Hm_lpvt_4e00f1263e6cf5ac725bbcf3d5df4be2=1566719730"
  // "uniqueid=f872e0e3-13b8-40c7-a182-addbdb0527ac; __fp=fp; __vid=370631160.1545819424021; _ppdaiWaterMark=15458194255421; __eui=6qCvgquzVzfIJ3vtscCYqQ%3D%3D; aliyungf_tc=AQAAAAYE2RGERwIAEtuqyrsL6nS0QZi3; regSourceId=0; referID=0; fromUrl=https%3A%2F%2Ftz.ppdai.com%2Faccount%2Findexv3; referDate=2019-7-15%2012%3A28%3A15; currentUrl=https%3A%2F%2Fac.ppdai.com%2Fuser%2Flogin%3Fredirect%3Dhttps%3A%2F%2Ftz.ppdai.com%2Faccount%2Findexv3; Hm_lvt_f87746aec9be6bea7b822885a351b00f=1563164895; Hm_lpvt_f87746aec9be6bea7b822885a351b00f=1563164895; token=78dd8733594cfea5efa66b78fa093f57b8c730c97c97e13e4d1b68026c9230f418ee22e43b541317e3; openid=65b76bf8914ed82d55b3fea5f362ee4c; ppd_uname=pdu0544991993; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22pdu0544991993%22%2C%22%24device_id%22%3A%22167ea04815a18c-010bea210e7b82-3f674706-1310720-167ea04815c5a7%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC(%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80)%22%7D%2C%22first_id%22%3A%22167ea04815a18c-010bea210e7b82-3f674706-1310720-167ea04815c5a7%22%7D; __tsid=225271519; Hm_lvt_74a3c81b1c5ae79424a0d778a7f2ab06=; Hm_lpvt_74a3c81b1c5ae79424a0d778a7f2ab06=1563450482; __vsr=1560246590313.src%3Ddirect%7Cmd%3Ddirect%7Ccn%3Ddirect%3B1563441409736.refSite%3Dhttps%3A//transfer.ppdai.com/menu/applyDebt/queryCanApplyListWithOverDueNew%7Cmd%3Dreferral%7Ccn%3Dreferral%3B1563445850471.src%3Ddirect%7Cmd%3Ddirect%7Ccn%3Ddirect%3B1563453562804.refSite%3Dhttps%3A//www.ppdai.com/moneyhistory%7Cmd%3Dreferral%7Ccn%3Dreferral%3B1563508018590.src%3Ddirect%7Cmd%3Ddirect%7Ccn%3Ddirect; Hm_lvt_1bb866314780f5d8f22b19d096b02fe3=1563508206,1563508235,1563508274,1563508367; JSESSIONID=B6630DD4FFE30587B213EE8183902315; Hm_lpvt_1bb866314780f5d8f22b19d096b02fe3=1563508649; __sid=1563508018590.16.1563508650365; waterMarkTimeCheck1=07%2F19%2F2019+11%3A57%3A31"

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
