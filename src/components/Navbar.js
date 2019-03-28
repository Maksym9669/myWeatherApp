import React, { Component } from "react";
import Degrees from "./Degrees";
import SearchBox from "./SearchBox";
import "../styles/Navbar.css";
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  sendNewUnitToParent = newUnit => {
    this.props.onUnitChange(newUnit);
  };

  sendQueryStringToParent = query => {
    this.props.onSearchSubmit(query);
  };

  render() {
    return (
      <div>
        <ul className="navbar-container">
          <li className="navbar-item">
            <SearchBox onSearchSubmit={this.sendQueryStringToParent} />
          </li>
          <li className="navbar-item city-name">
            <p>{this.props.data.city}</p>
          </li>
          <li className="navbar-item">
            <Degrees
              unit={this.props.unit}
              onUnitChange={this.sendNewUnitToParent}
            />
          </li>
        </ul>
      </div>
    );
  }
}
