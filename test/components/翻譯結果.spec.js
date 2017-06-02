import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import 翻譯結果 from "../../src/元素/翻譯/翻譯結果";

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
  });
});
