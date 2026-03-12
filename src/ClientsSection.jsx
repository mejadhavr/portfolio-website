import React, { useState, useEffect, useRef, useCallback, useMemo, memo, Suspense, lazy } from 'react';
import { useIsMobile, AuroraBg } from './Shared';

/* ─────────────────────────────────────────────
   CLIENTS SECTION
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   COUNTER COMPONENT
───────────────────────────────────────────── */
const Counter = memo(({ target, suffix, duration = 2000, trigger }) => {
  const [count, setCount] = useState(0);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!trigger || hasTriggered.current) return;
    hasTriggered.current = true;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [trigger, target, duration]);

  return <span>{count}{suffix}</span>;
});

const MarqueeRow = memo(({ names, dir, speed }) => {
  const content = [...names, ...names, ...names].join(' · ');
  return (
    <div className="marquee-row" style={{
      display: 'flex',
      whiteSpace: 'nowrap',
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'var(--gold)',
      opacity: 0.1,
      animation: `marqueeScroll ${speed}s linear infinite ${dir === 1 ? 'reverse' : 'normal'}, marqueePulse 10s ease-in-out infinite alternate`,
      userSelect: 'none',
      willChange: 'transform, opacity'
    }}>
      <span style={{ paddingRight: '4rem' }}>{content}</span>
      <span style={{ paddingRight: '4rem' }}>{content}</span>
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

export default function ClientsSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="clients" ref={ref} style={{
      position: 'relative', 
      padding: 'clamp(80px, 12vw, 120px) 0',
      minHeight: '100vh',
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      <AuroraBg accent="cyan" />
      
      {/* 3-Row Background Marquee */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '10vh 0' }}>
        <MarqueeRow names={baseClientsData.slice(0, 15)} dir={-1} speed={40} />
        <MarqueeRow names={baseClientsData.slice(15, 30)} dir={1} speed={55} />
        <MarqueeRow names={baseClientsData.slice(30)} dir={-1} speed={45} />
      </div>


      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ 
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 20, textTransform: 'uppercase',
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
          }}>◈ Trusted By</div>
          
          <h2 style={{ 
            fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,10vw,120px)', lineHeight: 0.88, color: 'var(--white)', marginBottom: 48,
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
          }}>
            BRANDS & <br />
            <span className="gold-text">CREATORS</span><br />
            I'VE WORKED WITH
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap' }}>
            <div style={{ 
              textAlign: 'center',
              opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, color: 'var(--gold)' }}>
                <Counter target={50} suffix="+" trigger={vis} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--muted)', textTransform: 'uppercase', marginTop: 8 }}>Brands Collaborated</div>
            </div>
            <div style={{ 
              textAlign: 'center',
              opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, color: 'var(--gold)' }}>
                <Counter target={250} suffix="+" trigger={vis} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--muted)', textTransform: 'uppercase', marginTop: 8 }}>Social Edits Delivered</div>
            </div>
          </div>
        </div>

        {/* Category Tags */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 80 }}>
          {["Brand Films", "Reels", "Motion Graphics", "Social Content", "Product Videos"].map((tag, i) => (
            <span 
              key={i} 
              style={{ 
                padding: '8px 20px', borderRadius: 30, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', 
                fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(242,238,232,0.6)', letterSpacing: 1, textTransform: 'uppercase',
                opacity: vis ? 1 : 0, transform: vis ? 'none' : 'scale(0.9)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + (i * 0.1)}s`
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Testimonials removed per user request */}
      </div>
    </section>
  );
}
