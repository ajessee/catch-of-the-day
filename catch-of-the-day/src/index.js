// index.js
// import the React package from npm dependency - this contains the Component base class that all components inherit from
import React from 'react';

// import the 'Render' module from the react-dom npm package, this is what allows us to mount our react app to the DOM element that we select in the render method below
import { render } from 'react-dom';

// import the Router component from the 'react-router-dom' library
import Router from "./components/Router";

// import css file
import "./css/style.css";

// mount the Router component to the <div> with the id of main.
render(<Router />, document.querySelector('#main'));