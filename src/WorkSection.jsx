import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile, AuroraBg } from './Shared';
const workProjects = [
  {
    title: 'Brand Manifesto',
    client: 'Astik Dyestuff P LTD, Mumbai',
    tags: ['Corporate & Brand Film'],
    span: 'col-span-2',
    aspect: '56.25%',
    desc: 'A cinematic brand story told through contrast and light',
    accent: '#C8A96E',
    gradient: 'linear-gradient(135deg,#1a0e00,#3d2600)',
    url: 'https://youtu.be/B5h9Djj6BXE',
    videoUrl: 'astik',
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
    videoUrl: 'testi',
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
    videoUrl: 'ph',
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
    videoUrl: 'idex',
  },
  {
    title: 'Event Highlight Film',
    client: 'Westbridge Capital & WACA Chess',
    tags: ['Event Highlight Film'],
    span: 'col-span-2',
    aspect: '40%',
    desc: 'Capturing the atmosphere and key moments of the tournament',
    accent: '#00C9FF',
    gradient: 'linear-gradient(135deg,#001a10,#00301c)',
    url: 'https://youtu.be/n6zK1hHCv98',
    videoUrl: 'waca',
  },
];

export default function WorkSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" ref={ref} style={{
      position: 'relative',
      padding: 'clamp(80px,10vw,120px) clamp(16px,5vw,40px)',
      background: 'var(--bg2)',
      overflow: 'hidden',
      minHeight: '100dvh',
    }}>
      <AuroraBg accent="gold" />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className={`reveal-section ${vis ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 70 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>◈ Selected Work</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,9vw,108px)', lineHeight: 0.88, color: 'var(--white)' }}>
            THE<br />
            <span className="gold-text">REEL</span>
          </h2>
        </div>


        {/* Bento Grid */}
        <div className="work-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(40px)',
          transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
        }}>
          {workProjects.map((p, i) => (
            <MemoizedProjectCard key={`project-${i}-${p.title}`} project={p} index={i} />
          ))}
        </div>

        {/* View Event Highlights CTA */}
        <div style={{
          marginTop: 60, textAlign: 'center',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.6s'
        }}>
          <Link to="/event-portfolio" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '16px 32px', borderRadius: 8,
            background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)',
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
            color: 'var(--gold)', textDecoration: 'none', transition: 'all 0.3s'
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200,169,110,0.1)'; e.currentTarget.style.color = 'var(--gold)'; }}
          >
            Explore Event Highlights Portfolio <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* IntersectionObserver-driven video: autoplays when card enters viewport,
   pauses when it leaves. Works on mobile without requiring a tap. */
function CardVideo({ src, isMobile }) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      onCanPlay={() => setIsLoaded(true)}
      poster={`/videos/posters/${src}.webp`}
      style={{
        width: '100%', height: '100%',
        objectFit: 'cover',
        opacity: isLoaded ? (isMobile ? 0.55 : 0.62) : 0,
        transition: 'opacity 1s ease',
      }}
    >
      <source src={`/videos/${src}.webm`} type="video/webm" />
      <source src={`/videos/${src}.mp4`} type="video/mp4" />
    </video>
  );
}

function ProjectCard({ project: p }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const colSpan = p.span === 'col-span-2' ? 'span 2' : 'span 1';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
      style={{
        gridColumn: colSpan,
        borderRadius: 16, overflow: 'hidden', position: 'relative', cursor: 'none',
        transform: hovered ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.025)` : 'perspective(800px) rotateX(0) rotateY(0) scale(1)',
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hovered ? `0 30px 80px rgba(0,0,0,0.7), 0 0 40px ${p.accent}22` : '0 8px 32px rgba(0,0,0,0.5)',
      }}
    >
      {/* Background */}
      <div style={{
        position: 'relative', paddingBottom: p.aspect,
        background: p.gradient,
        border: `1px solid ${hovered ? p.accent + '44' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: 16,
        transition: 'border-color 0.3s',
        overflow: 'hidden',
      }}>
        {/* Video or Decorative Background */}
        {p.videoUrl ? (
          <div style={{
            position: 'absolute', inset: 0, // Master used inset:0 often or decorative elements
            borderRadius: 16, overflow: 'hidden', zIndex: 0
          }}>
            <CardVideo src={p.videoUrl} />
          </div>
        ) : (
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

        {/* Overlay on hover (The Master's logic) */}
        <div style={{
          position: 'absolute', inset: 0, padding: 24,
          background: `linear-gradient(135deg, ${p.accent}11, rgba(0,0,0,0.8))`,
          opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          zIndex: 2,
        }}>
          {/* Film strip sprocket holes decoration */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 20, display: 'flex', flexDirection: 'column', gap: 8, padding: '8px 5px', opacity: 0.3 }}>
            {[...Array(6)].map((_, k) => (
              <div key={k} style={{ width: 10, height: 8, borderRadius: 2, border: `1px solid ${p.accent}` }} />
            ))}
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 3, color: p.accent, marginBottom: 8 }}>
            {p.tags.join(' · ')}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--white)', lineHeight: 1.1, marginBottom: 8 }}>{p.title}</div>
          <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 14, color: 'rgba(242,238,232,0.6)', marginBottom: 12 }}>{p.desc}</div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--muted)' }}>
            {p.client}
          </div>

          {p.url && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--gold)', marginTop: 12 }}>
              WATCH FULL FILM →
            </div>
          )}
        </div>

        {/* Tag label */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          padding: '5px 12px', borderRadius: 20,
          background: `${p.accent}18`, border: `1px solid ${p.accent}33`,
          fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2,
          color: p.accent, textTransform: 'uppercase', zIndex: 1
        }}>
          {p.tags[0]}
        </div>

        {/* Bottom title (default state) */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px',
          background: 'linear-gradient(0deg, rgba(0,0,0,0.7), transparent)',
          opacity: hovered ? 0 : 1, transition: 'opacity 0.3s', zIndex: 1
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--white)' }}>{p.title}</div>
        </div>
      </div>
    </div>
  );
}

const MemoizedProjectCard = React.memo(ProjectCard);
