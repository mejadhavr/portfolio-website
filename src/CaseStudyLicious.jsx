import { useState, useEffect, memo } from "react";
import { AuroraBg } from './Shared';
import { useIsMobile, useSEO } from './hooks';

/* ─────────────────────────────────────────────
   CASE STUDY: Licious 7-Year Brand Film
───────────────────────────────────────────── */

export default function CaseStudyLicious() {
  useSEO({
    title: "Case Study: Editing Licious's 7-Year Brand Film | Corporate Video Editor India",
    description: "Deep-dive into editing the Licious Foundation Day brand film. How cinematic pacing, kinetic transitions, and visual rhythm shaped 7 years of brand journey into one emotional story."
  });

  const isMobile = useIsMobile();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(t);
  }, []);

  const sectionStyle = {
    marginBottom: isMobile ? 48 : 64,
  };

  const sectionTitleStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: isMobile ? 10 : 11,
    letterSpacing: 4,
    color: 'var(--gold)',
    textTransform: 'uppercase',
    marginBottom: 16,
  };

  const bodyTextStyle = {
    fontSize: isMobile ? 15 : 17,
    color: 'rgba(242,238,232,0.7)',
    lineHeight: 1.85,
    margin: '0 0 20px 0',
  };

  const highlightStyle = {
    color: 'var(--gold)',
    fontWeight: 500,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#06060C', color: '#F2EEE8', position: 'relative', overflowX: 'hidden' }}>
      <AuroraBg accent="gold" />

      {/* Navigation */}
      <nav className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.02s', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: isMobile ? '18px 16px' : '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(6,6,12,0.8), transparent)', backdropFilter: isMobile ? 'blur(6px)' : 'blur(10px)' }}>
        <a href="https://mejadhavr.com/#/" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 4, color: 'rgba(242,238,232,0.5)', textDecoration: 'none' }}>MEJADHAVR</a>
        <a href="https://mejadhavr.com/#/" target="_blank" rel="noreferrer" className="cine-cta-ghost" style={{ cursor: 'pointer' }}><span className="cine-cta-label">Main Website <span className="cine-cta-arrow">-&gt;</span></span></a>
      </nav>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '116px 16px 64px' : '160px 20px 80px', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <header style={{ marginBottom: isMobile ? 48 : 72 }}>
          <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.08s', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 20, textTransform: 'uppercase' }}>◈ Case Study</div>
          <h1 className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.16s', fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1, marginBottom: 28 }}>
            EDITING LICIOUS'S<br />
            <span className="gold-text">7-YEAR BRAND FILM</span>
          </h1>
          <p className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.24s', fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'rgba(242,238,232,0.5)', lineHeight: 1.6, fontFamily: 'var(--font-editorial)', fontStyle: 'italic', maxWidth: 640 }}>
            A Story of Rhythm and Culture
          </p>
          <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.30s', marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'rgba(242,238,232,0.35)' }}>
            <span>CLIENT: LICIOUS</span>
            <span style={{ color: 'rgba(242,238,232,0.15)' }}>|</span>
            <span>AGENCY: PRISM SCALE PVT. LTD.</span>
            <span style={{ color: 'rgba(242,238,232,0.15)' }}>|</span>
            <span>TYPE: FOUNDATION DAY FILM</span>
          </div>
        </header>

        {/* Video Embed */}
        <div className={`cine-reveal cine-zoom ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.36s', marginBottom: isMobile ? 48 : 72 }}>
          <div style={{
            position: 'relative', aspectRatio: '16 / 9', width: '100%',
            overflow: 'hidden', borderRadius: 16, background: '#000',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          }}>
            <iframe
              title="Licious 7-Year Brand Film"
              srcDoc={`
                <style>
                  * { padding: 0; margin: 0; overflow: hidden; background: #000; }
                  html, body { height: 100%; }
                  img, span { position: absolute; width: 100%; top: 0; bottom: 0; margin: auto; object-fit: cover; }
                  span {
                    height: 72px; width: 72px; line-height: 72px; text-align: center;
                    font-size: 28px; color: #fff; background: rgba(200,169,110,0.9);
                    border-radius: 50%; z-index: 2; left: 50%; transform: translateX(-50%);
                    box-shadow: 0 0 30px rgba(0,0,0,0.5); transition: all 0.3s;
                  }
                  a:hover span { background: #C8A96E; transform: translateX(-50%) scale(1.15); }
                </style>
                <a href="https://www.youtube.com/embed/B5h9Djj6BXE?autoplay=1&rel=0">
                  <img src="https://img.youtube.com/vi/B5h9Djj6BXE/hqdefault.jpg" alt="Licious Brand Film">
                  <span>▶</span>
                </a>
              `}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          </div>
        </div>

        {/* 1. THE BRIEF */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.42s', ...sectionStyle }}>
          <div style={sectionTitleStyle}>01 — The Brief</div>
          <p style={bodyTextStyle}>
            <span style={highlightStyle}>Licious</span>, one of India's fastest-growing D2C meat and seafood brands, was celebrating
            its <span style={highlightStyle}>7th Foundation Day</span>. The brief was clear but ambitious: create a cinematic brand film
            that would capture seven years of relentless growth, cultural milestones, and the human stories behind the brand — all
            condensed into a single, emotionally resonant narrative.
          </p>
          <p style={bodyTextStyle}>
            I collaborated with <span style={highlightStyle}>Prism Scale Pvt. Ltd.</span> and Creative Director
            <span style={highlightStyle}> Dharam Vir Singh</span>, working from raw footage spanning team celebrations, warehouse operations,
            leadership moments, and candid employee interactions captured over the years.
          </p>
        </div>

        {/* 2. THE CHALLENGE */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.48s', ...sectionStyle }}>
          <div style={sectionTitleStyle}>02 — The Challenge</div>
          <p style={bodyTextStyle}>
            Anniversary films are dangerous territory. They risk becoming generic highlight reels — a montage of handshakes, office
            parties, and milestone numbers set to uplifting stock music. The actual craft lies in building a
            <span style={highlightStyle}> cinematic narrative</span> that makes the viewer <em>feel</em> the brand's journey, not just see it.
          </p>
          <p style={bodyTextStyle}>
            The challenge was threefold: distill years of diverse footage into a coherent visual story, maintain emotional momentum
            across the entire runtime, and honor the brand's culture without slipping into corporate cliché.
          </p>
        </div>

        {/* 3. MY APPROACH */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.54s', ...sectionStyle }}>
          <div style={sectionTitleStyle}>03 — My Approach</div>
          <p style={bodyTextStyle}>
            Every editing decision was driven by one principle: <span style={highlightStyle}>visual rhythm should mirror the brand's rhythm</span>.
            Licious grew explosively — and the edit needed to feel that kinetic energy.
          </p>
          <div style={{
            padding: isMobile ? '20px 18px' : '28px 32px', borderRadius: 12,
            background: 'rgba(200,169,110,0.04)', border: '1px solid rgba(200,169,110,0.1)',
            marginBottom: 24,
          }}>
            <ul style={{ margin: 0, paddingLeft: isMobile ? 16 : 20, listStyleType: 'none' }}>
              {[
                { label: 'Kinetic Transitions', desc: 'for high-energy celebrations and rapid-growth milestones — speed ramps, whip pans, and rhythmic cuts synced to the soundtrack' },
                { label: 'Deliberate Pacing', desc: 'for foundational brand moments — letting key frames breathe so the audience could absorb the emotional weight of each milestone' },
                { label: 'Authentic Human Moments', desc: 'candid employee interactions and behind-the-scenes footage were given room to breathe, creating contrast against the high-energy sequences' },
                { label: 'Color Grading', desc: 'a warm, golden-toned grade using DaVinci Resolve that unified footage from different cameras and time periods into a cohesive visual language' },
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: 16, fontSize: isMobile ? 14 : 15, color: 'rgba(242,238,232,0.6)', lineHeight: 1.7 }}>
                  <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2 }}>◈ </span>
                  <strong style={{ color: 'var(--white)' }}>{item.label}</strong> — {item.desc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. THE RESULT */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.60s', ...sectionStyle }}>
          <div style={sectionTitleStyle}>04 — The Result</div>
          <p style={bodyTextStyle}>
            The final film shaped <span style={highlightStyle}>7 years of journey into a single emotional story</span> — a narrative
            that moved from Licious's humble beginnings through explosive growth to the vibrant, people-first culture that defines
            the brand today. The film was premiered at the Foundation Day celebration and received outstanding reception from both
            the leadership team and employees.
          </p>
        </div>

        {/* 5. KEY LEARNING */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.66s', ...sectionStyle }}>
          <div style={sectionTitleStyle}>05 — Key Learning</div>
          <div style={{
            padding: isMobile ? '24px 20px' : '32px 40px', borderRadius: 16,
            background: 'rgba(200,169,110,0.05)', border: '1px solid rgba(200,169,110,0.12)',
            position: 'relative',
          }}>
            <div style={{ fontSize: 48, color: 'rgba(200,169,110,0.15)', fontFamily: 'var(--font-editorial)', position: 'absolute', top: 12, left: isMobile ? 16 : 28 }}>"</div>
            <p style={{
              fontSize: isMobile ? 18 : 22, color: 'var(--white)', lineHeight: 1.6,
              fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
              margin: 0, paddingLeft: isMobile ? 8 : 16,
            }}>
              Pacing dictates not just the speed of a video, but its emotional weight.
            </p>
          </div>
        </div>

        {/* 6. TOOLS USED */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.72s', ...sectionStyle }}>
          <div style={sectionTitleStyle}>06 — Tools Used</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve'].map((tool) => (
              <span key={tool} style={{
                padding: '10px 20px', borderRadius: 8,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2,
                color: 'rgba(242,238,232,0.5)', textTransform: 'uppercase',
              }}>{tool}</span>
            ))}
          </div>
        </div>

        {/* Credits */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.76s',
          padding: isMobile ? '24px 18px' : '32px 40px', borderRadius: 16,
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
          marginBottom: isMobile ? 48 : 64,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', marginBottom: 20, letterSpacing: 3, textTransform: 'uppercase' }}>◈ Credits</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
            {[
              { role: 'Client', name: 'Licious' },
              { role: 'Production Agency', name: 'Prism Scale Pvt. Ltd.' },
              { role: 'Creative Director', name: 'Dharam Vir Singh' },
              { role: 'Video Editor', name: 'Rushikesh Jadhav' },
            ].map((credit) => (
              <div key={credit.role}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'rgba(242,238,232,0.3)', marginBottom: 4, textTransform: 'uppercase' }}>{credit.role}</div>
                <div style={{ fontSize: 15, color: 'var(--white)' }}>{credit.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Links */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.80s', marginTop: isMobile ? 40 : 56, display: 'grid', gap: 18 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="https://mejadhavr.com/#/corporate-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Corporate Films</span></a>
            <a href="https://mejadhavr.com/#/product-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Product Videos</span></a>
            <a href="https://mejadhavr.com/#/realestate-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Real Estate Films</span></a>
            <a href="https://mejadhavr.com/#/event-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Event Highlights</span></a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="https://mejadhavr.com/#/contact" target="_blank" rel="noreferrer" className="cine-cta"><span className="cine-cta-label">Hire Me for Your Brand Film</span></a>
            <a href="https://mejadhavr.com/#/" target="_blank" rel="noreferrer" className="cine-cta-secondary"><span className="cine-cta-label">Open Main Website</span></a>
          </div>
        </div>

        <footer className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.86s', marginTop: 120, textAlign: 'center', paddingTop: 60, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: 'rgba(242,238,232,0.3)', marginBottom: 20 }}>
            Case Study · {new Date().getFullYear()}
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cine-cta-ghost" style={{ cursor: 'pointer' }}><span className="cine-cta-label">Back to Top <span className="cine-cta-arrow">↑</span></span></button>
        </footer>
      </main>
    </div>
  );
}
