// ./components/Inventory.js
import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends React.Component {
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
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
