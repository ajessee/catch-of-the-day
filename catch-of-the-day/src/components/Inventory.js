// ./components/Inventory.js
import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    render() {
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {/* Passing addFish setter method for state down to AddFishForm component using a prop. 
                addFish method is now on the props object for this component because it was passed down from the App component */}
                <AddFishForm addFish={this.props.addFish} />
                {/* loadSampleFishes method is on props obj because it was passed down from the App component */}
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;