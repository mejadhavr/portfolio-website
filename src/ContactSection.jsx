import React, { useState, useEffect, useRef, useCallback, useMemo, memo, Suspense, lazy } from 'react';
import { useIsMobile, AuroraBg } from './Shared';
/* ─────────────────────────────────────────────
   CONTACT SECTION
───────────────────────────────────────────── */
const contactSocials = [
  {
    label: 'YouTube', url: 'https://www.youtube.com/@editsbymejadhavr/playlists', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M21.5 7.3a2.7 2.7 0 00-1.9-1.9C18 5 12 5 12 5s-6 0-7.6.4a2.7 2.7 0 00-1.9 1.9C2 8.9 2 12 2 12s0 3.1.5 4.7a2.7 2.7 0 001.9 1.9C6 19 12 19 12 19s6 0 7.6-.4a2.7 2.7 0 001.9-1.9c.5-1.6.5-4.7.5-4.7s0-3.1-.5-4.7zm-11.5 7.7V9l5 3-5 3z" /></svg>
    )
  },
  {
    label: 'Instagram', url: 'https://www.instagram.com/editsby_mejadhavr/', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.2-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.3 2.2 12s0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.2c1.3-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4A6.2 6.2 0 0012 5.8zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z" /></svg>
    )
  },
  {
    label: 'LinkedIn', url: 'https://www.linkedin.com/in/mejadhavr/', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M20.4 2H3.6A1.6 1.6 0 002 3.6v16.8A1.6 1.6 0 003.6 22h16.8a1.6 1.6 0 001.6-1.6V3.6A1.6 1.6 0 0020.4 2zM8 19H5V9h3v10zm-1.5-11.3a1.7 1.7 0 110-3.4 1.7 1.7 0 010 3.4zM19 19h-3v-5.5c0-1.1 0-2.6-1.6-2.6S12.8 12.4 12.8 13.4V19H10V9h2.9v1.4c.4-.8 1.5-1.6 3-1.6 3.3 0 3.9 2.1 3.9 4.9V19z" /></svg>
    )
  },
  {
    label: 'Vimeo', url: 'https://vimeo.com/mejadhavr', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M22.4 7.2c-.1 2.2-1.6 5.3-4.6 9.1C14.7 20.3 12 22 9.8 22c-1.4 0-2.5-1.3-3.5-3.8L4.6 13c-.7-2.5-1.4-3.8-2.2-3.8-.2 0-.7.3-1.7.9L0 9c1.1-1 2.1-1.9 3.2-2.9 1.4-1.2 2.5-1.9 3.2-1.9 1.7-.2 2.7 1 3.1 3.5l1.4 8.7c.4 2.5 1 3.8 1.6 3.8.4 0 1.1-.7 2-2 .9-1.4 1.4-2.4 1.5-3.1.1-1.2-.3-1.7-1.5-1.7-.5 0-1.1.1-1.7.4 1.1-3.7 3.3-5.5 6.5-5.3 2.4.2 3.6 1.6 3.6 4.7l-.5.8z" /></svg>
    )
  },
  {
    label: 'Behance', url: 'https://www.behance.net/mejadhavr', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M6.9 13.1c.6 0 1.1-.2 1.4-.5.3-.3.5-.8.5-1.4s-.2-1-.5-1.3C8 9.6 7.5 9.4 6.9 9.4H4v3.7h2.9zm.4 4.8c.7 0 1.2-.2 1.6-.5.4-.4.5-.9.5-1.5s-.2-1.1-.5-1.4c-.4-.4-.9-.5-1.6-.5H4v4h3.3zM15.9 10c-.5 0-.9.1-1.3.4-.3.3-.5.7-.6 1.2h3.9c0-.5-.2-.9-.5-1.2-.4-.3-.9-.4-1.5-.4zm3.6 3.1h-5.5c0 .7.3 1.2.7 1.5.4.3.9.5 1.5.5.5 0 .9-.1 1.2-.3.3-.2.6-.5.7-.9h2.3c-.3 1-.8 1.7-1.6 2.2-.8.5-1.7.7-2.7.7-1.2 0-2.2-.4-3-1.1-.8-.7-1.1-1.7-1.1-3s.4-2.3 1.1-3c.8-.7 1.8-1.1 3-1.1s2.2.4 2.9 1.1c.7.7 1.1 1.8 1.1 3 .1.1.1.3 0 .4zM14.5 7H17v1.4h-2.5V7zM2 7h5.6c1.2 0 2.1.3 2.8.9.6.6 1 1.3 1 2.2 0 .9-.3 1.6-1 2.1.9.4 1.4 1.1 1.4 2.2 0 1-.4 1.8-1.1 2.4-.7.6-1.7.9-2.9.9H2V7z" /></svg>
    )
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} style={{
      position: 'relative', padding: '120px 40px 80px',
      background: 'linear-gradient(180deg, var(--bg2), #030306)',
      overflow: 'hidden',
    }}>
      <AuroraBg accent="gold" />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className={`reveal-section ${vis ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 70 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>◈ Contact</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,10vw,120px)', lineHeight: 0.88, color: 'var(--white)', marginBottom: 28 }}>
            LET'S<br />
            <span className="gold-text">MAKE</span><br />
            SOMETHING
          </h2>
          <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 22, color: 'rgba(242,238,232,0.45)', maxWidth: 500, margin: '0 auto' }}>
            Have a project in mind? Let's create something that moves people.
          </p>
        </div>

        {/* Contact cards */}
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            marginBottom: 50,
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(30px)',
            transition: 'opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s',
          }}
        >

          {/* EMAIL CARD */}
          <a
            href="mailto:rushikesh@mejadhavr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            style={{
              padding: '36px',
              textDecoration: 'none',
              display: 'block',
              cursor: 'none',
              transition: 'all 0.3s'
            }}
          >

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: 4,
              color: 'var(--gold)',
              marginBottom: 12
            }}>
              EMAIL
            </div>

            <div className="email-text" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 20,
              color: 'var(--white)',
              marginBottom: 10,
              letterSpacing: 0.3,
              textTransform: 'none',
              wordBreak: 'normal',
              whiteSpace: 'nowrap'
            }}>
              rushikesh<span style={{ opacity: 0.6 }}>@mejadhavr.com</span>
            </div>

            <div style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 18,
              letterSpacing: 0.3,
              color: 'var(--gold)',
              fontStyle: 'italic'
            }}>
              Send a project inquiry →
            </div>

          </a>


          {/* WHATSAPP CARD */}
          <a
            href="https://wa.me/919309964035"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            style={{
              padding: '36px',
              textDecoration: 'none',
              display: 'block',
              cursor: 'none',
              transition: 'all 0.3s'
            }}
          >

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: 4,
              color: 'var(--cyan)',
              marginBottom: 12
            }}>
              WHATSAPP
            </div>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 20,
              color: 'var(--white)',
              marginBottom: 10
            }}>
              +91 93099 64035
            </div>

            <div style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 18,
              letterSpacing: 0.3,
              color: 'var(--cyan)',
              fontStyle: 'italic'
            }}>
              Chat instantly about your project →
            </div>

            <div style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 14,
              color: 'rgba(242,238,232,0.4)',
              marginTop: 6
            }}>
              Typically replies within 1 hour
            </div>

          </a>

        </div>

        {/* Social icons */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap',
          opacity: vis ? 1 : 0, transition: 'opacity 1s ease 0.7s',
        }}>
          {contactSocials.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(242,238,232,0.5)', textDecoration: 'none', cursor: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,169,110,0.1)'; e.currentTarget.style.borderColor = 'rgba(200,169,110,0.3)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(200,169,110,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(242,238,232,0.5)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 80, textAlign: 'center', paddingTop: 40,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            letterSpacing: 4,
            color: 'rgba(242,238,232,0.35)',
            marginBottom: 8
          }}>
            MEJADHAVR
          </div>

          <div style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 14,
            color: 'rgba(242,238,232,0.35)',
            marginBottom: 32
          }}>
            Pune · India
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.1)', 
              color: 'rgba(242,238,232,0.6)', padding: '10px 24px', borderRadius: 30,
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, 
              textTransform: 'uppercase', cursor: 'none', marginBottom: 40,
              transition: 'all 0.4s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,238,232,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            ↑ Back to Top
          </button>

          <div className="footer-copyright" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: 2,
            color: 'rgba(242,238,232,0.3)',
            lineHeight: 1.8,
            padding: '0 20px',
            paddingBottom: 40
          }}>
            © {new Date().getFullYear()} · RUSHIKESH JADHAV<br className="mobile-only-break" /> · ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </section>
  );
}

