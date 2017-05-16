import { connect } from 'react-redux';
import 翻譯結果 from './翻譯結果';
import { 查詢語句 } from '../../actions';

const matchStateToProps = (state) => ({
  查詢結果: state.查詢結果,
  發生錯誤: state.查詢.發生錯誤,
  正在查詢: state.查詢.正在查詢,
});

const Container翻譯結果 = connect(
  matchStateToProps
)(翻譯結果);

export default Container翻譯結果;
