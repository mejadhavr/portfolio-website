import { useState, useEffect, useRef, useCallback, memo, Suspense, lazy } from "react";

const HeroCanvas = lazy(() => import('./HeroCanvas'));
import { AuroraBg, ContactDock } from './Shared';
import { useIsMobile, useIsLowEnd, usePrefersReducedMotion } from './hooks';
import LazySection from './LazySection';

const AboutSection = lazy(() => import('./AboutSection'));
const WorkSection = lazy(() => import('./WorkSection'));
const ServicesSection = lazy(() => import('./ServicesSection'));
const VisualSection = lazy(() => import('./VisualSection'));
const ClientsSection = lazy(() => import('./ClientsSection'));
const ContactSection = lazy(() => import('./ContactSection'));

/* ─────────────────────────────────────────────
   HERO PARTICLES SYSTEM
───────────────────────────────────────────── */
const HeroParticles = memo(() => {
  const canvasRef = useRef(null);
  const isMobile = useIsMobile();
  const isLowEnd = useIsLowEnd();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const particleCount = isLowEnd ? 18 : isMobile ? 28 : 60;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * (isMobile ? 0.16 : 0.3),
      speedY: -Math.random() * (isMobile ? 0.22 : 0.4) - 0.08,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 160, 80, ${p.opacity})`;
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLowEnd, isMobile, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: isMobile ? 0.32 : 0.6
      }}
    />
  );
});

/* ─────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e) => {
      const target = e.target;
      const isPointerElement = window.getComputedStyle(target).cursor === 'pointer' || target.tagName === 'A' || target.tagName === 'BUTTON';

      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
        setIsPointer(isPointerElement);
      });
    };
    const onMouseDown = () => requestAnimationFrame(() => setIsClicking(true));
    const onMouseUp = () => requestAnimationFrame(() => setIsClicking(false));
    const onMouseLeave = () => requestAnimationFrame(() => setIsVisible(false));

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    document.body.classList.add('using-custom-cursor');

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.body.classList.remove('using-custom-cursor');
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        borderRadius: '50%', background: 'var(--gold)',
        pointerEvents: 'none', zIndex: 10005,
        transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
        transition: 'transform 0.08s ease-out',
      }} />
      <div style={{
        position: 'fixed', top: 0, left: 0, width: 40, height: 40,
        borderRadius: '50%', border: '1px solid var(--gold)',
        pointerEvents: 'none', zIndex: 10004,
        transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0) scale(${isClicking ? 0.8 : isPointer ? 1.5 : 1})`,
        opacity: isClicking ? 0.8 : 0.4,
        transition: 'transform 0.15s ease-out, opacity 0.2s, width 0.2s, height 0.2s',
      }} />
    </>
  );
}

