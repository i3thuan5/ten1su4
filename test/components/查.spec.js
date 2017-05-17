import React from "react";
import sinon from "sinon";
import { expect } from "chai";
import { shallow } from "enzyme";
import 查 from "../../src/頁/查/查";

const setup = (語句 = "", 正在查詢 = false) => {
  const component = shallow(
    <查 腔="四縣腔"
      requestSearch={sinon.spy()}
      語句={語句}
      正在查詢={正在查詢}/>,
    );
  return {
    component,
    button: component.find("button"),
  };
};

describe("元素", () => {
  describe("查", () => {
    it("搜尋中鎖住按鈕", () => {
      const { button } = setup("大家共下來", true);
      expect(button.hasClass("disabled")).to.equal(true);
    });
  });
});
