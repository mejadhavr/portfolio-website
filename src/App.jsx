import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

const Portfolio = lazy(() => import("./Portfolio"));
const EventPortfolio = lazy(() => import("./EventPortfolio"));
const ChatWidget = lazy(() => import("./ChatWidget"));

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div className="loader-shell" />}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/event-portfolio" element={<EventPortfolio />} />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </HashRouter>
  );
}

export default App;