import {
  RECIEVE_HANLO,
  RECIEVE_ERROR_HANLO,
} from "../actions/action.type";



export const 正規化綜合標音 = (綜合標音 = []) => {
  //統一api回傳的標音鍵值
  if (!綜合標音 || 綜合標音.length === 0) {
    return [];
  }
  const 第一句 = 綜合標音[0];
  const keys = Object.keys(第一句);
  const newKeys = keys.filter(x => (
    x !== "臺羅閏號調" && x !== "臺灣客話" && x !== "臺羅"
  ));
  return 綜合標音.map((t) => {
    const result = {};
    //統一叫羅馬字
    result.羅馬字 = (t.臺羅閏號調 || t.臺羅) || t.臺灣客話;
    //其他鍵值維持原鍵名
    newKeys.forEach((k) => { result[k] = t[k]; });
    return result;
  });
};



const 初始state = () => ({
  結果語句: "",
  結果腔口: "",
  分詞: "",
  綜合標音: [],
});

const 查詢結果 = (state = 初始state(), action) => {
  switch (action.type) {
  case RECIEVE_HANLO:
    return {
      結果語句: action.語句,
      結果腔口: action.腔口,
      分詞: action.分詞,
      綜合標音: 正規化綜合標音(action.綜合標音),
    };
  case RECIEVE_ERROR_HANLO:
    return {
      ...state,
      正在查詢: false,
      結果腔口: action.腔口,
      查詢結果: {
        發生錯誤: true,
        ...state.查詢結果,
      },
    };
  default:
    return state;
  }
};

export default 查詢結果;
