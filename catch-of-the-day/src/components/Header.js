// ./components/Header.js
import React from "react";

// new stateless functional component. Declaring a Header constant and assigning it the value of an arrow function with one argument - props. 
// All components are passed the props argument. You can further complicate things by destructuring the props arg into its component parts like this:
// const Header = ({tagline, age}) => { 
// Also note that after the arrow is a parens, not a curly brace. This is an implicit return from an arrow function, we are returning the JSX
const Header = (props) => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">Of</span>
        <span className="the">The</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      {/* And then this can be just {tagline} or {age} */}
      <span>{props.tagline}</span>
    </h3>
  </header>
);

// Old declaration of component - we have refactored this into a stateless functional component to simplify
// class Header extends React.Component {
//   render() {
//     return (
//       <header className="top">
//         <h1>
//           Catch
//           <span className="ofThe">
//             <span className="of">Of</span>
//             <span className="the">The</span>
//           </span>
//           Day
//         </h1>
//         <h3 className="tagline">
//           <span>{this.props.tagline}</span>
//         </h3>
//       </header>
//     );
//   }
// }

export default Header;
