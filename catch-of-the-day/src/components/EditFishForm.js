// ./components/EditFishForm.js
import React from "react";

class EditFishForm extends React.Component {
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
      </div>
    );
  }
}
export default EditFishForm;
