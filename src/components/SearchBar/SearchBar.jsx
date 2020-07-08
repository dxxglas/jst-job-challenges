import React, { Component } from "react";

import { accessSpotify } from "../../processors/accessSpotify";
import search from "../../assets/search.svg";
import "./SearchBar.scss";

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
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
    console.log(genres);
  }

  render() {
    return (
      <form
        className="SearchBar"
        onSubmit={this.handleSubmit}
        action="/playlist"
      >
        <div className="sBox">
          <input
            type="search"
            placeholder="Cole o link da playlist aqui..."
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type="submit">
            <img src={search} alt="search-icon" />
          </button>
        </div>
      </form>
    );
  }
}

export default SearchBar;
