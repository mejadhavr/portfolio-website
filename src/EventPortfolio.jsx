import { useState, useEffect, useRef, memo } from "react";
import { AuroraBg } from './Shared';
import { useIsMobile } from './hooks';

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
      position: 'relative', 
      aspectRatio: '16 / 9',
      width: '100%',
      overflow: 'hidden',
      borderRadius: 16, 
      background: '#000', 
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)', 
      transition: 'transform 0.4s ease',
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
      {!isMobile && <HeroParticles />}

      {/* Navigation (Fixed to top) */}
      <nav className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.02s', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: isMobile ? '18px 16px' : '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(6,6,12,0.8), transparent)', backdropFilter: isMobile ? 'blur(6px)' : 'blur(10px)' }}>
        <a href="https://mejadhavr.com/#/" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 4, color: 'rgba(242,238,232,0.5)', textDecoration: 'none' }}>MEJADHAVR</a>
        <a href="https://mejadhavr.com/#/" target="_blank" rel="noreferrer" className="cine-cta-ghost" style={{ cursor: 'pointer' }}><span className="cine-cta-label">Main Website <span className="cine-cta-arrow">-&gt;</span></span></a>
      </nav>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '116px 16px 64px' : '160px 20px 80px', position: 'relative', zIndex: 2 }}>
        <header style={{ textAlign: 'center', marginBottom: isMobile ? 56 : 80 }}>
          <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.1s', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>◈ Portfolio Hub</div>
          <h1 className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.18s', fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,7vw,90px)', lineHeight: 0.9, marginBottom: 24 }}>
            EVENT HIGHLIGHT<br /><span className="gold-text">VIDEO PORTFOLIO</span>
          </h1>
          <p className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.26s', maxWidth: 600, margin: '0 auto', fontSize: 'clamp(14px,2.5vw,18px)', color: 'rgba(242,238,232,0.6)', lineHeight: 1.5 }}>
            A collection of cinematic moments from corporate summits, tournaments, and high-energy gatherings.
          </p>
        </header>

        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: isMobile ? 20 : 32
        }}>
          {videos.map((id, i) => (
            <div key={i} className={`cine-reveal cine-zoom ${revealed ? 'visible' : ''}`} style={{ '--delay': `${0.34 + (i * 0.06)}s` }}>
              <YouTubeEmbed id={id} />
            </div>
          ))}
        </div>

        {/* Disclaimer Section */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.62s',
          marginTop: isMobile ? 56 : 80, padding: isMobile ? '24px 18px' : '30px 40px', borderRadius: 16,
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
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
                <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.72s', marginTop: isMobile ? 56 : 88, display: 'grid', gap: 18 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="https://mejadhavr.com/#/corporate-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Corporate Films</span></a>
            <a href="https://mejadhavr.com/#/product-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Product Videos</span></a>
            <a href="https://mejadhavr.com/#/realestate-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Real Estate Films</span></a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="https://mejadhavr.com/#/contact" target="_blank" rel="noreferrer" className="cine-cta"><span className="cine-cta-label">Contact Rushikesh</span></a>
            <a href="https://mejadhavr.com/#/" target="_blank" rel="noreferrer" className="cine-cta-secondary"><span className="cine-cta-label">Open Main Website</span></a>
          </div>
        </div>
<footer className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.78s', marginTop: 120, textAlign: 'center', paddingTop: 60, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: 'rgba(242,238,232,0.3)', marginBottom: 20 }}>
            Curated Cinematic Experience · {new Date().getFullYear()}
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cine-cta-ghost"
            style={{ cursor: 'pointer' }}
          >
            <span className="cine-cta-label">Back to Top <span className="cine-cta-arrow">↑</span></span>
          </button>
        </footer>
      </main>
    </div>
  );
}
