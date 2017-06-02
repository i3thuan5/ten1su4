import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
import "semantic-ui-css/components/dropdown.min.css";

const 更新網址 = (語句, 腔) => {
  browserHistory.replace(
    `/%E8%AC%9B/${腔}/${encodeURI(語句)}`);
};


class 查表格 extends React.Component {

  componentDidMount() {
    const { 語句, 腔, requestSearch } = this.props;
    requestSearch(語句, 腔);
  }

  送出(e) {
    e.preventDefault();
    const tt = this.refText;
    const sel = this.refSelect;
    const { requestSearch } = this.props;
    requestSearch(tt.value, sel.value);
    更新網址(tt.value, sel.value);
  }

  render() {
    const { 語句, 腔, 正在查詢 } = this.props;
    return (
      <form className='ui form'
       onSubmit={this.送出.bind(this)}>

        <select defaultValue={腔}
        ref={(c) => { this.refSelect = c; }}
        className="ui dropdown">
          <option value="四縣腔">四縣腔</option>
          <option value="海陸腔">海陸腔</option>
        </select>

        <div className="app block">
        <textarea defaultValue={語句}
        ref={(c) => { this.refText = c; }}
        rows='3' />
        </div>

        <div className="app clearing">
          <button className={
            `ui huge primary right floated button ${
            正在查詢 ? "disabled" : ""}`}
            type='submit'
          >查</button>
        </div>

      </form>
    );
  }
}

查表格.propTypes = {
  語句: PropTypes.string.isRequired,
  腔: PropTypes.string.isRequired,
  正在查詢: PropTypes.bool.isRequired,
  requestSearch: PropTypes.func.isRequired,
};

export default 查表格;
