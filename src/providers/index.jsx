import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import 網站 from "../網站/網站";
import 查 from "../頁/查/查.container";
import reducer from "../reducers";

class MyProvider extends React.Component {

  render() {
    const middlewares = [thunk];
    if (process.env.NODE_ENV !== "production") {
      middlewares.push(createLogger);
    }

    const store = createStore(
      reducer,
      applyMiddleware(...middlewares),
    );

    console.log(this.props.iniStore);

    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={網站}>
            <IndexRoute component={查}/>
            <Route path='%E8%AC%9B/:khiunn/:ku' component={查}/>
            <Route path='%E8%AC%9B(/:ku)' component={查}/>
            <Route path='%E8%AC%9B' component={查}/>
            <Route path='**/:ku' component={查}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default MyProvider;
