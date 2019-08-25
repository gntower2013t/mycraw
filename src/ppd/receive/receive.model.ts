import { convert } from "../util";

export interface Result {
  scatterOwingRecordInfoList: Item[]
  page: Page
}

export interface Page {
  targetPage: number;
  pageSize: number;
  totalRecord: number;
  totalPage: number;
}

const itemEx: Item = {
  "dueDate": new Date("2019-07-29"),
  "listingId": 314340407,
  "owingAmount": 35.11,
  "owingPrincipal": 33.08,
  "owingInterest": 2.03,
  "overdue": 0,
  // "pay": 0,
  "currentStatus": 1
}

export interface Item {
  dueDate: Date; //回款日
  listingId: number;
  owingAmount: number; //本金+利息
  owingPrincipal: number; //本金
  owingInterest: number;
  overdue: number;  //逾期利息
  // pay: number;
  currentStatus: number;  //1 正常, 2 逾期
}

export function convertItem(raw: any): Item {
  return convert(raw, itemEx, {
    dueDate: v => new Date(v)
   })
}
