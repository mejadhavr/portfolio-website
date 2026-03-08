import { useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { useIsMobile, AuroraBg } from './Shared';

/* ─────────────────────────────────────────────
   HERO PARTICLES SYSTEM (Reused for consistency)
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

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.6
      }}
    />
  );
});

const videos = [
  "d3xqNKXgMO4",
  "Z2hge-n4CxI",
  "Ek68QcamTL8",
  "yhXpiprWQrI",
  "fSpZ05jdy7s",
  "W2to9-sUwfk",
  "ILQ_atGuw5c",
  "n6zK1hHCv98",
  "VvyGmezp3vI"
];

function YouTubeEmbed({ id }) {
  // rel=0: related videos from same channel only
  // modestbranding=1: hide youtube logo
  // iv_load_policy=3: hide annotations
  // controls=1: show controls as requested (play/pause)
  const embedUrl = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&iv_load_policy=3&showinfo=0&controls=1`;

  return (
    <div style={{
      position: 'relative',
      paddingBottom: '56.25%',
      height: 0,
      overflow: 'hidden',
      borderRadius: 16,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      transition: 'transform 0.4s ease, border-color 0.4s ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.borderColor = 'rgba(200,169,110,0.3)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
    >
      <iframe
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={`Video ${id}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

export default function EventPortfolio() {
  const isMobile = useIsMobile();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#06060C',
      color: '#F2EEE8',
      fontFamily: 'var(--font-editorial), serif',
      position: 'relative',
      overflowX: 'hidden',
    }}>
      <AuroraBg accent="gold" />
      <HeroParticles />

      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(6,6,12,0.8), transparent)',
        backdropFilter: 'blur(10px)',
      }}>
        <Link to="/" style={{
          fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 4, color: 'rgba(242,238,232,0.5)',
          textDecoration: 'none', transition: 'color 0.3s'
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,238,232,0.5)'}
        >
          MEJADHAVR
        </Link>
        <Link to="/" style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--gold)',
          textDecoration: 'none', border: '1px solid rgba(200,169,110,0.3)', padding: '8px 16px', borderRadius: 4,
          textTransform: 'uppercase', transition: 'all 0.3s'
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#000'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}
        >
          ← Back Home
        </Link>
      </nav>

      {/* Main Content */}
      <main style={{
        maxWidth: 1200, margin: '0 auto', padding: '160px 20px 80px', position: 'relative', zIndex: 2
      }}>
        <header style={{ textAlign: 'center', marginBottom: 80, opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)', transition: 'all 1s ease' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>◈ Portfolio Hub</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,7vw,90px)', lineHeight: 0.9, marginBottom: 24 }}>
            EVENT HIGHLIGHT<br />
            <span className="gold-text">VIDEO PORTFOLIO</span>
          </h1>
          <p style={{ maxWidth: 600, margin: '0 auto', fontSize: 'clamp(14px,2.5vw,18px)', color: 'rgba(242,238,232,0.6)', lineHeight: 1.5 }}>
            A collection of cinematic moments and pulse-pounding highlights from corporate summits, 
            tournaments, and high-energy gatherings.
          </p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 32,
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'none' : 'translateY(40px)',
          transition: 'all 1s ease 0.4s'
        }}>
          {videos.map((id, i) => (
            <YouTubeEmbed key={i} id={id} />
          ))}
        </div>

        {/* Disclaimer Section */}
        <div style={{
          marginTop: 80, padding: '30px 40px', borderRadius: 16,
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
          opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)', transition: 'all 1s ease 0.6s'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 30 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', marginBottom: 12, letterSpacing: 2 }}>◈ COLLABORATION CREDIT</div>
              <p style={{ fontSize: 13, color: 'rgba(242,238,232,0.5)', lineHeight: 1.6, margin: 0 }}>
                The cinematic works featured above may have been edited directly by me or while working as part of a creative team at 
                <strong> Unplug Infinity</strong>, <strong>Prismscale</strong>, <strong>iTant</strong>, or <strong>Greyscale</strong>.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cyan)', marginBottom: 12, letterSpacing: 2 }}>◈ CONFIDENTIALITY NOTICE</div>
              <p style={{ fontSize: 13, color: 'rgba(242,238,232,0.5)', lineHeight: 1.6, margin: 0 }}>
                These videos may contain confidential or proprietary content. They are intended for portfolio viewing only and must 
                not be shared, downloaded, or distributed without explicit authorization.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <footer style={{ marginTop: 120, textAlign: 'center', paddingTop: 60, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: 'rgba(242,238,232,0.3)', marginBottom: 20 }}>
            Curated Cinematic Experience · {new Date().getFullYear()}
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.1)', 
              color: 'rgba(242,238,232,0.4)', padding: '10px 24px', borderRadius: 30,
              fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, 
              textTransform: 'uppercase', cursor: 'pointer',
              transition: 'all 0.4s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,238,232,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            ↑ TOP
          </button>
        </footer>
      </main>
    </div>
  );
}
