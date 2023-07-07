import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import '@blueprintjs/core/lib/css/blueprint.css';

import { AppRoutes } from "./routes";

const rootDiv = document.getElementById('root');

if (!rootDiv) {
  throw new Error("There is no root element found")
}

const root = ReactDOM.createRoot(rootDiv);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
