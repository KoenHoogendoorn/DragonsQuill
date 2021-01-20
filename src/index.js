import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import contentDataReducer from "./store/reducers/contentData";
import activeTabReducer from "./store/reducers/activeTab";
import activeChapterReducer from "./store/reducers/activeChapter";
import cardReducer from "./store/reducers/card";

const rootReducer = combineReducers({
  contentData: contentDataReducer,
  activeTab: activeTabReducer,
  activeChapter: activeChapterReducer,
  card: cardReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
