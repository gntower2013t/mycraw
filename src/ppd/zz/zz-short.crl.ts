import { cookie, createCrawler } from "../req";
import {
  ZZApplyList, convertZZApply, PreApplyRequestItem, PreApplyRequest,
  PreResult, ZZApply, ToApplyItem, ToApplyRequest
} from "./zz.model";
import { zzListReq, apply, preApplyReq, preApply, doApply } from "./common";



let page = 0
let respCnt = 0
const toApply: any[] = []

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

  onList(res)

}


function onList(res) {
  const rr: ZZApplyList = JSON.parse(res.body).resultContent

  const tPage = Math.ceil(rr.total / 30)
  console.log(`total: ${rr.total}, page ${rr.pageNo} of ${tPage}`);

  const items = rr.items.filter(bid => bid.leftRepayDay >= leftDay)
  if (items.length > 0) {
    c.queue(preApply(items))
  }

  const target = rr.items.find(bid => bid.leftRepayDay < leftDay)
  if (!target && rr.pageNo < tPage) {
    page = rr.pageNo + 1
    c.queue(getZZListPage(page))
  }
}


function onPre(res) {
  const rr: PreResult[] = JSON.parse(res.body).resultContent.items
  const data: ZZApply[] = res.options.xdata

  rr.forEach(result => {
    const {listingId, preDebtDealId, priceForSaleRate, allowanceRadio, priceForSale} = result
    const item: ToApplyItem = {
      listingId, preDebtDealId, priceForSaleRate:priceForSaleRate/100.0,
      allowanceRadio, priceForSale
    }

    const zz = data.find(r => r.listingId === result.listingId)
    toApply.push({ item, zz })

  })

}


function getZZListPage(index: number) {
  // "minPrincipal":"","maxPrincipal":"", "levelList":null,"overDueDayList":null
  const body = `{"dueType":1,"pageIndex":${index},"pageSize":30,"rate":10,"sort":-7,"owingNumberList":[1],"dueDayList":[1]}`
  return {...zzListReq, body}
}


const c = createCrawler(onRes);

const leftDay = 5
const dryrun = true
c.queue(getZZListPage(1));

let init = true;
c.on('drain', function () {
  if (!init) {
    return
  }

  console.log(`last page ${page}`);
  console.log(`to apply totoal: ${toApply.length},
    ${toApply.map(it => it.item.priceForSale).reduce((acc, curr) => acc + curr)}`);
  // console.log(`to apply : ${toApply.map(r=>r.item.listingId)}`);

  const check = toApply
    .filter(r => r.zz.leftRepayDay < leftDay || r.zz.owingNumber > 2)
  console.log("mismatch: " + check.length);


  if (!dryrun) {
    doApply(c, toApply)
  }

  init = false
});

