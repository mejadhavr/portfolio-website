import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useIsMobile, AuroraBg } from './Shared';

/* ─────────────────────────────────────────────
   SERVICES SECTION
───────────────────────────────────────────── */
const allServicesData = [
  {
    title: 'COMMERCIAL & ADS',
    desc: 'High-impact brand films, ads, and digital campaigns cut for engagement and conversion.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={24} height={24}>
        <rect x="8" y="6" width="24" height="28" rx="2" stroke="#C8A96E" strokeWidth="1.5" />
        <line x1="8" y1="14" x2="32" y2="14" stroke="#C8A96E" strokeWidth="1" opacity="0.5" />
        <line x1="8" y1="26" x2="32" y2="26" stroke="#C8A96E" strokeWidth="1" opacity="0.5" />
        <circle cx="12" cy="10" r="1.5" fill="#C8A96E" opacity="0.7" />
        <circle cx="12" cy="30" r="1.5" fill="#C8A96E" opacity="0.7" />
        <circle cx="28" cy="10" r="1.5" fill="#C8A96E" opacity="0.7" />
        <circle cx="28" cy="30" r="1.5" fill="#C8A96E" opacity="0.7" />
        <circle cx="20" cy="20" r="4" stroke="#C8A96E" strokeWidth="1.5" />
      </svg>
    ),
    accent: '#C8A96E',
  },
  {
    title: 'CINEMATIC COLOR GRADING',
    desc: 'Full DaVinci Resolve pipeline — from rough cut to broadcast-ready, LUT-crafted cinematic look.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={24} height={24}>
        <circle cx="14" cy="18" r="7" stroke="#FF6B6B" strokeWidth="1.5" opacity="0.8" />
        <circle cx="26" cy="18" r="7" stroke="#6BFF8E" strokeWidth="1.5" opacity="0.8" />
        <circle cx="20" cy="26" r="7" stroke="#6B8EFF" strokeWidth="1.5" opacity="0.8" />
        <circle cx="20" cy="20" r="2" fill="white" opacity="0.6" />
      </svg>
    ),
    accent: '#C5A059',
  },
  {
    title: 'BRAND & CORPORATE FILMS',
    desc: 'Story-first editing with pacing, rhythm, and emotion. From raw footage to cinematic masterpiece.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={24} height={24}>
        <rect x="3" y="12" width="34" height="16" rx="2" stroke="#C8A96E" strokeWidth="1.5" />
        <rect x="3" y="8" width="6" height="4" rx="1" stroke="#C8A96E" strokeWidth="1.2" opacity="0.5" />
        <rect x="31" y="8" width="6" height="4" rx="1" stroke="#C8A96E" strokeWidth="1.2" opacity="0.5" />
        <circle cx="20" cy="20" r="5" stroke="#C8A96E" strokeWidth="1.5" />
        <polygon points="18,17.5 18,22.5 23,20" fill="#C8A96E" />
      </svg>
    ),
    accent: '#C8A96E',
  },
  {
    title: 'MOTION GRAPHICS & TITLES',
    desc: 'After Effects & Premiere motion design: titles, lower thirds, transitions, and full VFX packages.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={24} height={24}>
        <polyline points="5,30 12,18 18,24 24,10 30,20 36,14" stroke="#00C9FF" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="12" cy="18" r="2" fill="#00C9FF" />
        <circle cx="24" cy="10" r="2" fill="#00C9FF" />
        <circle cx="36" cy="14" r="2" fill="#00C9FF" />
      </svg>
    ),
    accent: '#00C9FF',
  },
  {
    title: 'PRODUCT & LAUNCH VIDEOS',
    desc: 'High-impact product reveals and launches created with cinematic pacing and industrial mapping.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={24} height={24}>
        <circle cx="20" cy="20" r="14" stroke="#00C9FF" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="8" stroke="#00C9FF" strokeWidth="1" opacity="0.5" />
        <circle cx="20" cy="20" r="2" fill="#00C9FF" />
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <line key={i} x1="20" y1="6" x2="20" y2="9"
            style={{ transformOrigin: '20px 20px', transform: `rotate(${a}deg)` }}
            stroke="#00C9FF" strokeWidth="1.5" opacity="0.7" />
        ))}
      </svg>
    ),
    accent: '#00C9FF',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
        } else {
          setVis(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} style={{
      position: 'relative', padding: isMobile ? '80px 20px' : '140px 40px',
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      <AuroraBg accent="gold" />
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className={`reveal-section ${vis ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: clamp(40, 100, 120) }}>
          <div style={{ 
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 20, 
            textTransform: 'uppercase', opacity: 0.6 
          }}>◈ Services</div>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(60px,18vw,160px)', 
            lineHeight: 0.82, 
            color: 'var(--white)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            WHAT<br />
            <span className="gold-text" style={{ fontSize: '1.02em' }}>I DO</span>
          </h2>
        </div>

        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
          gap: 16
        }}>
          {allServicesData.map((s, i) => (
            <ServiceCard
              key={i}
              service={s}
              delay={i * 0.15}
              vis={vis}
            />
          ))}
        </div>
      </div>

      {/* Scrolling video formats */}
      <div
        style={{
          marginTop: 120,
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.9s ease 0.8s, transform 0.9s ease 0.8s'
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5,
          color: 'var(--gold)', textAlign: 'center', marginBottom: 40, textTransform: 'uppercase', opacity: 0.4
        }}>
          + 25 MORE VIDEO FORMATS EDITED
        </div>

        <div className="format-strip">
          <div className="format-track">
            {[
              "YouTube Content", "Podcast Edits", "Real Estate Films", "Wedding Stories",
              "Short Form Reels", "Event Highlights", "Educational Courses",
              "Explainer Videos", "Interview Cuts", "Brand Manifestos", "Startup Pitch Videos",
              "Industrial Showcases", "Travel Stories"
            ].map((item, i) => (
              <div key={i} style={{ fontFamily: 'var(--font-editorial)', fontSize: 18, color: 'rgba(242,238,232,0.35)', padding: '0 40px', fontStyle: 'italic' }}>
                {item}
              </div>
            ))}
            {/* Duplicated for infinite scroll */}
            {[
              "YouTube Content", "Podcast Edits", "Real Estate Films", "Wedding Stories",
              "Short Form Reels", "Event Highlights", "Educational Courses",
              "Explainer Videos", "Interview Cuts", "Brand Manifestos", "Startup Pitch Videos",
              "Industrial Showcases", "Travel Stories"
            ].map((item, i) => (
              <div key={"dup" + i} style={{ fontFamily: 'var(--font-editorial)', fontSize: 18, color: 'rgba(242,238,232,0.35)', padding: '0 40px', fontStyle: 'italic' }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service: s, delay, vis }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: isMobile ? '32px 24px' : '48px 32px',
        background: 'rgba(10, 10, 16, 0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 20,
        opacity: 0,
        animation: vis ? `serviceReveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards` : 'none',
        animationDelay: `${delay + 0.2}s`,
        animationFillMode: 'both',
        transform: hovered ? 'translateY(-12px)' : 'translateY(0)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hovered ? `0 30px 60px rgba(0, 0, 0, 0.5), 0 0 30px ${s.accent}08` : 'none',
        borderColor: hovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left'
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 10,
        background: 'rgba(255, 255, 255, 0.03)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        color: hovered ? 'white' : s.accent,
        transform: hovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
      }}>
        {s.icon}
      </div>
      
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(20px, 2.5vw, 26px)', 
          color: 'var(--white)', 
          marginBottom: 16, 
          lineHeight: 1.1,
          letterSpacing: 1,
          textTransform: 'uppercase',
          opacity: 0,
          animation: vis ? `revealUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards` : 'none',
          animationDelay: `${delay + 0.4}s`
        }}>{s.title}</h3>
      </div>

      <p style={{ 
        fontFamily: 'var(--font-editorial)', 
        fontSize: 'clamp(14px, 1.2vw, 16px)', 
        lineHeight: 1.6, 
        color: 'rgba(242,238,232,0.5)',
        margin: 0,
        fontWeight: 300,
        opacity: 0,
        animation: vis ? `fadeIn 1s ease forwards` : 'none',
        animationDelay: `${delay + 0.6}s`
      }}>{s.desc}</p>
    </div>
  );
}

const clamp = (min, val, max) => Math.max(min, Math.min(val, max));
