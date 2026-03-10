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
    caseStudy: [
      { label: 'Client', value: 'Astik Dyestuff Pvt. Ltd., Mumbai' },
      { label: 'Produced by', value: 'Unplug Infinity Media Pvt. Ltd.' },
      { label: 'Creative Director', value: 'Alim Pathan' },
      { label: 'Video Editor', value: 'Rushikesh Jadhav' },
      { label: 'Role', value: 'Part of the Unplug Infinity Media team' },
    ],
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
    caseStudy: [
      { label: 'Client', value: 'Prasun Spaces' },
      { label: 'Project', value: 'Prasun Adara' },
      { label: 'Produced by', value: 'Greyscale Films' },
      { label: 'Creative Director', value: 'Amarreddy Lingam' },
      { label: 'Video Editor', value: 'Rushikesh Jadhav' },
    ],
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
    caseStudy: [
      { label: 'Client', value: 'Phillips Machine Tools India Pvt. Ltd.' },
      { label: 'Produced by', value: 'Unplug Infinity Media Pvt. Ltd.' },
      { label: 'Creative Director', value: 'Alim Pathan' },
      { label: 'Video Editor', value: 'Rushikesh Jadhav' },
    ],
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
    caseStudy: [
      { label: 'Client', value: 'BU Bhandari' },
      { label: 'Project', value: '7 Plumeria Drive' },
      { label: 'Produced by', value: 'Greyscale Films' },
      { label: 'Creative Director', value: 'Amarreddy Lingam' },
      { label: 'Video Editor', value: 'Rushikesh Jadhav' },
    ],
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
    caseStudy: [
      { label: 'Client', value: 'Idex India, Mumbai' },
      { label: 'Produced by', value: 'Unplug Infinity Media Pvt. Ltd.' },
      { label: 'Project Manager', value: 'Ravindra Kamtam' },
      { label: 'Video Editor', value: 'Rushikesh Jadhav' },
    ],
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
    caseStudy: [
      { label: 'Client', value: 'WestBridge Capital' },
      { label: 'Produced by', value: 'Prismscale Pvt. Ltd.' },
      { label: 'Creative Director', value: 'Dharam Vir Singh' },
      { label: 'Video Editor', value: 'Rushikesh Jadhav' },
    ],
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
        <div className={`work-section-heading reveal-section ${vis ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 'clamp(40px,7vw,70px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>◈ Selected Work</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,9vw,108px)', lineHeight: 0.88, color: 'var(--white)' }}>
            CINEMATIC<br />
            PORTFOLIO & <span className="gold-text">BRAND FILMS</span>
          </h2>
        </div>


        {/* Bento Grid */}
        <div className="work-grid" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 'clamp(10px, 2vw, 16px)',
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(40px)',
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
  const [flippedMobile, setFlippedMobile] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const isMobile = useIsMobile();

  const onMouseMove = (e) => {
    if (p.caseStudy) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;

    requestAnimationFrame(() => {
      setTilt({ x, y });
    });
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

  // On mobile, flip cards take natural height (no fixed aspect ratio)
  // On desktop, they use the paddingBottom trick for aspect ratio
  const useMobileFlipLayout = isMobile && isFlipCard;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => { !isMobile && setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={!isMobile ? onMouseMove : undefined}
      onClick={handleCardClick}
      style={{
        gridColumn: colSpan,
        perspective: isFlipCard ? '1200px' : '800px',
        position: 'relative',
        aspectRatio: (!useMobileFlipLayout && isFlipCard) ? 1 / (parseFloat(p.aspect) / 100) : undefined,
        // Min-height on mobile so card feels substantial
        minHeight: useMobileFlipLayout ? 320 : undefined,
      }}
    >
      <CardWrapper
        {...wrapperProps}
        className={!isFlipCard ? '' : ''}
        style={{
          display: 'block',
          textDecoration: 'none',
          position: (isFlipCard && !useMobileFlipLayout) ? 'absolute' : 'relative',
          inset: (isFlipCard && !useMobileFlipLayout) ? 0 : 'auto',
          width: '100%',
          height: useMobileFlipLayout ? '100%' : (isFlipCard ? '100%' : undefined),
          borderRadius: 16,
          cursor: isMobile ? 'pointer' : 'none',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transform: isFlipCard
            ? (isCurrentlyFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')
            : (hovered ? `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.025)` : 'rotateX(0) rotateY(0) scale(1)'),
          transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: hovered && !isFlipCard ? `0 30px 80px rgba(0,0,0,0.7), 0 0 40px ${p.accent}22` : '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {/* ================= FRONT FACE ================= */}
        <div
          className={!isFlipCard ? 'project-card-aspect' : ''}
          style={{
            position: isFlipCard ? 'absolute' : 'relative',
            inset: 0,
            aspectRatio: isFlipCard ? undefined : 1 / (parseFloat(p.aspect) / 100),
            background: p.gradient,
            border: `1px solid ${hovered ? p.accent + '44' : 'rgba(255,255,255,0.05)'}`,
            borderRadius: 16,
            overflow: 'hidden',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg) translateZ(1px)',
            WebkitTransform: 'rotateY(0deg) translateZ(1px)',
            zIndex: 2,
            // On mobile flip cards give a natural min-height to front face
            minHeight: useMobileFlipLayout ? 280 : undefined,
          }}
        >
          {p.videoUrl && (
            <div style={{
              position: 'absolute',
              // Desktop: slight inset for depth effect
              // Mobile: fill edge-to-edge (card is already small)
              inset: isMobile ? 0 : 40,
              borderRadius: isMobile ? 16 : 8,
              overflow: 'hidden',
              zIndex: 0,
            }}>
              <CardVideo src={p.videoUrl} isMobile={isMobile} />
            </div>
          )}

          {!p.videoUrl && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', border: `1px solid ${p.accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 0 : 0.5, transition: 'opacity 0.3s' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${p.accent}55` }} />
              </div>
            </div>
          )}

          <div style={{
            position: 'absolute', inset: 0, padding: 'clamp(14px,4vw,20px)',
            background: p.videoUrl
              ? 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 45%, transparent 100%)'
              : 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 80%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 1,
          }}>
            <div style={{ opacity: (hovered && !isFlipCard) || isFlipCard ? 1 : 0, transition: 'opacity 0.4s', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 3.5vw, 24px)', color: 'var(--white)', lineHeight: 1.1, marginBottom: 6, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{p.title}</div>
              <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 'clamp(11px,2.5vw,13px)', color: 'rgba(242,238,232,0.9)', marginBottom: 10, lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{p.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 10 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--muted)' }}>{p.client}</div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: p.accent, textTransform: 'uppercase',
                  transform: isFlipCard || hovered ? 'translateX(0)' : 'translateX(-10px)',
                  opacity: isFlipCard || hovered ? 1 : 0,
                  transition: 'transform 0.4s ease 0.1s, opacity 0.4s ease 0.1s',
                }}>
                  {isFlipCard ? 'Case Study' : 'Know More'} <span style={{ fontSize: 13 }}>→</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            position: 'absolute', top: 12, right: 12,
            padding: '4px 10px', borderRadius: 20,
            background: `${p.accent}18`, border: `1px solid ${p.accent}33`,
            fontFamily: 'var(--font-mono)', fontSize: 'clamp(7px,2vw,9px)', letterSpacing: 2,
            color: p.accent, textTransform: 'uppercase', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            {p.tags[0]}
          </div>

          {!isFlipCard && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px', background: 'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)', opacity: hovered ? 0 : 1, transition: 'opacity 0.3s' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(14px,4vw,22px)', color: 'var(--white)' }}>{p.title}</div>
            </div>
          )}
        </div>

        {/* ================= BACK FACE (CASE STUDY) ================= */}
        {isFlipCard && (
          <div
            style={{
              position: 'absolute', inset: 0,
              padding: isMobile ? '44px 20px 20px' : '24px 24px 20px',
              background: 'var(--bg2)',
              border: `1px solid ${p.accent}55`,
              borderRadius: 16,
              // Must be hidden so 3D backface doesn't bleed, but
              // we handle internal scroll in the credits body
              overflow: 'hidden',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)',
              WebkitTransform: 'rotateY(180deg) translateZ(1px)',
              display: 'flex', flexDirection: 'column',
              zIndex: 1,
              pointerEvents: isCurrentlyFlipped ? 'auto' : 'none',
            }}
          >
            {/* Go Back button — mobile only */}
            {isMobile && (
              <button
                onClick={handleGoBack}
                style={{
                  position: 'absolute', top: 10, right: 10,
                  background: `${p.accent}22`, border: `1px solid ${p.accent}55`,
                  fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2,
                  color: p.accent, textTransform: 'uppercase',
                  zIndex: 10, padding: '5px 10px', borderRadius: 20, cursor: 'pointer',
                }}
              >
                ← Back
              </button>
            )}

            {/* Label */}
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 4,
              color: p.accent, marginBottom: 8, textTransform: 'uppercase',
              flexShrink: 0,
            }}>
              ◈ Case Study
            </div>

            {/* Title */}
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 'clamp(18px,6vw,22px)' : 'clamp(18px,2.5vw,24px)',
              color: 'var(--white)', marginBottom: 12, lineHeight: 1.1,
              flexShrink: 0,
            }}>
              {p.title}
            </div>

            {/* Credits — CSS Grid for perfect two-column alignment on every row */}
            <div style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'max-content 1fr',
              columnGap: 14,
              rowGap: isMobile ? 9 : 7,
              alignContent: 'start',
              overflowY: 'auto',
              paddingRight: 4,
              scrollbarWidth: 'thin',
              scrollbarColor: `${p.accent}44 transparent`,
            }}>
              {Array.isArray(p.caseStudy) && p.caseStudy.map((row, idx) => (
                <>
                  <div key={`l-${idx}`} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: isMobile ? 'clamp(9px,2.5vw,11px)' : 10,
                    letterSpacing: 1,
                    color: p.accent,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    paddingTop: 2,
                    lineHeight: 1.4,
                  }}>
                    {row.label}
                  </div>
                  <div key={`v-${idx}`} style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: isMobile ? 'clamp(12px,3.5vw,14px)' : 13,
                    color: 'rgba(242,238,232,0.82)',
                    lineHeight: 1.45,
                  }}>
                    {row.value}
                  </div>
                </>
              ))}
            </div>

            {/* Watch Full Film — pinned to bottom, always visible */}
            <div style={{
              paddingTop: 12, borderTop: `1px solid ${p.accent}22`,
              marginTop: 12, flexShrink: 0,
            }}>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
                    color: p.accent, textTransform: 'uppercase', textDecoration: 'none',
                    padding: '8px 14px', background: `${p.accent}18`,
                    borderRadius: 6, border: `1px solid ${p.accent}44`,
                    transition: 'background 0.25s, box-shadow 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${p.accent}30`; e.currentTarget.style.boxShadow = `0 0 16px ${p.accent}33`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${p.accent}18`; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  Watch Full Film <span style={{ fontSize: 13 }}>↗</span>
                </a>
              ) : (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: p.accent, textTransform: 'uppercase', opacity: 0.5 }}>
                  Film Coming Soon
                </div>
              )}
            </div>
          </div>
        )}
      </CardWrapper>
    </div>
  );
}

const MemoizedProjectCard = React.memo(ProjectCard);
