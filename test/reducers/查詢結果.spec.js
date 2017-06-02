import { expect } from "chai";
import 查詢結果, { 正規化綜合標音 } from "../../src/reducers/查詢結果";

const 初始狀態規範 = {
  結果語句: "",
  結果腔口: "四縣腔",
  分詞: "",
  綜合標音: [],
};

describe("Reducer 查詢結果", () => {
  it("has initial state", () => {
    expect(查詢結果(undefined, {}))
    .to
    .eql(初始狀態規範);
  });

  it("recognizes action RECIEVE_HANLO", () => {
    expect(查詢結果(undefined, {
      type: "RECIEVE_HANLO",
      語句: "大家共下來",
      腔口: "四縣腔",
      查詢結果: {
        分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
        綜合標音: [],
      },
    }))
    .to
    .eql({
      結果語句: "大家共下來",
      結果腔口: "四縣腔",
      分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
      綜合標音: [],
    });
  });

  it("正規化綜合標音 臺羅閏號調", () => {
    expect(正規化綜合標音([{
      分詞: "逐-家｜tak8-ke1",
      臺羅閏號調: "Ta̍k-ke",
      漢字: "逐家",
    }]))
    .to
    .eql([{
      分詞: "逐-家｜tak8-ke1",
      漢字: "逐家",
      羅馬字: "Ta̍k-ke",
    }]);
  });

  it("正規化綜合標音 臺灣客話", () => {
    expect(查詢結果(undefined, {
      type: "RECIEVE_HANLO",
      語句: "大家共下來",
      腔口: "四縣腔",
      查詢結果: {
        分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
        綜合標音: [{
          分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
          漢字: "大家 共下 來",
          臺灣客話: "Tai-gaˊ kiung-ha loiˇ",
        }],
      },
    }))
    .to
    .eql({
      結果語句: "大家共下來",
      結果腔口: "四縣腔",
      分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
      綜合標音: [{
        分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
        漢字: "大家 共下 來",
        羅馬字: "Tai-gaˊ kiung-ha loiˇ",
      }],
    });
  });

  it("ignores other action", () => {
    expect(查詢結果(undefined, { type: "HELLO_WORLD" }))
    .to
    .eql(初始狀態規範);
  });
});
