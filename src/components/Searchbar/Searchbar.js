import React, { Component } from "react";
import PropTypes from "prop-types";
import css from "./Searchbar.module.css";
import { ImSearch } from "react-icons/im";

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    imageName: "",
  };
  handleNameChange = (e) => {
    this.setState({
      imageName: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.imageName.trim() === "") {
      return alert("Insert some name");
    }
    this.props.onSubmit(this.state.imageName);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <ImSearch style={{ marginRight: 8 }}></ImSearch>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            name="imageName"
            value={this.state.imageName}
            onChange={this.handleNameChange}
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
