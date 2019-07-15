import { convert, toPercent } from "../util";

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

export function convertData(raw: any, id:number): StaMonth{
  const data = convert(raw, ex, {
    dateMonth(value: string) {
      return new Date(value)
    },
    bidRateAverage: toPercent,
    overdueRate30Average:toPercent,
    overdueRate90Average:toPercent,
  })

  data.strategyId = id
  return data
}
