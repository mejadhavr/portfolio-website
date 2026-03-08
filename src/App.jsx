import { HashRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";
import EventPortfolio from "./EventPortfolio";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/event-portfolio" element={<EventPortfolio />} />
      </Routes>
    </HashRouter>
  );
}

export default App;