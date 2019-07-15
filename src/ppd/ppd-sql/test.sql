delete from strategy;
delete from stra_bid;

select distinct s.strategyTitle from stra_bid s;

 -- strategy: 0715 created
 -- rate3
select s.overdueRate30 o30, s.rate, s.strategyId,
 s.bidAmountAverage bidAmount, s.strategyTitle, s.bidDurationAverage due, s.runDays
 from strategy s
 where s.runDays>100 and s.overdueRate30>0 and s.bidAmountAverage>100
 order by o30
 ;

-- rate3
select s.overdueRate30 o30, s.rate-s.overdueRate30*3 as rr, s.strategyId,
 s.bidAmountAverage bidAmount, s.strategyTitle, s.bidDurationAverage due, s.runDays
 from strategy s
 where s.runDays>100 and s.overdueRate30>0 and s.bidAmountAverage>100
 order by rr desc
 ;

-- rate年化
select s.overdueRate30 o30, s.rate-s.overdueRate30*12/s.bidDurationAverage as rr, s.strategyId,
 s.bidAmountAverage bidAmount, s.strategyTitle, s.bidDurationAverage due, s.runDays
 from strategy s
 where s.runDays>100 and s.overdueRate30>0 and s.bidAmountAverage>100
 order by rr desc
 ;
