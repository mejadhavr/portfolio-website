import { useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { useIsMobile, AuroraBg } from './Shared';

/* ─────────────────────────────────────────────
   HERO PARTICLES SYSTEM (Kept as is)
───────────────────────────────────────────── */
const HeroParticles = memo(() => {
  const canvasRef = useRef(null);
  useEffect(() => {
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
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
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
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.6 }} />;
});

const videos = [
  "d3xqNKXgMO4", "Z2hge-n4CxI", "Ek68QcamTL8",
  "yhXpiprWQrI", "fSpZ05jdy7s", "W2to9-sUwfk",
  "ILQ_atGuw5c", "n6zK1hHCv98", "VvyGmezp3vI"
];

/* ─────────────────────────────────────────────
   OPTIMIZED LITE YOUTUBE EMBED (The "Syntax" Fix)
───────────────────────────────────────────── */
function YouTubeEmbed({ id }) {
  // We use hqdefault.jpg for the preview image to save weight
  const posterUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  // The srcdoc allows us to render a lightweight HTML button inside the frame 
  // that prevents the YouTube API from loading until clicked.
  const srcDoc = `
    <style>
      * { padding: 0; margin: 0; overflow: hidden; background: #000; }
      html, body { height: 100%; }
      img, span { position: absolute; width: 100%; top: 0; bottom: 0; margin: auto; object-fit: cover; }
      span { 
        height: 60px; width: 60px; line-height: 60px; text-align: center; 
        font-size: 24px; color: #fff; background: rgba(200,169,110,0.9); 
        border-radius: 50%; z-index: 2; left: 50%; transform: translateX(-50%);
        box-shadow: 0 0 20px rgba(0,0,0,0.5); transition: all 0.3s;
      }
      a:hover span { background: #C8A96E; transform: translateX(-50%) scale(1.1); }
    </style>
    <a href="https://www.youtube.com/embed/${id}?autoplay=1&rel=0">
      <img src="${posterUrl}" alt="Video Preview">
      <span>▶</span>
    </a>
  `;

  return (
    <div style={{
      position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden',
      borderRadius: 16, background: '#000', border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)', transition: 'transform 0.4s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <iframe
        title={`Video ${id}`}
        srcDoc={srcDoc}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function EventPortfolio() {
  const isMobile = useIsMobile();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#06060C', color: '#F2EEE8', position: 'relative', overflowX: 'hidden' }}>
      <AuroraBg accent="gold" />
      <HeroParticles />

      {/* Navigation (Fixed to top) */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(6,6,12,0.8), transparent)', backdropFilter: 'blur(10px)' }}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 4, color: 'rgba(242,238,232,0.5)', textDecoration: 'none' }}>MEJADHAVR</Link>
        <Link to="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--gold)', textDecoration: 'none', border: '1px solid rgba(200,169,110,0.3)', padding: '8px 16px', borderRadius: 4, textTransform: 'uppercase' }}>← Back Home</Link>
      </nav>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '160px 20px 80px', position: 'relative', zIndex: 2 }}>
        <header style={{ textAlign: 'center', marginBottom: 80, opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)', transition: 'all 1s ease' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>◈ Portfolio Hub</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,7vw,90px)', lineHeight: 0.9, marginBottom: 24 }}>
            EVENT HIGHLIGHT<br /><span className="gold-text">VIDEO PORTFOLIO</span>
          </h1>
          <p style={{ maxWidth: 600, margin: '0 auto', fontSize: 'clamp(14px,2.5vw,18px)', color: 'rgba(242,238,232,0.6)', lineHeight: 1.5 }}>
            A collection of cinematic moments from corporate summits, tournaments, and high-energy gatherings.
          </p>
        </header>

        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 32, opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(40px)', transition: 'all 1s ease 0.4s'
        }}>
          {videos.map((id, i) => (<YouTubeEmbed key={i} id={id} />))}
        </div>

        {/* Reusing existing footer/disclaimer ... */}
        <footer style={{ marginTop: 120, textAlign: 'center', paddingTop: 60, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(242,238,232,0.3)' }}>Curated Cinematic Experience · 2026</div>
        </footer>
      </main>
    </div>
  );
}