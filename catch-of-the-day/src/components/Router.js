// Router.js
// import React
import React from 'react';
// import React Router DOM
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import referenced components
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* Root Route, will route to StorePicker component, which is entry point to app */}
      <Route exact path="/" component={StorePicker} />
      {/* Dropdown from store picker will have id, this will route to app with store ID info */}
      <Route path="/store/:storeId" component={App} />
      {/* Default, used for 404 */}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
