import { useState, useEffect, useRef, useCallback, useMemo, memo, Suspense, lazy } from "react";
import * as THREE from "three";

const HeroCanvas = lazy(() => import("./HeroCanvas"));
import { useIsMobile, useIsLowEnd, AuroraBg } from './Shared';
import LazySection from './LazySection';

const AboutSection = lazy(() => import('./AboutSection'));
const WorkSection = lazy(() => import('./WorkSection'));
const ServicesSection = lazy(() => import('./ServicesSection'));
const VisualSection = lazy(() => import('./VisualSection'));
const ClientsSection = lazy(() => import('./ClientsSection'));
const ContactSection = lazy(() => import('./ContactSection'));


import ChatWidget from "./ChatWidget";

/* ─────────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────────── */
const GLOBAL_CSS = `

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #06060C;
  --bg2: #0A0A14;
  --gold: #C8A96E;
  --gold2: #F0D5A0;
  --cyan: #00C9FF;
  --cyan2: #00F5FF;
  --white: #F2EEE8;
  --muted: #5A5A6E;
  --glass: rgba(12,12,22,0.72);
  --glass2: rgba(200,169,110,0.08);
  --border: rgba(200,169,110,0.18);
  --font-display: 'Bebas Neue', sans-serif;
  --font-editorial: 'Cormorant Garamond', serif;
  --font-mono: 'Space Mono', monospace;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--white);
  font-family: var(--font-editorial);
  overflow-x: hidden;
}

/* Only hide cursor on pointer (mouse) devices — never on touch */
@media (pointer: fine) {
  body { cursor: none; }
}

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

/* ── GRAIN ── */
@keyframes grain {
  0%,100%{transform:translate(0,0)}
  10%{transform:translate(-2%,-3%)}
  20%{transform:translate(-4%,2%)}
  30%{transform:translate(3%,-1%)}
  40%{transform:translate(-1%,4%)}
  50%{transform:translate(2%,-3%)}
  60%{transform:translate(-3%,1%)}
  70%{transform:translate(4%,2%)}
  80%{transform:translate(-2%,-4%)}
  90%{transform:translate(3%,3%)}
}

.grain-overlay {
  position: fixed; inset: -200%;
  width: 400%; height: 400%;
  z-index: 9999; pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  animation: grain 0.5s steps(1) infinite;
  mix-blend-mode: overlay;
}

/* ── AURORA ── */
@keyframes aurora1 {
  0%,100%{transform:translate(-20%,-20%) rotate(0deg) scale(1);}
  50%{transform:translate(10%,10%) rotate(180deg) scale(1.2);}
}
@keyframes aurora2 {
  0%,100%{transform:translate(20%,10%) rotate(0deg) scale(1.1);}
  50%{transform:translate(-10%,-20%) rotate(-120deg) scale(0.9);}
}
@keyframes aurora3 {
  0%,100%{transform:translate(0%,-30%) rotate(45deg) scale(0.9);}
  50%{transform:translate(-15%,15%) rotate(225deg) scale(1.15);}
}

/* ── LOADING ── */
@keyframes frameFlicker {
  0%,100%{opacity:1} 50%{opacity:0.85}
}
@keyframes countDown {
  0%{opacity:0;transform:scale(1.4) translateY(-10px);}
  20%{opacity:1;transform:scale(1) translateY(0);}
  80%{opacity:1;transform:scale(1) translateY(0);}
  100%{opacity:0;transform:scale(0.7) translateY(10px);}
}
@keyframes revealUp {
  from{opacity:0;transform:translateY(40px);}
  to{opacity:1;transform:translateY(0);}
}
@keyframes fadeIn {
  from{opacity:0;} to{opacity:1;}
}

@keyframes serviceReveal {
  from {
    opacity:0;
    transform:translateY(60px) scale(0.94);
    filter:blur(10px);
  }

  to {
    opacity:1;
    transform:translateY(0) scale(1);
    filter:blur(0);
  }
}
  
@keyframes scaleIn {
  from{opacity:0;transform:scale(0.88);}
  to{opacity:1;transform:scale(1);}
}
@keyframes revealLeft {
  from{clip-path:inset(0 100% 0 0);opacity:0;}
  to{clip-path:inset(0 0% 0 0);opacity:1;}
}
@keyframes glow-pulse {
  0%,100%{box-shadow:0 0 20px rgba(200,169,110,0.3),0 0 60px rgba(200,169,110,0.1);}
  50%{box-shadow:0 0 40px rgba(200,169,110,0.6),0 0 100px rgba(200,169,110,0.2);}
}
@keyframes spin-slow { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
@keyframes spin-reverse { from{transform:rotate(0deg);} to{transform:rotate(-360deg);} }
@keyframes float {
  0%,100%{transform:translateY(0px) rotate(0deg);}
  33%{transform:translateY(-18px) rotate(2deg);}
  66%{transform:translateY(-8px) rotate(-1deg);}
}
@keyframes float2 {
  0%,100%{transform:translateY(0px) rotate(0deg);}
  50%{transform:translateY(-24px) rotate(-3deg);}
}
@keyframes hyperspace {
  0% { transform: translate3d(var(--tx), var(--ty), -1500px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translate3d(var(--tx), var(--ty), 500px); opacity: 0; }
}
@keyframes shimmer {
  0%{background-position:-200% center;}
  100%{background-position:200% center;}
}
@keyframes scanline {
  0%{top:-5%;} 100%{top:105%;}
}
@keyframes counter {
  from{--n:0;} to{}
}
@keyframes borderRotate {
  0%{background-position:0% 50%;}
  50%{background-position:100% 50%;}
  100%{background-position:0% 50%;}
}
@keyframes scrollFormats {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.email-text{
font-family: 'Space Mono', monospace;
}

.format-strip {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.format-track {
  display: flex;
  gap: 40px;
  white-space: nowrap;
  animation: scrollFormats 35s linear infinite;
}
.reveal-section {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
}
.reveal-section.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s;
}
.reveal-left.visible { opacity:1; transform:translateX(0); }
.reveal-right {
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s;
}
.reveal-right.visible { opacity:1; transform:translateX(0); }

.gold-text {
  background: linear-gradient(135deg, #C8A96E 0%, #F0D5A0 40%, #C8A96E 70%, #E8C87A 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
}
.cyan-text {
  background: linear-gradient(135deg, #00C9FF, #00F5FF, #00C9FF);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}

.glass-card {
  background: var(--glass);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid var(--border);
  border-radius: 16px;
}
.glass-card-cyan {
  background: rgba(0,201,255,0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0,201,255,0.2);
  border-radius: 16px;
}
.glow-border {
  animation: glow-pulse 3s ease-in-out infinite;
}

/* ── RESPONSIVE ── */

/* Tablet */
@media (max-width: 1024px) {
  .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
}

/* Mobile */
@media (max-width: 768px) {
  body { overflow-x: hidden; }

  /* Disable heavy effects on mobile */
  .grain-overlay, .aurora-bg { display: none !important; }
  .glass-card { backdrop-filter: none !important; background: rgba(12, 12, 22, 0.95) !important; }

  /* ── NAV: hide laptop pill, show hamburger at top-right ── */
  .nav-desktop { display: none !important; }
  .nav-hamburger {
    display: flex !important;
    position: fixed;
    top: 16px;
    right: 16px;
    left: auto !important;
    transform: none !important;
  }

  /* ── HERO NAME: smaller so Rushikesh Jadhav stays one line ── */
  .hero-name { font-size: clamp(38px, 11vw, 68px) !important; }

  /* ── About: single column ── */
  .about-grid {
    grid-template-columns: 1fr !important;
    gap: 40px !important;
  }

  /* ── Services ── */
  .services-grid { grid-template-columns: 1fr !important; }

  /* ── Contact cards ── */
  .contact-grid { grid-template-columns: 1fr !important; }

  /* ── Tighten horizontal padding ── */
  #about, #work, #services, #contact {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  /* ── Prevent heading overflow ── */
  h2, h3 { word-break: break-word; }

  /* ── Email text ── */
  .email-text { font-size: 14px !important; white-space: normal !important; word-break: break-all !important; }

  /* ── Format ticker ── */
  .format-track > div { font-size: 14px !important; }

  /* ── Glass cards in bento: ensure enough min-width ── */
  .work-grid { grid-template-columns: 1fr !important; }
}

/* Small phone */
@media (max-width: 480px) {
  .about-grid { gap: 24px !important; }
  .hero-name { font-size: clamp(32px, 10vw, 52px) !important; }
  .format-track > div { font-size: 12px !important; }
}

/* ── PROJECT CARDS (REEL) ── */
@media (max-width: 768px) {
  .mobile-only-break { display: block; content: ""; margin-top: 4px; }
  .footer-copyright { font-size: 8px !important; letter-spacing: 2px !important; }
  .card-front-overlay { padding: 14px !important; }
  .card-front-title { font-size: 16px !important; }
  .card-front-desc { display: none !important; }
  .card-tags-line { display: none !important; }
  .card-back { padding: 12px 16px !important; }
  .card-back-title { font-size: 16px !important; margin-bottom: 6px !important; line-height: 1.1 !important; }
  .card-back-body { font-size: 11px !important; line-height: 1.35 !important; overflow-y: auto !important; padding-right: 4px !important; }
  .card-back-label { font-size: 8px !important; margin-bottom: 6px !important; }
  .card-tag { font-size: 8px !important; padding: 3px 7px !important; top: 8px !important; right: 8px !important; }

  /* Partners heading — fix so it stops shrinking below 40px and matches standard headings */
  .partners-title { font-size: clamp(40px, 8vw, 44px) !important; line-height: 1 !important; }
  .partners-center { padding: 60px 40px !important; }

  /* Hero top label: reduce letter spacing so it stays one line */
  .hero-label { font-size: 9px !important; letter-spacing: 2px !important; }

  /* Card bottom always-visible title */
  .card-bottom-title { font-size: 15px !important; }

  /* Section top gap so headings clear the hamburger (44px btn + 16px top + 12px gap) */
  #work .work-section-heading,
  #services .services-section-heading { padding-top: 72px !important; }

  /* About section heading size */
  .about-heading { font-size: clamp(44px, 13vw, 70px) !important; }

  /* Project Cards on Mobile: override aspect ratio so they are tall enough for text */
  .project-card-aspect { padding-bottom: 125% !important; }
  
  /* Project Cards on Mobile: remove 40px video frame inset so video fills the whole card */
  .card-video-bg { inset: 0 !important; border-radius: 16px !important; }
}

/* ── ACCESSIBILITY: Keyboard focus ring ── */
:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
  border-radius: 4px;
}

/* ── ACCESSIBILITY: Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .grain-overlay { animation: none !important; }
  .gold-text, .cyan-text { animation: none !important; }
  .reveal-section, .reveal-left, .reveal-right {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
`;


