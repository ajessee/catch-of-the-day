// ./components/StorePicker.js
// import the React package from npm dependency - this contains the Component base class that all components inherit from
import React from "react";
// import method from helper.js
import { getFunName } from "../helpers";

// Example of a component - We can name it whatever we want, each component must implement a render() method
class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please enter a form</h2>
        {/* inputs use the defaultValue attr (JS) */}
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
