import { cookie } from "../req";
import { ToApplyItem, ToApplyRequest, ZZApply, PreApplyRequestItem, PreApplyRequest } from "./zz.model";

export const zzListReq = {
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

export function apply(items: ToApplyItem[], leftItems: ToApplyItem[]) {
  const req = new ToApplyRequest()
  req.items = items
  return { ...applyReq, body: JSON.stringify(req), limiter: 'slow', xapply: leftItems}
}


export const preApplyReq = {
  uri: 'https://transfer.ppdai.com/api/debt/pcApplyDebtService/preApplyDebt',
  method: "POST",
  referer: "https://transfer.ppdai.com/menu/negotiable/applyNew",
  headers: {
    Origin: "https://transfer.ppdai.com",
    "Content-Type": "application/json;charset=UTF-8",
    Cookie: cookie
  },
}

export function preApply(ids: ZZApply[]) {
  const preApplyRequestList = ids.map(id => new PreApplyRequestItem(id.listingId, id.preDebtdealId))
  const request = { ...new PreApplyRequest(), preApplyRequestList }
  return {...preApplyReq, body: JSON.stringify(request), xdata:ids}
}

export function doApply(crawler, toApply: any[]) {

  for (let i = 0; i < toApply.length; i += 30) {
    console.log(`to apply ${i} - ${i + 30}`);

    crawler.queue(apply(
      toApply.slice(i, i + 30).map(r => r.item),
      toApply.slice(i, toApply.length).map(r => r.item),
    ))
  }

}
