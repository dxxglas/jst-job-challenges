import React, { Component } from "react";
import TableCard from "../TableCard/TableCard";

import "./TableBox.scss";

class TableBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data.sort(function (a, b) {
        return parseFloat(b.count) - parseFloat(a.count);
      }),
    };
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="TableBox">
        {this.state.data.map((element) => {
          return <TableCard genre={element.genre} count={element.count} />;
        })}
      </div>
    );
  }
}

export default TableBox;
