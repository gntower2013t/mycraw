
export interface SList {
  totalCount: number;
  strategyList: Strategy[]
}

export interface Strategy {
  strategyId: number;
  userId: number;
  nickName: string;
  strategyTitle: string;
  overdueRate30: number;
  overdueRate60: number;
  overdueRate90: number;
  level: number;
  strategyType: number; //0 赔标, 1 信标
  bidDurationAverage: number;
  feeRate: number;
  funding: number; //使用人数
  runDays: number;
}

const sExample  =
{
  "strategyId": 1068,
  "strategyTitle": "Ganesha象神一号",
  "plannerName": null,
  "rate": 0.1754,
  "overdueRate30": 0.0263,
  "overdueRate60": 0.0238,
  "overdueRate90": 0.0206,
  "bidAmountAverage": 4193575.2667,
  "level": 4,
  "sumBidAmount": 79496606,
  "introduction": "本策略追求稳健，并将根据平台标的数量和利率的变化，及时做出相应调整。",
  "avatarUrl": "https://jc01.info.user.ppdai.com/8b8662ac59704215b385c5a40bc54b41.png",
  "strategyType": 1,
  "bidDurationAverage": 8,
  "feeRate": 0.001,
  "funding": 198,
  "amount": 200,
  "userId": 9309015,
  "nickName": "Ganesha",
  "isOpen": 0,
  "overdueRate90AverageStr": "2.06%",
  "overdueRate30AverageStr": "2.63%",
  "overdueRate60AverageStr": "2.38%",
  "runDays": 576
}

const s: Strategy = sExample;
