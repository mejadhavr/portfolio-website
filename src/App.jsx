import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";
import EventPortfolio from "./EventPortfolio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/event-portfolio" element={<EventPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;