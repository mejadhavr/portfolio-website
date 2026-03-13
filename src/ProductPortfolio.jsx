import { useState, useEffect, useRef, memo } from "react";
import { AuroraBg } from './Shared';
import { useIsMobile } from './hooks';

/* ─────────────────────────────────────────────
   HERO PARTICLES SYSTEM
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
  { id: "mcc0GLpVFhY", title: "IDEX India" },
  { id: "C08xkrHVdEE", title: "IDEX Richter" },
  { id: "ttlvZr-QtLQ", title: "Borosil Scientific" },
  { id: "jNzCp0588jM", title: "SKindus" },
  { id: "GkAIIonllbo", title: "Phillips Machine Tools" },
  { id: "yU4aOCGqvBg", title: "Accupack" },
  { id: "3Qu1f0Y-OvA", title: "ACG" },
  { id: "M6S0Egl0nmI", title: "HYT" },
  { id: "Fk6NVCZzzsI", title: "Industrial Showcase" },
  { id: "gH-wWbbr24Y", title: "Technical Animation" },
  { id: "vUfAmmJmkBQ", title: "Veol" },
  { id: "5ht_fiuCAcg", title: "ARAPL RaaS" },
  { id: "o6nPL6LS7Pc", title: "ElectroMech" },
  { id: "uCFiutNxf7A", title: "Production Line" }
];

function YouTubeEmbed({ id, title }) {
  const posterUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const srcDoc = `
    <style>
      * { padding: 0; margin: 0; overflow: hidden; background: #000; }
      html, body { height: 100%; }
      img, span { position: absolute; width: 100%; top: 0; bottom: 0; margin: auto; object-fit: cover; }
      span { 
        height: 60px; width: 60px; line-height: 60px; text-align: center; 
        font-size: 24px; color: #fff; background: rgba(0,201,255,0.9); 
        border-radius: 50%; z-index: 2; left: 50%; transform: translateX(-50%);
        box-shadow: 0 0 20px rgba(0,0,0,0.5); transition: all 0.3s;
      }
      .title-overlay {
        position: absolute; bottom: 0; left: 0; right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        padding: 30px 20px 15px; color: #fff;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 13px; letter-spacing: 1px; text-transform: uppercase;
        z-index: 3; opacity: 0.8;
      }
      a:hover span { background: #00C9FF; transform: translateX(-50%) scale(1.1); }
    </style>
    <a href="https://www.youtube.com/embed/${id}?autoplay=1&rel=0">
      <img src="${posterUrl}" alt="Video Preview">
      <span>▶</span>
      ${title ? `<div class="title-overlay">${title}</div>` : ''}
    </a>
  `;

  return (
    <div style={{
      position: 'relative', aspectRatio: '16 / 9', width: '100%',
      overflow: 'hidden', borderRadius: 16, background: '#000', 
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)', transition: 'transform 0.4s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <iframe title={`Video ${id}`} srcDoc={srcDoc} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
    </div>
  );
}

export default function ProductPortfolio() {
  const isMobile = useIsMobile();
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#06060C', color: '#F2EEE8', position: 'relative', overflowX: 'hidden' }}>
      <AuroraBg accent="cyan" />
      {!isMobile && <HeroParticles />}

      <nav className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.02s', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: isMobile ? '18px 16px' : '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(6,6,12,0.8), transparent)', backdropFilter: isMobile ? 'blur(6px)' : 'blur(10px)' }}>
        <a href="https://mejadhavr.com/#/" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 4, color: 'rgba(242,238,232,0.5)', textDecoration: 'none' }}>MEJADHAVR</a>
        <a href="https://mejadhavr.com/#/" target="_blank" rel="noreferrer" className="cine-cta-ghost" style={{ cursor: 'pointer' }}><span className="cine-cta-label">Main Website <span className="cine-cta-arrow">-&gt;</span></span></a>
      </nav>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '116px 16px 64px' : '160px 20px 80px', position: 'relative', zIndex: 2 }}>
        <header style={{ textAlign: 'center', marginBottom: isMobile ? 56 : 80 }}>
          <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.1s', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>◈ Product Films</div>
          <h1 className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.18s', fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,7vw,90px)', lineHeight: 0.9, marginBottom: 24 }}>
            TECHNICAL & PRODUCT<br /><span className="gold-text">VISUALIZATION</span>
          </h1>
          <p className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.26s', maxWidth: 600, margin: '0 auto', fontSize: 'clamp(14px,2.5vw,18px)', color: 'rgba(242,238,232,0.6)', lineHeight: 1.5 }}>
            Showcasing engineering precision, industrial processes, and product launches through cinematic 3D and live-action films.
          </p>
        </header>

        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: isMobile ? 20 : 32
        }}>
          {videos.map((v, i) => (
            <div key={i} className={`cine-reveal cine-zoom ${revealed ? 'visible' : ''}`} style={{ '--delay': `${0.34 + (i * 0.06)}s` }}>
              <YouTubeEmbed id={v.id} title={v.title} />
            </div>
          ))}
        </div>

        {/* Private Policy Section */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.62s',
          marginTop: isMobile ? 64 : 100, padding: isMobile ? '24px 18px' : '40px', borderRadius: 20,
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 40 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', marginBottom: 16, letterSpacing: 2, textTransform: 'uppercase' }}>◈ Collaboration Credit</div>
              <p style={{ fontSize: 13, color: 'rgba(242,238,232,0.5)', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                The cinematic works featured above may have been edited directly by me or while working as part of a creative team at 
                <strong style={{ color: 'var(--white)' }}> Unplug Infinity</strong>, <strong style={{ color: 'var(--white)' }}>Prismscale</strong>, <strong style={{ color: 'var(--white)' }}>iTant</strong>, or <strong style={{ color: 'var(--white)' }}>Greyscale</strong>.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#00C9FF', marginBottom: 16, letterSpacing: 2, textTransform: 'uppercase' }}>◈ Confidentiality Notice</div>
              <p style={{ fontSize: 13, color: 'rgba(242,238,232,0.5)', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                These videos may contain confidential or proprietary content. They are intended for portfolio viewing only and must 
                not be shared, downloaded, or distributed without explicit authorization.
              </p>
            </div>
          </div>
        </div>

                <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.72s', marginTop: isMobile ? 56 : 88, display: 'grid', gap: 18 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="https://mejadhavr.com/#/corporate-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Corporate Films</span></a>
            <a href="https://mejadhavr.com/#/realestate-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Real Estate Films</span></a>
            <a href="https://mejadhavr.com/#/event-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Event Highlights</span></a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="https://mejadhavr.com/#/contact" target="_blank" rel="noreferrer" className="cine-cta"><span className="cine-cta-label">Contact Rushikesh</span></a>
            <a href="https://mejadhavr.com/#/" target="_blank" rel="noreferrer" className="cine-cta-secondary"><span className="cine-cta-label">Open Main Website</span></a>
          </div>
        </div>
<footer className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.78s', marginTop: 120, textAlign: 'center', paddingTop: 60, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: 'rgba(242,238,232,0.3)', marginBottom: 20 }}>
            Precision Visualization · {new Date().getFullYear()}
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cine-cta-ghost" style={{ cursor: 'pointer' }}><span className="cine-cta-label">Back to Top <span className="cine-cta-arrow">↑</span></span></button>
        </footer>
      </main>
    </div>
  );
}
