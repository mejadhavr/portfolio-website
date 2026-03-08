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

/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
   GLOBAL STYLES injected once
ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
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
  cursor: none;
}

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

/* ΓöÇΓöÇ GRAIN ΓöÇΓöÇ */
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

/* ΓöÇΓöÇ AURORA ΓöÇΓöÇ */
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

/* ΓöÇΓöÇ LOADING ΓöÇΓöÇ */
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

/* ΓöÇΓöÇ RESPONSIVE ΓöÇΓöÇ */

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

  /* ΓöÇΓöÇ NAV: hide laptop pill, show hamburger at top-right ΓöÇΓöÇ */
  .nav-desktop { display: none !important; }
  .nav-hamburger {
    display: flex !important;
    position: fixed;
    top: 16px;
    right: 16px;
    left: auto !important;
    transform: none !important;
  }

  /* ΓöÇΓöÇ HERO NAME: smaller so Rushikesh Jadhav stays one line ΓöÇΓöÇ */
  .hero-name { font-size: clamp(38px, 11vw, 68px) !important; }

  /* ΓöÇΓöÇ About: single column ΓöÇΓöÇ */
  .about-grid {
    grid-template-columns: 1fr !important;
    gap: 40px !important;
  }

  /* ΓöÇΓöÇ Services ΓöÇΓöÇ */
  .services-grid { grid-template-columns: 1fr !important; }

  /* ΓöÇΓöÇ Contact cards ΓöÇΓöÇ */
  .contact-grid { grid-template-columns: 1fr !important; }

  /* ΓöÇΓöÇ Tighten horizontal padding ΓöÇΓöÇ */
  #about, #work, #services, #contact {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  /* ΓöÇΓöÇ Prevent heading overflow ΓöÇΓöÇ */
  h2, h3 { word-break: break-word; }

  /* ΓöÇΓöÇ Email text ΓöÇΓöÇ */
  .email-text { font-size: 14px !important; white-space: normal !important; word-break: break-all !important; }

  /* ΓöÇΓöÇ Format ticker ΓöÇΓöÇ */
  .format-track > div { font-size: 14px !important; }

  /* ΓöÇΓöÇ Glass cards in bento: ensure enough min-width ΓöÇΓöÇ */
  .work-grid { grid-template-columns: 1fr !important; }
}

/* Small phone */
@media (max-width: 480px) {
  .about-grid { gap: 24px !important; }
  .hero-name { font-size: clamp(32px, 10vw, 52px) !important; }
  .format-track > div { font-size: 12px !important; }
}

