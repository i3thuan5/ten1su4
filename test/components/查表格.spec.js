import "jsdom-global/register";
import React from "react";
import sinon from "sinon";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
import { browserHistory } from "react-router";
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
    button: component.find("button"),
  };
};
const setupMount = (argv = initArgv) => {
  const rs = sinon.spy();
  const component = mount(
    <查表格 {...argv}
      requestSearch={rs}/>,
    );
  return {
    component,
    select: component.find("select"),
    button: component.find("button"),
    form: component.find("form"),
    requestSearch: rs,
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
      const { select } = setupMount();
      expect(select.exists()).to.equal(true);
    });
    it("config全部腔口>1 選單等同config全部腔口", () => {
      stubConfig("全部腔口", ["大埔腔", "饒平腔"]);
      const { select } = setupMount();
      expect(select.childAt(0).text()).to.equal("大埔腔");
    });
    it("config全部腔口=1 不顯示選單", () => {
      stubConfig("全部腔口", ["饒平腔"]);
      const { select } = setupMount();
      expect(select.exists()).to.equal(false);
    });
    it("config全部腔口>1 新網址/{腔}/{語句}", () => {
      stubConfig("全部腔口", ["大埔腔", "饒平腔"]);
      const { 語句, 腔 } = initArgv;
      expect(取得新網址(語句, 腔))
      .to.equal(`/%E8%AC%9B/${腔}/${encodeURI(語句)}`);
    });
    it("config全部腔口=1 新網址/{語句}/", () => {
      stubConfig("全部腔口", ["饒平腔"]);
      const { 語句, 腔 } = initArgv;
      expect(取得新網址(語句, 腔))
      .to.equal(`/%E8%AC%9B/${encodeURI(語句)}`);
    });
    it("第一次查詢 查詢腔口=props.腔", () => {
      stubConfig("全部腔口", ["大埔腔"]);
      const { component, requestSearch } = setupMount({
        ...initArgv,
        腔: "大埔腔",
      });
      expect(requestSearch.args[0])
      .to.eql([initArgv.語句, "大埔腔"]);
    });
    it("切換選單後第二次查詢 查詢腔口=選單切換後的腔口", () => {
      stubConfig("全部腔口", ["大埔腔", "饒平腔"]);
      const routerStub = sandbox.stub(browserHistory, "replace");
      const { select, button, form, requestSearch } = setupMount();
      // componentDidMount e7 thau1 tso3 tsit8 pai2 rs,
      // soo2-i2 ai3 tshing1 tiau7
      requestSearch.reset();
      // https://github.com/airbnb/enzyme/issues/389#issuecomment-268431475
      // select.simulate("change", { target: { value: "饒平腔" } });
      select.node.selectedIndex = 1;
      // https://github.com/airbnb/enzyme/issues/308
      //  button.first().simulate("click");
      form.simulate("submit");
      expect(routerStub.called).to.eql(true);

      expect(requestSearch.args[0])
      .to.eql([initArgv.語句, "饒平腔"]);
    });
  });
});
