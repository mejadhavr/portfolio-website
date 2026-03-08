import React, { useState, useEffect, useRef, useCallback, useMemo, memo, Suspense, lazy } from 'react';
import { useIsMobile, AuroraBg } from './Shared';

/* ─────────────────────────────────────────────
   CLIENTS SECTION
───────────────────────────────────────────── */

const MagneticClientBox = memo(function MagneticClientBox({ client, tx, ty, delay, duration }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        padding: '12px 24px',
        borderRadius: 16,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        color: 'rgba(242,238,232,0.3)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: 2,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        willChange: 'transform',
        '--tx': `${tx}px`,
        '--ty': `${ty}px`,
        animation: `hyperspace ${duration}s linear ${delay}s infinite`,
        marginLeft: -60,
        marginTop: -30,
      }}
    >
      {client}
    </div>
  );
});

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

const testimonials = [
  { quote: "Rushikesh's eye for cinematic detail is unmatched. He turned our raw footage into a high-end brand film.", author: "Alim Pathan", role: "Creative Director" },
  { quote: "The pacing and emotional rhythm of the cuts are exactly what we needed for our launch.", author: "Amarreddy Lingam", role: "Director" },
  { quote: "Outstanding motion graphics and professional color grading. A true master of his craft.", author: "Dharam Vir Singh", role: "Producer" }
];

export default function ClientsSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const allClients = useMemo(() => {
    const list = isMobile ? [...baseClientsData] : [...baseClientsData, ...baseClientsData];
    const posScale = isMobile ? 0.4 : 1;
    return list.map((client, index) => {
      let hash = 0;
      const str = client + index;
      for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
      const rand = Math.abs(hash);
      const tx = ((rand % 2400) - 1200) * posScale;
      const ty = (((rand >> 3) % 1400) - 700) * posScale;
      const delay = (rand % 400) / -10;
      const duration = 15 + (rand % 25);
      return { client, tx, ty, delay, duration };
    });
  }, [isMobile]);

  return (
    <section id="clients" ref={ref} style={{
      position: 'relative', 
      padding: '120px 0',
      minHeight: '100vh',
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      <AuroraBg accent="cyan" />
      
      {/* Background name wall */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.4 }}>
        {allClients.map((data, i) => (
          <MagneticClientBox key={i} {...data} />
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 40px' }}>
        <div className={`reveal-section ${vis ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 20, textTransform: 'uppercase' }}>◈ Trusted By</div>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,10vw,120px)', lineHeight: 0.88, color: 'var(--white)', marginBottom: 32 }}>
            BRANDS & <br />
            <span className="gold-text">CREATORS</span><br />
            I'VE WORKED WITH
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--gold)' }}>50+</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--muted)', textTransform: 'uppercase' }}>Brands Collaborated</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--gold)' }}>250+</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--muted)', textTransform: 'uppercase' }}>Social Edits Delivered</div>
            </div>
          </div>
        </div>

        {/* Category Tags */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 80, opacity: vis ? 1 : 0, transition: 'opacity 1s ease 0.5s' }}>
          {["Brand Films", "Reels", "Motion Graphics", "Social Content", "Product Videos"].map((tag, i) => (
            <span key={i} style={{ padding: '8px 20px', borderRadius: 30, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(242,238,232,0.6)', letterSpacing: 1, textTransform: 'uppercase' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Testimonials removed per user request */}
      </div>
    </section>
  );
}
