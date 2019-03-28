import React, { Component } from "react";
import "../styles/Today.css";
import { getIconClassName } from "../utils/utils";
export default class Today extends Component {
  // {
  //     day,
  //     date,
  //     weatherId,
  //     description,
  //     mainTemperature,
  //     minTemperature,
  //     maxTemperature,
  //     pressure,
  //     humidity,
  //     windSpeed
  //   } in this.props.data

  //"string" in this.props.unit

  render() {
    const {
      day,
      date,
      weatherId,
      description,
      mainTemperature,
      minTemperature,
      maxTemperature,
      pressure,
      humidity,
      windSpeed
    } = this.props.data;

    const { unit } = this.props;
    const { uvIndex } = this.props;
    const iconClass = getIconClassName(weatherId);
    return (
      <div className="today-container">
        <div className="date-container">
          <div>{day}</div>
          <div>{date}</div>
        </div>
        <div className="icon-desc-container">
          <div className="icon-container">
            <i className={`wi wi-owm-${weatherId} weather-icon ${iconClass}`} />
          </div>
          <div className="weather-desc">{description}</div>
        </div>
        <div className="temp-container">
          <div className="temp-text">
            <span>{mainTemperature}</span>
            <i className="wi wi-degrees" />
          </div>
          <div className="high-low-container">
            <div className="high-low-item">
              <span>
                <i className="wi wi-direction-up" />
              </span>
              <span>Max</span>
              <span>
                <span>{maxTemperature}&#x00B0;</span>
              </span>
            </div>
            <div className="high-low-item">
              <span>
                <i className="wi wi-direction-down" />
              </span>
              <span>Min</span>
              <span>
                <span>{minTemperature}&#x00B0;</span>
              </span>
            </div>
          </div>
        </div>
        <div className="extra-info-container">
          <div className="extra-info-item">
            <span>
              <i className="wi wi-humidity" />
            </span>
            <span>Humidity:</span>
            <span>{humidity} %</span>
          </div>
          <div className="extra-info-item">
            <span>
              <i className="wi wi-barometer" />
            </span>
            <span>Pressure:</span>
            <span>{pressure} hPa</span>
          </div>
          <div className="extra-info-item">
            <span>
              <i className="wi wi-strong-wind" />
            </span>
            <span>Wind Speed:</span>
            <span>
              {windSpeed} {unit === "F" ? "miles/hr" : "m/s"}
            </span>
          </div>
          <div className="extra-info-item">
            <span>
              <i className="wi wi-sunset" />
            </span>
            <span>UV Index:</span>
            <span>{uvIndex}</span>
          </div>
        </div>
      </div>
    );
  }
}
