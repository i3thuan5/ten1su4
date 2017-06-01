import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import sinon from "sinon";
import MyProvider from "../../src/providers";
import config from "../../src/config";

const setup = () => {
  const component = shallow(
    <MyProvider/>,
  );
  return { component };
};

describe("provider", () => {
  let stubConfig;
  before(() => {
    stubConfig = sinon.stub(config, "預設腔口")
      .callsFake(() => ("大埔腔"));
  });
  after(() => {
    stubConfig.restore();
  });
  it("gets 腔口", () => {
    const { component } = setup();
    const testStore = component.instance().getAppStore();
    expect(testStore.getState().查詢.腔口).to.equal("大埔腔");
  });
  it("gets 結果腔口", () => {
    const { component } = setup();
    const testStore = component.instance().getAppStore();
    expect(testStore.getState().查詢結果.結果腔口).to.equal("大埔腔");
  });
});
