import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="701196965794-3jp31u0q9hn2v72ptjqjk1hi2tvn7gbg.apps.googleusercontent.com">
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>
);
