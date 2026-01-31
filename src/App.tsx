import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegistryPage from "./pages/RegistryPage";
import EditorPage from "./pages/EditorPage";
import ImportPage from "./pages/ImportPage";
import { useAtomValue } from "jotai";
import { themeAtom } from "./store/uiAtoms";
import { useEffect } from "react";

function App() {
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

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
