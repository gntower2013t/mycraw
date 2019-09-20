import { cookie, createCrawler } from "../req";
import {
  ZZApplyList, convertZZApply, PreApplyRequestItem, PreApplyRequest,
  PreResult, ZZApply, ToApplyItem, ToApplyRequest
} from "./zz.model";
import { zzListReq, apply, preApplyReq, preApply, doApply } from "./common";


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


function getZZListPage(index: number) {
  const body =
       `{"dueType":1,"pageIndex":${index},"pageSize":30,"rate":10,"sort":7}`
  return {...zzListReq, body}
}


const c = createCrawler(onRes);
c.setLimiterProperty('slow', 'rateLimit', 30000)

const leftDay = 6
const dryrun = true
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
    doApply(c, toApply)
  }

  init = false
});
