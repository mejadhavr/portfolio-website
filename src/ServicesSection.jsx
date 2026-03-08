import React, { useState, useEffect, useRef, useCallback, useMemo, memo, Suspense, lazy } from 'react';
import { useIsMobile, AuroraBg } from './Shared';
/* ─────────────────────────────────────────────
   SERVICES SECTION
───────────────────────────────────────────── */
const allServicesData = [
  {
    title: 'Brand & Corporate Films', desc: 'Story-first editing with pacing, rhythm, and emotion. From raw footage to cinematic masterpiece.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={40} height={40}>
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
    title: 'Product & Launch Videos', desc: 'Long-form narrative editing that builds tension, empathy, and impact across hours of footage.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={40} height={40}>
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
  {
    title: 'Commercial & Ads', desc: 'High-impact brand films, ads, and digital campaigns cut for engagement and conversion.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={40} height={40}>
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
    title: 'Cinematic Color Grading', desc: 'Full DaVinci Resolve pipeline — from rough cut to broadcast-ready, LUT-crafted cinematic look.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={40} height={40}>
        <circle cx="14" cy="18" r="7" stroke="#FF6B6B" strokeWidth="1.5" opacity="0.8" />
        <circle cx="26" cy="18" r="7" stroke="#6BFF8E" strokeWidth="1.5" opacity="0.8" />
        <circle cx="20" cy="26" r="7" stroke="#6B8EFF" strokeWidth="1.5" opacity="0.8" />
        <circle cx="20" cy="20" r="2" fill="white" opacity="0.6" />
      </svg>
    ),
    accent: '#C8A96E',
  },
  {
    title: 'Motion Graphics & Titles', desc: 'After Effects & Premiere motion design: titles, lower thirds, transitions, and full VFX packages.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={40} height={40}>
        <polyline points="5,30 12,18 18,24 24,10 30,20 36,14" stroke="#00C9FF" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="12" cy="18" r="2" fill="#00C9FF" />
        <circle cx="24" cy="10" r="2" fill="#00C9FF" />
        <circle cx="36" cy="14" r="2" fill="#00C9FF" />
      </svg>
    ),
    accent: '#00C9FF',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(false);
          setTimeout(() => {
            setVis(true);
          }, 50);
        } else {
          setVis(false);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const shuffledServices = useMemo(() => {
    return [...allServicesData]
      .map(s => ({ s, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ s }) => s);
  }, []);

  return (
    <section id="services" ref={ref} style={{
      position: 'relative', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px)',
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      <AuroraBg accent="gold" />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className={`services-section-heading reveal-section ${vis ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 70 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>◈ Services</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,9vw,108px)', lineHeight: 0.88, color: 'var(--white)' }}>
            WHAT<br />
            <span className="gold-text">I DO</span>
          </h2>
        </div>

        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20
        }}>
          {shuffledServices.map((s, i) => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
            return (
              <ServiceCard
                key={i}
                service={s}
                delay={isMobile ? i * 0.15 : Math.random() * 2}
                vis={vis}
              />
            );
          })}
        </div>
      </div>

      {/* Scrolling video formats */}
      <div
        style={{
          marginTop: 60,
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s'
        }}
      >

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: 4,
            color: 'var(--gold)',
            textAlign: 'center',
            marginBottom: 24
          }}
        >
          + 25 MORE VIDEO FORMATS EDITED
        </div>

        <div className="format-strip">

          <div className="format-track">

            {[
              "YouTube Videos",
              "Podcast Edits",
              "Real Estate Videos",
              "Wedding Films",
              "Instagram Reels",
              "Short Form Content",
              "Event Highlights",
              "Online Courses",
              "Explainer Videos",
              "Interviews",
              "Brand Stories",
              "Startup Launch Videos",
              "Fitness Content",
              "Travel Vlogs"
            ].map((item, i) => (

              <div
                key={i}
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 18,
                  color: 'rgba(242,238,232,0.5)'
                }}
              >
                {item}
              </div>

            ))}

            {/* duplicated for infinite scroll */}

            {[
              "YouTube Videos",
              "Podcast Edits",
              "Real Estate Videos",
              "Wedding Films",
              "Instagram Reels",
              "Short Form Content",
              "Event Highlights",
              "Online Courses",
              "Explainer Videos",
              "Interviews",
              "Brand Stories",
              "Startup Launch Videos",
              "Fitness Content",
              "Travel Vlogs"
            ].map((item, i) => (

              <div
                key={"dup" + i}
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 18,
                  color: 'rgba(242,238,232,0.5)'
                }}
              >
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
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card"
      style={{
        padding: '44px 30px', cursor: 'none',
        opacity: 0,
        animation: vis
          ? `serviceReveal 2.5s cubic-bezier(0.16,1,0.3,1) forwards`
          : undefined,
        animationDelay: vis ? `${delay}s` : '0s',
        animationFillMode: 'both',
        transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s, border-color 0.3s',
        boxShadow: hovered ? `0 30px 60px rgba(0,0,0,0.5), 0 0 30px ${s.accent}22` : '0 4px 20px rgba(0,0,0,0.3)',
        borderColor: hovered ? `${s.accent}44` : 'var(--border)',
      }}
    >
      <div style={{
        width: 60, height: 60, borderRadius: 16,
        background: hovered ? `${s.accent}14` : 'rgba(255,255,255,0.03)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
        border: `1px solid ${hovered ? s.accent + '44' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.3s',
        boxShadow: hovered ? `0 0 20px ${s.accent}33` : 'none',
      }}>
        {s.icon}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--white)', marginBottom: 12, lineHeight: 1.1 }}>{s.title}</h3>
      <p style={{ fontFamily: 'var(--font-editorial)', fontSize: 15, lineHeight: 1.8, color: 'rgba(242,238,232,0.65)' }}>{s.desc}</p>
      <div style={{
        marginTop: 24, height: 2, borderRadius: 2,
        background: hovered ? `linear-gradient(to right, ${s.accent}, transparent)` : 'transparent',
        transition: 'background 0.4s',
      }} />
    </div>
  );
}