/* ─────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isTouch = typeof window !== "undefined" && (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );

  if (isTouch) return null;

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener('mousemove', onMove);
    let raf;
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        background: 'var(--gold)', borderRadius: '50%', zIndex: 99999,
        pointerEvents: 'none', mixBlendMode: 'difference',
        transition: 'transform 0.05s linear',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, width: 40, height: 40,
        border: '1px solid rgba(200,169,110,0.6)', borderRadius: '50%', zIndex: 99998,
        pointerEvents: 'none',
      }} />
    </>
  );
}

/* ─────────────────────────────────────────────
   LOADING SCREEN – film leader countdown
───────────────────────────────────────────── */
function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = performance.now();
    const duration = 3500; // Slower speed as requested
    
    let frame;
    const animate = (time) => {
      let passed = time - start;
      let p = Math.min(passed / duration, 1);
      
      // Easing function for smoother progress line
      const easeOutQuart = 1 - Math.pow(1 - p, 4);
      setProgress(easeOutQuart * 100);
      
      if (p < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setPhase('reveal');
        setTimeout(onDone, 800);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99990, background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', overflow: 'hidden',
      opacity: phase === 'reveal' ? 0 : 1,
      transition: 'opacity 0.8s ease',
    }}>
      {/* SMTPE color bars tiny */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, display: 'flex',
      }}>
        {['#C0C0C0', '#C0C000', '#00C0C0', '#00C000', '#C000C0', '#C00000', '#0000C0'].map((c, i) => (
          <div key={i} style={{ flex: 1, background: c, opacity: 0.4 }} />
        ))}
      </div>

      {phase === 'loading' && (
        <div style={{ width: '60%', maxWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4,
            color: 'rgba(242,238,232,0.5)', marginBottom: 20, textAlign: 'center',
            textTransform: 'uppercase',
          }}>
            Loading Experience
          </div>
          {/* Progress Bar Track */}
          <div style={{
            width: '100%', height: 1, background: 'rgba(255,255,255,0.1)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Progress Bar Fill */}
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: `${progress}%`, background: 'var(--gold)',
            }} />
          </div>
        </div>
      )}
    </div>
  );
}



