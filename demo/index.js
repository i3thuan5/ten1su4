import React from "react";
import { render } from "react-dom";
import MyProvider from "../src";

const root = document.getElementById("app");

// tau_pah_ji or sia_siann_mih
// min, hakka, or uan

render(
  <MyProvider/>
  , root,
);
