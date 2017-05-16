import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { ButtonStack, CopyButton } from 'demo-ui';
import { 後端網址 } from '../../後端網址';
import Container漢羅列表 from "../顯示/漢羅列表.container";

var debug = Debug('tau3:標漢字音標結果');

export const 計算複製內容 = (綜合標音 = []) => {
  if (!綜合標音 || 綜合標音.length < 1) {
    return 綜合標音;
  }
  return 綜合標音
  .map((item) => {
    const 漢字 = item.漢字.replace(/ /g, "");
    return {
      漢字臺羅: [漢字, item.臺灣客話].join("\n"),
      臺羅: item.臺灣客話,
      漢字,
    };
  })
  .reduce((acc, item) => ({
    漢字臺羅: [acc.漢字臺羅, item.漢字臺羅].join("\n"),
    漢字: [acc.漢字, item.漢字].join("\n"),
    臺羅: [acc.臺羅, item.臺羅].join("\n"),
  }));
};

class 翻譯結果 extends React.Component {
  取得複製鈕群() {
    const { 正在查詢, 發生錯誤, 查詢結果 } = this.props;
    const 綜合標音 = 查詢結果.綜合標音 || [];
    let 複製內容 = {};
    if (!正在查詢 && !發生錯誤) {
      複製內容 = 計算複製內容(綜合標音);
      複製內容.分詞 = 查詢結果.分詞;
    }
    const 複製鈕群 = [];
    Object.keys(複製內容).forEach((key) => {
      複製鈕群.push(
        <CopyButton key={key} 複製內容={複製內容[key]} 按鈕名={key}/>,
      );
    });
    return 複製鈕群;
  }

  render () {
    let { 正在查詢, 查詢結果, 發生錯誤 } = this.props;
    const 複製鈕群 = this.取得複製鈕群();

    return (
        <div>
          {
            (正在查詢 &&
              <h1 className='ui header'>載入中……</h1>
            )
          }
          {
            (發生錯誤 &&
              <h1 className='ui red header'>主機發生錯誤</h1>
            )
          }
          <div style={{ opacity: 正在查詢 ? 0.3 : 1 }}>
            <ButtonStack>
            {複製鈕群}
            </ButtonStack>
            <Container漢羅列表/>
          </div>
        </div>
      );
  }
}

翻譯結果.propTypes = {
  正在查詢: PropTypes.bool.isRequired,
  發生錯誤: PropTypes.bool.isRequired,
  結果腔口: PropTypes.string.isRequired,
  查詢結果: PropTypes.shape({
    分詞: PropTypes.string.isRequired,
    綜合標音: PropTypes.arrayOf(PropTypes.shape({
      分詞: PropTypes.string.isRequired,
      漢字: PropTypes.string.isRequired,
      臺灣客話: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default 翻譯結果;
