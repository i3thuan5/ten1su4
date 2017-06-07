import React from "react";
import { expect } from "chai";
import sinon from "sinon";
import { shallow } from "enzyme";
import { Footer } from "demo-ui";
import 頁尾 from "../../src/網站/頁尾";
import config from "../../src/config";

const setup = () => {
  const component = shallow(
    <頁尾/>,
  );
  return {
    child: component.find(Footer),
  };
};

describe("Component", () => {
  describe("頁尾", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
      sandbox.restore();
    });
    it("passes config 頁尾連結", () => {
      const fakeSites = [{
        title: "Facebook",
        url: "https://www.facebook.com/i3thuan5/",
      }];
      sandbox.stub(config, "頁尾連結")
      .callsFake(() => (fakeSites));
      const { child } = setup();
      expect(child.props().sites).to.eql(fakeSites);
    });
    it("renders null", () => {
      const fakeSites = [];
      sandbox.stub(config, "頁尾連結")
      .callsFake(() => (fakeSites));
      const { child } = setup();
      expect(child.exists()).to.equal(false);
    });
  });
});
