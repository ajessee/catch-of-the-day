// ./components/Fish.js
import React from "react";
import PropTypes from 'prop-types';
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  /*
  This is how to define propTypes in a regular component. 
  It is a static variable on the Component since we want it to apply to all instances of the component
  In this case, the Fish component has two props - the details object and the addToOrder method. The method is a PropTypes.func type
  The details prop is itself an object, but we can be more specific and define a 'shape', which is what we expect the obj to look like
  */
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }),
    addToOrder: PropTypes.func
  }
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
