import { cookie, createCrawler } from "../req";
import {
  BidList, convertBidItem, PayoffList, convertPayoffItem, BlackList, convertBlackItem,
} from "./bid.model";
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

const bidApplyReq = {
  uri: 'https://transfer.ppdai.com/api/debt/pcApplyDebtService/getApplyList',
  method: "POST",
  // strictSSL: false,
  referer: "https://transfer.ppdai.com/menu/negotiable/applyNew",
  headers: {
    Origin: "https://transfer.ppdai.com",
    "Content-Type": "application/json;charset=UTF-8",
    "X-PPD-APPID": "PPDAI_PERSON",
    Cookie: cookie
  },
}

//resultContent

let init = true;
// const idSet = new Set<number>()
let cnt: number = 0;

const onRes = res => {
  // replace: BlackList BidList
  const rr: BidList = JSON.parse(res.body).resultContent
  // console.log(`total: ${rr.total} of page ${rr.pageNo}`);
  console.log(`total: ${rr.page.totalRecord} in page ${rr.page.targetPage} of ${rr.page.totalPage}`);

  rr.scatterNormalRecordInfoList.forEach(bid => {
    // console.log(bid.listingId);
    // idSet.add(bid.listingId)
  // replace: convertBlackItem  convertBidItem
    knex('bid_list_temp').insert(convertBidItem(bid)).then(
      // () => console.log('success'),
      () => { cnt++ },
      err => {
        console.log(err);
        // knex.destroy()
      },
    )

    //update
/*     const listingId = bid.listingId
    knex('bid_zz').where({ listingId }).update({ dueType: 2 })
    .then(
      () => console.log('success'),
      // () => { },
      err => { console.log(err); knex.destroy() },
    ) */
  })
  // console.log(`set ${idSet.size}`);


  if (init) {
    const tPage =
      //  Math.ceil(rr.total / 10)
      rr.page.totalPage
    for (let index = 2; index <= tPage; index++) {
  // replace
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

function reqBlackPage(index: number) {
  const payload = `{"request":{"listingId":"","pay":null,"minOverdueDays":"","maxOverdueDays":"","page":{"targetPage":${index},"pageSize":100}}}`
  const req = { ...blackListReq, body: payload}
  return req
}

function bidZZPage(index: number) {
  const body = `{"pageIndex":${index},"pageSize":10,"listType":"","listTypeTwo":"","dueType":2}`
  return {...bidZZReq, body}
}

//"rate":"","minPrincipal":"","maxPrincipal":"","sort":7, "owingNumberList":null,"dueDayList":null,"overDueDayList":null
function bidApplyPage(index: number) {
  const body = `{"dueType":1,"pageIndex":${index},"pageSize":30,"levelList":["A","B","C","D"]}`
  return {...bidApplyReq, body}
}

const c = createCrawler(onRes);
  // replace
c.queue(reqPage(1));

c.on('drain', function () {
  setInterval(()=>{
    console.log(`cnt ${cnt}`);
  }, 1000)
})


// 2019-07-19
// 正常收款中列表: total: 10162 in page 102
// 已还清列表 687 笔，已还清本金: 96,805.95 元，利息： 2,278.09 元，逾期利息： 1.03 元

// 2019-08-16
//正常收款中列表 9768 笔，待收回本金： 1,341,552.13 元，利息： 94,155.91 元
  //最后投标日期: 07-25

//09-07  黑名单 更新
