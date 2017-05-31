import React from "react";
import { render } from "react-dom";
import { MyProvider } from "../src";

const root = document.getElementById("app");

// tau_pah_ji or sia_siann_mih
// min, hakka, or uan

render(
  <MyProvider iniStore={{
    專案: "鬥拍字",
    腔口: "四縣腔",
  }}/>
  , root,
);
