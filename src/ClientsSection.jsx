import React, { useState, useEffect, useRef, useCallback, useMemo, memo, Suspense, lazy } from 'react';
import { useIsMobile, AuroraBg } from './Shared';
/* ─────────────────────────────────────────────
   CLIENTS SECTION
───────────────────────────────────────────── */
// memo() prevents re-render when parent vis state changes, which would cause
// all 90 boxes to reconcile simultaneously and cause the initial freeze/stutter.
const MagneticClientBox = memo(function MagneticClientBox({ client, tx, ty, delay, duration }) {
  const boxRef = useRef(null);

  return (
    <div
      ref={boxRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        padding: '16px 28px',
        borderRadius: 20,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        color: 'rgba(242,238,232,0.5)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        transition: 'background 0.4s, color 0.4s, border-color 0.4s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        // GPU-composited layer — prevents stutter when all boxes mount together
        willChange: 'transform, opacity',
        
        // Setup variables for keyframes
        '--tx': `${tx}px`,
        '--ty': `${ty}px`,
        animation: `hyperspace ${duration}s linear ${delay}s infinite`,
        // Ensures center origin for absolute positioning
        marginLeft: -60,
        marginTop: -30,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(200,169,110,0.1)';
        e.currentTarget.style.color = 'var(--gold)';
        e.currentTarget.style.borderColor = 'rgba(200,169,110,0.3)';
        e.currentTarget.style.transform = `translate(${offset.x}px, ${offset.y + randTranslateY - 5}px) scale(1.05)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        e.currentTarget.style.color = 'rgba(242,238,232,0.5)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.transform = `translate(${offset.x}px, ${offset.y + randTranslateY}px) scale(1)`;
      }}
    >
      <img 
        src={`/clients/${client.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`} 
        alt={client}
        loading="lazy"
        width="120"
        height="24"
        style={{ height: 24, maxWidth: 120, objectFit: 'contain' }}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling.style.display = 'block';
        }}
      />
      <span style={{ display: 'none' }}>{client}</span>
    </div>
  );
}); // end memo

const baseClientsData = [
  "ACG", "ARAPL RaaS", "Astik", "Borosil Scientific", "British Safety Council",
  "Exucia", "ElectroMech", "Fujifilm Sericol", "Getinge", "Henkel", "HYT", "Idex India",
  "Idex Richter", "ITPreneur", "KlimaPharm", "Phillips Machine Tools", "PSR Toolings",
  "Softdel - Unidel", "S. K. Pharma Machinery", "Tofflon", "Veol", "Accupack",
  "Silver Group", "Rama Group", "Prasun Spaces", "BU Bhandari", "Twilio", "AT&T",
  "JJ Valya", "Soror's", "Eventive Communications", "Hao CHi Express", "Bee Young",
  "NPS Jalahalli", "Right Platform", "Clinic Grower", "Baxter", "Gut-I-Care", "BeyondLabs",
  "VST", "Licious", "Novo Nordisk", "Westbridge Capital", "Obelisk", "LaundryMate",
  "Bhavya Art"
];

export default function ClientsSection() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  // Precompute all box positions/timings ONCE (never changes)
  const allClients = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    // On mobile use single list (fewer boxes), on desktop double it for density
    const list = isMobile ? [...baseClientsData] : [...baseClientsData, ...baseClientsData];
    // Scale positions down on mobile so boxes spread naturally on narrow screens
    const posScale = isMobile ? 0.35 : 1;
    return list.map((client, index) => {
      let hash = 0;
      const str = client + index;
      for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
      const rand = Math.abs(hash);
      const tx = ((rand % 2000) - 1000) * posScale;
      const ty = (((rand >> 3) % 1200) - 600) * posScale;
      const delay = (rand % 400) / -10;
      const duration = 12 + (rand % 20);
      return { client, tx, ty, delay, duration };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="clients" ref={ref} style={{
      position: 'relative', 
      padding: '100px 0',
      minHeight: '100vh',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      overflow: 'hidden',
      perspective: 1200,
    }}>
      
      {/* Infinite Starfield "Hyperspace" Grid */}
      <div 
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          zIndex: 1,
          opacity: 1,
          transition: 'none',
          pointerEvents: 'auto', // So logos can still be hovered despite floating behind the title
        }}
      >
        {allClients.map((data, i) => (
          <MagneticClientBox key={i} {...data} />
        ))}
      </div>

      {/* Foreground Title Text (Absolutely Centered) */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        zIndex: 2, 
        pointerEvents: 'none',
        width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div className={`partners-center reveal-section ${vis ? 'visible' : ''}`} style={{ 
          textAlign: 'center', 
          background: 'radial-gradient(circle, var(--bg) 0%, rgba(6,6,12,0.8) 40%, rgba(6,6,12,0) 70%)',
          padding: '140px',
          borderRadius: '50%',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>◈ Trusted By</div>
          <h2 className="partners-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(50px,9vw,120px)', lineHeight: 0.88, color: 'var(--white)', textShadow: '0 20px 40px rgba(0,0,0,0.9)' }}>
            PARTNERS IN<br />
            <span className="gold-text">TRUST</span>
          </h2>
        </div>
      </div>
      
      {/* Background radial gradient to give it depth */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(200,169,110,0.03) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
    </section>
  );
}

