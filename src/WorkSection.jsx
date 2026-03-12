import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile, AuroraBg } from './Shared';
const workProjects = [
  {
    title: 'BRAND MANIFESTO',
    client: 'Astik Dyestuff Pvt LTD, Mumbai',
    desc: 'A cinematic brand story told through contrast and light',
    tags: ['CORPORATE & BRAND FILM'],
    videoUrl: 'astik',
    url: 'https://youtu.be/B5h9Djj6BXE',
    accent: '#C8A96E',
    gradient: 'linear-gradient(135deg, #1A1A00 0%, #06060C 100%)',
    colSpan: 'span 2',
    rowSpan: 'span 2', // Large Feature Square
    isFlipCard: true,
    caseStudy: [
      { label: 'CLIENT', value: 'Astik Dyestuff Pvt. Ltd., Mumbai' },
      { label: 'PRODUCED BY', value: 'Unplug Infinity Media Pvt. Ltd.' },
      { label: 'CREATIVE DIRECTOR', value: 'Alim Pathak' },
      { label: 'VIDEO EDITOR', value: 'Rushikesh Jadhav' },
      { label: 'ROLE', value: 'Part of the Unplug Infinity Media team' }
    ]
  },
  {
    title: 'TESTIMONIAL FILM',
    client: 'Prasun Spaces',
    desc: 'Authentic voices and experiences captured',
    tags: ['TESTIMONIAL FILM'],
    videoUrl: 'testi',
    url: 'https://youtu.be/QziZuMJMAPA',
    accent: '#00C9FF',
    gradient: 'linear-gradient(135deg, #001A1F 0%, #06060C 100%)',
    colSpan: 'span 1',
    rowSpan: 'span 1', // Small Square
    isFlipCard: true,
    caseStudy: [
      { label: 'CLIENT', value: 'Prasun Spaces' },
      { label: 'PROJECT', value: 'Prasun Adara' },
      { label: 'PRODUCED BY', value: 'Greyscale Films' },
      { label: 'CREATIVE DIRECTOR', value: 'Amarreddy' }
    ]
  },
  {
    title: '7 PLUMERIA DRIVE',
    client: 'BU Bhandari',
    desc: 'A cinematic walkthrough experiencing the vision',
    tags: ['MODEL WALKTHROUGH FILM'],
    videoUrl: '7pd',
    url: 'https://youtu.be/9nf70fQ8mdo',
    accent: '#00C9FF',
    gradient: 'linear-gradient(135deg, #001A1F 0%, #06060C 100%)',
    colSpan: 'span 1',
    rowSpan: 'span 2', // Tall Vertical Portrait
    isFlipCard: true,
    caseStudy: [
      { label: 'CLIENT', value: 'BU Bhandari' },
      { label: 'TYPE', value: 'Model Walkthrough Film' },
      { label: 'DESCRIPTION', value: 'A cinematic walkthrough experiencing the vision.' }
    ]
  },
  {
    title: 'PRODUCT LAUNCH VIDEO',
    client: 'Phillips Machine Tools India Pvt. Ltd.',
    desc: 'Impactful product reveal and showcase',
    tags: ['PRODUCT LAUNCH VIDEO'],
    videoUrl: 'ph',
    url: 'https://youtu.be/GkAIIonllbo',
    accent: '#C8A96E',
    gradient: 'linear-gradient(135deg, #1A1A00 0%, #06060C 100%)',
    colSpan: 'span 1',
    rowSpan: 'span 1', // Small Square
    isFlipCard: true,
    caseStudy: [
      { label: 'CLIENT', value: 'Phillips Machine Tools India Pvt. Ltd.' },
      { label: 'PRODUCED BY', value: 'Unplug Infinity Media Pvt. Ltd.' },
      { label: 'CREATIVE DIRECTOR', value: 'Alim Pathak' },
      { label: 'VIDEO EDITOR', value: 'Rushikesh Jadhav' }
    ]
  },
  {
    title: 'IDEX INDIA',
    client: 'Idex India',
    desc: 'Showcasing engineering through 3D visualization',
    tags: ['3D PRODUCT FILM'],
    videoUrl: 'idex',
    url: 'https://youtu.be/mcc0GLpVFhY',
    accent: '#C8A96E',
    gradient: 'linear-gradient(135deg, #1A1A00 0%, #06060C 100%)',
    colSpan: 'span 1',
    rowSpan: 'span 1', // Small Square
    isFlipCard: true,
    caseStudy: [
      { label: 'CLIENT', value: 'Idex India' },
      { label: 'TYPE', value: '3D Product Film' },
      { label: 'DESCRIPTION', value: 'Showcasing engineering through 3D visualization.' }
    ]
  },
  {
    title: 'EVENT HIGHLIGHT FILM',
    client: 'Westbridge Capital & WACA Chess',
    desc: 'Capturing the atmosphere and key moments of the tournament',
    tags: ['EVENT HIGHLIGHT FILM'],
    videoUrl: 'waca',
    url: 'https://youtu.be/n6zK1hHCv98',
    accent: '#00C9FF',
    gradient: 'linear-gradient(135deg, #001A10 0%, #06060C 100%)',
    colSpan: 'span 3',
    rowSpan: 'span 1', // Wide Landscape Header
    isFlipCard: true,
    caseStudy: [
      { label: 'CLIENT', value: 'WestBridge Capital' },
      { label: 'PRODUCED BY', value: 'Prismscale Pvt. Ltd.' },
      { label: 'CREATIVE DIRECTOR', value: 'Dharam Vir Singh' },
      { label: 'VIDEO EDITOR', value: 'Rushikesh Jadhav' }
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>SELECTED WORK</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,9vw,108px)', lineHeight: 0.88, color: 'var(--white)' }}>
            CINEMATIC<br />
            <span className="gold-text">PORTFOLIO</span>
            <div style={{ fontSize: '0.35em', letterSpacing: 6, marginTop: 20, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>& BRAND FILMS</div>
          </h2>
        </div>


        {/* Bento Grid */}
        <div className="work-grid" style={{
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
          gridAutoRows: isMobile ? 'auto' : '260px', // Forces locked row heights
          gap: 24, // Wider gap for cleaner separation
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
  const isMobile = useIsMobile();

  const onMouseMove = (e) => {
    if (isFlipped || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  const handleFlip = () => {
    if (p.isFlipCard) setIsFlipped(!isFlipped);
  };

  // Mobile gets 1 column span (since grid is 1fr), Desktop gets specific bento spans
  const colSpan = isMobile ? 'span 1' : p.colSpan;
  const rowSpan = isMobile ? 'auto' : p.rowSpan;
  
  // Preserving your original exact 230px mobile height!
  const cardHeight = isMobile ? '230px' : '100%';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
      onClick={handleFlip}
      style={{
        gridColumn: colSpan,
        gridRow: rowSpan,
        height: cardHeight,
        borderRadius: 16, position: 'relative', cursor: 'pointer',
        perspective: '2000px',
        zIndex: isFlipped ? 50 : 1,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Premium Color-Matched Glow */}
      <div style={{
        position: 'absolute',
        inset: '-60px',
        background: `radial-gradient(circle at center, ${p.accent}25 0%, transparent 70%)`,
        filter: 'blur(60px)',
        opacity: hovered ? 1 : 0.4,
        transform: 'translateZ(-1px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 0,
        pointerEvents: 'none',
        willChange: 'opacity'
      }} />
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%', // Automatically fills the 230px on mobile, or the bento row height on desktop
        transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : (hovered ? `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.01)` : 'rotateX(0) rotateY(0) scale(1)'),
      }}>
        {/* ================= FRONT FACE ================= */}
        <div style={{
          position: 'absolute', inset: 0,
          background: p.gradient,
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 12, overflow: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          zIndex: 2,
        }}>
          {p.videoUrl && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <CardVideo src={p.videoUrl} isMobile={isMobile} />
            </div>
          )}

          {/* Simple Gradient Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)',
            zIndex: 1
          }} />

          {/* Category Pill (Top-Right) */}
          <div style={{
            position: 'absolute', top: 16, right: 16,
            padding: '4px 10px', borderRadius: 20,
            border: `1px solid ${p.accent}66`,
            background: 'rgba(0,0,0,0.3)',
            fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 1.5,
            color: p.accent, textTransform: 'uppercase', zIndex: 3
          }}>
            {p.tags[0]}
          </div>

          {/* Content Overlay */}
          <div style={{
            position: 'absolute', inset: 0, padding: 20,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            zIndex: 2,
          }}>
            <div style={{ 
              fontFamily: 'var(--font-display)', fontSize: isMobile ? 22 : 28, 
              color: 'var(--white)', lineHeight: 0.9, marginBottom: 8, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: 1
            }}>
              {p.title}
            </div>
            <div style={{ 
              fontFamily: 'var(--font-editorial)', fontStyle: 'italic', 
              fontSize: isMobile ? 13 : 14, color: 'rgba(255,255,255,0.7)', 
              marginBottom: 16, lineHeight: 1.3, fontWeight: 300
            }}>
              {p.desc}
            </div>

            {/* Separator Line */}
            <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 12 }} />

            <div style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ 
                fontFamily: 'var(--font-mono)', fontSize: 9, 
                color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
                letterSpacing: 2
              }}>
                {p.client}
              </div>
              <div style={{ 
                fontFamily: 'var(--font-mono)', fontSize: 9, 
                color: p.accent, fontWeight: 700, letterSpacing: 1.5 
              }}>
                CASE STUDY →
              </div>
            </div>
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        {p.isFlipCard && (
          <div style={{
            position: 'absolute', inset: 0,
            padding: 24,
            background: '#06060c',
            border: `1px solid ${p.accent}33`,
            borderRadius: 12,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex', flexDirection: 'column',
            zIndex: 1,
            pointerEvents: isFlipped ? 'auto' : 'none',
          }}>
            {/* Header */}
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-mono)', fontSize: 9, 
              letterSpacing: 2, color: p.accent, marginBottom: 8,
              textTransform: 'uppercase'
            }}>
              <span style={{ fontSize: 12 }}>◈</span> CASE STUDY
            </div>

            {/* Project Title on Back */}
            <div style={{ 
              fontFamily: 'var(--font-display)', fontSize: 24, 
              color: 'var(--white)', fontWeight: 800, marginBottom: 24,
              lineHeight: 1, textTransform: 'uppercase'
            }}>
              {p.title}
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {p.caseStudy.map((row, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', marginBottom: 16, 
                  alignItems: 'baseline', borderBottom: '1px solid rgba(255,255,255,0.03)',
                  paddingBottom: 8
                }}>
                  <div style={{ 
                    width: '40%',
                    fontFamily: 'var(--font-mono)', fontSize: 8, 
                    color: p.accent, textTransform: 'uppercase', 
                    opacity: 0.8
                  }}>{row.label}</div>
                  <div style={{ 
                    flex: 1,
                    fontFamily: 'var(--font-editorial)', fontSize: 14, 
                    color: 'var(--white)', fontWeight: 300 
                  }}>{row.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20 }}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  border: `1px solid ${p.accent}`, color: p.accent,
                  padding: '10px 20px', borderRadius: 4,
                  fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
                  letterSpacing: 1.5, textDecoration: 'none', transition: 'all 0.3s ease',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = p.accent;
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = p.accent;
                }}
              >
                WATCH FULL FILM <span style={{ fontSize: 12 }}>↗</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const MemoizedProjectCard = React.memo(ProjectCard);
