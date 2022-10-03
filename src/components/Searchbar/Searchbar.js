import { useState } from "react";
import PropTypes from "prop-types";
import css from "./Searchbar.module.css";
import { ImSearch } from "react-icons/im";

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState("");

  const handleNameChange = (e) => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageName.trim() === "") {
      return alert("Insert some name");
    }
    onSubmit(imageName);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <ImSearch style={{ marginRight: 8 }}></ImSearch>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          name="imageName"
          value={imageName}
          onChange={handleNameChange}
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
