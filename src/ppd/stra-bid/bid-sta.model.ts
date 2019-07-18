import { convert } from "../util";

const ex = {
  "totalSize": 6396,
  "totalPage": 640,
  "sumBidAmount": 951641
}

export interface StaBidList {
  totalSize: number;
  totalPage: number;
  sumBidAmount: number;
  bidList: StaBid[]
}

interface StaBid {
  strategyTitle: string;
  listingid: string;
  bidAmount: number;
  feeAmount: number;
  finalStatus: number; //-1 还款中, 12 已还完
  finalStatusString: string;
  bidDateTime: Date;
  currentRate: number;
}

const bidEx: StaBid = {
  "strategyTitle": "小精准精品二号策略",
  "listingid": "325721184",
  "bidAmount": 300,
  "feeAmount": 0.3,
  "finalStatus": -1,
  "finalStatusString": "还款中",
  "bidDateTime": new Date(2019, 6, 30),
    // "2019/06/30 23:09:11",
  "currentRate": 18
}

export function convertBid(raw: any): StaBid{
  return convert(raw, bidEx, {
    bidDateTime(value: string) {
      return new Date(value)
    }
  })
}

