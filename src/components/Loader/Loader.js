import React from "react";
import { ImSpinner } from "react-icons/im";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div role="alert">
      <div className={css.Loading_spinner}>
        <ImSpinner size="32" className="icon-spin"></ImSpinner>
        Loading
      </div>
    </div>
  );
}
