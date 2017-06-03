import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { CopyButton, DownloadButton, PlayButton } from "demo-ui";
import 翻譯結果 from "../../src/元素/翻譯/翻譯結果";

const 一標音 = [{
  分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
  漢字: "大家 共下 來",
  羅馬字: "Tai-gaˊ kiung-ha loiˇ",
}];

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
    copyBtn: component.find(CopyButton),
    downBtn: component.find(DownloadButton),
    playBtn: component.find(PlayButton),
  };
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
    it("空查詢結果 不顯示任何按鈕", () => {
      const { copyBtn, downBtn, playBtn } = setup();
      expect(copyBtn.length).to.equal(0);
      expect(downBtn.length).to.equal(0);
      expect(playBtn.length).to.equal(0);
    });
    it("有查詢結果 顯示複製鈕群", () => {
      const { copyBtn } = setup({
        ...initArgv,
        綜合標音: 一標音,
      });
      expect(copyBtn.length).to.equal(4);
    });
    it("有查詢結果 顯示整段下載鈕", () => {
      const { downBtn } = setup({
        ...initArgv,
        綜合標音: 一標音,
      });
      expect(downBtn.length).to.equal(1);
    });
    it("有查詢結果 顯示整段播放鈕", () => {
      const { playBtn } = setup({
        ...initArgv,
        綜合標音: 一標音,
      });
      expect(playBtn.length).to.equal(1);
    });
  });
});