/* ΓöÇΓöÇ PROJECT CARDS (REEL) ΓöÇΓöÇ */
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

  /* Partners heading ΓÇö fix so it stops shrinking below 40px and matches standard headings */
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
`;


/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
   CUSTOM CURSOR
ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
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

/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
   LOADING SCREEN ΓÇô film leader countdown
ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function LoadingScreen({ onDone }) {
  const [count, setCount] = useState(5);
  const [phase, setPhase] = useState('count');

  useEffect(() => {
    if (count > 0) {
      const t = setTimeout(() => setCount(c => c - 1), 420);
      return () => clearTimeout(t);
    } else {
      setPhase('reveal');
      const t = setTimeout(onDone, 800);
      return () => clearTimeout(t);
    }
  }, [count, onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99990, background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', overflow: 'hidden',
      opacity: phase === 'reveal' ? 0 : 1,
      transition: 'opacity 0.8s ease',
    }}>
      {/* Film leader frame lines */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: i % 2 === 0 ? '4%' : 'auto',
          right: i % 2 === 1 ? '4%' : 'auto',
          top: `${10 + i * 11}%`,
          width: 28, height: 20,
          border: '2px solid rgba(255,255,255,0.15)',
          borderRadius: 2,
          animation: `frameFlicker ${0.3 + i * 0.05}s ease-in-out infinite alternate`,
        }} />
      ))}
      {/* Scanline */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        background: 'rgba(255,255,255,0.04)',
        animation: 'scanline 2s linear infinite',
      }} />
      {/* SMTPE color bars tiny */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, display: 'flex',
      }}>
        {['#C0C0C0', '#C0C000', '#00C0C0', '#00C000', '#C000C0', '#C00000', '#0000C0'].map((c, i) => (
          <div key={i} style={{ flex: 1, background: c, opacity: 0.4 }} />
        ))}
      </div>

      {phase === 'count' && (
        <>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 6,
            color: 'rgba(255,255,255,0.3)', marginBottom: 60,
            textTransform: 'uppercase',
          }}>
            MEJADHAVR ┬╖ {new Date().getFullYear()} ┬╖ PRODUCTION
          </div>
          <div key={count} style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(120px,25vw,220px)',
            color: '#fff', lineHeight: 1,
            animation: 'countDown 0.42s ease forwards',
            textShadow: '0 0 60px rgba(255,255,255,0.3)',
          }}>
            {count}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 4,
            color: 'rgba(255,255,255,0.25)', marginTop: 40,
          }}>
            LOADING EXPERIENCE
          </div>
        </>
      )}
    </div>
  );
}



/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
   NAVIGATION
ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
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
      {/* Desktop Nav Pill ΓÇö centered, no transform issues */}
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
          <img src="/images/logo.png" alt="Mejadhavr Logo" width="80" height="28" loading="lazy" style={{ height: 28, width: 'auto', marginRight: 12 }} />
          {navItems.map((item) => (
            <button key={item} onClick={() => scrollTo(item)} style={{
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

      {/* Mobile Hamburger ΓÇö sibling to nav, NOT inside it, so fixed positioning works */}
      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(o => !o)}
        style={{
          display: 'none', // shown via CSS @media
          position: 'fixed', top: 16, right: 16,
          alignItems: 'center', justifyContent: 'center',
          width: 44, height: 44, borderRadius: 12,
          background: menuOpen ? 'rgba(200,169,110,0.15)' : 'rgba(6,6,12,0.85)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${menuOpen ? 'rgba(200,169,110,0.5)' : 'rgba(200,169,110,0.25)'}`,
          cursor: 'pointer', flexDirection: 'column', gap: 5,
          zIndex: 9002, transition: 'background 0.3s, border-color 0.3s',
          opacity: visible ? 1 : 0,
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

      {/* Mobile Bottom-Sheet ΓÇö sibling to nav, truly fixed */}
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
                  <span style={{ fontSize: 14, color: isActive ? 'var(--gold)' : 'rgba(242,238,232,0.2)' }}>ΓåÆ</span>
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
              }}>Hire Me ΓåÆ</a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
   HERO SECTION
ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function HeroSection() {

  const [tagVisible, setTagVisible] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [tagIndex, setTagIndex] = useState(0);
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

  // reveal animation
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 2700);
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

  return (
    <section id="home" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flexDirection: 'column',
    }}>
      <AuroraBg accent="gold" />
      {(!isMobile && !isLowEnd) && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}

      {/* Light leak top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '35%', pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(200,169,110,0.04) 0%, transparent 100%)',
      }} />
      {/* Light leak bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', pointerEvents: 'none',
        background: 'linear-gradient(0deg, rgba(0,201,255,0.03) 0%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}>
        {/* Pre-title */}
        <div className="hero-label" style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 6,
          color: 'var(--gold)', marginBottom: 32, textTransform: 'uppercase',
          opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
        }}>
          Γùê Professional Video Editor ┬╖ 7+ Years Γùê
        </div>

        {/* Main name */}
        <h1 className="hero-name" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(72px, 16vw, 200px)',
          lineHeight: 0.88, letterSpacing: -1,
          color: 'var(--white)',
          marginBottom: 8,
          whiteSpace: 'nowrap',
        }}>
          {name.split('').map((char, i) => (
            <span key={i} style={{
              display: 'inline-block',
              marginRight: char === ' ' ? '0.4em' : '0',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'none' : 'translateY(30px)',
              transition: `opacity 0.6s ease ${0.4 + i * 0.06}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.06}s`
            }}>
              {char}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <div style={{
          fontFamily: 'var(--font-editorial)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(16px, 3vw, 28px)',
          color: 'rgba(242,238,232,0.7)',
          marginBottom: 60,
          letterSpacing: 2,

          opacity: tagVisible ? 1 : 0,
          transform: tagVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          filter: tagVisible ? 'blur(0px)' : 'blur(4px)'
        }}>
          {taglines[tagIndex]}
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap',
          opacity: revealed ? 1 : 0, transition: 'opacity 1s ease 1.5s',
        }}>
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '16px 44px',
              background: 'linear-gradient(135deg, var(--gold), #E8C87A)',
              border: 'none', borderRadius: 8, cursor: 'none',
              fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
              color: '#0A0810', fontWeight: 700,
              boxShadow: '0 0 40px rgba(200,169,110,0.35)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 60px rgba(200,169,110,0.6)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(200,169,110,0.35)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            View Work
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '16px 44px',
              background: 'transparent',
              border: '1px solid rgba(200,169,110,0.4)', borderRadius: 8, cursor: 'none',
              fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
              color: 'var(--gold)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,169,110,0.08)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(200,169,110,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Contact
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2,
        opacity: revealed ? 0.7 : 0, transition: 'opacity 1s ease 2s',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 4, color: 'var(--gold)', textTransform: 'uppercase' }}>Scroll</div>
        <div style={{
          width: 1, height: 50,
          background: 'linear-gradient(to bottom, var(--gold), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>

      {/* Film frame decorators */}
      {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h], i) => (
        <div key={i} style={{
          position: 'absolute', [v]: 32, [h]: 32,
          width: 40, height: 40, zIndex: 2,
          borderTop: v === 'top' ? '1px solid rgba(200,169,110,0.3)' : 'none',
          borderBottom: v === 'bottom' ? '1px solid rgba(200,169,110,0.3)' : 'none',
          borderLeft: h === 'left' ? '1px solid rgba(200,169,110,0.3)' : 'none',
          borderRight: h === 'right' ? '1px solid rgba(200,169,110,0.3)' : 'none',
        }} />
      ))}
    </section>
  );
}

/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
   MAIN APP
ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
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
        transition: 'opacity 0.6s ease',
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
