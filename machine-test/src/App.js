import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import SignIn from "./components/SignIn";
import Home from "./components/Homepage";

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
