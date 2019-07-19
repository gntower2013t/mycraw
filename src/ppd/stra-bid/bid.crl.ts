import { cookie, createCrawler } from "../req";
import { BidList, convertBidItem, PayoffList, convertPayoffItem, BlackList, convertBlackItem } from "./bid.model";
import { knex } from "../db";


const summaryReq = {
  uri: 'https://tz.ppdai.com/api/raptor/h5api/getScatterNormalSummary',
  method: "POST",
  // strictSSL: false,
  referer: "https://tz.ppdai.com/invest-bid-record/receipt?bidOpType=0",
  headers: {
    Origin: "https://tz.ppdai.com",
    "Content-Type": "application/json;charset=UTF-8",
    "X-PPD-APPID": "PPDAI_PERSON",
    Cookie: cookie
  },
}

const listReq = {
  uri: 'https://tz.ppdai.com/api/raptor/h5api/listScatterNormal',
  method: "POST",
  // strictSSL: false,
  referer: "https://tz.ppdai.com/invest-bid-record/receipt?bidOpType=0",
  headers: {
    Origin: "https://tz.ppdai.com",
    "Content-Type": "application/json;charset=UTF-8",
    "X-PPD-APPID": "PPDAI_PERSON",
    Cookie: cookie
  },
}

const payOffReq = {
  uri: 'https://tz.ppdai.com/api/raptor/h5api/listScatterPayOff',
  method: "POST",
  // strictSSL: false,
  referer: "https://tz.ppdai.com/invest-bid-record/pay-off",
  headers: {
    Origin: "https://tz.ppdai.com",
    "Content-Type": "application/json;charset=UTF-8",
    "X-PPD-APPID": "PPDAI_PERSON",
    Cookie: cookie
  },
}

const blackListReq = {
  uri: 'https://tz.ppdai.com/api/raptor/h5api/listScatterBlacklist',
  method: "POST",
  // strictSSL: false,
  referer: "https://tz.ppdai.com/invest-bid-record/black-list",
  headers: {
    Origin: "https://tz.ppdai.com",
    "Content-Type": "application/json;charset=UTF-8",
    "X-PPD-APPID": "PPDAI_PERSON",
    Cookie: cookie
  },
}

//resultContent

let init = true;

const onRes = res => {
  // replace
  const rr: BlackList = JSON.parse(res.body).resultContent
  console.log(`total: ${rr.page.totalRecord} in page ${rr.page.totalPage}`);

  rr.scatterBlacklistRecordInfoList.forEach(bid => {
    console.log(bid.listingId);
  // replace
    knex('bid_black').insert(convertBlackItem(bid)).then(
      // () => console.log('success'),
      () => { },
      err => { console.log(err); knex.destroy() },
    )
  })

  if (init) {
    for (let index = 2; index <= rr.page.totalPage; index++) {
  // replace
      c.queue(reqBlackPage(index))
    }
    init = false
  }
}

function reqPage(index: number, reqTemplate:any) {
  const payload = `{"request":{"pay":0,"listingId":"","page":{"targetPage":${index},"pageSize":100}}}`
  const req = { ...reqTemplate, body: payload}
  return req
}

function reqBlackPage(index: number) {
  const payload = `{"request":{"listingId":"","pay":null,"minOverdueDays":"","maxOverdueDays":"","page":{"targetPage":${index},"pageSize":100}}}`
  const req = { ...blackListReq, body: payload}
  return req
}


const c = createCrawler(onRes);
  // replace
c.queue(reqBlackPage(1));

// 2019-07-19
// 回款列表: total: 10162 in page 102
// 已还清列表 687 笔，已还清本金: 96,805.95 元，利息： 2,278.09 元，逾期利息： 1.03 元
