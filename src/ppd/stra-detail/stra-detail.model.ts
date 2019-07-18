import { convert, toPercent, toWang } from "../util";

const ex: StaMonth = {
  strategyId: 889,
  "bidRateAverage": 0.1661,
  "bidDurationAverage": 7.8,
  "dateMonth": new Date("2019-07"),
  "overdueRate30Average": 0,
  "overdueRate90Average": 0,
  "overdue30ListingCount": 0,
  "overdue90ListingCount": 0,
  "bidAmount": 1499419,
  "bidCount": 3752,
  // "inserttime": 1563156006000,
  "overdueRate30AverageStr": "--",
  "overdueRate90AverageStr": "--",
  "satisfyOverdue30ListingCount": 0,
  "satisfyOverdue90ListingCount": 0
}

const exRealMini: StaReal = {
  strategyId: 8455,
  "realOverdueRate30Average": 0.0057,
  "realOverdueRate90Average": 0.005,
  "realBidRateAverage": 0.1576,
  "realBidAmountAverage": 27408.31,
  "realBidDurationAverage": 9,
}

export interface StaReal {
  strategyId: number,
  realOverdueRate30Average: number;
  realOverdueRate90Average: number;
  realBidRateAverage: number;
  realBidAmountAverage: number; //日均投标
  realBidDurationAverage: number;
}

interface StaMonth{
  strategyId: number;
  bidRateAverage: number;
  bidDurationAverage: number;
  dateMonth: Date;
  overdueRate30Average: number;
  overdueRate90Average: number;
  overdue30ListingCount: number;
  overdue90ListingCount: number;
  bidAmount: number;
  bidCount: number;
  // inserttime: number;
  overdueRate30AverageStr: string;
  overdueRate90AverageStr: string;
  satisfyOverdue30ListingCount: number;
  satisfyOverdue90ListingCount: number;
}

export interface StaMonthList{
  pageNum: number;
  pageSize: number;
  totalSize: number;
  totalPage: number;
  list: StaMonth[]
}

export function convertStaReal(raw: any, id: number): StaReal {
  const data = convert(raw, exRealMini, {
    "realOverdueRate30Average": toPercent,
    "realOverdueRate90Average": toPercent,
    "realBidRateAverage": toPercent,
    //update: 留小数点
    realBidAmountAverage: input => input / 10000.0,
  })

  data.strategyId = id
  return data
}

export function convertData(raw: any, id:number): StaMonth{
  const data = convert(raw, ex, {
    dateMonth(value: string) {
      return new Date(value)
    },
    bidRateAverage: toPercent,
    overdueRate30Average: toPercent,
    overdueRate90Average: toPercent,
  })

  data.strategyId = id
  return data
}