/* ─────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────── */
function Navigation({ active }) {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ['Home', 'About', 'Work', 'Services', 'Contact'];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Nav Pill — centered, no transform issues */}
      <nav className="nav-desktop" style={{
        position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 9000,
        opacity: visible ? 1 : 0,
        transition: 'opacity 1s ease',
        width: 'max-content',
        maxWidth: 'calc(100vw - 32px)',
      }}>
        <div className="glass-card" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 20px',
          border: '1px solid rgba(200,169,110,0.2)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}>
          <img src="/images/logo.webp" alt="Mejadhavr Logo" width="80" height="28" loading="lazy" style={{ height: 28, width: 'auto', marginRight: 12 }} />
          {navItems.map((item) => (
            <button key={item} onClick={() => scrollTo(item)}
              aria-label={`Navigate to ${item} section`}
              style={{
              background: 'none', border: 'none', cursor: 'none',
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2,
              color: active === item.toLowerCase() ? 'var(--gold)' : 'rgba(242,238,232,0.6)',
              padding: '6px 14px', borderRadius: 8, textTransform: 'uppercase',
              transition: 'color 0.3s, background 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.background = 'rgba(200,169,110,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = active === item.toLowerCase() ? 'var(--gold)' : 'rgba(242,238,232,0.6)'; e.currentTarget.style.background = 'transparent'; }}
            >{item}</button>
          ))}
          <a href="mailto:rushikesh@mejadhavr.com" target="_blank" rel="noopener noreferrer" style={{
            marginLeft: 12, padding: '7px 18px', borderRadius: 8,
            background: 'linear-gradient(135deg,rgba(200,169,110,0.2),rgba(200,169,110,0.1))',
            border: '1px solid rgba(200,169,110,0.3)',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2,
            color: 'var(--gold)', textDecoration: 'none', textTransform: 'uppercase',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,169,110,0.2)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(200,169,110,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,rgba(200,169,110,0.2),rgba(200,169,110,0.1))'; e.currentTarget.style.boxShadow = 'none'; }}
          >Hire Me</a>
        </div>
      </nav>

      {/* Mobile Hamburger — sibling to nav, NOT inside it, so fixed positioning works */}
      <button
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="menu-toggle"
        style={{
          position: 'fixed', top: 30, right: 30, zIndex: 3000,
          width: 54, height: 54, borderRadius: '50%',
          background: 'rgba(10,10,15,0.4)', backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
          cursor: 'none', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,169,110,0.5)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'scale(1)'; }}
        onClick={() => {
          setMenuOpen(!menuOpen);
          if (window.trackEvent) window.trackEvent("menu_toggle_click");
        }}
      >
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block',
            width: menuOpen ? 18 : (i===1 ? 14 : 20),
            height: 1.5, borderRadius: 2, background: 'var(--gold)',
            transform: menuOpen
              ? (i===0 ? 'rotate(45deg) translate(3px,4px)' : i===2 ? 'rotate(-45deg) translate(3px,-4px)' : 'scaleX(0)')
              : 'none',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s, width 0.3s',
            opacity: menuOpen && i===1 ? 0 : 1,
          }} />
        ))}
      </button>

      {/* Mobile Bottom-Sheet — sibling to nav, truly fixed */}
      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          }} />
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9001,
            background: 'linear-gradient(180deg,rgba(14,14,28,0.97) 0%,rgba(6,6,12,0.99) 100%)',
            backdropFilter: 'blur(30px)',
            borderTop: '1px solid rgba(200,169,110,0.2)',
            borderRadius: '24px 24px 0 0',
            padding: '12px 0 40px',
            animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(200,169,110,0.3)', margin: '0 auto 20px' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 5, color: 'rgba(200,169,110,0.45)', textAlign: 'center', textTransform: 'uppercase', marginBottom: 4 }}>Navigate</div>
            {navItems.map((item, idx) => {
              const isActive = active === item.toLowerCase();
              return (
                <button key={item} onClick={() => scrollTo(item)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 16,
                  padding: '15px 28px',
                  background: isActive ? 'rgba(200,169,110,0.07)' : 'transparent',
                  border: 'none', borderTop: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                }}
                  onTouchStart={e => e.currentTarget.style.background = 'rgba(200,169,110,0.1)'}
                  onTouchEnd={e => e.currentTarget.style.background = isActive ? 'rgba(200,169,110,0.07)' : 'transparent'}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isActive ? 'var(--gold)' : 'rgba(242,238,232,0.2)', width: 20, textAlign: 'right', flexShrink: 0 }}>0{idx+1}</span>
                  <span style={{ width: 1, height: 26, flexShrink: 0, background: isActive ? 'rgba(200,169,110,0.5)' : 'rgba(255,255,255,0.1)' }} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, letterSpacing: 2, color: isActive ? 'var(--gold)' : 'rgba(242,238,232,0.85)', textTransform: 'uppercase', flex: 1, textAlign: 'left' }}>{item}</span>
                  <span style={{ fontSize: 14, color: isActive ? 'var(--gold)' : 'rgba(242,238,232,0.2)' }}>→</span>
                </button>
              );
            })}
            <div style={{ padding: '16px 28px 0' }}>
              <a href="mailto:rushikesh@mejadhavr.com" onClick={() => setMenuOpen(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '13px 24px', borderRadius: 12,
                background: 'linear-gradient(135deg,rgba(200,169,110,0.18),rgba(200,169,110,0.08))',
                border: '1px solid rgba(200,169,110,0.35)',
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3,
                color: 'var(--gold)', textDecoration: 'none', textTransform: 'uppercase',
              }}>Hire Me →</a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
