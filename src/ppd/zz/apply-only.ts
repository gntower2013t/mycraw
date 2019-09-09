import { createCrawler, cookie } from "../req";
import { ToApplyItem, ToApplyRequest } from "./zz.model";

const c = createCrawler();
c.setLimiterProperty('slow', 'rateLimit', 10000)

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

const toApply =
  [{ "listingId": 316094287, "preDebtDealId": 0, "priceForSaleRate": 0.22, "allowanceRadio": 0, "priceForSale": 104.54 }, { "listingId": 316116281, "preDebtDealId": 0, "priceForSaleRate": 0.18, "allowanceRadio": 0, "priceForSale": 103.7 }]

for (let i = 0; i < toApply.length; i += 30) {
  console.log(`to apply ${i} - ${i + 30}`);
  c.queue(apply( toApply.slice(i, i + 30) ))
}
