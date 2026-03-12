import { useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { useIsMobile, AuroraBg } from './Shared';

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
  { id: "B5h9Djj6BXE", title: "Astik" },
  { id: "mQWCbU9Hhv0", title: "Borosil Scientific" },
  { id: "gq0TXh6CFkc", title: "KlimaPharm" },
  { id: "FruN8i2FVwo", title: "SKindus" },
  { id: "7132218700782313472", title: "Tofflon (LinkedIn)", isLinkedIn: true }
];

function YouTubeEmbed({ id, title, isLinkedIn }) {
  if (isLinkedIn) {
    return (
      <div style={{
        position: 'relative', aspectRatio: '16 / 9', width: '100%',
        overflow: 'hidden', borderRadius: 16, background: '#000',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)', transition: 'transform 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, textTransform: 'uppercase', letterSpacing: 2 }}>{title}</div>
        <a href={`https://www.linkedin.com/posts/tofflon-india-private-limited_join-us-at-pmec-for-an-exclusive-look-at-activity-7132218700782313472-em_G/${id}`} target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', border: '1px solid var(--gold)', color: 'var(--gold)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 10, borderRadius: 4 }}>VIEW ON LINKEDIN ↗</a>
      </div>
    );
  }

  const posterUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
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
      .title-overlay {
        position: absolute; bottom: 0; left: 0; right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        padding: 30px 20px 15px; color: #fff;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 13px; letter-spacing: 1px; text-transform: uppercase;
        z-index: 3; opacity: 0.8;
      }
      a:hover span { background: #C8A96E; transform: translateX(-50%) scale(1.1); }
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

export default function CorporatePortfolio() {
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

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(6,6,12,0.8), transparent)', backdropFilter: 'blur(10px)' }}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 4, color: 'rgba(242,238,232,0.5)', textDecoration: 'none' }}>MEJADHAVR</Link>
        <Link to="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--gold)', textDecoration: 'none', border: '1px solid rgba(200,169,110,0.3)', padding: '8px 16px', borderRadius: 4, textTransform: 'uppercase' }}>← Back Home</Link>
      </nav>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '160px 20px 80px', position: 'relative', zIndex: 2 }}>
        <header style={{ textAlign: 'center', marginBottom: 80, opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)', transition: 'all 1s ease' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>◈ Corporate Films</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,7vw,90px)', lineHeight: 0.9, marginBottom: 24 }}>
            BRAND MANIFESTO &<br /><span className="gold-text">CORPORATE STORIES</span>
          </h1>
          <p style={{ maxWidth: 600, margin: '0 auto', fontSize: 'clamp(14px,2.5vw,18px)', color: 'rgba(242,238,232,0.6)', lineHeight: 1.5 }}>
            Crafting cinematic narratives that define brand values, cultures, and excellence in the corporate world.
          </p>
        </header>

        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: 32, opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(40px)', transition: 'all 1s ease 0.4s'
        }}>
          {videos.map((v, i) => (<YouTubeEmbed key={i} id={v.id} title={v.title} isLinkedIn={v.isLinkedIn} />))}
        </div>

        {/* Private Policy Section */}
        <div style={{
          marginTop: 100, padding: '40px', borderRadius: 20,
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
          opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)', transition: 'all 1s ease 0.8s'
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

        <footer style={{ marginTop: 120, textAlign: 'center', paddingTop: 60, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: 'rgba(242,238,232,0.3)', marginBottom: 20 }}>
            Cinematic Storytelling · {new Date().getFullYear()}
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(242,238,232,0.4)', padding: '10px 24px', borderRadius: 30, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.4s ease' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--gold)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,238,232,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>↑ TOP</button>
        </footer>
      </main>
    </div>
  );
}
