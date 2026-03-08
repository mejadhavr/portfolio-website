import React, { useState, useEffect, useRef, useCallback, useMemo, memo, Suspense, lazy } from 'react';
import { useIsMobile, AuroraBg } from './Shared';
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

export default function WorkSection() {
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
  const [flippedMobile, setFlippedMobile] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const isMobile = useIsMobile();

  const onMouseMove = (e) => {
    if (p.caseStudy) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const colSpan = p.span === 'col-span-2' ? 'span 2' : 'span 1';
  const isFlipCard = !!p.caseStudy;
  const isCurrentlyFlipped = isMobile ? flippedMobile : hovered;

  const handleCardClick = (e) => {
    if (isMobile && isFlipCard && !flippedMobile) {
      e.preventDefault();
      setFlippedMobile(true);
    }
  };

  const handleGoBack = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFlippedMobile(false);
  };

  const CardWrapper = (p.url && !isFlipCard) ? 'a' : 'div';
  const wrapperProps = (p.url && !isFlipCard) ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <div
      className={isFlipCard ? "project-card-aspect" : ""}
      ref={cardRef}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => { !isMobile && setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={!isMobile ? onMouseMove : undefined}
      onClick={handleCardClick}
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
          borderRadius: 16, cursor: isMobile ? 'pointer' : 'none',
          transformStyle: 'preserve-3d',
          transform: isFlipCard
            ? (isCurrentlyFlipped ? 'rotateY(180deg)' : 'rotateY(0)')
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
          transform: 'rotateY(0deg)',
          zIndex: 2,
        }}>

          {!isMobile && p.videoUrl && (
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

          {!p.videoUrl && (
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 20, display: 'flex', flexDirection: 'column', gap: 8, padding: '8px 5px', opacity: 0.3 }}>
              {[...Array(6)].map((_, k) => (
                <div key={k} style={{ width: 10, height: 8, borderRadius: 2, border: `1px solid ${p.accent}` }} />
              ))}
            </div>
          )}

          <div className="card-front-overlay" style={{
            position: 'absolute', inset: 0, padding: 20,
            background: p.videoUrl ? 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 45%, transparent 100%)' : 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 80%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            zIndex: 1
          }}>
            <div style={{
              opacity: (hovered && !isFlipCard) || isFlipCard ? 1 : 0,
              transition: 'opacity 0.4s',
              display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end'
            }}>
              <div className="card-front-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 24px)', color: 'var(--white)', lineHeight: 1.05, marginBottom: 8, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{p.title}</div>
              <div className="card-front-desc" style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 13, color: 'rgba(242,238,232,0.9)', marginBottom: 12, lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{p.desc}</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--muted)' }}>{p.client}</div>

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
            pointerEvents: isCurrentlyFlipped ? 'auto' : 'none'
          }}>
            {isMobile && (
              <button 
                onClick={handleGoBack}
                style={{
                  position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.05)', border: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.8)',
                  textTransform: 'uppercase', zIndex: 10, padding: '6px 10px', borderRadius: 20,
                  backdropFilter: 'blur(10px)', cursor: 'pointer'
                }}
              >
                Go Back ↺
              </button>
            )}
            
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
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: p.accent,
                  textTransform: 'uppercase', textDecoration: 'none',
                  padding: '8px 12px', background: `${p.accent}22`, borderRadius: '4px', border: `1px solid ${p.accent}55`
                }}>
                  Watch Full Film <span style={{ fontSize: 14 }}>↗</span>
                </a>
              ) : (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: p.accent,
                  textTransform: 'uppercase',
                }}>
                  Watch Full Film <span style={{ fontSize: 14 }}>↗</span>
                </div>
              )}
            </div>
          </div>
        )}

      </CardWrapper>
    </div>
  );
}
