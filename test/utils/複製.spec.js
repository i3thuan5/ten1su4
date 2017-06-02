import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import 計算複製內容 from "../../src/utils/複製";

const 一標音 = [{
  分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
  漢字: "大家 共下 來",
  羅馬字: "Tai-gaˊ kiung-ha loiˇ",
}];

const 一標音複製內容 = {
  漢字: "大家共下來",
  羅馬字: "Tai-gaˊ kiung-ha loiˇ",
  漢字羅馬: "大家共下來\nTai-gaˊ kiung-ha loiˇ",
};

describe("utils", () => {
  describe("複製", () => {
    it("計算複製內容", () => {
      expect(計算複製內容(一標音)).to.eql(一標音複製內容);
    });
    it("計算空複製內容", () => {
      const 綜合標音 = [];
      const expectResult = [];
      expect(計算複製內容(綜合標音)).to.eql(expectResult);
    });
    it("計算多行複製內容", () => {
      const 綜合標音 = 一標音.concat(一標音);
      const expectResult = {
        漢字: "大家共下來\n大家共下來",
        羅馬字: "Tai-gaˊ kiung-ha loiˇ\nTai-gaˊ kiung-ha loiˇ",
        漢字羅馬: "大家共下來\nTai-gaˊ kiung-ha loiˇ\n大家共下來\nTai-gaˊ kiung-ha loiˇ",
      };
      expect(計算複製內容(綜合標音)).to.eql(expectResult);
    });
    it("移除漢字之間空白", () => {
      expect(計算複製內容(一標音)).to.eql(一標音複製內容);
    });
    it("移除多行漢字之間空白", () => {
      const 綜合標音 = 一標音.concat(一標音);
      const expectResult = {
        漢字: "大家共下來\n大家共下來",
        羅馬字: "Tai-gaˊ kiung-ha loiˇ\nTai-gaˊ kiung-ha loiˇ",
        漢字羅馬: "大家共下來\nTai-gaˊ kiung-ha loiˇ\n大家共下來\nTai-gaˊ kiung-ha loiˇ",
      };
      expect(計算複製內容(綜合標音)).to.eql(expectResult);
    });
  });
});
