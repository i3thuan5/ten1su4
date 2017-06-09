const configGenerator = {
  專案: () => tensuConfig.專案,
  全部腔口: () => tensuConfig.腔口,
  預設腔口: () => tensuConfig.腔口[0],
  範例查詢: () => tensuConfig.範例查詢,
  頁尾連結: () => tensuConfig.頁尾連結,
};

export default configGenerator;
