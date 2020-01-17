# 爬虫使用说明

## 用法
* code runner 或 ts-node 直接运行(创建表, 然后 request ) 
* e.g. `ts-node "src\ppd\stra-bid\bid-craw.ts"`

## DB History
1. bid-zz  债转-已转出  (截止 0715 主要为坏账)
  - bid_black 0719
2. 0816 bid-receive 正常待收列表
3. 0816 zz-apply  债转-未逾期列表 (待收时间表)
4. 0903 更新: zz_apply, bid-receive
5. 0907  0908
  - 0907 更新 bid_black (bid.crl)
  - 0908  临时表_0908 0909  (bid_receive_0908, zz_apply_0908 --zz.crl)
    - 相减后得出 不可转出列表 
  - 增加 zz_bad 可转出已逾期列表
6. 更新 stra_bid (最后为0720)
7. 0919
  - zz_apply_0908 更新为full 债转-未逾期列表 (待收时间表)
  - bid_black 更新
8. 11/14
  - bid_list_temp 投标列表; bid_black 黑名单列表; zz_bad (逾期剩余本金)
8. 12/15
  - bid_black 黑名单列表; zz_bad (逾期剩余本金)


## 计算

* 逾期率粗算; bid-black.crl
```sql
select s.strategyTitle, sum(s.bidAmount), count(0) total, count(bb.listingId) black, 
 count(bb.listingId)*100.0/count(0), min(ss.id)
from stra_bid s
 left join bid_black bb on bb.listingId=s.listingid and bb.overdueDays>=10
 left join strategy ss on s.strategyTitle = ss.strategyTitle
 -- where s.bidDateTime < strftime('%s', '2019-06-09')*1000
 group by s.strategyTitle
 order by s.strategyTitle
 ;

```

* 逾期金额 (zz_bad(10-90) + bid_black 坏账>90)
```sql
 --逾期不包括坏账 (预计坏账)
select s.strategyTitle, sum(z.owingPrincipal), count(bb.listingId) black
from stra_bid s
 left join bid_black bb on s.listingid=bb.listingId
 left join zz_bad z on z.listingId=bb.listingId
 where bb.overdueDays>=10 and bb.overdueDays <=90 or bb.id is null
 group by s.strategyTitle
 order by s.strategyTitle
 ; 
 
 --坏账统计
select s.strategyTitle, sum(bb.principal-bb.repayAmount), count(bb.id)
 from stra_bid s
 left join bid_black bb on s.listingId=bb.listingId 
where bb.overdueDays>90 or bb.id is null
  group by s.strategyTitle
 order by s.strategyTitle;
```

* 当前 策略-投标 统计; bid-list.crl
```sql
select s.strategyTitle, count(0), sum(bl.owingPrincipal)
 from bid_list_temp bl 
 left join stra_bid s on s.listingid=bl.listingId
 group by s.strategyTitle
 order by s.strategyTitle;
```
