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

const payoffItemEx: PayoffItem = {
  "bidDate": new Date("2019-07-19"),
  "repayAmount": 101.17,
  "principal": 100,
  // "pay": 0,
  "listingId": 329208534,
  // "title": "APP老客借款",
  "rate": 14
}
const blackItemEx: BlackItem = {
  "borrowerName": "pdu3****03824",
  "overduePrincipal": 8.11,
  "repayAmount": 8.88,
  "principal": 50,
  "overdueDays": 2,
  "maxOverdueDays": 0,
  "listingId": 317536940,
  // "pay": 0,
  // "title": "手机app用户的第6次闪电借款"
}

export interface BlackItem {
  borrowerName: string;
  overduePrincipal: number;
  repayAmount: number;
  principal: number;
  overdueDays: number;
  maxOverdueDays: number;
  listingId: number;
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

export interface PayoffItem {
  bidDate: Date;
  principal: number; //原本金
  listingId: number;
  rate: number;
  repayAmount: number; //已收本息
}

interface Page{
  totalRecord: number;
  totalPage: number;
}
export interface BidList {
  scatterNormalRecordInfoList: BidItem[];
  page: Page
}

export interface PayoffList {
  scatterPayOffRecordInfoList: PayoffItem[];
  page: Page
}

export interface BlackList {
  scatterBlacklistRecordInfoList: PayoffItem[];
  page: Page
}

export function convertBidItem(raw: any): BidItem {
  return convert(raw, bidItemEx, {
    bidDate: v => new Date(v)
  })
}
export function convertPayoffItem(raw: any): PayoffItem {
  return convert(raw, payoffItemEx, {
    bidDate: v => new Date(v)
  })
}
export function convertBlackItem(raw: any): BlackItem {
  return convert(raw, blackItemEx, { })
}
