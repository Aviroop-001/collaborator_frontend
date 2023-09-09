
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Doc from "./pages/Doc";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";


function App() {

  const { user } = useContext(Context);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/test" element={<Home />} />
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={user ? <Home /> : <Login />} />
          <Route exact path="/doc/:documentId" element={<Doc />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
