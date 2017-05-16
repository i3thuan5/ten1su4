import React from 'react';
import PropTypes from "prop-types";
import { browserHistory } from 'react-router';
import Debug from 'debug';
import {MainSection} from 'demo-ui';
import Container翻譯結果 from '../../元素/翻譯/翻譯結果.container';
import 'semantic-ui-css/components/dropdown.min.css';
import './查.css';

var debug = Debug('tau3:查');

class 查 extends React.Component {

  componentDidMount() {
    let { 語句, requestSearch } = this.props;
    requestSearch(語句, '四縣腔');
  }

  送出 (e) {
    e.preventDefault();
    let tt = this.refs.tt;
    let { requestSearch } = this.props;
    requestSearch(tt.value, '四縣腔');
    this.更新網址(tt.value);
  }

  更新網址(語句) {
    browserHistory.replace('/%E8%AC%9B/' +  encodeURI(語句));
  }

  render () {
    let { 語句, 正在查詢 } = this.props;
    return (
      <MainSection>
        <form className='ui form'
         onSubmit={this.送出.bind(this)}>
          
          <select className="ui dropdown">
            <option value="四縣腔">四縣腔</option>
            <option value="海陸腔">海陸腔</option>
          </select>

          <div className="app block">
          <textarea defaultValue={語句} 
          ref='tt' rows='3' />
          </div>
          
          <div className="app clearing">
            <button className={
              'ui huge primary right floated button ' +
              (正在查詢 ? 'disabled' : '')}
              type='submit'
            >查</button>
          </div>
          
        </form>
        <br/>
        <Container翻譯結果/>
      </MainSection>
    );
  }
}

查.propTypes = {
  語句: PropTypes.string.isRequired, 
  正在查詢: PropTypes.bool.isRequired,
};

export default 查;