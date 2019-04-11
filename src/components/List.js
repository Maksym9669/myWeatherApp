import React, { Component } from "react";
import SingleListItem from "./SingleListItem";
import "../styles/List.css";
// import { getIconClassName } from "../utils/utils";

// const SingleListItem = props => {
//   const {
//     date,
//     pressure,
//     humidity,
//     day,
//     weatherId,
//     description,
//     mainTemperature
//     // pressure,
//     // humidity
//   } = props.data;
//   const iconClass = getIconClassName(weatherId);
//   changeIndex = index => {
//     props.onIndexChange(index);
//   };
//   return (
//     <div className="single-list-item" onClick={changeIndex}>
//       <div className="li-info-container">
//         <div className="li-day">{day}</div>
//         <div className="li-day">{date}</div>
//         <div className="li-temp-text">{mainTemperature}&#x00B0;</div>
//         <div className="li-desc">{description}</div>
//         {/* <div className="li-desc">{pressure}</div>
//         <div className="li-desc">{humidity}</div> */}
//       </div>
//       <div className="li-weather-icon">
//         <i className={`wi wi-owm-${weatherId} ${iconClass}`} />
//       </div>
//       <div>{props.listId}</div>
//     </div>
//   );
// };

export default class List extends Component {
  constructor(props) {
    super(props);
  }
  sendIndexToParent = newIndex => {
    this.props.onIndexForTodayChange(newIndex);
  };

  render() {
    let i = 0;
    const items = this.props.data.map(singleDayData => {
      i++;
      return (
        <SingleListItem
          key={singleDayData.day}
          data={singleDayData}
          listId={i - 1}
          onIndexChange={this.sendIndexToParent}
        />
      );
    });
    return <div className="list-container">{items}</div>;
  }
}
