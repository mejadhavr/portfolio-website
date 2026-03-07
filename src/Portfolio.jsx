import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import * as THREE from "three";
import ChatWidget from "./ChatWidget";

/* ─────────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');

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
            MEJADHAVR · {new Date().getFullYear()} · PRODUCTION
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

/* ─────────────────────────────────────────────
   THREE.JS HERO CANVAS – aperture + particles
───────────────────────────────────────────── */
function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const w = el.clientWidth, h = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 5;

    // Aperture ring outer
    const ringGeo = new THREE.TorusGeometry(1.8, 0.025, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xC8A96E, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    // Aperture ring inner
    const ring2Geo = new THREE.TorusGeometry(1.4, 0.015, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x00C9FF, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    scene.add(ring2);

    // Aperture blades
    const bladeGroup = new THREE.Group();
    scene.add(bladeGroup);
    const bladeCount = 9;
    for (let i = 0; i < bladeCount; i++) {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.quadraticCurveTo(0.15, 0.7, 0, 1.35);
      shape.quadraticCurveTo(-0.15, 0.7, 0, 0);
      const geo = new THREE.ShapeGeometry(shape);
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xC8A96E : 0x00C9FF,
        transparent: true, opacity: 0.12, side: THREE.DoubleSide,
      });
      const blade = new THREE.Mesh(geo, mat);
      blade.rotation.z = (i / bladeCount) * Math.PI * 2;
      blade.position.set(0, 0, 0);
      bladeGroup.add(blade);
    }

    // Particle dust
    const partCount = 200;
    const positions = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0xC8A96E, size: 0.02, transparent: true, opacity: 0.4,
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // Cross-hair lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0xC8A96E, transparent: true, opacity: 0.15 });
    const hGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.5, 0, 0), new THREE.Vector3(2.5, 0, 0)]);
    const vGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -2.5, 0), new THREE.Vector3(0, 2.5, 0)]);
    scene.add(new THREE.Line(hGeo, lineMat));
    scene.add(new THREE.Line(vGeo, lineMat));

    // Corner brackets
    const bMat = new THREE.LineBasicMaterial({ color: 0x00C9FF, transparent: true, opacity: 0.3 });
    const brackets = [
      [[-2.2, 2.2], [-1.9, 2.2], [-2.2, 2.2], [-2.2, 1.9]],
      [[2.2, 2.2], [1.9, 2.2], [2.2, 2.2], [2.2, 1.9]],
      [[-2.2, -2.2], [-1.9, -2.2], [-2.2, -2.2], [-2.2, -1.9]],
      [[2.2, -2.2], [1.9, -2.2], [2.2, -2.2], [2.2, -1.9]],
    ];
    brackets.forEach(pts => {
      const bGeo = new THREE.BufferGeometry().setFromPoints(
        pts.map(p => new THREE.Vector3(p[0], p[1], 0))
      );
      scene.add(new THREE.Line(bGeo, bMat));
    });

    let mouseX = 0, mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    let isVisible = true;
    const observer = new IntersectionObserver(([e]) => {
      isVisible = e.isIntersecting;
    }, { threshold: 0 });
    observer.observe(el);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!isVisible) return; // Pause GPU rendering completely when scrolled past
      
      const t = Date.now() * 0.001;
      bladeGroup.rotation.z = t * 0.12;
      ring.rotation.z = t * 0.08;
      ring2.rotation.z = -t * 0.06;
      particles.rotation.y = t * 0.02;
      particles.rotation.x = t * 0.01;
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = el.clientWidth, nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />;
}

