import { cookie, createCrawler } from "../req";
import { BidList, convertBidItem, PayoffList, convertPayoffItem, BlackList, convertBlackItem, BidZZList, convertBidZZ } from "./bid.model";
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
const bidZZReq = {
  uri: 'https://transfer.ppdai.com/api/debt/pcApplyDebtService/getTransferedList',
  method: "POST",
  // strictSSL: false,
  referer: "https://transfer.ppdai.com/menu/transferrecords/recordsWithSummaryNew",
  headers: {
    Origin: "https://transfer.ppdai.com",
    "Content-Type": "application/json;charset=UTF-8",
    "X-PPD-APPID": "PPDAI_PERSON",
    Cookie: cookie
  },
}

//resultContent

let init = true;

const onRes = res => {
  // replace
  const rr: BidZZList = JSON.parse(res.body).resultContent
  console.log(`total: ${rr.total} of page ${rr.pageNo}`);
  // console.log(`total: ${rr.page.totalRecord} in page ${rr.page.totalPage}`);

  rr.items.forEach(bid => {
    console.log(bid.listingId);
  // replace
/*     knex('bid_zz').insert(convertBidZZ(bid)).then(
      // () => console.log('success'),
      () => { },
      err => { console.log(err); knex.destroy() },
    ) */

    //update
    const listingId = bid.listingId
    knex('bid_zz').where({ listingId }).update({ dueType: 2 })
    .then(
      () => console.log('success'),
      // () => { },
      err => { console.log(err); knex.destroy() },
    )
  })

  if (init) {
    const tPage = Math.ceil(rr.total / 10)
    //  rr.page.totalPage
    for (let index = 2; index <= tPage; index++) {
  // replace
      c.queue(bidZZPage(index))
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

function bidZZPage(index: number) {
  const body = `{"pageIndex":${index},"pageSize":10,"listType":"","listTypeTwo":"","dueType":2}`
  return {...bidZZReq, body}
}

const c = createCrawler(onRes);
  // replace
c.queue(bidZZPage(1));

// 2019-07-19
// 回款列表: total: 10162 in page 102
// 已还清列表 687 笔，已还清本金: 96,805.95 元，利息： 2,278.09 元，逾期利息： 1.03 元
