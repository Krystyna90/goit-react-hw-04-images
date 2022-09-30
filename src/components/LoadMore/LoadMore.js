import React from "react";
import PropTypes from "prop-types";
import css from "./LoadMore.module.css";

function LoadMore({ onNextFetch }) {
  return (
    <button className={css.Button} type="button" onClick={onNextFetch}>
      Load more
    </button>
  );
}

LoadMore.propTypes = {
  onNextFetch: PropTypes.func.isRequired,
};

export default LoadMore;
