import React, { Component } from "react";

import { Sparklines, SparklinesLine } from "react-sparklines";
import "../styles/Graph.css";
export default class Graph extends Component {
  render() {
    return (
      <div className="graph-container">
        <div className="graph-info">
          <span>Temperature variation over 7 days</span>
        </div>
        <div className="graph">
          <Sparklines data={this.props.data}>
            <SparklinesLine color="white" />
          </Sparklines>
        </div>
      </div>
    );
  }
}
