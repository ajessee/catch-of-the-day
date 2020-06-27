// ./components/Inventory.js
import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
// import named import (firebaseApp), and default export (base) from Base component
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  };

  // add null state values to start. This is state local to the Inventory component
  state = {
    uid: null,
    owner: null,
  };

  // React lifecycle methods
  componentDidMount() {
    // firebase listens to events like page reload (the auth state has changed), and we can reauthorize then
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  /* 
   Use firebase API (fetch method) to look up the current store in firebase database. 
   This is similar to what we are doing in App component where we sync state. 
  */
  authHandler = async (authData) => {
    // fetch storeId from database for this store. We get storeId from prop we pass down from App component
    const store = await base.fetch(this.props.storeId, { context: this });
    // Claim store if there is no owner
    if (!store.owner) {
      /* 
      Use firebase API (post method) to add owner state to the store. We use the unique identifier in the
      authData obj that comes back from our call to signInWithProp()
      */
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    // Set state of the Inventory component to reflect the current user. Note that this state is local to the Inventory component
    // If there is a store owner already in state, we use that, otherwise use uid that comes from authData obj from GitHub
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };
  /* 
  Use the GitHub auth provide we setup in firebase to show popup for user to sign-in to their GitHub account. 
  We pass this method through props to the Login component. Returns a promise that contains object with GitHub user info 
  like email and unique uid. On promise resolve, we pass to our authHandler method. 
  */
  authenticate = () => {
    const authProvider = new firebase.auth.GithubAuthProvider();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  // sign-out using firebase auth signOut() method, set uid for this Inventory component to null
  logout = async () => {
    await firebase.auth().signOut;
    this.setState({ uid: null });
  };

  render() {
    // logout button that onClick invokes logout method
    const logout = <button onClick={this.logout}>Log Out</button>;
    // check if user is logged in. First time in, uid will be null in state, if page reload, then uid will be reset by authHandler
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // check if user is not owner of store. the previously stored uid has to match the uid that comes back from authHandler method
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of this store.</p>
          {logout}
        </div>
      );
    }
    // if other conditionals fail, they are owner. Render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {/* Iterate over all keys in fishes state obj, return array of EditFishForms */}
        {Object.keys(this.props.fishes).map((key) => (
          // for bi-directional data transfer, we pass the updateFish and deleteFish methods down for editing/deleting existing fish
          // we also pass the key down as an index so we have access to it to use in editing/deleting operations
          <EditFishForm
            fish={this.props.fishes[key]}
            index={key}
            key={key}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        {/* 
        Passing addFish setter method for state down to AddFishForm component using a prop. 
        addFish method is now on the props object for this component because it was passed down from the App component 
        */}
        <AddFishForm addFish={this.props.addFish} />
        {/* loadSampleFishes method is on props obj because it was passed down from the App component */}
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
