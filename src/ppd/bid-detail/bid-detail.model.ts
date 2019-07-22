
const listingEx =  {
  "amount": 2300,
  "auditingDate": "2019-05-31 16:17:56",
  "borrowerId": 74545023,
  "creationDate": "2019-05-30 11:37:42",
  "creditCode": "B",
  "currentRate": 18,
  "description": "pdu6****00523第8次借款",
  "funding": 2300,
  "isSevenDaysRecede": null,
  "ispay": false,
  "listDuration": 5,
  "listEndDate": "2019-05-31 16:17:56",
  "listType": 0,
  "listingId": 319744082,
  "loanPeriodUnit": null,
  "months": 6,
  "showRate": 18,
  "source": 0,
  "statusId": 4,
  "title": "pdu6****00523第8次借款",
  "vouch": 0
}

const baseInfoExOther = {
  "authenticated": true,
  "availableBalance": 9264.49,
  "bidAmount": 200,
  "debgIng": false,
  "fullBidAndDebtDealing": true,
  "internalIp": false,
  "islimit": false,

  "listingBorrowerOrLender": true,
  "listingSaveBid": false,
  "loanUse": "日常消费",
  "repaymentMethod": 0,
  "totalBidUsers": 24,
  "userInfo": {
    "creationDate": "2018-01-10 09:50:39",
    "id": 74545023,
    "lastLoginDate": "2018-09-19 18:13:07",
    // "picture": "http://static.ppdai.com/app_themes/images/head/nophoto_120.gif",
    "role": 8,
    // "userName": "pdu6****00523"
  }
}

const borrowerEx =  {
  "age": "53",
  "balAmount": 133698,
  "borrowerProperties": "自然人",
  "educationInfo": null,
  "gender": "女",
  "idNumber": "45****23",
  "income": "15000及以上",
  "industry": "暂无提供",
  "overdueStatus": 0,
  "overdueTyps": null,
  "realName": "周**",
  "registerDateStr": "2018-01-10",
  "repaymentSourceType": "投资收入",
  "userAuthsList": [
    {
      "code": 2,
      // "desc": null,
      "name": "身份证认证"
    },
    {
      "code": 3,
      // "desc": null,
      "name": "手机认证"
    }
  ],
  "workInfo": "暂未提供"
}

const loanerStatisticsEx = {
  "debtAmountMap": {  //负债曲线
    "2019-02-01": 3460.89,
    "2019-02-12": 2713.56,
    // ...
  },
  "debtAmountMax": 17727.67,
  "listingStatics": {
    "borrowerID": 0,
    "cancelNum": 1,
    "failNum": 0,
    "firstSuccessDate": "2018-08-08 13:39:12",
    "lastSuccessDate": "2019-05-30 11:37:42",
    "successNum": 8,
    "wasteNum": 1
  },
  "loanAmountMax": 8181,
  "normalNum": 19,
  "overdueDayMap": {
    "2019/01": -1,
    "2019/02": 0,
    "2019/03": -1,
    "2019/04": -1,
    "2019/05": 0,
    "2019/06": 16
  },
  "overdueLessNum": 1,
  "overdueMoreNum": 0,
  "owingAmount": 16311.98,
  "owingAmountMap": {  //未来6个月的待还记录
    "2019/08": 3926.74,
    "2019/09": 2214.49,
    "2019/10": 1866.55,
    "2019/11": 1866.37,
    "2019/12": 0,
    "2020/01": 0
  },
  "owingPrincipal": 14851.33,
  "previousListings": [
    {
      "amount": 2300,
      "auditingDate": null,
      "borrowerId": null,
      "creationDate": "2019-05-30 11:37:42",
      "creditCode": null,
      "currentRate": null,
      "description": null,
      "funding": null,
      "isSevenDaysRecede": null,
      "ispay": null,
      "listDuration": 0,
      "listEndDate": null,
      "listType": 0,
      "listingId": 0,
      "loanPeriodUnit": "M",
      "months": 6,
      "showRate": 18,
      "source": null,
      "statusId": 4,
      "title": "pdu6****00523第8次借款",
      "vouch": null
    },
    //...
  ],
  "successNum": 21,
  "totalPrincipal": 28175
}

//debtRecordList  转让记录

const otherProjectInfo = {
  "administrativePenalty": "无", //行政处罚
  "badInfo": "无", //涉诉
  "businessAndFinancialInfo": "逾期",
  "repaymentPowerChange": "逾期"
}

//this bid还款记录
const payRecordEx = {
  "agentId": 0,
  "days": 21, //逾期日数
  "dueDate": "2019-06-30 00:00:00",
  "dueInterest": 29.99, //逾期利息
  "ouverDueDays": 0,
  "owingAmount": 423.7,  //本金+利息+逾期利息
  "owingDun": 25, // ??
  "owingInterest": 34.5,
  "owingOverdue": 4.99,  //??
  "owingPrincipal": 359.21,
  "paymentDate": "2019-07-16 15:14:12",
  "repayAmount": 10, //部分还款, 已还金额
  "statusId": 4  //4 逾期, 0 待还
}
