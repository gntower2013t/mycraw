import { convert } from "../util";

const summaryEx: BidSummary = {
/*   "status": {
    "code": 1,
    "message": "成功"
  }, */
  "number": 10068,
  "owingPrincipal": 1586232.56,
  "owingInterest": 116711.62,
  "repayPrincipal": 143645.44,
  "repayInterest": 16057.84,
  "repayOverdue": 11.38
}

export interface BidSummary {
  number: number; //笔数
  owingPrincipal: number; //待收本金
  owingInterest: number; //待收利息
  repayPrincipal: number; //已回收本金
  repayInterest: number; //已回收利息
  repayOverdue: number; //逾期利息
}

const bidItemEx: BidItem = {
  "bidDate": new Date("2019-07-19"),
  "owingAmount": 52.66,
  "owingPrincipal": 50,
  "principal": 50,
  // "pay": 0,
  "listingId": 329401898,
  // "title": "APP老客借款",
  "rate": 18,
  "repayAmount": 0
}

export interface BidItem {
  bidDate: Date;
  owingAmount: number;  //待收本息
  owingPrincipal: number; //待收本金
  principal: number; //原本金
  // pay: number;
  listingId: number;
  // title: string;
  rate: number;
  repayAmount: number; //已收本息
}

export interface BidList {
  scatterNormalRecordInfoList: BidItem[];
  page: {
    totalRecord: number;
    totalPage: number;
  }
}

export function convertBidItem(raw: any): BidItem {
  return convert(raw, bidItemEx, {
    bidDate: v => new Date(v)
  })
}
