import { createCrawler } from "../ppd/req";


const req = {
  uri: 'http://www.hxb.com.cn/hxmap/get_excel.jsp?jsonpcallback=jQuery33108988602020762446_1567266047211&page=2&personNum=A12&titleName=C02&_=1567266047214',
  method: "GET",
  referer: "http://www.hxb.com.cn/grjr/xxpl/zyxlcp/lyxlcp/index.shtml",
/*   headers: {
    Origin: "https://transfer.ppdai.com",
    "Content-Type": "application/json;charset=UTF-8",
  }, */
}

function reqPage(page: number) {
  const uri = `http://www.hxb.com.cn/hxmap/get_excel.jsp?jsonpcallback=jQuery33108988602020762446_1567266047211&page=${page}&personNum=A12&titleName=C02&_=1567266047214`
  return {...req, uri, xpage:page}
}

const pattern = /"EXCELNAME":\s*\"(.+)\"/g
const onRes = res => {
  console.log("page: " + res.options.xpage);
  // console.log(res.body);

  let result = []
  let found = false
  while ((result = pattern.exec(res.body)) !== null) {
    // console.log(result[1]);
    if (result[1].indexOf('龙盈2号') >= 0
      // || result[1].indexOf('龙盈3号') >= 0
    ) {
      found = true
      break;
    }
  }

  if (found) {
    console.log(res.body);
  } else {
    c.queue(reqPage(res.options.xpage + 1))
  }
}
const c = createCrawler(onRes);
c.queue(reqPage(37))
