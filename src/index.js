import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import SignOut from './components/SignOut/SignOut';
import ManageSignInPage from './components/SignIn/ManageSignInPage';
import { loadFort } from '../src/actions/fortActions';
import FortPage from './components/Fort/FortPage';
import ManageFortDetailsPage from './components/Fort/ManageFortDetailsPage';
import App from './components/App/App.jsx';
import './index.css';


import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

store.dispatch(loadFort());

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App} >
                <IndexRoute components={FortPage} />
                <Route path='/signin' component={() => (<ManageSignInPage PageName="SignIn" />)} />
                <Route path='/signout' component={() => (<ManageSignInPage PageName="SignOut" />)} />
                <Route path='/fort/:id' component={ManageFortDetailsPage} />
                <Route path='/fort' component={ManageFortDetailsPage} />
            </Route>
        </Router></Provider>,
    document.getElementById('root')
);
registerServiceWorker();
