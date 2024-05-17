import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            {/*<App />*/}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={App} />
                    <Route path="login" element={Login}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
