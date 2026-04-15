import { useState, useEffect } from "react";
import { AuroraBg } from './Shared';
import { useIsMobile, useSEO } from './hooks';

/* ─────────────────────────────────────────────
   CASE STUDY: Bible Notes App Demo
───────────────────────────────────────────── */

export default function CaseStudyBibleNotes() {
  useSEO({
    title: "Case Study: Bible Notes App Demo | SaaS Video Editor",
    description: "Deep-dive into editing the Bible Notes SaaS app demo. Showcasing typography-driven callouts and responsive motion graphics."
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
    color: '#EC654E',
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
    color: '#EC654E',
    fontWeight: 500,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#06060C', color: '#F2EEE8', position: 'relative', overflowX: 'hidden' }}>
      <AuroraBg accent="blue" />

      {/* Navigation */}
      <nav className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.02s', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: isMobile ? '18px 16px' : '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(6,6,12,0.8), transparent)', backdropFilter: isMobile ? 'blur(6px)' : 'blur(10px)' }}>
        <a href="https://mejadhavr.com/#/" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 4, color: 'rgba(242,238,232,0.5)', textDecoration: 'none' }}>MEJADHAVR</a>
        <a href="https://mejadhavr.com/#/" target="_blank" rel="noreferrer" className="cine-cta-ghost" style={{ cursor: 'pointer' }}><span className="cine-cta-label">Main Website <span className="cine-cta-arrow">-&gt;</span></span></a>
      </nav>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '116px 16px 64px' : '160px 20px 80px', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <header style={{ marginBottom: isMobile ? 48 : 72 }}>
          <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.08s', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: '#EC654E', marginBottom: 20, textTransform: 'uppercase' }}>◈ Case Study</div>
          <h1 className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.16s', fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1, marginBottom: 28 }}>
            BIBLE NOTES<br />
            <span style={{ color: '#EC654E' }}>APP DEMO SAAS</span>
          </h1>
          <p className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.24s', fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'rgba(242,238,232,0.5)', lineHeight: 1.6, fontFamily: 'var(--font-editorial)', fontStyle: 'italic', maxWidth: 640 }}>
            Demonstrating features with high-energy typography and seamless motion graphics.
          </p>
          <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.30s', marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'rgba(242,238,232,0.35)' }}>
            <span>PROJECT: BIBLE NOTES</span>
            <span style={{ color: 'rgba(242,238,232,0.15)' }}>|</span>
            <span>TYPE: SAAS WALKTHROUGH</span>
            <span style={{ color: 'rgba(242,238,232,0.15)' }}>|</span>
            <span>AGENCY: PRISMSCALE PVT. LTD.</span>
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
              title="Bible Notes App Demo"
              srcDoc={`
                <style>
                  * { padding: 0; margin: 0; overflow: hidden; background: #000; }
                  html, body { height: 100%; }
                  img, span { position: absolute; width: 100%; top: 0; bottom: 0; margin: auto; object-fit: cover; }
                  span {
                    height: 72px; width: 72px; line-height: 72px; text-align: center;
                    font-size: 28px; color: #fff; background: rgba(0,201,255,0.9);
                    border-radius: 50%; z-index: 2; left: 50%; transform: translateX(-50%);
                    box-shadow: 0 0 30px rgba(0,0,0,0.5); transition: all 0.3s;
                  }
                  a:hover span { background: #00C9FF; transform: translateX(-50%) scale(1.15); }
                </style>
                <a href="https://www.youtube.com/embed/pMXSbRRVaFI?autoplay=1&rel=0">
                  <img src="https://img.youtube.com/vi/pMXSbRRVaFI/hqdefault.jpg" alt="Bible Notes App Demo">
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

        {/* 1. THE VISION */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.42s', ...sectionStyle }}>
          <div style={sectionTitleStyle}>01 — The Vision</div>
          <p style={bodyTextStyle}>
            Animating UI screen recordings can get stagnant quickly. For the <span style={highlightStyle}>Bible Notes</span> app demo,
            we wanted to avoid the generic "raw screen capture" feel. Partnering with <span style={highlightStyle}>PrismScale Pvt. Ltd.</span> under the creative direction of <span style={highlightStyle}>Dharam Vir Singh</span>, the goal was to elevate a basic software walkthrough into a high-energy product demonstration.
          </p>
        </div>

        {/* 2. THE CHALLENGE & APPROACH */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.48s', ...sectionStyle }}>
          <div style={sectionTitleStyle}>02 — The Challenge & Approach</div>
          <p style={bodyTextStyle}>
            The primary challenge was keeping the viewer engaged while explaining app features. Instead of just letting the screen recording play, I introduced <span style={highlightStyle}>sharp, typography-driven callouts</span> that snap onto the screen, perfectly synced with the voiceover.
          </p>
          <div style={{
            padding: isMobile ? '20px 18px' : '28px 32px', borderRadius: 12,
            background: 'rgba(0,201,255,0.04)', border: '1px solid rgba(0,201,255,0.1)',
            marginBottom: 24,
          }}>
            <ul style={{ margin: 0, paddingLeft: isMobile ? 16 : 20, listStyleType: 'none' }}>
              {[
                { label: 'Typography Integration', desc: 'At [01:12], callouts for "Book," "Chapter," and "Verse" literally snap into place around the text "John 3:16", guiding the viewer’s eye immediately to the AutoVerse feature.' },
                { label: 'UI Synchronization', desc: 'Paired with Safa\'s remarkably clean Illustrator designs, this precise composition transforms basic typing actions into a dynamic presentation.' },
                { label: 'Complex Compositions', desc: 'The project heavily utilized over 200+ layers seamlessly structured to combine motion graphics, UI elements, and screen recordings.' },
                { label: '3D Elements', desc: 'Enhancing the visual depth with Element 3D allowed us to move beyond flat UI constraints.' },
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: 16, fontSize: isMobile ? 14 : 15, color: 'rgba(242,238,232,0.6)', lineHeight: 1.7 }}>
                  <span style={{ color: '#EC654E', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2 }}>◈ </span>
                  <strong style={{ color: 'var(--white)' }}>{item.label}</strong> — {item.desc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. KEY LEARNING */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.54s', ...sectionStyle }}>
          <div style={sectionTitleStyle}>03 — The Philosophy</div>
          <div style={{
            padding: isMobile ? '24px 20px' : '32px 40px', borderRadius: 16,
            background: 'rgba(0,201,255,0.05)', border: '1px solid rgba(0,201,255,0.12)',
            position: 'relative',
          }}>
            <div style={{ fontSize: 48, color: 'rgba(0,201,255,0.15)', fontFamily: 'var(--font-editorial)', position: 'absolute', top: 12, left: isMobile ? 16 : 28 }}>"</div>
            <p style={{
              fontSize: isMobile ? 18 : 22, color: 'var(--white)', lineHeight: 1.6,
              fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
              margin: 0, paddingLeft: isMobile ? 8 : 16,
            }}>
              Bringing designs to life.
            </p>
          </div>
        </div>

        {/* 4. TOOLS USED */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.60s', ...sectionStyle }}>
          <div style={sectionTitleStyle}>04 — Tools Used</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {['Figma', 'Adobe Illustrator', 'After Effects', 'Premiere Pro', 'Element 3D'].map((tool) => (
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
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{
          '--delay': '0.66s',
          padding: isMobile ? '24px 18px' : '32px 40px', borderRadius: 16,
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
          marginBottom: isMobile ? 48 : 64,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#EC654E', marginBottom: 20, letterSpacing: 3, textTransform: 'uppercase' }}>◈ Credits</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
            {[
              { role: 'Agency', name: 'PrismScale Pvt. Ltd.' },
              { role: 'Creative Director', name: 'Dharam Vir Singh' },
              { role: 'UI Designs', name: 'Safa' },
              { role: 'SaaS Video Editor', name: 'Rushikesh Jadhav' },
            ].map((credit) => (
              <div key={credit.role}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'rgba(242,238,232,0.3)', marginBottom: 4, textTransform: 'uppercase' }}>{credit.role}</div>
                <div style={{ fontSize: 15, color: 'var(--white)' }}>{credit.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Links */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.70s', marginTop: isMobile ? 40 : 56, display: 'grid', gap: 18 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="https://mejadhavr.com/#/saas-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">SaaS Showcase</span></a>
            <a href="https://mejadhavr.com/#/case-study/licious-brand-film" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Licious Case Study</span></a>
            <a href="https://mejadhavr.com/#/case-study/astik-dyestuff-corporate-film" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Astik Corporate</span></a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="https://mejadhavr.com/#/contact" target="_blank" rel="noreferrer" className="cine-cta"><span className="cine-cta-label">Hire Me for Your SaaS Demo</span></a>
            <a href="https://mejadhavr.com/#/" target="_blank" rel="noreferrer" className="cine-cta-secondary"><span className="cine-cta-label">Open Main Website</span></a>
          </div>
        </div>

        {/* Tags */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.74s', marginTop: 40, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(242,238,232,0.4)', letterSpacing: 1, lineHeight: 1.8 }}>
            #VideoEditing #CinematicVideo #CorporateFilm #PuneVideoEditor #VideoProduction #MotionGraphics #SaaSVideo
          </p>
        </div>

        <footer className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.76s', marginTop: 120, textAlign: 'center', paddingTop: 60, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: 'rgba(242,238,232,0.3)', marginBottom: 20 }}>
            Case Study · {new Date().getFullYear()}
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cine-cta-ghost" style={{ cursor: 'pointer' }}><span className="cine-cta-label">Back to Top <span className="cine-cta-arrow">↑</span></span></button>
        </footer>
      </main>
    </div>
  );
}
