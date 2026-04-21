import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

const Portfolio = lazy(() => import("./Portfolio"));
const EventPortfolio = lazy(() => import("./EventPortfolio"));
const ProductPortfolio = lazy(() => import("./ProductPortfolio"));
const CorporatePortfolio = lazy(() => import("./CorporatePortfolio"));
const RealEstatePortfolio = lazy(() => import("./RealEstatePortfolio"));
const SaasPortfolio = lazy(() => import("./SaasPortfolio"));
const CaseStudyLicious = lazy(() => import("./CaseStudyLicious"));
const CaseStudyAstik = lazy(() => import("./CaseStudyAstik"));
const CaseStudyBibleNotes = lazy(() => import("./CaseStudyBibleNotes"));
const Feed = lazy(() => import("./Feed"));
const NotFound = lazy(() => import("./NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PortfolioRoute() {
  const location = useLocation();
  const initialSection = new URLSearchParams(location.search).get("section");
  return <Portfolio initialSection={initialSection} />;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="loader-shell" />}>
        <Routes>
          <Route path="/" element={<PortfolioRoute />} />
          <Route path="/contact" element={<Portfolio initialSection="contact" />} />
          <Route path="/event-portfolio" element={<EventPortfolio />} />
          <Route path="/product-portfolio" element={<ProductPortfolio />} />
          <Route path="/corporate-portfolio" element={<CorporatePortfolio />} />
          <Route path="/realestate-portfolio" element={<RealEstatePortfolio />} />
          <Route path="/saas-portfolio" element={<SaasPortfolio />} />
          <Route path="/case-study/licious-brand-film" element={<CaseStudyLicious />} />
          <Route path="/case-study/astik-dyestuff-corporate-film" element={<CaseStudyAstik />} />
          <Route path="/case-study/bible-notes-app-demo" element={<CaseStudyBibleNotes />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

    </HashRouter>
  );
}

export default App;
