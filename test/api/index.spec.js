import { expect } from "chai";
import sinon from "sinon";
import API, { 全部標音鍵 } from "../../src/api";
import config from "../../src/config";

describe("API", () => {
  const domain = "https://服務.意傳.台灣/";
  let sandbox;
  before(() => {
    sandbox = sinon.sandbox.create();
  });
  after(() => {
    sandbox.restore();
  });
  it("取得查詢函式名稱 config專案 預設值", () => {
    sandbox.stub(config, "專案")
    .callsFake(() => ("寫啥物"));
    const funcName = API.取得查詢函式名稱();
    expect(funcName).to.equal("正規化翻譯");
  });
  it("取得查詢函式名稱 鬥拍字", () => {
    const funcName = API.取得查詢函式名稱("鬥拍字");
    expect(funcName).to.equal("標漢字音標");
  });
  it("取得查詢函式名稱 寫啥物", () => {
    const funcName = API.取得查詢函式名稱("寫啥物");
    expect(funcName).to.equal("正規化翻譯");
  });
  it("回傳對應名稱函式 鬥拍字", () => {
    const func = API.取得查詢函式("鬥拍字");
    expect(func()).to.equal(`${domain}標漢字音標`);
  });
  it("回傳對應名稱函式 寫啥物", () => {
    const func = API.取得查詢函式("寫啥物");
    expect(func()).to.equal(`${domain}正規化翻譯`);
  });
  it("returns 語音合成 閩南語", () => {
    const url = API.語音合成({
      腔口: "閩南語",
      分詞: "逐-家｜Tak8-ke1",
    });
    expect(url).to.equal(
      encodeURI(`${domain}語音合成?` +
        "查詢腔口=閩南語&查詢語句=逐-家｜Tak8-ke1"));
  });
});
