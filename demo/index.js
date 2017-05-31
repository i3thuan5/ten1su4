import React from "react";
import { render } from "react-dom";
import MyProvider from "../src";

// tau_pah_ji or sia_siann_mih
// min, hakka, or uan

const root = document.getElementById("app");

render(<MyProvider iniStore={{ 腔口: "四縣腔" }}/>, root);
