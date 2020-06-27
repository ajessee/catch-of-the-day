// ./components/Order.js
import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice, getTransitionOptions } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object, 
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };
  // render function - returns HTML to make orderIds.map function below cleaner
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    // If no fish, return null which renders nothing
    if (!fish) return null;
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    if (!isAvailable) {
      return (
        // Nested inside TransitionGroup component in render()
        <CSSTransition {...getTransitionOptions("order", key)}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      // Nested inside TransitionGroup component in render()
      // uses destructuring operator to get all properties of returned transition obj, sets them as props on CSSTransition component
      <CSSTransition {...getTransitionOptions("order", key)}>
        <li key={key}>
          <span>
            {/* You can nest TransitionGroup component, note that CSSTransition component uses different options obj */}
            {/* <TransitionGroup component="span" className="count" > */}
            <TransitionGroup {...getTransitionOptions("count", null, "span")} >
              {/* <CSSTransition classNames="count" key={key} timeout={{enter: 500, exit: 500}} > */}
              <CSSTransition {...getTransitionOptions("count", count)}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name} &nbsp;
            {/* Add button to delete order, use inline arrow function to call removeFromOrder with key */}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
          <TransitionGroup {...getTransitionOptions("count", null, "span")} >
            <CSSTransition {...getTransitionOptions("count", count)}>
              <span>{formatPrice(count * fish.price)}</span>
            </CSSTransition>
          </TransitionGroup>
        </li>
      </CSSTransition>
    );
  };

  render() {
    // the order obj is key/value pair { key: int } where the key is the fish key and the int is the number of fishes ordered
    // using Object.keys, we get an array of fish keys that have been ordered
    const orderIds = Object.keys(this.props.order);
    // then we use reduce() to get the total price (in cents) of all the existing orders.
    // We supply initialValue of 0, so that accumulator starts at 0
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      // If fish exists and is available, return accumulator plus count times price, else return accumulator
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order">
        <h2>Your Order</h2>
        {/* Top level component for CSS transition group */}
        <TransitionGroup {...getTransitionOptions("order", null, "ul")}>
          {orderIds.map((key) => this.renderOrder(key))}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
