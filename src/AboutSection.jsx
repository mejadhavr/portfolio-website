import React, { useState, useEffect, useRef, useCallback, useMemo, memo, Suspense, lazy } from 'react';
import { useIsMobile, AuroraBg } from './Shared';

/* ─────────────────────────────────────────────
   CINEMATIC VIDEO COMPONENT
───────────────────────────────────────────── */
function CinematicVideo() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    // Only set the video source after the page has loaded + small delay
    const timer = setTimeout(() => {
      setVideoSrc('/videos/showreel.mp4');
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: '#08080c'
    }}>

      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay={!!videoSrc}
        loop
        muted={muted}
        playsInline
        preload="none"
        poster="/assets/images/hero-poster.webp"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: videoSrc ? 1 : 0,
          transition: 'opacity 1s ease'
        }}
      />

      {/* REC indicator */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: 12,
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: 2,
        color: '#ff4d4d'
      }}>
        ● REC
      </div>

      {/* MUTE BUTTON */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          fontSize: 14,
          color: '#fff',
          cursor: 'none',
          fontFamily: 'var(--font-mono)',
          letterSpacing: 2,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          zIndex: 2,
        }}
      >
        {muted ? "🔇" : "🔊"}
        <span style={{ fontSize: 10 }}>{muted ? "Unmute" : "Mute"}</span>
      </button>

      {/* Timecode */}
      <div style={{
        position: 'absolute',
        bottom: 12,
        right: 12,
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'rgba(255,255,255,0.6)'
      }}>
        01:24:45:12
      </div>

      {/* cinematic scanlines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `
      radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.55)),
      linear-gradient(to top, rgba(0,0,0,0.45), transparent 40%),
      linear-gradient(to bottom, rgba(0,0,0,0.45), transparent 40%)
    `
        }}
      />
    </div>
  );
}


/* ─────────────────────────────────────────────
   STATISTICS TICKER
───────────────────────────────────────────── */
function NumberTicker({ endValue, duration = 3500, start = false }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTimestamp = null;
    let frameId;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setCount(Math.floor(easeProgress * endValue));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        setCount(endValue); // safety clamp
      }
    };
    
    frameId = window.requestAnimationFrame(step);
    
    return () => window.cancelAnimationFrame(frameId);
  }, [endValue, duration, start]);

  return <span>{count}</span>;
}

const aboutStats = [
  { n: 7, suffix: '+', label: 'Years Experience' },
  { n: 3500, suffix: '+', label: 'Projects Completed' },
  { n: 150, suffix: '+', label: 'Happy Clients' },
  { n: 25, suffix: 'M+', label: 'Views Generated' },
];

/* ─────────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────────── */
export default function AboutSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={{
      position: 'relative', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px)',
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
      overflow: 'hidden',
    }}>
      <AuroraBg accent="cyan" />
      <div className="about-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }}>

        {/* Left */}
        <div className={`reveal-left ${vis ? 'visible' : ''}`}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 20, textTransform: 'uppercase' }}>
            ◈ About
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,7vw,88px)', lineHeight: 0.9, marginBottom: 28, color: 'var(--white)' }}>
            THE<br />
            <span className="gold-text">STORY</span><br />
            BEHIND<br />THE CUTS
          </h2>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: 18, lineHeight: 1.9, color: 'rgba(242,238,232,0.65)', marginBottom: 24 }}>
            I'm <strong style={{ color: 'var(--white)' }}>Rushikesh Jadhav</strong> — a Pune-based cinematic video editor with over 7 years
            of crafting narratives that move audiences. Every cut tells a story. Every frame breathes life.
          </p>
          <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 17, lineHeight: 1.8, color: 'rgba(242,238,232,0.45)', marginBottom: 40 }}>
            "Editing is not just assembling footage — it's sculpting time, shaping emotion, and manufacturing truth from raw reality."
          </p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {aboutStats.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: 'clamp(12px, 3vw, 24px)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 6vw, 42px)', lineHeight: 1 }} className="gold-text">
                  <NumberTicker endValue={s.n} duration={2500} start={vis} />{s.suffix}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(8px, 1.5vw, 10px)', letterSpacing: 2, color: 'var(--muted)', marginTop: 8, textTransform: 'uppercase' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – video */}
        <div className={`reveal-right ${vis ? 'visible' : ''}`} style={{ position: 'relative' }}>

          {/* Glow behind video */}
          <div style={{
            position: 'absolute',
            inset: -20,
            background: 'radial-gradient(ellipse, rgba(200,169,110,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
            borderRadius: 24
          }} />

          <div className="glass-card glow-border" style={{ padding: 12, borderRadius: 20, position: 'relative' }}>

            {/* Film strip header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 8,
              padding: '4px 8px'
            }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: 3,
                color: 'var(--muted)'
              }}>
                MEJADHAVR · HLO · 2026
              </div>
            </div>


            {/* VIDEO CONTAINER */}
            <div
              style={{
                background: '#000',
                borderRadius: 12,
                overflow: 'hidden',
                aspectRatio: '1/1',
                position: 'relative'
              }}
            >

              {/* Cinematic Video Player */}
              <CinematicVideo />

            </div>


            {/* Bottom meta bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 4px 4px'
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: 'var(--gold)',
                letterSpacing: 2
              }}>
                ▶ Let's Create
              </div>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: 'var(--muted)',
                letterSpacing: 2
              }}>
                2024
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Horizontal rule */}
      <div
        style={{
          maxWidth: 1200,
          margin: '80px auto 0',
          height: 1,
          background: 'linear-gradient(to right, transparent, var(--gold), transparent)',
          opacity: 0.2
        }}
      />
    </section>
  );
}
