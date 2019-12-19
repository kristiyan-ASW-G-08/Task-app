"use strict";
import "./style/index.scss";
import formEvent from "./app/formEvent/formEvent";

document.addEventListener("DOMContentLoaded", event => {
  formEvent();
  document.body.addEventListener("click", ({ target }) => {});
});
