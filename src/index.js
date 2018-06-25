import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

window.addEventListener("beforeinstallprompt", function(event) {
  console.log("A2HS", event);

  window.a2hsEvent = event;
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("service work registrado"))
    .catch(() => console.log("service work não registrad"));
}