/* ─────────────────────────────────────────────
   LOADING SCREEN
───────────────────────────────────────────── */
function LoadingScreen({ onDone }) {
  const isMobile = useIsMobile();
  const isLowEnd = useIsLowEnd();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, prefersReducedMotion ? 250 : (isLowEnd || isMobile ? 650 : 1200));
    return () => clearTimeout(timer);
  }, [isLowEnd, isMobile, onDone, prefersReducedMotion]);

  return (
    <div className={`loader-shell${isMobile || isLowEnd ? ' loader-shell-lite' : ''}`}>
      <div className="loader-rec">REC</div>
      <div className="timeline-track">
        <div className="timeline-playhead"></div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────── */
function Navigation({ active, onContactRequest }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'clients', label: 'Clients' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (id) => {
    if (id === 'contact') {
      onContactRequest?.();
      setIsOpen(false);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <nav className="nav-desktop" style={{
        position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000, padding: '10px 24px',
        background: scrolled ? 'rgba(6, 6, 12, 0.8)' : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 40, display: isMobile ? 'none' : 'flex', gap: 24, alignItems: 'center',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.5)' : 'none'
      }}>
        {/* Brand Mark (Logo) - Left side */}
        <div 
          onClick={() => scrollToSection('home')}
          style={{ cursor: 'none', display: 'flex', alignItems: 'center' }}
        >
          <img src="/images/logo.webp" alt="MJ Logo" style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
        </div>

        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />

        {/* Nav Items - Center Group */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                background: 'none', border: 'none', padding: 0,
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase', cursor: 'none',
                color: active === item.id ? 'var(--gold)' : 'var(--white)',
                opacity: active === item.id ? 1 : 0.5,
                transition: 'all 0.3s ease'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />

        {/* Action Group - Right side */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={() => scrollToSection('contact')} className="cine-cta" style={{
            padding: '10px 18px', outline: 'none', cursor: 'none'
          }}>
            <span className="cine-cta-label">Hire Me <span className="cine-cta-arrow">→</span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Hamburger Button (Boxed at Bottom) */}
      <button
        className="nav-hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        style={{
          display: isMobile ? 'flex' : 'none',
          position: 'fixed', bottom: 'max(20px, env(safe-area-inset-bottom))', right: 20,
          width: 52, height: 52, borderRadius: 14,
          background: 'rgba(6, 6, 12, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--gold)', zIndex: 10002,
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}>
        <div style={{ width: 22, height: 2, background: 'var(--gold)', transform: isOpen ? 'rotate(45deg) translateY(5px)' : 'none', transition: '0.3s' }} />
        <div style={{ width: isOpen ? 0 : 16, height: 2, background: 'var(--gold)', transition: '0.3s' }} />
        <div style={{ width: 22, height: 2, background: 'var(--gold)', transform: isOpen ? 'rotate(-45deg) translateY(-5px)' : 'none', transition: '0.3s' }} />
      </button>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 10001,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'min(24px, 4vh)',
        padding: 'max(28px, env(safe-area-inset-top)) 24px max(40px, env(safe-area-inset-bottom))', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none',
        transform: isOpen ? 'none' : 'translateY(20px)',
        overflowY: 'auto'
      }}>
        {/* Mobile Brand Mark */}
        <div style={{ marginBottom: 20 }}>
          <img src="/images/logo.webp" alt="MJ Logo" style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
        </div>

        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            style={{
              background: 'none', border: 'none',
              fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 10vw, 42px)',
              color: active === item.id ? 'var(--gold)' : 'var(--white)',
              textTransform: 'uppercase',
              letterSpacing: 2, transition: 'all 0.3s ease'
            }}
          >
            {item.label}
          </button>
        ))}

        {/* Mobile Social Links at bottom of menu */}
        <div style={{ 
          marginTop: 40, display: 'flex', gap: 24, alignItems: 'center',
          opacity: isOpen ? 1 : 0, transform: isOpen ? 'none' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
        }}>
          <a href="https://wa.me/919309964035" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', transition: '0.3s' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width={24} height={24}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
          </a>
          <a href="mailto:rushikesh@mejadhavr.com" style={{ color: 'var(--gold)', transition: '0.3s' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width={24} height={24}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
          </a>
          <a href="https://linkedin.com/in/rushikesh-jadhav-2bb063162" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', transition: '0.3s' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width={24} height={24}><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a2.7 2.7 0 00-2.7-2.7c-1.2 0-1.8.7-2.1 1.2v-1.2H11v8h2.7v-4.8c0-.3 0-.5.1-.7.2-.5.6-1 1.3-1 1 0 1.4.7 1.4 1.8v4.7H19.3M6.2 9h2.7V6.3H6.2V9m0 9.5h2.7V10.7H6.2v7.8z" /></svg>
          </a>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   BG SYSTEM
───────────────────────────────────────────── */
function MobileHeroBg() {
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0
    }}>
      <div style={{
        position: 'absolute', top: '15%', left: '-10%', width: '100%', height: '70%',
        background: 'radial-gradient(ellipse at center, rgba(200,169,110,0.08), transparent 70%)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-10%', width: '80%', height: '60%',
        background: 'radial-gradient(ellipse at center, rgba(0,201,255,0.05), transparent 70%)',
        animation: 'float2 12s ease-in-out infinite'
      }} />

      {/* Scanline glow */}
      <div style={{
        position: 'absolute', top: '38%', left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.15) 30%, rgba(200,169,110,0.3) 50%, rgba(200,169,110,0.15) 70%, transparent 100%)',
        opacity: 0.5,
      }} />

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
function HeroSection({ onContactRequest }) {

  const [tagVisible, setTagVisible] = useState(true);
  const [revealed] = useState(true);
  const [tagIndex, setTagIndex] = useState(0);

  const isMobile = useIsMobile();
  const isLowEnd = useIsLowEnd();
  const prefersReducedMotion = usePrefersReducedMotion();

  const taglines = [
    "Cinematic Video Editing & Visual Storytelling",
    "Crafting Stories Through Precision Cuts",
    "Turning Footage Into Emotion",
    "High-Impact Commercial & Documentary Edits",
    "Editing Where Every Frame Matters"
  ];

  // rotating tagline
  useEffect(() => {
    const interval = setInterval(() => {
      setTagVisible(false); // fade out
      setTimeout(() => {
        setTagIndex((prev) => (prev + 1) % taglines.length);
        setTagVisible(true); // fade in
      }, 400);
    }, prefersReducedMotion ? 5000 : 3500);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, taglines.length]);

  return (
    <section id="home" style={{
      position: 'relative', minHeight: '100dvh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flexDirection: 'column',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1a2a 40%, #1a0f05 70%, #0a0a0f 100%)',
      padding: isMobile ? '96px 0 88px' : 0,
    }}>
      {/* Film Grain Overlay */}
      {!isMobile && !isLowEnd && !prefersReducedMotion && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.35,
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      )}

      {/* Cinematic Depth Gradients */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(10, 40, 60, 0.4) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(40, 20, 5, 0.3) 0%, transparent 50%)
        `,
        zIndex: 0
      }} />

      {/* Background elements load immediately so they are ready when the screen fades in */}
      <>
        {!prefersReducedMotion && !(isMobile && isLowEnd) && <HeroParticles />}
        <AuroraBg accent="gold" />
        {isMobile && !isLowEnd && <MobileHeroBg />}
        {(!isMobile && !isLowEnd && !prefersReducedMotion) && (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        )}
      </>

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
      <div className="hero-cinematic" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: isMobile ? '0 18px' : '0 24px', width: '100%', maxWidth: 1280 }}>

        {/* Availability Badge & Location */}
        <div className="hero-kicker" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24,
          flexWrap: 'wrap'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2,
            color: 'var(--white)', textTransform: 'uppercase',
            opacity: 0.8
          }}>
            Pune, India 📍
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px',
            background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)',
            borderRadius: 20, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#25D366', boxShadow: '0 0 8px #25D366', animation: 'glow-pulse 2s infinite' }}></span>
            Available for Projects
          </div>
        </div>

        {/* Main name */}
        <h1 className="hero-name hero-title-block" style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 'clamp(48px, 20vw, 92px)' : 'clamp(50px, 15vw, 180px)',
          lineHeight: isMobile ? 0.84 : 0.8,
          color: 'var(--white)',
          marginBottom: isMobile ? 16 : 20,
          textShadow: '0 20px 80px rgba(0,0,0,0.8)',
        }}>
          <span className="hero-title-line">RUSHIKESH</span>
          <span className="hero-title-line gold-text">JADHAV</span>
        </h1>

        {/* Title */}
        <h2 className="hero-role" style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 'clamp(18px, 6vw, 24px)' : 'clamp(24px, 5vw, 48px)',
          color: 'var(--gold)', letterSpacing: isMobile ? 2.5 : 4, marginBottom: 16,
          textTransform: 'uppercase',
          textShadow: '0 4px 20px rgba(200,169,110,0.3)',
        }}>
          Cinematic Video Editor
        </h2>

        {/* Tagline */}
        <div className="hero-copy-shell" style={{ marginBottom: isMobile ? 36 : 60 }}>
          <div className="hero-copy" style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(16px, 3vw, 24px)',
            color: 'rgba(242,238,232,0.8)',
            letterSpacing: 1,
            opacity: tagVisible ? 1 : 0,
            transform: tagVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease, filter 0.5s ease',
            filter: tagVisible ? 'blur(0px)' : 'blur(4px)'
          }}>
            {taglines[tagIndex]}
          </div>
        </div>

        {/* CTAs */}
        <div className="hero-cta-row" style={{
          display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap',
          position: 'relative', zIndex: 10
        }}>
          <button
            onClick={() => {
              onContactRequest?.();
              if (window.trackEvent) window.trackEvent("contact_click");
            }}
            className="cine-cta-secondary"
            style={{
              padding: '16px 32px',
              width: isMobile ? '100%' : 'auto',
              maxWidth: isMobile ? 320 : 'none',
              cursor: 'none'
            }}
          >
            <span className="cine-cta-label">Let's Work Together <span className="cine-cta-arrow">→</span></span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      {!isMobile && (
      <div
        className="hero-scroll-indicator-shell"
        style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2,
          opacity: revealed ? 0.7 : 0, transition: 'opacity 1s ease 2s', pointerEvents: 'none'
        }}
      >
        <div className="hero-scroll-indicator" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 4, color: 'var(--white)', textTransform: 'uppercase' }}>Scroll</div>
        <div style={{
          width: 24, height: 40, borderRadius: 20, border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative', display: 'flex', justifyContent: 'center'
        }}>
          <div style={{
            width: 1, height: 8, background: 'var(--gold)', borderRadius: 1,
            marginTop: 8, animation: 'scroll-dot 2s ease-in-out infinite'
          }} />
        </div>
      </div>
      )}

    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App({ initialSection = null }) {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [eagerSections, setEagerSections] = useState([]);
  const pendingSectionRef = useRef(initialSection);

  const handleLoadDone = useCallback(() => {
    setLoading(false);
    if (!pendingSectionRef.current) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const requestSection = useCallback((id) => {
    setEagerSections((current) => (current.includes(id) ? current : [...current, id]));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      });
    });
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

  useEffect(() => {
    if (loading || !pendingSectionRef.current) return;

    const sectionId = pendingSectionRef.current;
    pendingSectionRef.current = null;
    requestSection(sectionId);
  }, [loading, requestSection]);

  return (
    <>
      <CustomCursor />

      {loading && <LoadingScreen onDone={handleLoadDone} />}

      {!loading && (
        <div>
          <Navigation active={activeSection} onContactRequest={() => requestSection('contact')} />
          <ContactDock />
          <HeroSection onContactRequest={() => requestSection('contact')} />

          <LazySection id="about" forceVisible={eagerSections.includes('about')}><Suspense fallback={null}><AboutSection /></Suspense></LazySection>
          <LazySection id="work" forceVisible={eagerSections.includes('work')}><Suspense fallback={null}><WorkSection /></Suspense></LazySection>
          <LazySection id="services" forceVisible={eagerSections.includes('services')}><Suspense fallback={null}><ServicesSection /></Suspense></LazySection>
          <LazySection id="clients" forceVisible={eagerSections.includes('clients')}><Suspense fallback={null}><ClientsSection /></Suspense></LazySection>
          <LazySection id="visual" forceVisible={eagerSections.includes('visual')}><Suspense fallback={null}><VisualSection /></Suspense></LazySection>
          <LazySection id="contact" forceVisible={eagerSections.includes('contact')}><Suspense fallback={null}><ContactSection /></Suspense></LazySection>
        </div>
      )}

    </>
  );
}
