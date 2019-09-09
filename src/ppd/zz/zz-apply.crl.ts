import { cookie, createCrawler } from "../req";
// import { knex } from "../db";
import { ZZApplyList, convertZZApply, PreApplyRequestItem, PreApplyRequest, PreResult, ZZApply, ToApplyItem, ToApplyRequest } from "./zz.model";


const preApplyReq = {
  uri: 'https://transfer.ppdai.com/api/debt/pcApplyDebtService/preApplyDebt',
  method: "POST",
  referer: "https://transfer.ppdai.com/menu/negotiable/applyNew",
  headers: {
    Origin: "https://transfer.ppdai.com",
    "Content-Type": "application/json;charset=UTF-8",
    Cookie: cookie
  },
}

//resultContent

let init = true;
let cnt: number = 0;
let stop = false
let page = 0

const onRes = res => {
  if (res.options.uri === preApplyReq.uri) {
    console.log("on pre");
    // console.log(`pre: ${res.request.body}`);
    onPre(res)
    return
  } else if(res.options.uri.endsWith("multiApply")) {
    console.log(res.body);
    return
  }
  //res.request.uri.  //path, hostname, href

  const rr: ZZApplyList = JSON.parse(res.body).resultContent
  console.log(`total: ${rr.total} of page ${rr.pageNo}`);
  const tPage = Math.ceil(rr.total / 30)

  const target = rr.items.find(bid => bid.leftRepayDay > leftDay)

  console.log(rr.items.length + " ========");
  c.queue(preApply(rr.items))


  if (!target && rr.pageNo < tPage) {
    page = rr.pageNo + 1
    c.queue(bidApplyPage(page))
  }

}

const toApply: any[] = []

function onPre(res) {
  const rr: PreResult[] = JSON.parse(res.body).resultContent.items
  const data: ZZApply[] = res.options.xdata

  rr.forEach(result => {
    const {listingId, preDebtDealId, priceForSaleRate, allowanceRadio, priceForSale} = result
    const item: ToApplyItem = {
      listingId, preDebtDealId, priceForSaleRate:priceForSaleRate/100.0,
      allowanceRadio, priceForSale
    }

    const code = result.currentCreditCode
    const zz = data.find(r => r.listingId === result.listingId)

    if (short && zz.owingNumber === 3 && zz.leftRepayDay <= leftDay) {
      toApply.push({ item })
      return
    }

    if (zz.owingNumber === 3) {
      if (zz.pastDueDay > 2 || code === 'G') {
        toApply.push({ item, zz, code })
      } else if (zz.pastDueNumber > 0 && (code === 'E' || code === 'F')) {
        toApply.push({ item, zz, code })
      }
    } else if (zz.owingNumber <= 2) {
      if (zz.pastDueDay > 3 && (code === 'F' || code === 'G')) {
        toApply.push({ item, zz, code })
      }
    } else if (
      code === 'E' ||
      code === 'F' || code === 'G') {
      toApply.push({ item, zz, code })
    } else if (zz.pastDueDay > 2) {
      toApply.push({ item, zz })
    }

  })

}


function preApply(ids: ZZApply[]) {
  const preApplyRequestList = ids.map(id => new PreApplyRequestItem(id.listingId, id.preDebtdealId))
  const request = { ...new PreApplyRequest(), preApplyRequestList }
  // console.log(JSON.stringify(request));
  // const xdata = ids
    // .filter(r => r.pastDueNumber > 0)
  return {...preApplyReq, body: JSON.stringify(request), xdata:ids}
}


const zzListReq = {
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

function bidApplyPage(index: number) {
  const body =
    // `{"dueType":1,"pageIndex":${index},"pageSize":30,"levelList":["A","B","C","D"]}`
    // short ? `{"dueType":1,"pageIndex":${index},"pageSize":30,"rate":10,"sort":7,"owingNumberList":[1]}`
       `{"dueType":1,"pageIndex":${index},"pageSize":30,"rate":10,"sort":7}`
  return {...zzListReq, body}
}

const applyReq = {
  uri: 'https://transfer.ppdai.com/api/debt/pcApplyDebtService/multiApply',
  method: "POST",
  referer: "https://transfer.ppdai.com/menu/negotiable/applyNew",
  headers: {
    Origin: "https://transfer.ppdai.com",
    "Content-Type": "application/json;charset=UTF-8",
    Cookie: cookie
  },
}

function apply(items: ToApplyItem[]) {
  const req = new ToApplyRequest()
  req.items = items
  return { ...applyReq, body: JSON.stringify(req), limiter:'slow'}
}

const c = createCrawler(onRes);
c.setLimiterProperty('slow', 'rateLimit', 10000)

const short = true
const leftDay = 1
const doApply = false
c.queue(bidApplyPage(1));

c.on('drain', function () {
  if (!init) {
    return
  }

  console.log(`last page ${page}`);
  console.log("to apply: " + toApply.map(r => {
    const { listingId } = r.item
    const { zz: {
      owingNumber, pastDueNumber, pastDueDay, leftRepayDay
    } = {} as any } = r

    return JSON.stringify({
      listingId, code: r.code, pastDueNumber, pastDueDay,
      owingNumber, leftRepayDay,
    })
  }));

  console.log(`to apply totoal: ${toApply.length}`);
  console.log("items:");
  console.log(JSON.stringify(toApply.map(r=>r.item)));

  if (doApply) {
    for (let i = 0; i < toApply.length; i += 30) {
      console.log(`to apply ${i} - ${i + 30}`);

      c.queue(apply(
        toApply.slice(i, i + 30).map(r => r.item)
      ))
    }
  }

  init = false
});

// 2019-07-19
// 正常收款中列表: total: 10162 in page 102
// 已还清列表 687 笔，已还清本金: 96,805.95 元，利息： 2,278.09 元，逾期利息： 1.03 元

// 2019-08-16
//正常收款中列表 9768 笔，待收回本金： 1,341,552.13 元，利息： 94,155.91 元
  //最后投标日期: 07-25
