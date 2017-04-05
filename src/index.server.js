import path from 'path';
import fs from 'fs';
import express from 'express';
import PugRoutes from '../routes/index';
import React from 'react';
import ReactServer from 'react-dom/server';
import HelloWorld from './HelloWorld';

// // import from Mammiso & Cory
import routes from './routes';

// // import from Mammiso
// import { Server } from 'http';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
// import NotFoundPage from './components/NotFoundPage';

// // imports from Cory
// import configureStore from './store/configureStore';
// import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
// import {loadCourses} from './actions/courseActions';
// import {loadAuthors} from './actions/authorActions';
// import './styles/styles.css'; //Webpack can import CSS files too!
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/toastr/build/toastr.min.css';



// initialize the server and configure support for pug templates
const app = express();
app.set('view engine', 'pug');
app.use('/pug', PugRoutes);

// define the folder that will be used for static assets
app.use('/static', express.static(path.resolve(__dirname, '../dist')));

// universal routing and rendering
// app.get('*', (req, res) => {
//   const html = fs.readFileSync(path.resolve(__dirname, './index.html')).toString();
//   const markup = ReactServer.renderToString(<HelloWorld />); 
  
//   res.send(html.replace('$react', markup));
// });

app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
        // markup = renderToString(<HelloWorld />);
        // markup = renderToString(<Router history={browserHistory} routes={routes} />);

      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      //return res.render('index', { markup });
      const html = fs.readFileSync(path.resolve(__dirname, './index.html')).toString();
      res.send(html.replace('$react', markup));
    }
  );
});

// start the server
app.listen(3000, () => {
  console.log('React app listening on port 3000!')
});