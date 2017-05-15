import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { HanLoTsua } from "demo-ui";
import 漢羅列表 from "../../src/元素/顯示/漢羅列表";
import { 腔口 } from "../../src/constants";

const setup = (綜合標音 = []) => {
  const component = shallow(
    <漢羅列表 綜合標音={綜合標音}/>,
    );
  return {
    component,
    漢羅逝: component.find(HanLoTsua),
  };
};

const 一標音 = [{
  '分詞': '大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ',
  '漢字': '大家 共下 來',
  '臺灣客話': 'Tai-gaˊ kiung-ha loiˇ',
}];

describe("Component", () => {
  describe("漢羅列表", () => {
    it("renders 1 漢羅一逝", () => {
      const { 漢羅逝 } = setup(一標音);
      expect(漢羅逝).to.have.length(1);
    });
    it("renders 1 漢羅一逝 with space", () => {
      const { 漢羅逝 } = setup(一標音);
      expect(漢羅逝).to.have.length(1);
    });
    it("renders 2 漢羅一逝", () => {
      const { 漢羅逝 } = setup(一標音.concat(一標音));
      expect(漢羅逝).to.have.length(2);
    });
    it("passes props to 漢羅一逝", () => {
      const { 漢羅逝 } = setup(一標音);
      expect(漢羅逝.props()).to.eql({
        腔口: 腔口,
        臺羅閏號調: "Tai-gaˊ kiung-ha loiˇ",
        漢字: "大家 共下 來",
        分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
      });
    });
    it("renders none", () => {
      const { 漢羅逝 } = setup([]);
      expect(漢羅逝).to.have.length(0);
    });
  });
});
