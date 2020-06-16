// App.js
import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order'

// Main App component
class App extends React.Component {
    render() {
        return  (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header />
                </div>
                <Inventory />
                <Order />
            </div>
        )
    }
}

export default App;