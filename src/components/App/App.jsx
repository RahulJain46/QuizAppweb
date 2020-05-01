import React, { Component } from 'react';
import './App.css';
import {Link, IndexLink} from 'react-router';


class App extends Component { 
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <nav>
                        <IndexLink to="/" activeClassName="active">Home</IndexLink>
                        {" | "}
                        <Link to="/signin" activeClassName="active">Sign In</Link>
                        {" | "}
                        <Link to="/signout" activeClassName="active">Sign Out</Link>
                 </nav>
                </header>
                {this.props.children}
            </div>
        );
    }
}

export default App;
