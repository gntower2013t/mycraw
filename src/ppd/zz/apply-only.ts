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

const toApply = [{"listingId":314456888,"preDebtDealId":0,"priceForSaleRate":0.18,"allowanceRadio":0,"priceForSale":155.52},{"listingId":314461317,"preDebtDealId":0,"priceForSaleRate":0.18,"allowanceRadio":0,"priceForSale":155.52},{"listingId":325636163,"preDebtDealId":0,"priceForSaleRate":0.18,"allowanceRadio":0,"priceForSale":255.36},{"listingId":325675037,"preDebtDealId":0,"priceForSaleRate":0.18,"allowanceRadio":0,"priceForSale":280.86},{"listingId":325602397,"preDebtDealId":0,"priceForSaleRate":0.18,"allowanceRadio":0,"priceForSale":187.25},{"listingId":325625440,"preDebtDealId":0,"priceForSaleRate":0.18,"allowanceRadio":0,"priceForSale":280.86},{"listingId":325626119,"preDebtDealId":0,"priceForSaleRate":0.18,"allowanceRadio":0,"priceForSale":280.86},{"listingId":319658752,"preDebtDealId":0,"priceForSaleRate":0.18,"allowanceRadio":0,"priceForSale":171.38}]

for (let i = 0; i < toApply.length; i += 30) {
  console.log(`to apply ${i} - ${i + 30}`);
  c.queue(apply( toApply.slice(i, i + 30) ))
}
