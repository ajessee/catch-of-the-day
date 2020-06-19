// ./components/StorePicker.js
// import the React package from npm dependency - this contains the Component base class that all components inherit from
import React from "react";
// import method from helper.js
import { getFunName } from "../helpers";

// Example of a component - We can name it whatever we want, each component must implement a render() method
class StorePicker extends React.Component {
  /* 
  the verbose way to bind methods to the component instance:
    constructor() {
      super();
      this.goToStore = this.goToStore.bind(this);
    }

    goToStore(event) {
      event.preventDefault();
      const storeName = this.myInput.current.value;
      this.props.history.push(`/store/${storeName}`)
    }
  */ 

  // React Reference to input
  myInput = React.createRef();

  /* 
  goToStore is property on component, using arrow function binds this to method/function, so now this is StorePicker component
  You have to be using Babel and the 'babel-plugin-transform-class-properties' to use the latest ES7/tc39 features
  */
  goToStore = event => {
    // 1. stop form from submitting
    event.preventDefault();
    /* 2. get text from the input. This uses the React ref (myInput) that we created. 
    We get the value (the DOM input element), and then the value of that, the text. */
    const storeName = this.myInput.current.value;
    /* 3. change page to store/[store-name-from-input]. 
    Uses the props history object on the Router component to access the push function, 
    which the triggers the Router to check the route again through the switch function and dynamically renders the new component */
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        {/* 
        inputs use the defaultValue attr (JS) 
        ref references myInput which is declared above
        */}
        <input
          ref={this.myInput}
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
