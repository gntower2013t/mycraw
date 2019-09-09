import { cookie, createCrawler } from "../req";
import { ZZBad, ZZBadList, convertZZBad } from "./zz.model";
import { knex } from "../db";

const zzBadReq = {
  uri: 'https://transfer.ppdai.com/api/debt/pcApplyDebtService/getApplyList',
  method: "POST",
  referer: "https://transfer.ppdai.com/menu/applyDebt/queryCanApplyListWithOverDueNew",
  headers: {
    Origin: "https://transfer.ppdai.com",
    "Content-Type": "application/json;charset=UTF-8",
    "X-PPD-APPID": "PPDAI_PERSON",
    Cookie: cookie
  },
}

// "sort":null,"owingNumberList":null,"dueDayList":null,"levelList":null,"overDueDayList":null
// "rate":"","minPrincipal":"","maxPrincipal":""

function page(index: number) {
  const body = `{"dueType":2,"pageIndex":${index},"pageSize":30}`
  return {...zzBadReq, body}
}

let cnt = 0

const onRes = res => {
  const rr: ZZBadList = JSON.parse(res.body).resultContent
  console.log(`total: ${rr.total} of page ${rr.pageNo}`);
  const tPage =
    Math.ceil(rr.total / 30)

  rr.items.forEach(bid => {
    knex('zz_bad').insert(convertZZBad(bid)).then(
      () => { cnt++ },
      err => {
        console.log(err);
      },
    )
  })

  if (rr.pageNo < tPage) {
    c.queue(page(rr.pageNo + 1))
  }

}

const c = createCrawler(onRes)
c.queue(page(1))

c.on('drain', function () {
  setInterval(()=>{
    console.log(`cnt ${cnt}`);
  }, 1000)
})