/* ─────────────────────────────────────────────
   MOBILE HERO BACKGROUND (CSS-only, no WebGL)
───────────────────────────────────────────── */
function MobileHeroBg() {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      zIndex: 0,
    }}>
      {/* Deep cinematic base gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(200,169,110,0.12) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 80% 100%, rgba(0,201,255,0.07) 0%, transparent 55%), linear-gradient(180deg, #06060C 0%, #0A0A14 50%, #06060C 100%)',
      }} />

      {/* Gold orb — top left */}
      <div style={{
        position: 'absolute',
        width: '70vw', height: '70vw',
        top: '-15vw', left: '-20vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,169,110,0.22) 0%, rgba(200,169,110,0.06) 50%, transparent 70%)',
        animation: 'mobileOrb1 20s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* Cyan orb — bottom right */}
      <div style={{
        position: 'absolute',
        width: '60vw', height: '60vw',
        bottom: '-10vw', right: '-15vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,201,255,0.18) 0%, rgba(0,201,255,0.05) 50%, transparent 70%)',
        animation: 'mobileOrb2 25s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* Faint purple orb — mid left */}
      <div style={{
        position: 'absolute',
        width: '50vw', height: '50vw',
        top: '35%', left: '-10vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(138,43,226,0.1) 0%, transparent 70%)',
        animation: 'mobileOrb3 30s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* Light beam 1 — diagonal gold */}
      <div style={{
        position: 'absolute',
        top: '-20%', left: '30%',
        width: '1px', height: '140%',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(200,169,110,0.25) 30%, rgba(200,169,110,0.1) 60%, transparent 100%)',
        transformOrigin: 'top center',
        animation: 'mobileBeam 12s ease-in-out infinite',
      }} />

      {/* Light beam 2 — diagonal cyan */}
      <div style={{
        position: 'absolute',
        top: '-10%', right: '25%',
        width: '1px', height: '130%',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(0,201,255,0.2) 35%, rgba(0,201,255,0.07) 65%, transparent 100%)',
        transformOrigin: 'top center',
        animation: 'mobileBeam2 16s ease-in-out infinite',
      }} />

      {/* Horizontal scan line glow */}
      <div style={{
        position: 'absolute', top: '38%', left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.15) 30%, rgba(200,169,110,0.3) 50%, rgba(200,169,110,0.15) 70%, transparent 100%)',
        opacity: 0.5,
      }} />

      {/* Vignette — dark edges, cinematic */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)',
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function HeroSection() {

  const [tagVisible, setTagVisible] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [tagIndex, setTagIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [showVideoBg, setShowVideoBg] = useState(false);
  
  const isMobile = useIsMobile();
  const isLowEnd = useIsLowEnd();

  const name = "Rushikesh Jadhav";

  const taglines = [
    "Cinematic Video Editing & Visual Storytelling",
    "Crafting Stories Through Precision Cuts",
    "Turning Footage Into Emotion",
    "High-Impact Commercial & Documentary Edits",
    "Editing Where Every Frame Matters"
  ];

  // reveal animation synchronised with loading screen
  useEffect(() => {
    // 3500ms line + 800ms fade = 4300ms total. 
    const t = setTimeout(() => {
      setRevealed(true);
      // Defer video background load until after main page load for Core Web Vitals
      setTimeout(() => setShowVideoBg(true), 1500); 
    }, 4000); 
    return () => clearTimeout(t);
  }, []);

  // rotating tagline
  useEffect(() => {
    const interval = setInterval(() => {
      setTagVisible(false); // fade out
      setTimeout(() => {
        setTagIndex((prev) => (prev + 1) % taglines.length);
        setTagVisible(true); // fade in
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const openShowreel = () => {
    setVideoModalOpen(true);
    if(window.trackEvent) window.trackEvent("reel_play");
  };

  return (
    <section id="home" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flexDirection: 'column',
    }}>
      {/* Background Poster (LCP focus) */}
      <img 
        src="/assets/images/hero-poster.webp" 
        alt="Rushikesh Jadhav - Cinematic Video Editor Hero Backdrop"
        loading="eager"
        fetchpriority="high"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          opacity: 0.4,
          filter: 'brightness(0.7) contrast(1.1)',
        }} 
      />
      
      {/* Deferred Background Video (Optional if needed, but per prompt only opened in modal usually, or plays silently after load) */}
      {showVideoBg && !isMobile && !isLowEnd && (
        <video 
          src="/assets/videos/showreel.mp4" 
          autoPlay loop muted playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15, zIndex: 0 }}
        />
      )}

      <AuroraBg accent="gold" />
      {/* CSS-only cinematic background for mobile */}
      {isMobile && <MobileHeroBg />}
      {(!isMobile && !isLowEnd) && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}

      {/* Light leak top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '35%', pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(200,169,110,0.04) 0%, transparent 100%)', zIndex: 1
      }} />
      {/* Light leak bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', pointerEvents: 'none',
        background: 'linear-gradient(0deg, rgba(0,201,255,0.03) 0%, transparent 100%)', zIndex: 1
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', width: '100%' }}>
        
        {/* Availability Badge & Location */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24,
          opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
          flexWrap: 'wrap'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2,
            color: 'var(--white)', textTransform: 'uppercase', opacity: 0.8
          }}>
            Pune, India 📍
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px',
            background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)',
            borderRadius: 20, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)'
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#25D366', boxShadow: '0 0 8px #25D366', animation: 'glow-pulse 2s infinite' }}></span>
            Available for Projects
          </div>
        </div>

        {/* Circular Play Button for Showreel */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          zIndex: 0, // Behind text but above background
          opacity: revealed ? 0.3 : 0, transition: 'opacity 1s ease 1s', cursor: 'pointer'
        }} onClick={openShowreel}>
          <div style={{
            width: 120, height: 120, borderRadius: '50%', border: '1px solid var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(200,169,110,0.05)', backdropFilter: 'blur(5px)',
            animation: 'glow-pulse 3s infinite'
          }}>
            <div style={{ width: 0, height: 0, borderTop: '15px solid transparent', borderBottom: '15px solid transparent', borderLeft: '24px solid var(--gold)', marginLeft: 6 }} />
          </div>
        </div>

        {/* Main name */}
        <h1 className="hero-name" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(50px, 15vw, 180px)',
          lineHeight: 0.8,
          color: 'var(--white)',
          marginBottom: 20,
          textShadow: '0 20px 80px rgba(0,0,0,0.8)'
        }}>
          RUSHIKESH<br />
          <span className="gold-text">JADHAV</span>
        </h1>
        <p style={{ display: 'none' }}>Rushikesh Jadhav — Cinematic Video Editor in Pune, India specializing in brand films and reels.</p>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 5vw, 48px)',
          color: 'var(--gold)', letterSpacing: 4, marginBottom: 16,
          textTransform: 'uppercase',
          textShadow: '0 4px 20px rgba(200,169,110,0.3)',
          opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 1.2s, transform 0.8s ease 1.2s'
        }}>
          Cinematic Video Editor
        </h2>

        {/* Tagline */}
        <div style={{
          fontFamily: 'var(--font-editorial)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(16px, 3vw, 24px)',
          color: 'rgba(242,238,232,0.8)',
          marginBottom: 60,
          letterSpacing: 1,

          opacity: tagVisible && revealed ? 1 : 0,
          transform: tagVisible && revealed ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          filter: tagVisible ? 'blur(0px)' : 'blur(4px)'
        }}>
          {taglines[tagIndex]}
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap',
          opacity: revealed ? 1 : 0, transition: 'opacity 1s ease 1.5s',
          position: 'relative', zIndex: 10
        }}>
          <button 
            onClick={() => {
              document.querySelector('#work').scrollIntoView({behavior:'smooth'});
              if (window.trackEvent) window.trackEvent("view_work_click");
            }}
            style={{
              background: 'linear-gradient(135deg, var(--gold), #E8C87A)',
              fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--white)', width: isMobile ? '100%' : 'auto', backdropFilter: 'blur(10px)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,169,110,0.1)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(12,12,22,0.8)'; e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)'; }}
          >
            [Let's Work Together]
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2,
        opacity: revealed ? 0.7 : 0, transition: 'opacity 1s ease 2s', pointerEvents: 'none'
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 4, color: 'var(--white)', textTransform: 'uppercase' }}>Scroll</div>
        <div style={{
          width: 1, height: 50,
          background: 'linear-gradient(to bottom, var(--white), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>

      {/* Video Lightbox Modal */}
      {videoModalOpen && (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 1, transition: 'opacity 0.3s ease'
        }}>
            <button 
                onClick={() => setVideoModalOpen(false)}
                aria-label="Close Showreel"
                style={{
                    position: 'absolute', top: 30, right: 30, background: 'none', border: 'none',
                    color: 'white', fontSize: 40, cursor: 'pointer', zIndex: 100000
                }}
            >×</button>
            <div style={{ width: '90%', maxWidth: 1280, aspectRatio: '16/9', background: '#000', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
                <video 
                    src="/assets/videos/showreel.mp4" 
                    controls autoPlay playsInline
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const handleLoadDone = useCallback(() => {
    setLoading(false);
    // Always scroll to top (Home) after loading screen, regardless of where page was before
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Track active section
  useEffect(() => {
    const sections = ['home', 'about', 'work', 'services', 'clients', 'contact'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [loading]);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="grain-overlay" />
      <CustomCursor />

      {loading && <LoadingScreen onDone={handleLoadDone} />}

      <div style={{
        opacity: loading ? 0 : 1,
        transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity'
      }}>
        <Navigation active={activeSection} />
        <HeroSection />
        <LazySection id="about"><Suspense fallback={null}><AboutSection /></Suspense></LazySection>
        <LazySection id="work"><Suspense fallback={null}><WorkSection /></Suspense></LazySection>
        <LazySection id="services"><Suspense fallback={null}><ServicesSection /></Suspense></LazySection>
        <LazySection id="clients"><Suspense fallback={null}><ClientsSection /></Suspense></LazySection>
        <LazySection id="visual"><Suspense fallback={null}><VisualSection /></Suspense></LazySection>
        <LazySection id="contact"><Suspense fallback={null}><ContactSection /></Suspense></LazySection>
      </div>
      <ChatWidget />
    </>
  );
}
