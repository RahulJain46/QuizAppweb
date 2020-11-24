import React, { Suspense, lazy } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const App = lazy(() => import("./App"));

render(
  <Router>
    <Suspense fallback={<div />}>
      <App />
    </Suspense>
  </Router>,
  document.getElementById("root")
);
