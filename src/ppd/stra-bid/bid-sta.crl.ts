import { knex } from "../db";
import { StaBidList, convertBid } from "./bid-sta.model";
import { cookie, createCrawler } from "../req";

const pageSize = 100
const formData = {
  "pageNum": 1, pageSize, "type": 2,
  "beginTime": "2019-07-15", "endTime": "2019-07-15"
}

const reqTemplate = {
  uri: 'https://strategy.ppdai.com/forward/forwardreq',
  method: "POST",
  // strictSSL: false,
  // userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
  referer: "https://invstrat.ppdai.com/strategyMarket/bidRecord",
  headers: {
    Origin: "https://invstrat.ppdai.com",
    // accept: "application/json, text/plain, */*",
    // "content-type": "application/x-www-form-urlencoded"
    Cookie: cookie
  },
  form: {
    Target: "investorAccount-queryNewBidList",
    RequestBody: `${JSON.stringify(formData)}`
  }
}

function reqPage(index: number) {
  const req = { ...reqTemplate }
  const data = { ...formData, pageNum: index }
  req.form = { ...req.form, RequestBody: `${JSON.stringify(data)}`}

  return req
}

let init = true;
let cnt = 0

const onRes = res => {
  const rr: StaBidList = JSON.parse(res.body).data
  console.log(`total: ${rr.totalSize} in page ${rr.totalPage}`);

  rr.bidList.forEach(bid => {

    knex('stra_bid').where({
      listingId: bid.listingid
    }).select('listingId').then(r => {
      if (r.length === 0) {
        knex('stra_bid').insert(convertBid(bid)).then(
          () => cnt++,
          err => { console.log(err); knex.destroy() },
        )
      }
    })

  })

  if (init) {
    for (let index = 2; index <= rr.totalPage; index++) {
      c.queue(reqPage(index))
    }
    init = false
  }
}

const c = createCrawler(onRes);
c.queue(reqTemplate);

c.on('drain', function () {
  setInterval(()=>{
    console.log(`cnt ${cnt}`);
  }, 1000)
})

//0401-0630 0701-0715 0716-0801
