// ./components/Order.js
import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  // render function - returns HTML to make orderIds.map function below cleaner
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    // If no fish, return null which renders nothing
    if (!fish) return null;
    const isAvailable = fish && fish.status === "available";
    const getTransitionOptions = (className) => {
      const newKey = className === 'order' ? key : count;
      return {
        classNames: className,
        key: newKey,
        timeout: { enter: 500, exit: 500 }
      }
    }
    if (!isAvailable) {
      return (
        <CSSTransition {...getTransitionOptions('order')} >
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...getTransitionOptions('order')} >
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition {...getTransitionOptions('count')} >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name} &nbsp;
            {/* Add button to delete order, use inline arrow function to call removeFromOrder with key */}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
          <TransitionGroup component="span" className="count">
              <CSSTransition {...getTransitionOptions('count')} >
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
        <TransitionGroup component="ul" className="order">
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
