import React, { Component } from "react";

import Header from "../components/Header/Header";
import GraphicBox from "../components/GraphicBox/GraphicBox";
import TableBox from "../components/TableBox/TableBox";

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.location.data,
      amount: Object.keys(this.props.location.data).length,
    };
  }

  render() {
    return (
      <div className="Playlist">
        <Header
          title="Nome da Playlist"
          subtitle={`${this.state.amount} estilos`}
        />
        <GraphicBox data={this.state.data} />
        <TableBox data={this.state.data} />
      </div>
    );
  }
}

export default Playlist;
