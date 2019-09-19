import { cookie, createCrawler } from "../req";
import {
  ZZApplyList, convertZZApply, PreApplyRequestItem, PreApplyRequest,
  PreResult, ZZApply, ToApplyItem, ToApplyRequest
} from "./zz.model";


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


let page = 0
let respCnt = 0

const onRes = res => {
  if (res.options.uri === preApplyReq.uri) {
    console.log("on pre");
    // console.log(`pre: ${res.request.body}`);
    onPre(res)
    return
  } else if (res.options.uri.endsWith("multiApply")) {
    console.log("do apply ==============");
    console.log(res.options.xapply);
    respCnt++;
    console.log(`do apply response ${respCnt} ============== `);
    console.log(res.body);
    return
  }
  //res.request.uri.  //path, hostname, href

  const rr: ZZApplyList = JSON.parse(res.body).resultContent
  if (page === 0) {
    console.log(`total: ${rr.total} of page ${rr.pageNo}`);
  }
  const tPage = Math.ceil(rr.total / 30)

  const target = rr.items.find(bid => bid.leftRepayDay > leftDay)
  c.queue(preApply(rr.items))


  if (!target && rr.pageNo < tPage) {
    page = rr.pageNo + 1
    c.queue(getZZListPage(page))
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

    // const code = result.currentCreditCode
    const zz = data.find(r => r.listingId === result.listingId)

    if (zz.owingNumber > 2) {
      toApply.push({ item, zz })
    }
  })

}


function preApply(ids: ZZApply[]) {
  const preApplyRequestList = ids.map(id => new PreApplyRequestItem(id.listingId, id.preDebtdealId))
  const request = { ...new PreApplyRequest(), preApplyRequestList }
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

function getZZListPage(index: number) {
  const body =
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

function apply(items: ToApplyItem[], leftItems: ToApplyItem[]) {
  const req = new ToApplyRequest()
  req.items = items
  return { ...applyReq, body: JSON.stringify(req), limiter: 'slow', xapply: leftItems}
}

const c = createCrawler(onRes);
c.setLimiterProperty('slow', 'rateLimit', 30000)

const leftDay = 5
const dryrun = false
c.queue(getZZListPage(1));

let init = true;
c.on('drain', function () {
  if (!init) {
    return
  }

  console.log(`last page ${page}`);
  const check = toApply
    // r.zz.leftRepayDay !== 2 ||
    .filter(r => r.zz.leftRepayDay !== leftDay || r.zz.owingNumber <= 2)
  console.log("check apply: " + check.length);
  console.log("check apply: " + check
    .map(r => {
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
  // console.log("items:");
  // console.log(JSON.stringify(toApply.map(r=>r.item)));

  if (!dryrun) {
    for (let i = 0; i < toApply.length; i += 30) {
      console.log(`to apply ${i} - ${i + 30}`);

      c.queue(apply(
        toApply.slice(i, i + 30).map(r => r.item),
        toApply.slice(i, toApply.length).map(r => r.item),
      ))
    }
  }

  init = false
});


