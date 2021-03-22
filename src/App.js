import React from 'react';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {devToolsEnhancer} from "redux-devtools-extension";
import 'bootstrap/dist/css/bootstrap.min.css';

import MainView from "./components/main-view/main-view";
import moviesApp from "./reducers/reducers";


const store = createStore(moviesApp, devToolsEnhancer());

function App() {
  return(
    <Provider store={store}>
      <MainView/>
    </Provider>
  );
}

export default App;