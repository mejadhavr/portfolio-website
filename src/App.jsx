import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

const Portfolio = lazy(() => import("./Portfolio"));
const EventPortfolio = lazy(() => import("./EventPortfolio"));
const ProductPortfolio = lazy(() => import("./ProductPortfolio"));
const CorporatePortfolio = lazy(() => import("./CorporatePortfolio"));
const RealEstatePortfolio = lazy(() => import("./RealEstatePortfolio"));

import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="loader-shell" />}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/event-portfolio" element={<EventPortfolio />} />
          <Route path="/product-portfolio" element={<ProductPortfolio />} />
          <Route path="/corporate-portfolio" element={<CorporatePortfolio />} />
          <Route path="/realestate-portfolio" element={<RealEstatePortfolio />} />
        </Routes>
      </Suspense>

    </HashRouter>
  );
}

export default App;