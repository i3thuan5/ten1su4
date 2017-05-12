import { expect } from 'chai';
import 查詢 from '../../src/reducers/查詢';

const 初始狀態規範 = {
  語句: '',
  正在查詢: false,
  查詢結果: {
    '分詞': '',
    '綜合標音': [],
  },
};

describe('Reducer', () => {
  it('has initial state', ()=> {
    expect(查詢(undefined, {}))
    .to
    .eql(初始狀態規範);
  });

  it('recognizes action REQUEST_HANLO', ()=> {
    expect(查詢(undefined, {
      type: 'REQUEST_HANLO',
      語句: '大家',
    }))
    .to
    .eql({
      ...初始狀態規範,
      語句: '大家',
      正在查詢: true,
    });
  });

  it('recognizes action RECIEVE_HANLO', ()=> {
    expect(查詢(undefined, {
      type: 'RECIEVE_HANLO',
      語句: '大家共下來',
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
      正在查詢: false,
      查詢結果: {
        '分詞': '大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ',
        '綜合標音': [{
          '分詞': '大-家｜tai-gaˊ 共-下｜kiung-ha 來｜loiˇ',
          '漢字': '大家 共下 來',
          '臺灣客話': 'Tai-gaˊ kiung-ha loiˇ',
        },],
      },
    });
  });

  it('preserves previous value when get new request', ()=> {
    const oldState = {
      語句: '大家',
      正在查詢: false,
      查詢結果: {
        '分詞': '大-家｜tai-gaˊ',
        '綜合標音': [{
          '分詞': '大-家｜tai-gaˊ',
          '漢字': '大家',
          '臺灣客話': 'Tai-gaˊ',
        },],
      },
    };

    expect(查詢(oldState, {
      type: 'REQUEST_HANLO',
      語句: '下一句',
    }))
    .to
    .eql({
      語句: '下一句',
      正在查詢: true,
      查詢結果: {
        '分詞': '大-家｜tai-gaˊ',
        '綜合標音': [{
          '分詞': '大-家｜tai-gaˊ',
          '漢字': '大家',
          '臺灣客話': 'Tai-gaˊ',
        },],
      },
    });
  });

  it('show info when get action RECIEVE_ERROR_HANLO', ()=> {
    expect(查詢(undefined, { type: 'RECIEVE_ERROR_HANLO', 語句: '大家' }))
    .to
    .eql({
      語句: '大家',
      正在查詢: false,
      查詢結果: {
        '發生錯誤': true,
        '分詞': '',
        '綜合標音': [],
      },
    });
  });

  it('ignores other action', ()=> {
    expect(查詢(undefined, { type: 'HELLO_WORLD' }))
    .to
    .eql(初始狀態規範);
  });
});
