import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
import "semantic-ui-css/components/dropdown.min.css";
import config from "../../config";

const 更新網址 = (語句, 腔) =>
  browserHistory.replace(取得新網址(語句, 腔));

export const 取得新網址 = (語句, 腔) => {
  if (config.全部腔口().length > 1) {
    return (
      `/%E8%AC%9B/${腔}/${encodeURI(語句)}`);
  }
  return (
      `/%E8%AC%9B/${encodeURI(語句)}`);
};

class 查表格 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelect: config.全部腔口().length > 1,
    };
  }
  componentDidMount() {
    const { 語句, 腔, requestSearch } = this.props;
    requestSearch(語句, 腔);
  }

  送出(e) {
    e.preventDefault();
    const tt = this.refText;
    const 腔 = this.refSelect.value || this.props.腔;
    const { requestSearch } = this.props;
    requestSearch(tt.value, 腔);
    更新網址(tt.value, 腔);
  }

  getMenu() {
    const { showSelect } = this.state;
    const { 腔 } = this.props;
    if (showSelect) {
      return (
        <select defaultValue={腔}
        ref={(c) => { this.refSelect = c; }}
        className="ui dropdown">
          {
            config.全部腔口().map((t, k) => (
              <option value={t} key={k}>{t}</option>
            ))
          }
        </select>
      );
    }
    return null;
  }

  render() {
    const { 語句, 腔, 正在查詢 } = this.props;
    const menu = this.getMenu();
    return (
      <form className='ui form'
       onSubmit={this.送出.bind(this)}>

        {menu}

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
