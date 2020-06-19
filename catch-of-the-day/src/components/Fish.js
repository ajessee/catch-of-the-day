// ./components/Fish.js
import React from "react";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  /* 
    normally you would add a method on the component to handle click for the 'Add To Order' button like this:
        handleClick = () => {
            this.props.addToOrder(this.props.index);
        };
    but since it is a one-liner, you can just do it inline. See below.
    */
  render() {
    // Using ES6 destructuring syntax, you can set multiple variables at once.
    // This will pull out each matching property from the details object in props and set a variable
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name}></img>
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        {/* this.props.addToOrder is passed to Fish component from App component. Using it inline here, but normally would invoke a component method like 'handleClick' */}
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? "Add To Order" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
