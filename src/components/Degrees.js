import React, { Component } from "react";
import "../styles/Degrees.css";
export default class Degrees extends Component {
  changeUnit = e => {
    const newUnit = e.target.textContent;
    this.props.onUnitChange(newUnit);
  };

  render() {
    return (
      <div className="degrees-container">
        <div
          className={`degrees-item ${this.props.unit === "K" ? "active" : ""}`}
          onClick={this.changeUnit}
        >
          <span>K</span>
        </div>
        <div
          className={`degrees-item ${this.props.unit === "C" ? "active" : ""}`}
          onClick={this.changeUnit}
        >
          <span>C</span>
        </div>
        <div
          className={`degrees-item ${this.props.unit === "F" ? "active" : ""}`}
          onClick={this.changeUnit}
        >
          <span>F</span>
        </div>
      </div>
    );
  }
}