/* ─────────────────────────────────────────────
   THREE.JS FILM SCENE – visual experience
───────────────────────────────────────────── */
function FilmScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const w = el.clientWidth, h = el.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0, 0);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 6;

    // Film strip segments
    const strips = [];
    for (let j = 0; j < 4; j++) {
      const group = new THREE.Group();
      const stripGeo = new THREE.PlaneGeometry(0.6, 3.2);
      const stripMat = new THREE.MeshBasicMaterial({ color: 0x1A1A2E, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
      group.add(new THREE.Mesh(stripGeo, stripMat));
      const edgeMat = new THREE.LineBasicMaterial({ color: 0xC8A96E, transparent: true, opacity: 0.5 });
      const edgeGeo = new THREE.EdgesGeometry(stripGeo);
      group.add(new THREE.LineSegments(edgeGeo, edgeMat));
      // Sprocket holes
      for (let i = 0; i < 5; i++) {
        const hGeo = new THREE.PlaneGeometry(0.08, 0.12);
        const hMat = new THREE.MeshBasicMaterial({ color: 0x06060C });
        const lh = new THREE.Mesh(hGeo, hMat);
        lh.position.set(-0.23, -1.3 + i * 0.58, 0.01);
        group.add(lh);
        const rh = lh.clone();
        rh.position.set(0.23, -1.3 + i * 0.58, 0.01);
        group.add(rh);
      }
      group.position.set(-3.5 + j * 2.2, (Math.random() - 0.5) * 2, -j * 0.5);
      group.rotation.z = (Math.random() - 0.5) * 0.4;
      group.userData = { vy: 0.003 + Math.random() * 0.004, vr: (Math.random() - 0.5) * 0.003 };
      scene.add(group);
      strips.push(group);
    }

    // Light beams
    for (let i = 0; i < 3; i++) {
      const beamGeo = new THREE.CylinderGeometry(0.01, 0.4, 5, 8, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({ color: i === 1 ? 0x00C9FF : 0xC8A96E, transparent: true, opacity: 0.04, side: THREE.DoubleSide });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(-2 + i * 2, 2, 0);
      beam.rotation.z = (Math.random() - 0.5) * 0.3;
      scene.add(beam);
    }

    // Floating circles/aperture accent
    const circGeo = new THREE.TorusGeometry(0.8, 0.01, 8, 64);
    const circMat = new THREE.MeshBasicMaterial({ color: 0x00C9FF, transparent: true, opacity: 0.25 });
    const circ = new THREE.Mesh(circGeo, circMat);
    circ.position.set(2.5, 0.5, 0);
    scene.add(circ);

    let frame;
    let scrollY = 0;
    
    // Use passive listener to prevent scroll jank
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    let isVisible = false;
    const observer = new IntersectionObserver(([e]) => {
      isVisible = e.isIntersecting;
    }, { threshold: 0 });
    observer.observe(el);

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!isVisible) return; // Pause GPU rendering completely when scrolled past
      
      const t = Date.now() * 0.001;
      strips.forEach((s, i) => {
        s.position.y += s.userData.vy;
        s.rotation.z += s.userData.vr;
        if (s.position.y > 4) s.position.y = -4;
      });
      circ.rotation.z = t * 0.2;
      camera.position.y = scrollY * 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = el.clientWidth, nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />;
}

/* ─────────────────────────────────────────────
   AURORA BACKGROUND
───────────────────────────────────────────── */
function AuroraBg({ accent = 'gold' }) {
  const c1 = accent === 'cyan' ? 'rgba(0,201,255,0.12)' : 'rgba(200,169,110,0.1)';
  const c2 = accent === 'cyan' ? 'rgba(0,245,255,0.08)' : 'rgba(240,213,160,0.07)';
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', width: '80%', height: '80%', top: '-20%', left: '-10%',
        background: `radial-gradient(ellipse at center, ${c1}, transparent 70%)`,
        filter: 'blur(60px)', animation: 'aurora1 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: '60%', height: '70%', top: '20%', right: '-15%',
        background: `radial-gradient(ellipse at center, ${c2}, transparent 70%)`,
        filter: 'blur(80px)', animation: 'aurora2 22s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: '50%', height: '50%', bottom: '-10%', left: '30%',
        background: `radial-gradient(ellipse at center, rgba(138,43,226,0.06), transparent 70%)`,
        filter: 'blur(70px)', animation: 'aurora3 15s ease-in-out infinite',
      }} />
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
          <img src="/images/logo.png" alt="Mejadhavr Logo" style={{ height: 28, width: 'auto', marginRight: 12 }} />
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

      {/* Mobile Hamburger — sibling to nav, NOT inside it, so fixed positioning works */}
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
   HERO SECTION
