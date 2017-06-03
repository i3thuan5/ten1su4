import React from "react";
import { expect } from "chai";
import sinon from "sinon";
import { shallow } from "enzyme";
import 網站 from "../../src/網站/網站";
import 查 from "../../src/頁/查/查";
import config from "../../src/config";

const initArgv = {
  children: <查/>,
  params: {
    ku: undefined,
    khiunn: undefined,
  },
};

const setup = (argv = initArgv) => {
  const component = shallow(
    <網站 {...argv}/>,
  );
  return {
    child: component.childAt(1),
  };
};

describe("Component", () => {
  describe("網站", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
      sandbox.restore();
    });
    it("passes config 預設腔口", () => {
      sandbox.stub(config, "預設腔口")
      .callsFake(() => ("海陸腔"));
      const { child } = setup();
      expect(child.props().腔).to.equal("海陸腔");
    });
    it("passes config 範例查詢", () => {
      sandbox.stub(config, "範例查詢")
      .callsFake(() => ("大家"));
      const { child } = setup();
      expect(child.props().語句).to.equal("大家");
    });
  });
});
