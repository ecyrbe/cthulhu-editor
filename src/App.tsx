import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegistryPage from "./pages/RegistryPage";
import EditorPage from "./pages/EditorPage";
import ImportPage from "./pages/ImportPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registry" element={<RegistryPage />} />
        <Route path="/edit/:id" element={<EditorPage />} />
        <Route path="/import/:url" element={<ImportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
