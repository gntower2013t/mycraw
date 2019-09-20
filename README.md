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
