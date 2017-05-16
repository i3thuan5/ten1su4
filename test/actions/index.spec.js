import nock from 'nock';
import { expect } from 'chai';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  REQUEST_HANLO,
  RECIEVE_HANLO,
  RECIEVE_ERROR_HANLO,
  SWITCH_ACCENT
} from '../../src/actions/action.type';
import { 
  是否可以請求查詢, 
  遠端查詢,
  切換腔口
 } from '../../src/actions/';
import { 後端網址, 標漢字音標 } from '../../src/後端網址';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Action', () => {
  
  const 腔口 = '四縣腔';

  afterEach(()=> {
    nock.cleanAll();
  });

  it('查新語句', function () {
      const 下一句 = '下一句';
      const store = mockStore({
        查詢: {
          語句: '大家共下來',
          腔口: 腔口,
          正在查詢: false,
          查詢結果: {},
        },
      });
      expect(是否可以請求查詢(
        store.getState(), 下一句, 腔口
      )).to.be.true;
  });

  it('查新腔調', function () {
      const 同一句 = '大家共下來';
      const 下一腔口 = '海陸腔';
      const store = mockStore({
        查詢: {
          語句: 同一句,
          腔口: 腔口,
          正在查詢: false,
          查詢結果: {},
        },
      });
      expect(是否可以請求查詢(
        store.getState(), 同一句, 下一腔口
      )).to.be.true;
    });

  it('查詢中，擋掉新查詢', ()=> {
    const 下一句 = '下一句';
    const store = mockStore({
      查詢: {
        語句: '大家共下來',
        腔口: 腔口,
        正在查詢: true,
        查詢結果: {},
      },
    });
    expect(是否可以請求查詢(
      store.getState(), 下一句, 腔口
    )).to.be.false;
  });

  it('stops same search', ()=> {
    const 同一句 = '大家共下來';
    const 同一腔口 = 腔口;
    const store = mockStore({
      查詢: {
        語句: 同一句,
        腔口: 同一腔口,
        正在查詢: false,
        查詢結果: {},
      },
    });
    expect(是否可以請求查詢(
      store.getState(), 同一句, 同一腔口
    )).to.be.false;
  });

  it('creates RECIEVE_HANLO when fetching data is done', () => {
    nock(後端網址)
    .get('/' + 標漢字音標)
    .query({
      '查詢腔口': 腔口,
      '查詢語句': '大家共下來',
    })
    .reply(200, {
      '分詞': '大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ',
        '綜合標音': [{
          '分詞': '大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ',
          '漢字': '大家 共下 來',
          '臺灣客話': 'Tai-gaˊ kiung-ha loiˇ',
        },],
    });

    const store = mockStore({
      查詢: {
        查詢結果: {}
      },
    });

    const expectActions = [
      { type: REQUEST_HANLO, '語句': '大家共下來', 腔口: 腔口 },
      { type: RECIEVE_HANLO, '語句': '大家共下來', 腔口: 腔口,
        '查詢結果': {
          '分詞': '大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ',
          '綜合標音': [{
            '分詞': '大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ',
            '漢字': '大家 共下 來',
            '臺灣客話': 'Tai-gaˊ kiung-ha loiˇ',
          },],
        }, 
    },];

    return store.dispatch(遠端查詢('大家共下來', 腔口))
      .then(()=> {
        expect(store.getActions()).to.eql(expectActions);
      });
  });

  it('creates only one RECIEVE_HANLO for breaklines', () => {
    nock(後端網址)
    .get('/' + 標漢字音標)
    .query({
      '查詢腔口': 腔口,
      '查詢語句': '大家\n來',
    })
    .reply(200, {
      '分詞': '大-家｜tai-gaˊ 來｜loiˇ',
      '綜合標音': [{
        '分詞': '大-家｜tai-gaˊ',
        '漢字': '大家',
        '臺灣客話': 'Tai-gaˊ',
      },{
        '分詞': '來｜loiˇ',
        '漢字': '來',
        '臺灣客話': 'loiˇ',
      }],
    });

    const store = mockStore({
      查詢: {
        '查詢結果': {},
      },
    });

    const expectActions = [
      { type: REQUEST_HANLO, '語句': '大家\n來', 腔口: 腔口 },
      { type: RECIEVE_HANLO, '語句': '大家\n來', 腔口: 腔口,
        '查詢結果': {
          '分詞': '大-家｜tai-gaˊ 來｜loiˇ',
          '綜合標音': [{
            '分詞': '大-家｜tai-gaˊ',
            '漢字': '大家',
            '臺灣客話': 'Tai-gaˊ',
          },{
            '分詞': '來｜loiˇ',
            '漢字': '來',
            '臺灣客話': 'loiˇ',
          }],
        },
      },];

    return store.dispatch(遠端查詢('大家\n來', 腔口))
      .then(()=> {
        expect(store.getActions()).to.eql(expectActions);
      });
  });

  it('catches 500 error', () => {
    nock(後端網址)
    .get('/' + 標漢字音標)
    .query({
      '查詢腔口': 腔口,
      '查詢語句': '大家共下來',
    })
    .replyWithError('你糗了你！');

    const store = mockStore({
      查詢: {
        '查詢結果': {},
      },
    });

    const expectActions = [
      { type: REQUEST_HANLO, '語句': '大家共下來', 腔口: 腔口 },
      { type: RECIEVE_ERROR_HANLO, '語句': '大家共下來', 腔口: 腔口 },];

    return store.dispatch(遠端查詢('大家共下來', 腔口))
      .then(()=> {
        expect(store.getActions()).to.eql(expectActions);
      });
  });
});
