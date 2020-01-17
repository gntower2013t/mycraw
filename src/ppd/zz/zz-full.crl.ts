import { cookie, createCrawler } from "../req";
import {
  ZZApplyList, convertZZApply, PreApplyRequestItem, PreApplyRequest,
  PreResult, ZZApply, ToApplyItem, ToApplyRequest
} from "./zz.model";
import { zzListReq, apply, preApplyReq, preApply, doApply } from "./common";
import { knex } from "../db";


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

  console.log("on list");
  // console.log(res.body);

  const rr: ZZApplyList = JSON.parse(res.body).resultContent
  const tPage = Math.ceil(rr.total / 30)
  console.log(`total: ${rr.total}, page ${rr.pageNo} of ${tPage}`);

  let items = rr.items.filter(bid => bid.leftRepayDay <= leftDay && bid.owingNumber > 7);

  knex.select('s.listingid').from('stra_bid as s').innerJoin('strategy as ss', 's.strategyTitle', 'ss.strategyTitle')
    .whereIn('ss.id', [966, 1003, 998])
    .whereIn('s.listingid', items.map(bid => bid.listingId))
    .then(r => {
      console.log(`ignore: ${r.map(v => v.listingid)}`);
      ignores.push(...r.map(v => v.listingid))

      items = items.filter(it => !r.find(v => it.listingId === v.listingId))
      if (items.length > 0) {
        c.queue(preApply(items))
      }

    })


  const target = rr.items.find(bid => bid.leftRepayDay > leftDay)
  if (!target && rr.pageNo < tPage) {
    page = rr.pageNo + 1
    c.queue(getZZListPage(page))
  }

}

const toApply: any[] = []
const ignores = []

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
    toApply.push({ item, zz })
  })

}


function getZZListPage(index: number) {
  const body =
       `{"dueType":1,"pageIndex":${index},"pageSize":30,"rate":10,"sort":7}`
  return {...zzListReq, body}
}


const c = createCrawler(onRes);

const leftDay = 11
const dryrun = false
c.queue(getZZListPage(1));


let init = true;
c.on('drain', function () {
  if (!init) {
    return
  }

  console.log(`last page ${page}`);

/*   const check = toApply
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
  })); */

  console.log(`to apply total: ${toApply.length},
    ${toApply.map(it => it.item.priceForSale).reduce((acc, curr) => acc + curr)}`);
  console.log(`ignore : ${ignores}`);
  // console.log(`to apply : ${toApply.map(it=>it.item.listingId)}`);
  // console.log("items:");
  // console.log(JSON.stringify(toApply.map(r=>r.item)));
  if (!dryrun) {
    doApply(c, toApply)
  }
  knex.destroy()


  init = false
});
