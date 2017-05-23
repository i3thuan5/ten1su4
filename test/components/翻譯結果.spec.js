import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import 翻譯結果, { 計算複製內容 } from "../../src/元素/翻譯/翻譯結果";

const initArgv = {
  正在查詢: false,
  發生錯誤: false,
  腔口: "四縣腔",
  分詞: "",
  綜合標音: [],
};

const setup = (argv = initArgv) => {
  const component = shallow(
    <翻譯結果 {...argv}/>,
    );
  return {
    component,
    header: component.find(".header"),
  };
};

const 一標音 = [{
  分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
  漢字: "大家 共下 來",
  臺灣客話: "Tai-gaˊ kiung-ha loiˇ",
}];

const 一標音複製內容 = {
  漢字: "大家共下來",
  臺羅: "Tai-gaˊ kiung-ha loiˇ",
  漢字臺羅: "大家共下來\nTai-gaˊ kiung-ha loiˇ",
};

describe("元素", () => {
  describe("翻譯結果", () => {
    it("shows requesting", () => {
      const { header } = setup({
        ...initArgv,
        正在查詢: true,
      });
      expect(header.at(0).text()).match(/^載入中……/);
    });
    it("shows server error", () => {
      const { header } = setup({
        ...initArgv,
        發生錯誤: true,
      });
      expect(header.at(0).text()).match(/^主機發生錯誤/);
    });
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
        臺羅: "Tai-gaˊ kiung-ha loiˇ\nTai-gaˊ kiung-ha loiˇ",
        漢字臺羅: "大家共下來\nTai-gaˊ kiung-ha loiˇ\n大家共下來\nTai-gaˊ kiung-ha loiˇ",
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
        臺羅: "Tai-gaˊ kiung-ha loiˇ\nTai-gaˊ kiung-ha loiˇ",
        漢字臺羅: "大家共下來\nTai-gaˊ kiung-ha loiˇ\n大家共下來\nTai-gaˊ kiung-ha loiˇ",
      };
      expect(計算複製內容(綜合標音)).to.eql(expectResult);
    });
  });
});
