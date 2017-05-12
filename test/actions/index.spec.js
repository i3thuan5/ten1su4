import nock from 'nock';
import { expect } from 'chai';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  REQUEST_HANLO,
  RECIEVE_HANLO,
  RECIEVE_ERROR_HANLO
} from '../../src/actions/action.type';
import { 是否可以請求查詢, 遠端查詢 } from '../../src/actions/';
import { 後端網址, 標漢字音標 } from '../../src/後端網址';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Action', () => {
  afterEach(()=> {
    nock.cleanAll();
  });

  it('passes valid search', function () {
      const 語句 = '下一句';
      const store = mockStore({
        查詢: {
          語句: '大家共下來',
          正在查詢: false,
          查詢結果: {},
        },
      });
      expect(是否可以請求查詢(store.getState(), 語句)).to.be.true;
    });

  it('stops invalid search', ()=> {
    const 語句 = '下一句';
    const store = mockStore({
      查詢: {
        語句: '大家共下來',
        正在查詢: true,
        查詢結果: {},
      },
    });
    expect(是否可以請求查詢(store.getState(), 語句)).to.be.false;
  });

  it('stops same search', ()=> {
    const 語句 = '大家共下來';
    const store = mockStore({
      查詢: {
        語句: '大家共下來',
        正在查詢: false,
        查詢結果: {},
      },
    });
    expect(是否可以請求查詢(store.getState(), 語句)).to.be.false;
  });

  it('creates RECIEVE_HANLO when fetching data is done', () => {
    nock(後端網址)
    .get('/' + 標漢字音標)
    .query({
      '查詢腔口': '四縣腔',
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
        '查詢結果': {},
      },
    });

    const expectActions = [
      { type: REQUEST_HANLO, '語句': '大家共下來' },
      { type: RECIEVE_HANLO, '語句': '大家共下來',
        '查詢結果': {
          '分詞': '大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ',
          '綜合標音': [{
            '分詞': '大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ',
            '漢字': '大家 共下 來',
            '臺灣客話': 'Tai-gaˊ kiung-ha loiˇ',
          },],
        }, 
    },];

    return store.dispatch(遠端查詢('大家共下來'))
      .then(()=> {
        expect(store.getActions()).to.eql(expectActions);
      });
  });

  it('creates only one RECIEVE_HANLO for breaklines', () => {
    nock(後端網址)
    .get('/' + 標漢字音標)
    .query({
      '查詢腔口': '四縣腔',
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
      { type: REQUEST_HANLO, '語句': '大家\n來' },
      { type: RECIEVE_HANLO, '語句': '大家\n來',
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

    return store.dispatch(遠端查詢('大家\n來'))
      .then(()=> {
        expect(store.getActions()).to.eql(expectActions);
      });
  });

  it('catches 500 error', () => {
    nock(後端網址)
    .get('/' + 標漢字音標)
    .query({
      '查詢腔口': '四縣腔',
      '查詢語句': '大家共下來',
    })
    .replyWithError('你糗了你！');

    const store = mockStore({
      查詢: {
        '查詢結果': {},
      },
    });

    const expectActions = [
      { type: REQUEST_HANLO, '語句': '大家共下來' },
      { type: RECIEVE_ERROR_HANLO, '語句': '大家共下來' },];

    return store.dispatch(遠端查詢('大家共下來'))
      .then(()=> {
        expect(store.getActions()).to.eql(expectActions);
      });
  });
});
