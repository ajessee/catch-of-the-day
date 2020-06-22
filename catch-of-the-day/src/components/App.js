// App.js
import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

// Main App component
class App extends React.Component {
  //PropTypes. Don't need to shape object because its coming from Router and I will assume the shape is correct
  static propTypes = {
    match: PropTypes.object,
  };
  /* 
    Two ways to create state on a component - in the constructor, or by adding a property to the object/component
    Verbose/Constructor way:
    constructor() {
        super();
        this.state = {
            console.log(state object, add properties here)
        }
    }
    The cleaner way using an object property:
    */
  state = {
    fishes: {},
    order: {},
  };

  // React lifecycle methods
  componentDidMount() {
    // get params, destructuring from the match object on props, which comes from Router component
    const { params } = this.props.match;
    // load order state from localStorage if it exists for the selected store
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    /* 
    firebase syncing
    this.ref here is firebase reference to piece of data in the firebase database
    we sync the component state from the firebase database. the syncState method grabs the stored data in the DB for the specific store that we are in using storeId,
    and grabs stored fish data.
    we pass it a config object that passes the context of this component object, and the component state we want to sync
    */
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  };

  componentDidUpdate() {
    // store order state in localStorage when component updates (any changes to component)
    const { storeId } = this.props.match.params;
    const orderString = JSON.stringify(this.state.order);
    localStorage.setItem(storeId, orderString);
  };

  componentWillUnmount() {
    // on component unmount, use firebase removeBinding method to remove connection to the database to prevent memory leaks
    base.removeBinding(this.ref);
  };

  // custom methods
  addFish = (fish) => {
    // Get copy of existing fishes state object - you never want to directly 'mutate' the existing state object for performance reasons
    // Use the JS spread operator to make a copy of current fishes object in state object
    const fishes = { ...this.state.fishes };
    // Add new fish to copied fishes object. Use a Date.Now() unique key, and set value to new fish object that is passed into method/function
    fishes[`fish${Date.now()}`] = fish;
    // Replace existing state with updated copy with new fish object. In ES6, if your property and value are the same, you can just pass in one thing
    // this.setState({fishes: fishes})
    // setState is a React API to set state - can update a single piece of state like we are doing here, so the setState method is a little misnamed
    this.setState({ fishes });
  };

  // for bi-directional state editing. up from EditFishForm -> Inventory -> App.
  // We pass this method down through props the other direction: App -> Inventory -> EditFishForm
  updateFish = (key, updatedFish) => {
    // Make copy of current state using spread operator
    const fishes = { ...this.state.fishes };
    // update the state for the fish obj passed into the updateFish method
    fishes[key] = updatedFish;
    // set the updated fishes object back into state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // make copy of state using spread operator
    const fishes = { ...this.state.fishes };
    // update the state (normally you would use 'delete fishes[key]' to remove a property from the obj, but you have to set it to null to delete it from firebase)
    fishes[key] = null;
    // update the state
    this.setState({ fishes });
  };

  // set the fishes object in the state object with the sample fishes object from the sample-fishes.js file we import
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    // 1. Get copy of state
    const order = { ...this.state.order };
    /* 2. Either add to order, or update the number in our order
        use key (fish key) to find whether fish has been added to the order. 
        If the order obj does not contain the key, it will return undefined. undefined +1 is NaN, which evaluates to false. So then sets to 1.
        Otherwise adds 1 to existing order
        */
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    // Make copy of state using spread operator
    const order = { ...this.state.order };
    // Remove order from state. In this case because we are storing the order in localStorage and not Firebase, we can use the delete keyword
    delete order[key];
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {/* 
            To display state in JSX, you have to use JS. In this case, we are going to use Object.keys to get the keys of the fishes object into an array
            Then we iterate over the array using map. This returns new array of Fish components that have props of key (a react prop used as an index)
            and details, which will be the value of the key/value pair which is the fish object {fishKey: {fishObj with properties}}
            */}
            {Object.keys(this.state.fishes).map((key) => (
              // You have to pass the key again as an index, because the key is a react prop and not available for public use
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        {/* You can pass down all of the object in the state using <Order {...this.state} />, but you should only pass down the state you explicity need */}
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        {/* 
        Passing addFish(C), loadSampleFishes(R), updateFish(U), deleteFish(D), methods for updating state down to Inventory component using props
        updateFish and deleteFish are from the bottom-up, and addFish and loadSampleFishes are from the top down for bi-directional data flow
        passing the fishes state object down allows us to populate the EditFishForm 
        */}
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  };
}

export default App;
