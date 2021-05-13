import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

window.addEventListener('error', (err) => {
    console.log('ERR', err)
})

ReactDOM.render(<App />, document.getElementById("root"));

module.hot.accept();