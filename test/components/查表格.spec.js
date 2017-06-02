import React from "react";
import sinon from "sinon";
import { expect } from "chai";
import { shallow } from "enzyme";
import 查表格, { 取得新網址 } from "../../src/頁/查/查表格";
import config from "../../src/config";

const initArgv = {
  腔: "四縣腔",
  語句: "大家共下來",
  正在查詢: false,
};
const setup = (argv = initArgv) => {
  const component = shallow(
    <查表格 {...argv}
      requestSearch={sinon.spy()}/>,
    );
  return {
    component,
    button: component.find("button"),
    select: component.find("select"),
  };
};

describe("元素", () => {
  describe("查表格", () => {
    let sandbox;
    const stubConfig = (property, returnValue) => {
      sandbox.stub(config, property)
      .callsFake(() => (returnValue));
    };
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
      sandbox.restore();
    });
    it("搜尋中鎖住按鈕", () => {
      const { button } = setup({
        ...initArgv,
        正在查詢: true,
      });
      expect(button.hasClass("disabled")).to.equal(true);
    });
    it("config全部腔口>1 顯示選單", () => {
      stubConfig("全部腔口", ["大埔腔", "饒平腔"]);
      const { select } = setup();
      expect(select.exists()).to.equal(true);
    });
    it("config全部腔口>1 項目等同config全部腔口", () => {
      stubConfig("全部腔口", ["大埔腔", "饒平腔"]);
      const { select } = setup();
      expect(select.childAt(0).text()).to.equal("大埔腔");
    });
    it("config全部腔口=1 不顯示選單", () => {
      stubConfig("全部腔口", ["大埔腔"]);
      const { select } = setup();
      expect(select.exists()).to.equal(false);
    });
    it("config全部腔口>1 新網址/{腔}/{語句}", () => {
      stubConfig("全部腔口", ["大埔腔", "饒平腔"]);
      const { 語句, 腔 } = initArgv;
      expect(取得新網址(語句, 腔))
      .to.equal(`/%E8%AC%9B/${腔}/${encodeURI(語句)}`);
    });
    it("config全部腔口=1 新網址/{語句}/", () => {
      stubConfig("全部腔口", ["大埔腔"]);
      const { 語句, 腔 } = initArgv;
      expect(取得新網址(語句, 腔))
      .to.equal(`/%E8%AC%9B/${encodeURI(語句)}`);
    });
  });
});
