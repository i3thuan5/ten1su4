import { expect } from "chai";
import sinon from "sinon";
import config, { FUNC } from "../../src/config";

describe("config", () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it("reads config", () => {
    // sandbox.stub(FUNC, "getConfigPath")
    // .callsFake(() => ("sui2.config.js"));
    // console.log(FUNC.getConfigPath());
    // expect(config).to.be.an.instanceof(Object);
  });
  it("throws Error config not found", () => {
    sandbox.stub(FUNC, "getConfigPath")
    .callsFake(() => ("notexist.config.js"));
    expect(() => {
      FUNC.loadConfigJS(
        FUNC.getConfigPath());
    }).to.throw(Error, /^taupahji\.config\.js not found\./);
  });
});
