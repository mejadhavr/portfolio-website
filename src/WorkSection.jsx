import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile, AuroraBg } from './Shared';
const workProjects = [
  {
    title: 'BRAND MANIFESTO',
    client: 'Astik Dyestuff P LTD, Mumbai | 2019',
    desc: 'A cinematic brand story told through contrast and light',
    tags: ['CORPORATE & BRAND FILM'],
    videoUrl: 'astik',
    url: 'https://youtu.be/B5h9Djj6BXE',
    accent: '#C8A96E',
    gradient: 'linear-gradient(135deg, #1A1A00 0%, #06060C 100%)',
    aspect: '56.25%',
    colSpan: 'span 2 / auto',
    isFlipCard: true,
    caseStudy: [
      { label: 'Director', value: 'Rushikesh Jadhav' },
      { label: 'Role', value: 'Editor & Colorist' },
      { label: 'Editor', value: 'Rushikesh Jadhav' },
      { label: 'Client', value: 'Astik Dyestuff P LTD' },
      { label: 'Year', value: '2019' },
      { label: 'Location', value: 'Mumbai, India' }
    ]
  },
  {
    title: 'TESTIMONIAL FILM',
    client: 'Prasun Spaces | 2023',
    desc: 'Authentic voices and experiences captured',
    tags: ['TESTIMONIAL FILM'],
    videoUrl: 'testi',
    url: 'https://youtu.be/QziZuMJMAPA',
    accent: '#00C9FF',
    gradient: 'linear-gradient(135deg, #001A1F 0%, #06060C 100%)',
    aspect: '110%',
    colSpan: 'span 1 / auto',
    isFlipCard: true,
    caseStudy: [
      { label: 'Director', value: 'Rushikesh Jadhav' },
      { label: 'Role', value: 'Editor & Colorist' },
      { label: 'Editor', value: 'Rushikesh Jadhav' },
      { label: 'Client', value: 'Prasun Spaces' },
      { label: 'Year', value: '2023' },
      { label: 'Location', value: 'Pune, India' }
    ]
  },
  {
    title: 'PRODUCT LAUNCH VIDEO',
    client: 'Phillips Machine Tools | 2023',
    desc: 'Impactful product reveal and showcase',
    tags: ['PRODUCT LAUNCH VIDEO'],
    videoUrl: 'ph',
    url: 'https://youtu.be/GkAIIonllbo',
    accent: '#C8A96E',
    gradient: 'linear-gradient(135deg, #1A1A00 0%, #06060C 100%)',
    aspect: '110%',
    colSpan: 'span 1 / auto',
    isFlipCard: true,
    caseStudy: [
      { label: 'Director', value: 'Rushikesh Jadhav' },
      { label: 'Role', value: 'Editor & Colorist' },
      { label: 'Editor', value: 'Rushikesh Jadhav' },
      { label: 'Client', value: 'Phillips Machine Tools' },
      { label: 'Year', value: '2023' },
      { label: 'Location', value: 'Pune, India' }
    ]
  },
  {
    title: '7 PLUMERIA DRIVE',
    client: 'BU Bhandari | 2024',
    desc: 'A cinematic walkthrough experiencing the vision',
    tags: ['MODEL WALKTHROUGH FILM'],
    videoUrl: '7pd',
    url: 'https://youtu.be/9nf70fQ8mdo',
    accent: '#00C9FF',
    gradient: 'linear-gradient(135deg, #001A1F 0%, #06060C 100%)',
    aspect: '110%',
    colSpan: 'span 1 / auto',
    isFlipCard: true,
    caseStudy: [
      { label: 'Director', value: 'Rushikesh Jadhav' },
      { label: 'Role', value: 'Editor & Colorist' },
      { label: 'Editor', value: 'Rushikesh Jadhav' },
      { label: 'Client', value: 'BU Bhandari' },
      { label: 'Year', value: '2024' },
      { label: 'Location', value: 'Pune, India' }
    ]
  },
  {
    title: 'IDEX INDIA',
    client: 'Idex India | 2023',
    desc: 'Showcasing engineering through 3D visualization',
    tags: ['3D PRODUCT FILM'],
    videoUrl: 'idex',
    url: 'https://youtu.be/mcc0GLpVFhY',
    accent: '#C8A96E',
    gradient: 'linear-gradient(135deg, #1A1A00 0%, #06060C 100%)',
    aspect: '110%',
    colSpan: 'span 1 / auto',
    isFlipCard: true,
    caseStudy: [
      { label: 'Director', value: 'Rushikesh Jadhav' },
      { label: 'Role', value: 'Editor & Colorist' },
      { label: 'Editor', value: 'Rushikesh Jadhav' },
      { label: 'Client', value: 'Idex India' },
      { label: 'Year', value: '2023' },
      { label: 'Location', value: 'Pune, India' }
    ]
  },
  {
    title: 'EVENT HIGHLIGHTS',
    client: 'Multiple Clients | 2022-24',
    desc: 'Capturing the energy and movement of live events',
    tags: ['EVENT HIGHLIGHT FILM'],
    videoUrl: 'waca',
    url: 'https://youtu.be/n6zK1hHCv98',
    accent: '#00C9FF',
    gradient: 'linear-gradient(135deg, #001A10 0%, #06060C 100%)',
    aspect: '40%',
    colSpan: 'span 2 / auto',
    isFlipCard: true,
    caseStudy: [
      { label: 'Director', value: 'Rushikesh Jadhav' },
      { label: 'Role', value: 'Editor & Colorist' },
      { label: 'Editor', value: 'Rushikesh Jadhav' },
      { label: 'Client', value: 'Multiple Clients' },
      { label: 'Year', value: '2022-24' },
      { label: 'Location', value: 'Pune, India' }
    ]
  }
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
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
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

function ProjectCard({ project: p, index }) {
  const [hovered, setHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    if (isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleFlip = () => {
    if (p.isFlipCard) setIsFlipped(!isFlipped);
  };

  const colSpan = p.colSpan || 'span 1 / auto';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
      onClick={handleFlip}
      style={{
        gridColumn: colSpan,
        borderRadius: 16, position: 'relative', cursor: 'pointer',
        perspective: '1200px',
        zIndex: isFlipped ? 50 : 1,
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: p.aspect,
        transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : (hovered ? `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.025)` : 'rotateX(0) rotateY(0) scale(1)'),
      }}>
        {/* ================= FRONT FACE ================= */}
        <div style={{
          position: 'absolute', inset: 0,
          background: p.gradient,
          border: `1px solid ${hovered ? p.accent + '44' : 'rgba(255,255,255,0.05)'}`,
          borderRadius: 16, overflow: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          zIndex: 2,
        }}>
          {/* Optional Video Background (Master structure) */}
          {p.videoUrl && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <CardVideo src={p.videoUrl} isMobile={false} />
            </div>
          )}

          {/* Decorative inner elements */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%',
              border: `1px solid ${p.accent}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: hovered || isFlipped ? 0 : 0.5, transition: 'opacity 0.3s',
            }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${p.accent}55` }} />
            </div>
          </div>

          {/* Film strip sprocket holes decoration */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 20, display: 'flex', flexDirection: 'column', gap: 8, padding: '8px 5px', opacity: 0.3, zIndex: 1 }}>
            {[...Array(6)].map((_, k) => (
              <div key={k} style={{ width: 10, height: 8, borderRadius: 2, border: `1px solid ${p.accent}` }} />
            ))}
          </div>

          {/* Front Overlay on Hover */}
          <div style={{
            position: 'absolute', inset: 0, padding: 24,
            background: `linear-gradient(135deg, ${p.accent}11, rgba(0,0,0,0.8))`,
            opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            zIndex: 2,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 3, color: p.accent, marginBottom: 8 }}>
              {p.tags.join(' · ')}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--white)', lineHeight: 1.1, marginBottom: 8 }}>{p.title}</div>
            <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 14, color: 'rgba(242,238,232,0.6)', marginBottom: 12 }}>{p.desc}</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--muted)' }}>{p.client}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: p.accent, letterSpacing: 2 }}>
                {p.isFlipCard ? 'CASE STUDY →' : 'KNOW MORE →'}
              </div>
            </div>
          </div>

          {/* Top Tag Label (Always visible) */}
          <div style={{
            position: 'absolute', top: 16, right: 16,
            padding: '5px 12px', borderRadius: 20,
            background: `${p.accent}18`, border: `1px solid ${p.accent}33`,
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2,
            color: p.accent, textTransform: 'uppercase', zIndex: 3
          }}>
            {p.tags[0]}
          </div>

          {/* Bottom Title (Always visible when not hovered) */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)',
            opacity: hovered ? 0 : 1, transition: 'opacity 0.3s', zIndex: 3
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--white)' }}>{p.title}</div>
          </div>
        </div>

        {/* ================= BACK FACE (CASE STUDY) ================= */}
        {p.isFlipCard && (
          <div style={{
            position: 'absolute', inset: 0,
            padding: 24,
            background: 'var(--bg2)',
            border: `1px solid ${p.accent}55`,
            borderRadius: 16,
            overflow: 'hidden',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex', flexDirection: 'column',
            zIndex: 1,
            pointerEvents: isFlipped ? 'auto' : 'none',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 4, color: p.accent, marginBottom: 12, textTransform: 'uppercase' }}>
              ◈ Case Study
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--white)', marginBottom: 16, lineHeight: 1 }}>
              {p.title}
            </div>

            <div style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'max-content 1fr',
              columnGap: 16, rowGap: 8,
              alignContent: 'start',
              overflowY: 'auto',
              paddingRight: 4,
            }}>
              {p.caseStudy.map((row, idx) => (
                <React.Fragment key={idx}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: p.accent, textTransform: 'uppercase' }}>{row.label}</div>
                  <div style={{ fontFamily: 'var(--font-editorial)', fontSize: 14, color: 'rgba(242,238,232,0.8)' }}>{row.value}</div>
                </React.Fragment>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${p.accent}22` }}>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-block',
                    background: `${p.accent}22`, border: `1px solid ${p.accent}44`,
                    padding: '8px 16px', borderRadius: 4,
                    fontFamily: 'var(--font-mono)', fontSize: 10, color: p.accent, letterSpacing: 2,
                    cursor: 'pointer', textDecoration: 'none'
                  }}
                >
                  WATCH FULL FILM ↗
                </a>
              ) : (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: p.accent, opacity: 0.5 }}>
                  COMING SOON
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const MemoizedProjectCard = React.memo(ProjectCard);
