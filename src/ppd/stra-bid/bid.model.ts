import { convert } from "../util";

const ex = {
  "totalSize": 6396,
  "totalPage": 640,
  "sumBidAmount": 951641
}

export interface BidList {
  totalSize: number;
  totalPage: number;
  sumBidAmount: number;
  bidList: Bid[]
}

interface Bid {
  strategyTitle: string;
  listingid: string;
  bidAmount: number;
  feeAmount: number;
  finalStatus: number; //-1 还款中, 12 已还完
  finalStatusString: string;
  bidDateTime: Date;
  currentRate: number;
}

const bidEx: Bid = {
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

console.log(


  new Date("2019/06/30 23:09:11").getFullYear()
  );

export function convertBid(raw: any): Bid{
  return convert(raw, bidEx, {
    bidDateTime(value: string) {
      return new Date(value)
    }
  })
}
