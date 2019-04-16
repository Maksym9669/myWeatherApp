import React, { Component } from "react";
import { getIconClassName } from "../utils/utils";

export default class SingleListItem extends Component {
  constructor(props) {
    super(props);
  }
  sendIndex = () => {
    this.props.onIndexChange(this.props.listId);
  };
  render() {
    const {
      date,
      pressure,
      humidity,
      day,
      weatherId,
      description,
      mainTemperature
      // pressure,
      // humidity
    } = this.props.data;
    const iconClass = getIconClassName(weatherId);
    return (
      <div className="single-list-item" onClick={this.sendIndex}>
        <div className="li-info-container">
          <div className="li-day">{day}</div>
          <div className="li-day">{date}</div>
          <div className="li-temp-text">{mainTemperature}&#x00B0;</div>
          <div className="li-desc">{description}</div>
          {/* <div className="li-desc">{pressure}</div>
            <div className="li-desc">{humidity}</div> */}
        </div>
        <div className="li-weather-icon">
          <i className={`wi wi-owm-${weatherId} ${iconClass}`} />
        </div>
      </div>
    );
  }
}
