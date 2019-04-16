import React, { Component } from "react";
import SingleListItem from "./SingleListItem";
import "../styles/List.css";

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
