import { cookie, createCrawler } from "../req";
import { knex } from "../db";
import { ZZApplyList, convertZZApply } from "./zz.model";


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
let cnt: number = 0;

const onRes = res => {
  // replace
  const rr: ZZApplyList = JSON.parse(res.body).resultContent
  console.log(`total: ${rr.total} of page ${rr.pageNo}`);

  rr.items
    // .filter(bid => bid.leftRepayDay === 1)
    .forEach(bid => {
    // console.log(bid.listingId);
  // replace

    knex('zz_apply_0908').insert(convertZZApply(bid)).then(
      () => { cnt++ },
      err => {
        console.log(err);
        // knex.destroy()
      },
    )

  })


  if (init) {
    const tPage =
       Math.ceil(rr.total / 30)
      // rr.page.totalPage
    for (let index = 2; index <= tPage; index++) {
  // replace
      c.queue(bidApplyPage(index))
    }
    init = false
  }
}


function bidZZPage(index: number) {
  const body = `{"pageIndex":${index},"pageSize":10,"listType":"","listTypeTwo":"","dueType":2}`
  return {...bidZZReq, body}
}

//"rate":"","minPrincipal":"","maxPrincipal":"","sort":7, "owingNumberList":null,"dueDayList":null,"overDueDayList":null
function bidApplyPage(index: number) {
  const body = `{"dueType":1,"pageIndex":${index},"pageSize":30,"levelList":["A","B","C","D"],"sort":7}`
  return {...bidApplyReq, body}
}

const c = createCrawler(onRes);
  // replace
c.queue(bidApplyPage(1));

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

  //0903 未逾期可转出列表 zz_apply
    // 7528 笔
