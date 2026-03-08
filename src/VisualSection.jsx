import React, { useState, useEffect, useRef, useCallback, useMemo, memo, Suspense, lazy } from 'react';
import { useIsMobile, AuroraBg } from './Shared';
const FilmScene = lazy(() => import('./FilmScene'));
/* ─────────────────────────────────────────────
   VISUAL EXPERIENCE SECTION
───────────────────────────────────────────── */
export default function VisualSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      position: 'relative', height: '100vh', minHeight: '100vh',
      background: 'linear-gradient(180deg, var(--bg2), var(--bg))',
      overflow: 'hidden',
    }}>
      {!isMobile && (
        <Suspense fallback={null}>
          <FilmScene />
        </Suspense>
      )}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', zIndex: 2,
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(30px)',
        transition: 'opacity 1s ease, transform 1s ease',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 6, color: 'var(--gold)', marginBottom: 20, textTransform: 'uppercase' }}>
          ◈ The Process
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,8vw,96px)',
          color: 'var(--white)', textAlign: 'center', lineHeight: 0.9,
          textShadow: '0 0 80px rgba(200,169,110,0.2)',
        }}>
          EVERY<br /><span className="gold-text">FRAME</span><br />MATTERS
        </h2>
        <p style={{
          fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 18,
          color: 'rgba(242,238,232,0.4)', marginTop: 24, textAlign: 'center',
          maxWidth: 400,
        }}>
          From raw footage to cinematic experience — the alchemy of visual storytelling.
        </p>
      </div>
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, var(--bg) 100%)', pointerEvents: 'none', zIndex: 1 }} />
    </section>
  );
}

