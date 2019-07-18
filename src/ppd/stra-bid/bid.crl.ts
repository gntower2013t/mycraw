import { cookie, createCrawler } from "../req";
import { BidList, convertBidItem } from "./bid.model";
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

//resultContent

let init = true;

const onRes = res => {
  const rr: BidList = JSON.parse(res.body).resultContent
  console.log(`total: ${rr.page.totalRecord} in page ${rr.page.totalPage}`);

  rr.scatterNormalRecordInfoList.forEach(bid => {
    console.log(bid.listingId);
    knex('bid_list').insert(convertBidItem(bid)).then(
      // () => console.log('success'),
      () => { },
      err => { console.log(err); knex.destroy() },
    )
  })

  if (init) {
    for (let index = 2; index <= rr.page.totalPage; index++) {
      c.queue(reqPage(index))
    }
    init = false
  }
}

function reqPage(index: number) {
  const payload = `{"request":{"pay":0,"listingId":"","page":{"targetPage":${index},"pageSize":100}}}`
  const req = { ...listReq, body: payload}
  return req
}


const c = createCrawler(onRes);
c.queue(reqPage(1));

// 2019-07-19: total: 10162 in page 102
