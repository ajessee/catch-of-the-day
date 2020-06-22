// ./components/EditFishForm.js
import React from "react";
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func
  };

  handleChange = (event) => {
    // update the fish
    // copy current fish
    const updatedFish = {
      // spread operator to make a copy of the current fish object in the fishes state
      ...this.props.fish,
      // then use computed property names which matches whatever field got updated onChange to the matching property name and updates that in the copy
      [event.target.name]: event.currentTarget.value,
    };
    // use updateFish method on App component passed down from App -> Inventory -> EditFishForm to update any changes in the edit form on change
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          value={this.props.fish.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="price"
          value={this.props.fish.price}
          onChange={this.handleChange}
        />
        <select
          type="text"
          name="status"
          value={this.props.fish.status}
          onChange={this.handleChange}
        >
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          value={this.props.fish.desc}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="image"
          value={this.props.fish.image}
          onChange={this.handleChange}
        />
        {/* onClick can use inline arrow function to call deleteFish method and index passed down through props to remove fish */}
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}
export default EditFishForm;
