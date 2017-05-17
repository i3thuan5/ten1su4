import React from 'react';
import 頁頭 from './頁頭';
import 頁尾 from './頁尾';
import { Layout } from 'demo-ui';
import Debug from 'debug';
var debug = Debug('tau3:網站');

export default class 網站 extends React.Component {

  render () {
    let { ku, khiunn } = this.props.params;

    return (
        <Layout>
          <頁頭/>
          {
            React.cloneElement(
              this.props.children,
              {
                語句: ku || 'Tai-gaˊ共下來𢯭手！',
                腔: khiunn || '四縣腔',
              }
            )
          }
          <頁尾/>
        </Layout>
      );
  }
}

