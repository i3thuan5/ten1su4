import nock from "nock";
import { expect } from "chai";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import config from "../../src/config";
import API from "../../src/api";
import {
  REQUEST_HANLO,
  RECIEVE_HANLO,
  RECIEVE_ERROR_HANLO,
} from "../../src/actions/action.type";
import {
  是否可以請求查詢,
  遠端查詢,
} from "../../src/actions/";


describe("Action", () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let sandbox;
  const stubConfig = (property, returnValue) => {
    sandbox.stub(config, property)
    .callsFake(() => (returnValue));
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    nock.cleanAll();
    sandbox.restore();
  });

  it("查新語句", () => {
    const 同腔口 = "四縣腔";
    const store = mockStore({
      查詢: {
        語句: "大家共下來",
        腔口: 同腔口,
        正在查詢: false,
        查詢結果: {},
        結果腔口: undefined,
      },
    });
    expect(是否可以請求查詢(
        store.getState(), "下一句", 同腔口,
      )).to.equal(true);
  });

  it("查新腔調", () => {
    const 同一句 = "大家共下來";
    const store = mockStore({
      查詢: {
        語句: 同一句,
        腔口: "四縣腔",
        正在查詢: false,
        查詢結果: {},
        結果腔口: undefined,
      },
    });
    expect(是否可以請求查詢(
        store.getState(), 同一句, "海陸腔",
      )).to.equal(true);
  });

  it("查詢中，擋掉重複查詢", () => {
    const 同一句 = "大家共下來";
    const 同一腔口 = "四縣腔";
    const store = mockStore({
      查詢: {
        語句: 同一句,
        腔口: 同一腔口,
        正在查詢: true,
        查詢結果: {},
        結果腔口: undefined,
      },
    });
    expect(是否可以請求查詢(
      store.getState(), 同一句, 同一腔口,
    )).to.equal(false);
  });

  it("查詢中，擋掉新查詢", () => {
    const 下一句 = "下一句";
    const 新腔口 = "海陸腔";
    const store = mockStore({
      查詢: {
        語句: "大家共下來",
        腔口: "四縣腔",
        正在查詢: true,
        查詢結果: {},
        結果腔口: undefined,
      },
    });
    expect(是否可以請求查詢(
      store.getState(), 下一句, 新腔口,
    )).to.equal(false);
  });

  it("creates RECIEVE_HANLO when fetching data is done", () => {
    // mock config 專案 = 鬥拍字 for nock.get()
    stubConfig("專案", "鬥拍字");

    nock(API.網域())
    .get("/標漢字音標")
    .query({
      查詢腔口: "四縣腔",
      查詢語句: "大家共下來",
    })
    .reply(200, {
      分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
      綜合標音: [{
        分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
        漢字: "大家 共下 來",
        臺灣客話: "Tai-gaˊ kiung-ha loiˇ",
      }],
    });

    const store = mockStore({
      查詢: {
        查詢結果: {},
      },
    });

    const expectActions = [
      { type: REQUEST_HANLO, 語句: "大家共下來", 腔口: "四縣腔" },
      { type: RECIEVE_HANLO,
        語句: "大家共下來",
        腔口: "四縣腔",
        查詢結果: {
          分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
          綜合標音: [{
            分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
            漢字: "大家 共下 來",
            臺灣客話: "Tai-gaˊ kiung-ha loiˇ",
          }],
        },
      }];


    return store.dispatch(遠端查詢("大家共下來", "四縣腔"))
      .then(() => {
        expect(store.getActions()).to.eql(expectActions);
      });
  });

  it("creates RECIEVE_HANLO after done (寫啥物)", () => {
    // mock config 專案 = 寫啥物 for nock.get()
    stubConfig("專案", "寫啥物");

    nock(API.網域())
    .get("/正規化翻譯")
    .query({
      查詢腔口: "四縣腔",
      查詢語句: "大家共下來",
    })
    .reply(200, {
      分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
      綜合標音: [{
        分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
        漢字: "大家 共下 來",
        臺灣客話: "Tai-gaˊ kiung-ha loiˇ",
      }],
    });

    const store = mockStore({
      查詢: {
        查詢結果: {},
      },
    });

    const expectActions = [
      { type: REQUEST_HANLO, 語句: "大家共下來", 腔口: "四縣腔" },
      { type: RECIEVE_HANLO,
        語句: "大家共下來",
        腔口: "四縣腔",
        查詢結果: {
          分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
          綜合標音: [{
            分詞: "大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ",
            漢字: "大家 共下 來",
            臺灣客話: "Tai-gaˊ kiung-ha loiˇ",
          }],
        },
      }];


    return store.dispatch(遠端查詢("大家共下來", "四縣腔"))
      .then(() => {
        expect(store.getActions()).to.eql(expectActions);
      });
  });

  it("creates only one RECIEVE_HANLO for breaklines", () => {
    // mock config 專案 = 鬥拍字 for nock.get()
    stubConfig("專案", "鬥拍字");

    nock(API.網域())
    .get("/標漢字音標")
    .query({
      查詢腔口: "四縣腔",
      查詢語句: "大家\n來",
    })
    .reply(200, {
      分詞: "大-家｜tai-gaˊ 來｜loiˇ",
      綜合標音: [{
        分詞: "大-家｜tai-gaˊ",
        漢字: "大家",
        臺灣客話: "Tai-gaˊ",
      }, {
        分詞: "來｜loiˇ",
        漢字: "來",
        臺灣客話: "loiˇ",
      }],
    });

    const store = mockStore({
      查詢: {
        查詢結果: {},
      },
    });

    const expectActions = [
      { type: REQUEST_HANLO, 語句: "大家\n來", 腔口: "四縣腔" },
      { type: RECIEVE_HANLO,
        語句: "大家\n來",
        腔口: "四縣腔",
        查詢結果: {
          分詞: "大-家｜tai-gaˊ 來｜loiˇ",
          綜合標音: [{
            分詞: "大-家｜tai-gaˊ",
            漢字: "大家",
            臺灣客話: "Tai-gaˊ",
          }, {
            分詞: "來｜loiˇ",
            漢字: "來",
            臺灣客話: "loiˇ",
          }],
        },
      }];

    return store.dispatch(遠端查詢("大家\n來", "四縣腔"))
      .then(() => {
        expect(store.getActions()).to.eql(expectActions);
      });
  });

  it("catches 500 error after REQUEST_HANLO", () => {
    // mock config 專案 = 鬥拍字 for nock.get()
    stubConfig("專案", "鬥拍字");

    nock(API.網域())
    .get("標漢字音標")
    .query({
      查詢腔口: "四縣腔",
      查詢語句: "大家共下來",
    })
    .replyWithError("你糗了你！");

    const store = mockStore({
      查詢: {
        查詢結果: {},
      },
    });

    const expectActions = [
      { type: REQUEST_HANLO, 語句: "大家共下來", 腔口: "四縣腔" },
      { type: RECIEVE_ERROR_HANLO,
        語句: "大家共下來",
        腔口: "四縣腔",
        error: {
          message: "Bad request",
          name: "SuperagentPromiseError",
          originalError: "Error: 你糗了你！",
        },
      }];

    return store.dispatch(遠端查詢("大家共下來", "四縣腔"))
      .then(() => {
        expect(store.getActions()[0]).to.eql(expectActions[0]);
      });
  });

  it("catches 500 error when RECIEVE_ERROR_HANLO", () => {
    // mock config 專案 = 鬥拍字 for nock.get()
    stubConfig("專案", "鬥拍字");

    nock(API.網域())
    .get("標漢字音標")
    .query({
      查詢腔口: "四縣腔",
      查詢語句: "大家共下來",
    })
    .replyWithError("你糗了你！");

    const store = mockStore({
      查詢: {
        查詢結果: {},
      },
    });

    return store.dispatch(遠端查詢("大家共下來", "四縣腔"))
      .then(() => {
        // console.log(store.getActions()[1]);
        expect(store.getActions()[1]).to.have.deep.property("error");
      });
  });

  it("catches 500 error when RECIEVE_ERROR_HANLO", () => {
    // test unmatched url
    //
    // Assume the correct url is '正規化翻譯'
    // but got wrong url '標漢字音標'.
    //
    // mock config 專案 = 鬥拍字 for nock.get()
    stubConfig("專案", "鬥拍字");

    nock(API.網域())
    .get("正規化翻譯")
    .query({
      查詢腔口: "四縣腔",
      查詢語句: "大家共下來",
    })
    .replyWithError("你糗了你！");

    const store = mockStore({
      查詢: {
        查詢結果: {},
      },
    });

    return store.dispatch(遠端查詢("大家共下來", "四縣腔"))
      .then(() => {
        // console.log(store.getActions()[1]);
        expect(store.getActions()[1]).to.have.deep.property("error");
      });
  });
});
