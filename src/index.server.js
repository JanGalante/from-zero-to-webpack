import path from 'path';
import fs from 'fs';
import express from 'express';

// React And Redux Setup
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

// Import own modules
import routes from './routes';
import PugRoutes from '../routes/index';
import configureStore from './store/configureStore';
import HelloWorld from './HelloWorld';
// import NotFoundPage from './components/NotFoundPage';



// initialize the server and configure support for pug templates
const app = express();
app.set('view engine', 'pug');
app.use('/pug', PugRoutes);

// define the folder that will be used for static assets
app.use('/static', express.static(path.resolve(__dirname, '../dist')));


// Server Side Rendering based on routes matched by React-router.
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {

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

        const store = configureStore();

        markup = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps}/>
          </Provider>
        );

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