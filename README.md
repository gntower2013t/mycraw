# 爬虫使用说明

## 用法
* code runner 或 ts-node 直接运行(创建表, 然后 request ) 
* e.g. `ts-node "src\ppd\stra-bid\bid-craw.ts"`

## DB History
1. bid-zz  债转-已转出  (截止 0715 主要为坏账)
2. 0816 bid-receive 正常待收列表
3. 0816 zz-apply  债转-未逾期列表 (待收时间表)
4. 0903 更新: zz_apply, bid-receive
5. 0907  0908
  - 0907 更新 bid_black
  - 0908  临时表_0908 0909  (bid_receive, zz_apply)
  - 增加 zz_bad 可转出已逾期列表
