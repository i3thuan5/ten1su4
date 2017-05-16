import { expect } from 'chai';
import 查詢 from '../../src/reducers/查詢';

const 初始狀態規範 = {
  語句: '',
  腔口: '四縣腔',
  正在查詢: false,
  發生錯誤: false
};

describe('Reducer 查詢', () => {
  it('has initial state', ()=> {
    expect(查詢(undefined, {}))
    .to
    .eql(初始狀態規範);
  });

  it('recognizes action REQUEST_HANLO with 新句子', ()=> {
    expect(查詢(undefined, {
      type: 'REQUEST_HANLO',
      語句: '下一句',
      腔口: '四縣腔',
    }))
    .to
    .eql({
      ...初始狀態規範,
      正在查詢: true,
      語句: '下一句',
      腔口: '四縣腔',
    });
  });

  it('recognizes action REQUEST_HANLO with 新腔調', ()=> {
    expect(查詢(undefined, {
      type: 'REQUEST_HANLO',
      語句: '大家',
      腔口: '海陸腔',
    }))
    .to
    .eql({
      ...初始狀態規範,
      正在查詢: true,
      語句: '大家',
      腔口: '海陸腔',
    });
  });

  it('recognizes action REQUEST_HANLO with 新句子 新腔調', ()=> {
    expect(查詢(undefined, {
      type: 'REQUEST_HANLO',
      語句: '下一句',
      腔口: '海陸腔',
    }))
    .to
    .eql({
      ...初始狀態規範,
      正在查詢: true,
      語句: '下一句',
      腔口: '海陸腔',
    });
  });

  it('recognizes action RECIEVE_HANLO and reset 正在查詢', ()=> {
    const oldState = {
      語句: '大家共下來',
      腔口: '四縣腔',
      正在查詢: true,
    };
    expect(查詢(oldState, {
      type: 'RECIEVE_HANLO',
      語句: '大家共下來',
      腔口: '四縣腔',
      查詢結果: {
        '分詞': '大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ',
        '綜合標音': [{
          '分詞': '大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ',
          '漢字': '大家 共下 來',
          '臺灣客話': 'Tai-gaˊ kiung-ha loiˇ',
        },],
      },
    }))
    .to
    .eql({
      語句: '大家共下來',
      腔口: '四縣腔',
      正在查詢: false,
    });
  });

  it('recognizes action RECIEVE_ERROR_HANLO and reset 正在查詢', ()=> {
    const oldState = {
      語句: '大家',
      腔口: '海陸腔',
      正在查詢: true,
    };
    expect(查詢(oldState, { 
      type: 'RECIEVE_ERROR_HANLO', 
      語句: '大家',
      腔口: '海陸腔', 
    }))
    .to.eql({
      語句: '大家',
      腔口: '海陸腔',
      正在查詢: false,
      發生錯誤: true,
    });
  });

  it('ignores other action', ()=> {
    expect(查詢(undefined, { type: 'HELLO_WORLD' }))
    .to
    .eql(初始狀態規範);
  });
});
