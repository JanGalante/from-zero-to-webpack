// import React from 'react';
// import ReactDOM from 'react-dom';
// import HelloWorld from './HelloWorld';

// const root = document.getElementById('root');

// ReactDOM.render(<HelloWorld />, root);



/***************************************************from Cory *************************/
// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
// import { loadCourses } from './actions/courseActions';
// import { loadAuthors } from './actions/authorActions';
// import './styles/styles.css'; //Webpack can import CSS files too!
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/toastr/build/toastr.min.css';

// const store = configureStore();
// store.dispatch(loadCourses());
// store.dispatch(loadAuthors());

/*render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);*/


const store = configureStore(); // if we want we can send initial state here. Nice to have when rendering on server
render(
    // provider wrap the application so we can connect to the redux store
    <Provider store={store}> 
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);

