import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { accessSpotify } from "../../processors/accessSpotify";
import search from "../../assets/search.svg";
import "./SearchBar.scss";

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      genres: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    var strValue = this.state.value;
    strValue = strValue.split("/playlist/").pop().split("?")[0];
    var genres = await accessSpotify(strValue);
    this.setState({ genres: genres[0] });
    await this.props.history.push({
      pathname: "/playlist",
      data: genres[0], // array
      playname: genres[1],
    });
  }

  render() {
    return (
      <form className="SearchBar" onSubmit={this.handleSubmit}>
        <div className="sBox">
          <input
            type="search"
            placeholder="Cole o link da playlist aqui..."
            value={this.state.value}
            onChange={this.handleChange}
            required
          />
          <button type="submit">
            <img src={search} alt="search-icon" />
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(SearchBar);
