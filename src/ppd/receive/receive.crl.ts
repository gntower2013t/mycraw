import { cookie, createCrawler } from "../req";
import { Result, convertItem } from "./receive.model";
import { knex } from "../db";


//正常待收列表
const req = {
  uri: 'https://tz.ppdai.com/api/raptor/h5api/listScatterOwing',
  method: "POST",
  // strictSSL: false,
  referer: "https://tz.ppdai.com/scatter-receive/callback",
  headers: {
    Origin: "https://tz.ppdai.com",
    "Content-Type": "application/json;charset=UTF-8",
    "X-PPD-APPID": "PPDAI_PERSON",
    Cookie: cookie
  },
}

function getPage(index: number) {
  const body = `{"request":{"pay":null,"currentStatus":null,"startDate":"2019-09-05","endDate":"2019-10-04",`
    + `"page":{"targetPage":${index},"pageSize":100}}}`
  return {...req, body}
}

let init = true
let cnt = 0

const onRes = res => {
  // replace
  const rr: Result = JSON.parse(res.body).resultContent
  console.log(`total: ${rr.page.totalRecord} in page ${rr.page.targetPage} of ${rr.page.totalPage}`);

  rr.scatterOwingRecordInfoList.forEach(bid => {
    // console.log(bid.listingId);
  // replace
    knex('bid_receive').insert(convertItem(bid)).then(
      // () => console.log('success'),
      () => { cnt++ },
      err => {
        console.log(err);
        // knex.destroy()
      },
    )

  })


  if (init) {
    const tPage = rr.page.totalPage
    for (let index = 2; index <= tPage; index++) {
  // replace
      c.queue(getPage(index))
    }
    init = false
  }
}

setInterval(()=>{
  console.log(`cnt ${cnt}`);
}, 1000)

const c = createCrawler(onRes);
  // replace
c.queue(getPage(1));

//resultContent

//2019-08-16
//待收回 8286(8288) 期，待收回本金： 210,225.26 元，利息： 18,234.50 元

//2019-09-05 to 2019-10-04
//待收回 7022 期，待收回本金： 210,225.26 元，利息： 18,234.50 元
