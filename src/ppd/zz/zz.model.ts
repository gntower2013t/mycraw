import { convert } from "../util";

const applyEx: ZZApply = {
  "listingId": 132579883,
  "currentRate": 16.0,
  // "vouch": 0,
  // "isPay": false,
  "creditCode": "A",
  "owingNumber": 3, //剩余期数
  "nextRepayDate": new Date("2019-08-19 19:01:38"),
  "leftRepayDay": 2,
  "owingPrincipal": 13.25,
  "owingInterest": 0.35, //总待收利息
  "preDebtdealId": 215044319,
  // "valuation": 1.0005, //??
  // "number": 12, //总期数
  // "rateMinMultiples": 1.0,
  // "rateMaxMultiples": 2.0,
  "pastDueNumber": 1, //曾逾期期数
  "pastDueDay": 1,
  // "currentDueDay": -2,
  "priceForSale": 13.25
}

interface Page{
  pageNo: number;
  total: number;
}

export interface ZZApplyList extends Page {
  items: ZZApply[]
}

export interface ZZApply {
  listingId: number;
  currentRate: number;
  creditCode: string;
  owingNumber: number;
  nextRepayDate: Date;
  leftRepayDay: number;
  owingPrincipal: number;
  owingInterest: number;
  preDebtdealId: number;
  pastDueNumber: number;
  pastDueDay: number;
  priceForSale: number;
}


const bidzzEx: BidZZ = {
  "debtDealId": 256537358,
  "creditCode": "B",  //原标等级
  "listingId": 319744082,
  "currentRate": 18,
  "owingPrincipal": 200,
  "priceForSale": 49.08,
  "closeBidDate": new Date("2019-07-15 13:42:10"),
  "statusId": 4  //无用, 4=已转让 ?
}

//dueType: 2 正逾期
export interface BidZZ {
  debtDealId: number;
  creditCode: string;
  listingId: number;
  currentRate: number;
  owingPrincipal: number;
  priceForSale: number;
  closeBidDate: Date;
  statusId: number;
}

export function convertBidZZ(raw: any): BidZZ {
  return convert(raw, bidzzEx, {
    closeBidDate: v => new Date(v)
  })
}

export function convertZZApply(raw: any): ZZApply {
  return convert(raw, applyEx, {
    nextRepayDate: v => new Date(v)
  })
}

export interface BidZZList{
  "total": number
  "pageNo": number
  // "pageSize": 10,
  items: BidZZ[]
}
