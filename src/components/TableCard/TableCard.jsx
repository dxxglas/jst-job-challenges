import React, { Component } from "react";

import headphone from "../../assets/headphone.svg";
import outline from "../../assets/outline.svg";
import "./TableCard.scss";

class TableCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: this.props.genre,
      count: this.props.count,
    };
  }

  render() {
    return (
      <div className="TableCard">
        <div className="cardIcon">
          <img src={headphone} alt="icon-headphone" className="imgIcon" />
          <img src={outline} alt="outline" className="imgOutline" />
        </div>
        <div className="genreInfos">
          <span className="genreStyle">{this.state.genre}</span>
          <span className="genreAmount">{this.state.count}</span>
        </div>
      </div>
    );
  }
}

export default TableCard;