───────────────────────────────────────────── */
function HeroSection() {

  const [tagVisible, setTagVisible] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [tagIndex, setTagIndex] = useState(0);

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
      <HeroCanvas />

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
          ◈ Professional Video Editor · 7+ Years ◈
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

/* ─────────────────────────────────────────────
   CINEMATIC VIDEO COMPONENT
───────────────────────────────────────────── */
function CinematicVideo() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }}>

      <video
        ref={videoRef}
        src="/videos/showreel.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* REC indicator */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: 12,
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: 2,
        color: '#ff4d4d'
      }}>
        ● REC
      </div>

      {/* MUTE BUTTON */}
      <button
        onClick={toggleMute}
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          fontSize: 14,
          color: '#fff',
          cursor: 'none',
          fontFamily: 'var(--font-mono)',
          letterSpacing: 2,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          zIndex: 2,
        }}
      >
        {muted ? "🔇" : "🔊"}
        <span style={{ fontSize: 10 }}>{muted ? "Unmute" : "Mute"}</span>
      </button>

      {/* Timecode */}
      <div style={{
        position: 'absolute',
        bottom: 12,
        right: 12,
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'rgba(255,255,255,0.6)'
      }}>
        01:24:45:12
      </div>

      {/* cinematic scanlines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `
      radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.55)),
      linear-gradient(to top, rgba(0,0,0,0.45), transparent 40%),
      linear-gradient(to bottom, rgba(0,0,0,0.45), transparent 40%)
    `
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────────── */
const aboutStats = [
  { n: '7+', label: 'Years Experience' },
  { n: '3500+', label: 'Projects Completed' },
  { n: '150+', label: 'Happy Clients' },
  { n: '25M+', label: 'Views Generated' },
];

function AboutSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={{
      position: 'relative', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px)',
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
      overflow: 'hidden',
    }}>
      <AuroraBg accent="cyan" />
      <div className="about-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }}>

        {/* Left */}
        <div className={`reveal-left ${vis ? 'visible' : ''}`}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 20, textTransform: 'uppercase' }}>
            ◈ About
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,7vw,88px)', lineHeight: 0.9, marginBottom: 28, color: 'var(--white)' }}>
            THE<br />
            <span className="gold-text">STORY</span><br />
            BEHIND<br />THE CUTS
          </h2>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: 18, lineHeight: 1.9, color: 'rgba(242,238,232,0.65)', marginBottom: 24 }}>
            I'm <strong style={{ color: 'var(--white)' }}>Rushikesh Jadhav</strong> — a Pune-based cinematic video editor with over 7 years
            of crafting narratives that move audiences. Every cut tells a story. Every frame breathes life.
          </p>
          <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 17, lineHeight: 1.8, color: 'rgba(242,238,232,0.45)', marginBottom: 40 }}>
            "Editing is not just assembling footage — it's sculpting time, shaping emotion, and manufacturing truth from raw reality."
          </p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {aboutStats.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: '20px 24px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, lineHeight: 1 }} className="gold-text">{s.n}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--muted)', marginTop: 4, textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – video */}
        <div className={`reveal-right ${vis ? 'visible' : ''}`} style={{ position: 'relative' }}>

          {/* Glow behind video */}
          <div style={{
            position: 'absolute',
            inset: -20,
            background: 'radial-gradient(ellipse, rgba(200,169,110,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
            borderRadius: 24
          }} />

          <div className="glass-card glow-border" style={{ padding: 12, borderRadius: 20, position: 'relative' }}>

            {/* Film strip header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 8,
              padding: '4px 8px'
            }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: 3,
                color: 'var(--muted)'
              }}>
                MEJADHAVR · HLO · 2026
              </div>
            </div>


            {/* VIDEO CONTAINER */}
            <div
              style={{
                background: '#000',
                borderRadius: 12,
                overflow: 'hidden',
                aspectRatio: '1/1',
                position: 'relative'
              }}
            >

              {/* Cinematic Video Player */}
              <CinematicVideo />

              {/*
      OLD YOUTUBE EMBED (DISABLED)

      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0&modestbranding=1"
        style={{
          width:'100%',
          height:'100%',
          border:'none'
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Mejadhavr Portfolio Reel"
      />
      */}

            </div>


            {/* Bottom meta bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 4px 4px'
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: 'var(--gold)',
                letterSpacing: 2
              }}>
                ▶ Let's Create
              </div>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: 'var(--muted)',
                letterSpacing: 2
              }}>
                2024
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Horizontal rule */}
      <div
        style={{
          maxWidth: 1200,
          margin: '80px auto 0',
          height: 1,
          background: 'linear-gradient(to right, transparent, var(--gold), transparent)',
          opacity: 0.2
        }}
      />
    </section>
  );
}

