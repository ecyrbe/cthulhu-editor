import "./App.css";
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ManagerPage from "./pages/ManagerPage";
import EditorPage from "./pages/EditorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/edit/:id" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
