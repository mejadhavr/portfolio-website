import { useState, useEffect } from "react";
import { AuroraBg } from './Shared';
import { useIsMobile, useSEO } from './hooks';

/* ─────────────────────────────────────────────
   CASE STUDY: Astik Dyestuff Corporate Film
───────────────────────────────────────────── */

export default function CaseStudyAstik() {
  useSEO({
    title: "Case Study: Astik Dyestuff Corporate Film | Industrial Video Editor India",
    description: "Deep-dive into editing the Astik Dyestuff corporate movie. How cinematic storytelling transformed a 45-year legacy in reactive dyes into an engaging brand narrative."
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
            ASTIK DYESTUFF<br />
            <span className="gold-text">CORPORATE FILM</span>
          </h1>
          <p className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.24s', fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'rgba(242,238,232,0.5)', lineHeight: 1.6, fontFamily: 'var(--font-editorial)', fontStyle: 'italic', maxWidth: 640 }}>
            Building a Cinematic Legacy for a 45-Year Industrial Pioneer
          </p>
          <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.30s', marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'rgba(242,238,232,0.35)' }}>
            <span>CLIENT: ASTIK DYESTUFF PVT. LTD.</span>
            <span style={{ color: 'rgba(242,238,232,0.15)' }}>|</span>
            <span>TYPE: CORPORATE MOVIE</span>
            <span style={{ color: 'rgba(242,238,232,0.15)' }}>|</span>
            <span>INDUSTRY: CHEMICAL MANUFACTURING</span>
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
              title="Astik Dyestuff Corporate Film"
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
                  <img src="https://img.youtube.com/vi/B5h9Djj6BXE/hqdefault.jpg" alt="Astik Dyestuff Corporate Film">
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
            <span style={highlightStyle}>Astik Dyestuff Pvt. Ltd.</span> — a leading manufacturer of reactive dyes with a
            <span style={highlightStyle}> 45-year legacy</span> in the Indian chemical industry — needed a corporate film that would
            communicate their scale, technological excellence, and industry leadership to clients, partners, and investors worldwide.
          </p>
          <p style={bodyTextStyle}>
            With manufacturing facilities spanning <span style={highlightStyle}>Ankleshwar (Gujarat)</span> and
            <span style={highlightStyle}> Tarapur (Maharashtra)</span>, and a strategic partnership with
            <span style={highlightStyle}> Nippon Kayaku Co. Ltd. (Japan)</span>, the film needed to convey both industrial precision
            and global credibility — all while keeping the narrative engaging and cinematic.
          </p>
        </div>

        {/* 2. THE CHALLENGE */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.48s', ...sectionStyle }}>
          <div style={sectionTitleStyle}>02 — The Challenge</div>
          <p style={bodyTextStyle}>
            Industrial corporate films carry a unique set of editing challenges. The raw footage is often shot across
            <span style={highlightStyle}> multiple factory floors, laboratories, and warehouse facilities</span> — environments that
            are visually complex, noisy, and rarely cinematic by default.
          </p>
          <p style={bodyTextStyle}>
            The challenge was to transform dense industrial footage — chemical reactors, quality control labs, packaging lines,
            and management walkthroughs — into a polished, emotionally engaging corporate narrative that would resonate with both
            technical buyers and business decision-makers.
          </p>
        </div>

        {/* 3. MY APPROACH */}
        <div className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.54s', ...sectionStyle }}>
          <div style={sectionTitleStyle}>03 — My Approach</div>
          <p style={bodyTextStyle}>
            The editing strategy was built around creating a <span style={highlightStyle}>visual hierarchy</span> — leading the viewer
            through the company's story from legacy to innovation to global impact.
          </p>
          <div style={{
            padding: isMobile ? '20px 18px' : '28px 32px', borderRadius: 12,
            background: 'rgba(200,169,110,0.04)', border: '1px solid rgba(200,169,110,0.1)',
            marginBottom: 24,
          }}>
            <ul style={{ margin: 0, paddingLeft: isMobile ? 16 : 20, listStyleType: 'none' }}>
              {[
                { label: 'Establishing Scale', desc: 'wide aerial and facility shots were graded with a cold industrial tone, then progressively warmed as the narrative moved toward innovation and human stories' },
                { label: 'Process Cinematography', desc: 'manufacturing sequences were cut to a rhythmic pace — reactor operations, dye mixing, and quality testing edited as visual choreography rather than documentation' },
                { label: 'Leadership Integration', desc: 'management and team footage was woven naturally between process shots, avoiding the static "talking head" format in favor of contextual, in-facility framing' },
                { label: 'Sound Design', desc: 'factory ambience was layered beneath the soundtrack — the hum of machinery, the precision of lab equipment — adding industrial texture without overwhelming the voiceover' },
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
            The final corporate film successfully communicates <span style={highlightStyle}>Astik's 45-year journey</span> —
            from a regional dye manufacturer to a globally recognized partner of Nippon Kayaku. The film balances technical authority
            with human warmth, giving viewers a cinematic window into the precision, scale, and culture that define the company.
          </p>
          <p style={bodyTextStyle}>
            The film is now used across client presentations, trade expo booths, and the company's digital channels as their
            primary brand communication tool.
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
              Industrial footage becomes cinematic when you edit for rhythm, not just information. The factory floor has its own heartbeat — the editor's job is to find it.
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
              { role: 'Client', name: 'Astik Dyestuff Pvt. Ltd.' },
              { role: 'Industry', name: 'Chemical Manufacturing / Reactive Dyes' },
              { role: 'Facilities', name: 'Ankleshwar, Gujarat & Tarapur, Maharashtra' },
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
            <a href="https://mejadhavr.com/#/case-study/licious-brand-film" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Licious Case Study</span></a>
            <a href="https://mejadhavr.com/#/corporate-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Corporate Films</span></a>
            <a href="https://mejadhavr.com/#/product-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Product Videos</span></a>
            <a href="https://mejadhavr.com/#/realestate-portfolio" target="_blank" rel="noreferrer" className="cine-cta-ghost"><span className="cine-cta-label">Real Estate Films</span></a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="https://mejadhavr.com/#/contact" target="_blank" rel="noreferrer" className="cine-cta"><span className="cine-cta-label">Hire Me for Your Corporate Film</span></a>
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
