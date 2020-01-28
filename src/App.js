import React,{Suspense, lazy} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux'
import {hot} from 'react-hot-loader';

import './styles/App.scss';
import './styles/template.scss';

import store from "./store";
import {getParameterByName, getSubdomen} from "./Helpers/helper";
global.subdomen = getSubdomen()||'pizzaro';
global.url = window.test_data_path?window.test_data_path:`https://${global.subdomen}.sqrdelivery.com/api/shop/v1/`;
//console.log(global.url);
import PageLoader from "./Components/PageLoader";
import {loadLang} from "./reducers/lang";
import {loadInfo} from "./reducers/info";
import {loadTables} from "./reducers/tables";




window.history.pushState({}, document.title, "/#");

const url = new URL(`${global.url}views/add`);

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));

const LangPage = lazy(() => import('./Pages/lang-page'));
const CategoriesPage = lazy(() => import('./Pages/categories'));
const MenuPage = lazy(() => import('./Pages/menu-page/index'));

global.SHOW_STORE_LOG=false;

store.dispatch(loadLang());
store.dispatch(loadInfo());

const App = ()=> {
  return (
      <Provider store={store}>
          <HashRouter>
              <Switch>
                  <Suspense fallback={<PageLoader/>}>
                      <Route exact path="/" component={LangPage}  />
                      <Route exact path="/:lang" component={CategoriesPage} />
                      <Route exact path="/:lang/:category" component={MenuPage}  />

                      <Redirect from='*' to='/' />
                  </Suspense>
              </Switch>
          </HashRouter>

      </Provider>
  );
}

export default hot(module)(App);
