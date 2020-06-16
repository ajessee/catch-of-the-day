// index.js
// import the React package from npm dependency - this contains the Component base class that all components inherit from
import React from 'react';

// import the 'Render' module from the react-dom npm package, this is what allows us to mount our react app to the DOM element that we select in the render method below
import { render } from 'react-dom';

// import the App component
import App from './components/App';

// import the StorePicker component that we've now moved to a separate file. You have to provide it a relative path so that it can load it, and you can leave the .js extension off because it is assumed
import StorePicker from './components/StorePicker';

// import css file
import "./css/style.css";

// This mounts our StorePicker component to the <div> with the id of main.
render(<App />, document.querySelector('#main'));