/* ─────────────────────────────────────────────
   PORTFOLIO / WORK SECTION
───────────────────────────────────────────── */
const workProjects = [
  {
    title: 'Brand Manifesto',
    client: 'Astik Dyestuff P LTD, Mumbai',
    tags: ['Corporate And Brand Film'],
    span: 'col-span-2',
    aspect: '56.25%',
    desc: 'A cinematic brand story told through contrast and light',
    accent: '#C8A96E',
    gradient: 'linear-gradient(135deg,#1a0e00,#3d2600)',
    url: 'https://youtu.be/B5h9Djj6BXE',
    videoUrl: 'astik',
    caseStudy: (
      <>
        Client: Astik Dyestuff Pvt. Ltd., Mumbai<br/><br/>
        Produced by: Unplug Infinity Media Pvt. Ltd.<br/>
        Creative Director: Alim Pathan<br/>
        Video Editor: Rushikesh Jadhav<br/><br/>
        <span style={{ fontSize: '0.85em', opacity: 0.7 }}>(Project executed as part of the Unplug Infinity Media team)</span>
      </>
    )
  },
  {
    title: 'Testimonial Film',
    client: 'Prasun Spaces',
    tags: ['Testimonial Film'],
    span: 'col-span-1',
    aspect: '110%',
    desc: 'Authentic voices and experiences captured',
    accent: '#00C9FF',
    gradient: 'linear-gradient(135deg,#001a1f,#00354a)',
    url: 'https://youtu.be/QziZuMJMAPA',
    videoUrl: 'showreel',
    caseStudy: (
      <>
        Client: Prasun Spaces<br/><br/>
        Project: Prasun Adara<br/>
        Produced by: Greyscale Films<br/>
        Creative Director: Amarreddy Lingam<br/>
        Video Editor: Rushikesh Jadhav<br/><br/>
        <span style={{ fontSize: '0.85em', opacity: 0.7 }}>(Project executed as part of the Greyscale Films team)</span>
      </>
    )
  },
  {
    title: 'Product Launch Video',
    client: 'Phillips Machine Tools',
    tags: ['Product Launch Video'],
    span: 'col-span-1',
    aspect: '110%',
    desc: 'Impactful product reveal and showcase',
    accent: '#C8A96E',
    gradient: 'linear-gradient(135deg,#0f0f0f,#1a1a2e)',
    url: 'https://youtu.be/GkAIIonllbo',
    videoUrl: 'showreel',
    caseStudy: (
      <>
        Client: Phillips Machine Tools India Pvt. Ltd.<br/><br/>
        Produced by: Unplug Infinity Media Pvt. Ltd.<br/>
        Creative Director: Alim Pathan<br/>
        Video Editor: Rushikesh Jadhav<br/><br/>
        <span style={{ fontSize: '0.85em', opacity: 0.7 }}>(Project executed as part of the Unplug Infinity Media team)</span>
      </>
    )
  },
  {
    title: '7 Plumeria Drive',
    client: 'BU Bhandari',
    tags: ['Model Walkthrough Film'],
    span: 'col-span-1',
    aspect: '56.25%',
    desc: 'A cinematic walkthrough experiencing the vision',
    accent: '#00C9FF',
    gradient: 'linear-gradient(135deg,#0a001a,#1a0030)',
    url: 'https://youtu.be/9nf70fQ8mdo',
    videoUrl: '7pd',
    caseStudy: (
      <>
        Client: BU Bhandari<br/><br/>
        Project: 7 Plumeria Drive<br/>
        Produced by: Greyscale Films<br/>
        Creative Director: Amarreddy Lingam<br/>
        Video Editor: Rushikesh Jadhav<br/><br/>
        <span style={{ fontSize: '0.85em', opacity: 0.7 }}>(Project executed as part of the production team)</span>
      </>
    )
  },
  {
    title: 'Idex India',
    client: 'Idex India',
    tags: ['3D Product Film'],
    span: 'col-span-1',
    aspect: '56.25%',
    desc: 'Showcasing engineering through 3D visualization',
    accent: '#C8A96E',
    gradient: 'linear-gradient(135deg,#0a0a0a,#1a1a1a)',
    url: 'https://youtu.be/mcc0GLpVFhY',
    videoUrl: 'showreel',
    caseStudy: (
      <>
        Client: Idex India, Mumbai<br/><br/>
        Produced by: Unplug Infinity Media Pvt. Ltd.<br/>
        Project Manager: Ravindra Kamtam<br/>
        Video Editor: Rushikesh Jadhav<br/><br/>
        <span style={{ fontSize: '0.85em', opacity: 0.7 }}>(Project executed as part of the Unplug Infinity Media team)</span>
      </>
    )
  },
  {
    title: 'Event Highlight Film',
    client: 'Westbridge capital & WACA Chess',
    tags: ['Event Highlight Film'],
    span: 'col-span-2',
    aspect: '40%',
    desc: 'Capturing the atmosphere and key moments of the tournament',
    accent: '#00C9FF',
    gradient: 'linear-gradient(135deg,#001a10,#00301c)',
    url: 'https://youtu.be/n6zK1hHCv98',
    videoUrl: 'waca',
    caseStudy: (
      <>
        Client: WestBridge Capital<br/><br/>
        Produced by: Prismscale Pvt. Ltd.<br/>
        Creative Director: Dharam Vir Singh<br/>
        Video Editor: Rushikesh Jadhav<br/><br/>
        <span style={{ fontSize: '0.85em', opacity: 0.7 }}>(Project executed as part of the Prismscale team)</span>
      </>
    )
  },
];

function WorkSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" ref={ref} style={{
      position: 'relative', 
      padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px)',
      background: ' var(--bg2)',
      overflow: 'hidden',
      minHeight: '100vh',
    }}>
      <AuroraBg accent="gold" />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className={`work-section-heading reveal-section ${vis ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 70 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>◈ Selected Work</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,9vw,108px)', lineHeight: 0.88, color: 'var(--white)' }}>
            THE<br />
            <span className="gold-text">REEL</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="work-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16,
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(40px)',
          transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
        }}>
          {workProjects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index: i }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    // Disable tilt if it's a flip card to prevent transform conflicts
    if (p.caseStudy) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const colSpan = p.span === 'col-span-2' ? 'span 2' : 'span 1';

  const CardWrapper = p.url ? 'a' : 'div';
  const wrapperProps = p.url ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' } : {};

  const isFlipCard = !!p.caseStudy;

  return (
    <div
      className={isFlipCard ? "project-card-aspect" : ""}
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
      style={{
        gridColumn: colSpan,
        perspective: isFlipCard ? '1200px' : '800px',
        position: 'relative',
        paddingBottom: isFlipCard ? p.aspect : 0,
      }}
    >
      <CardWrapper
        {...wrapperProps}
        style={{
          display: 'block', textDecoration: 'none',
          position: isFlipCard ? 'absolute' : 'relative',
          inset: isFlipCard ? 0 : 'auto',
          width: '100%', height: '100%',
          borderRadius: 16, cursor: 'none',
          transformStyle: 'preserve-3d',
          transform: isFlipCard
            ? (hovered ? 'rotateY(180deg)' : 'rotateY(0)')
            : (hovered ? `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.025)` : 'rotateX(0) rotateY(0) scale(1)'),
          transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: hovered && !isFlipCard ? `0 30px 80px rgba(0,0,0,0.7), 0 0 40px ${p.accent}22` : '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {/* ================= FRONT FACE ================= */}
        <div className={!isFlipCard ? "project-card-aspect" : ""} style={{
          position: isFlipCard ? 'absolute' : 'relative',
          inset: 0,
          paddingBottom: isFlipCard ? 0 : p.aspect,
          background: p.gradient,
          border: `1px solid ${hovered ? p.accent + '44' : 'rgba(255,255,255,0.05)'}`,
          borderRadius: 16,
          overflow: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          // Ensure front face is above in 3D space so it shows first
          transform: 'rotateY(0deg)',
          zIndex: 2,
        }}>

          {/* Optional Video Background */}
          {p.videoUrl && (
            <div className="card-video-bg" style={{
              position: 'absolute',
              inset: 40,
              borderRadius: 8,
              overflow: 'hidden',
              zIndex: 0
            }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.6
                }}
              >
                <source src={`/videos/${p.videoUrl}.webm`} type="video/webm" />
                <source src={`/videos/${p.videoUrl}.mp4`} type="video/mp4" />
              </video>
            </div>
          )}

          {/* Decorative inner elements */}
          {!p.videoUrl && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: 60, height: 60, borderRadius: '50%',
                border: `1px solid ${p.accent}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: hovered ? 0 : 0.5, transition: 'opacity 0.3s',
              }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${p.accent}55` }} />
              </div>
            </div>
          )}

          {/* Film strip sprocket holes decoration */}
          {!p.videoUrl && (
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 20, display: 'flex', flexDirection: 'column', gap: 8, padding: '8px 5px', opacity: 0.3 }}>
              {[...Array(6)].map((_, k) => (
                <div key={k} style={{ width: 10, height: 8, borderRadius: 2, border: `1px solid ${p.accent}` }} />
              ))}
            </div>
          )}

          {/* Front Overlay */}
          <div className="card-front-overlay" style={{
            position: 'absolute', inset: 0, padding: 20,
            background: p.videoUrl ? 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 45%, transparent 100%)' : 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 80%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            zIndex: 1
          }}>
            {/* Note: In standard cards, the overlay details appear ONLY on hover. 
                 But for flip cards, hover flips it. So for flip cards, we always show details on front, or just the title. */}

            <div style={{
              opacity: (hovered && !isFlipCard) || isFlipCard ? 1 : 0,
              transition: 'opacity 0.4s',
              display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end'
            }}>
              <div className="card-front-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 24px)', color: 'var(--white)', lineHeight: 1.05, marginBottom: 8, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{p.title}</div>
              <div className="card-front-desc" style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 13, color: 'rgba(242,238,232,0.9)', marginBottom: 12, lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{p.desc}</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--muted)' }}>{p.client}</div>

                {/* Know More Arrow (Flips card if case study, or links out) */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: p.accent,
                  textTransform: 'uppercase',
                  transform: isFlipCard || hovered ? 'translateX(0)' : 'translateX(-10px)',
                  opacity: isFlipCard || hovered ? 1 : 0,
                  transition: 'transform 0.4s ease 0.1s, opacity 0.4s ease 0.1s',
                }}>
                  {isFlipCard ? 'Case Study' : 'Know More'} <span style={{ fontSize: 14 }}>→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tag label */}
          <div className="card-tag" style={{
            position: 'absolute', top: 16, right: 16,
            padding: '5px 12px', borderRadius: 20,
            background: `${p.accent}18`, border: `1px solid ${p.accent}33`,
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2,
            color: p.accent, textTransform: 'uppercase',
            zIndex: 2
          }}>
            {p.tags[0]}
          </div>

          {/* Bottom title (default state when not hovered and not a flip card) */}
          {!isFlipCard && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px',
              background: 'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)',
              opacity: hovered ? 0 : 1, transition: 'opacity 0.3s',
            }}>
              <div className="card-bottom-title" style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--white)' }}>{p.title}</div>
            </div>
          )}
        </div>

        {/* ================= BACK FACE (CASE STUDY) ================= */}
        {isFlipCard && (
          <div className="card-back" style={{
            position: 'absolute', inset: 0, padding: 32,
            background: 'var(--bg2)',
            border: `1px solid ${p.accent}55`,
            borderRadius: 16, overflow: 'hidden',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex', flexDirection: 'column',
            zIndex: 1,
          }}>
            <div className="card-back-label" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 4, color: p.accent, marginBottom: 16, textTransform: 'uppercase' }}>
              ◈ Case Study
            </div>
            <h3 className="card-back-title" style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--white)', marginBottom: 20, lineHeight: 1 }}>
              {p.title}
            </h3>

            <div className="card-back-body" style={{
              fontFamily: 'var(--font-editorial)', fontSize: 16, color: 'rgba(242,238,232,0.7)',
              lineHeight: 1.6, overflowY: 'auto', flex: 1, paddingRight: 8
            }}>
              {p.caseStudy}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: p.accent,
                textTransform: 'uppercase',
              }}>
                Watch Full Film <span style={{ fontSize: 14 }}>↗</span>
              </div>
            </div>
          </div>
        )}

      </CardWrapper>
    </div>
  );
}

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

function ServicesSection() {
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

/* ─────────────────────────────────────────────
   VISUAL EXPERIENCE SECTION
───────────────────────────────────────────── */
function VisualSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

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
      <FilmScene />
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

function ClientsSection() {
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

/* ─────────────────────────────────────────────
   CONTACT SECTION
───────────────────────────────────────────── */
const contactSocials = [
  {
    label: 'YouTube', url: 'https://www.youtube.com/@editsbymejadhavr/playlists', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M21.5 7.3a2.7 2.7 0 00-1.9-1.9C18 5 12 5 12 5s-6 0-7.6.4a2.7 2.7 0 00-1.9 1.9C2 8.9 2 12 2 12s0 3.1.5 4.7a2.7 2.7 0 001.9 1.9C6 19 12 19 12 19s6 0 7.6-.4a2.7 2.7 0 001.9-1.9c.5-1.6.5-4.7.5-4.7s0-3.1-.5-4.7zm-11.5 7.7V9l5 3-5 3z" /></svg>
    )
  },
  {
    label: 'Instagram', url: 'https://www.instagram.com/editsby_mejadhavr/', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.2-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.3 2.2 12s0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.2c1.3-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4A6.2 6.2 0 0012 5.8zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z" /></svg>
    )
  },
  {
    label: 'LinkedIn', url: 'https://www.linkedin.com/in/mejadhavr/', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M20.4 2H3.6A1.6 1.6 0 002 3.6v16.8A1.6 1.6 0 003.6 22h16.8a1.6 1.6 0 001.6-1.6V3.6A1.6 1.6 0 0020.4 2zM8 19H5V9h3v10zm-1.5-11.3a1.7 1.7 0 110-3.4 1.7 1.7 0 010 3.4zM19 19h-3v-5.5c0-1.1 0-2.6-1.6-2.6S12.8 12.4 12.8 13.4V19H10V9h2.9v1.4c.4-.8 1.5-1.6 3-1.6 3.3 0 3.9 2.1 3.9 4.9V19z" /></svg>
    )
  },
  {
    label: 'Vimeo', url: 'https://vimeo.com/mejadhavr', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M22.4 7.2c-.1 2.2-1.6 5.3-4.6 9.1C14.7 20.3 12 22 9.8 22c-1.4 0-2.5-1.3-3.5-3.8L4.6 13c-.7-2.5-1.4-3.8-2.2-3.8-.2 0-.7.3-1.7.9L0 9c1.1-1 2.1-1.9 3.2-2.9 1.4-1.2 2.5-1.9 3.2-1.9 1.7-.2 2.7 1 3.1 3.5l1.4 8.7c.4 2.5 1 3.8 1.6 3.8.4 0 1.1-.7 2-2 .9-1.4 1.4-2.4 1.5-3.1.1-1.2-.3-1.7-1.5-1.7-.5 0-1.1.1-1.7.4 1.1-3.7 3.3-5.5 6.5-5.3 2.4.2 3.6 1.6 3.6 4.7l-.5.8z" /></svg>
    )
  },
  {
    label: 'Behance', url: 'https://www.behance.net/mejadhavr', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M6.9 13.1c.6 0 1.1-.2 1.4-.5.3-.3.5-.8.5-1.4s-.2-1-.5-1.3C8 9.6 7.5 9.4 6.9 9.4H4v3.7h2.9zm.4 4.8c.7 0 1.2-.2 1.6-.5.4-.4.5-.9.5-1.5s-.2-1.1-.5-1.4c-.4-.4-.9-.5-1.6-.5H4v4h3.3zM15.9 10c-.5 0-.9.1-1.3.4-.3.3-.5.7-.6 1.2h3.9c0-.5-.2-.9-.5-1.2-.4-.3-.9-.4-1.5-.4zm3.6 3.1h-5.5c0 .7.3 1.2.7 1.5.4.3.9.5 1.5.5.5 0 .9-.1 1.2-.3.3-.2.6-.5.7-.9h2.3c-.3 1-.8 1.7-1.6 2.2-.8.5-1.7.7-2.7.7-1.2 0-2.2-.4-3-1.1-.8-.7-1.1-1.7-1.1-3s.4-2.3 1.1-3c.8-.7 1.8-1.1 3-1.1s2.2.4 2.9 1.1c.7.7 1.1 1.8 1.1 3 .1.1.1.3 0 .4zM14.5 7H17v1.4h-2.5V7zM2 7h5.6c1.2 0 2.1.3 2.8.9.6.6 1 1.3 1 2.2 0 .9-.3 1.6-1 2.1.9.4 1.4 1.1 1.4 2.2 0 1-.4 1.8-1.1 2.4-.7.6-1.7.9-2.9.9H2V7z" /></svg>
    )
  },
];

function ContactSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} style={{
      position: 'relative', padding: '120px 40px 80px',
      background: 'linear-gradient(180deg, var(--bg2), #030306)',
      overflow: 'hidden',
    }}>
      <AuroraBg accent="gold" />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className={`reveal-section ${vis ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 70 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>◈ Contact</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,10vw,120px)', lineHeight: 0.88, color: 'var(--white)', marginBottom: 28 }}>
            LET'S<br />
            <span className="gold-text">MAKE</span><br />
            SOMETHING
          </h2>
          <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 22, color: 'rgba(242,238,232,0.45)', maxWidth: 500, margin: '0 auto' }}>
            Have a project in mind? Let's create something that moves people.
          </p>
        </div>

        {/* Contact cards */}
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            marginBottom: 50,
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(30px)',
            transition: 'opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s',
          }}
        >

          {/* EMAIL CARD */}
          <a
            href="mailto:rushikesh@mejadhavr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            style={{
              padding: '36px',
              textDecoration: 'none',
              display: 'block',
              cursor: 'none',
              transition: 'all 0.3s'
            }}
          >

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: 4,
              color: 'var(--gold)',
              marginBottom: 12
            }}>
              EMAIL
            </div>

            <div className="email-text" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 20,
              color: 'var(--white)',
              marginBottom: 10,
              letterSpacing: 0.3,
              textTransform: 'none',
              wordBreak: 'normal',
              whiteSpace: 'nowrap'
            }}>
              rushikesh<span style={{ opacity: 0.6 }}>@mejadhavr.com</span>
            </div>

            <div style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 18,
              letterSpacing: 0.3,
              color: 'var(--gold)',
              fontStyle: 'italic'
            }}>
              Send a project inquiry →
            </div>

          </a>


          {/* WHATSAPP CARD */}
          <a
            href="https://wa.me/919309964035"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            style={{
              padding: '36px',
              textDecoration: 'none',
              display: 'block',
              cursor: 'none',
              transition: 'all 0.3s'
            }}
          >

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: 4,
              color: 'var(--cyan)',
              marginBottom: 12
            }}>
              WHATSAPP
            </div>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 20,
              color: 'var(--white)',
              marginBottom: 10
            }}>
              +91 93099 64035
            </div>

            <div style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 18,
              letterSpacing: 0.3,
              color: 'var(--cyan)',
              fontStyle: 'italic'
            }}>
              Chat instantly about your project →
            </div>

            <div style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 14,
              color: 'rgba(242,238,232,0.4)',
              marginTop: 6
            }}>
              Typically replies within 1 hour
            </div>

          </a>

        </div>

        {/* Social icons */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap',
          opacity: vis ? 1 : 0, transition: 'opacity 1s ease 0.7s',
        }}>
          {contactSocials.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(242,238,232,0.5)', textDecoration: 'none', cursor: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,169,110,0.1)'; e.currentTarget.style.borderColor = 'rgba(200,169,110,0.3)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(200,169,110,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(242,238,232,0.5)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 80, textAlign: 'center', paddingTop: 40,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            letterSpacing: 4,
            color: 'rgba(242,238,232,0.35)',
            marginBottom: 8
          }}>
            MEJADHAVR
          </div>

          <div style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 14,
            color: 'rgba(242,238,232,0.35)',
            marginBottom: 32
          }}>
            Pune · India
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.1)', 
              color: 'rgba(242,238,232,0.6)', padding: '10px 24px', borderRadius: 30,
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, 
              textTransform: 'uppercase', cursor: 'none', marginBottom: 40,
              transition: 'all 0.4s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,238,232,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            ↑ Back to Top
          </button>

          <div className="footer-copyright" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: 2,
            color: 'rgba(242,238,232,0.3)',
            lineHeight: 1.8,
            padding: '0 20px',
            paddingBottom: 40
          }}>
            © {new Date().getFullYear()} · RUSHIKESH JADHAV<br className="mobile-only-break" /> · ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
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
        transition: 'opacity 0.6s ease',
      }}>
        <Navigation active={activeSection} />
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ServicesSection />
        <ClientsSection />
        <VisualSection />
        <ContactSection />
      </div>
      <ChatWidget />
    </>
  );
}
