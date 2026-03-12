import React from 'react';
import { useIsLowEnd, useIsMobile } from './hooks';

export function AuroraBg({ accent = 'gold' }) {
  const isLowEnd = useIsLowEnd();
  const isMobile = useIsMobile();
  const c1 = accent === 'cyan' ? 'rgba(0,201,255,0.12)' : 'rgba(200,169,110,0.1)';
  const c2 = accent === 'cyan' ? 'rgba(0,245,255,0.08)' : 'rgba(240,213,160,0.07)';
  return (
    <div className="aurora-bg" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', transform: 'translateZ(0)', willChange: 'transform' }}>
      <div style={{
        position: 'absolute', width: '80%', height: '80%', top: '-20%', left: '-10%',
        background: `radial-gradient(ellipse at center, ${c1}, transparent 70%)`,
        filter: isLowEnd || isMobile ? 'blur(20px)' : 'blur(60px)', animation: 'aurora1 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: '60%', height: '70%', top: '20%', right: '-15%',
        background: `radial-gradient(ellipse at center, ${c2}, transparent 70%)`,
        filter: isLowEnd || isMobile ? 'blur(24px)' : 'blur(80px)', animation: 'aurora2 22s ease-in-out infinite',
      }} />
      {!isMobile && (
        <div style={{
          position: 'absolute', width: '50%', height: '50%', bottom: '-10%', left: '30%',
          background: `radial-gradient(ellipse at center, rgba(138,43,226,0.06), transparent 70%)`,
          filter: isLowEnd ? 'blur(25px)' : 'blur(70px)', animation: 'aurora3 15s ease-in-out infinite',
        }} />
      )}
    </div>
  );
}
export function ContactDock() {
  const isMobile = useIsMobile();
  const links = [
    {
      id: 'wa', label: 'WhatsApp', url: 'https://wa.me/919309964035?text=Hi%20Rushikesh%20I%20saw%20your%20portfolio', icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
      )
    },
    {
      id: 'mail', label: 'Hire Me', url: 'mailto:rushikesh@mejadhavr.com', icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
      )
    }
  ];

  if (isMobile) return null;

  return (
    <div className="contact-dock" style={{
      position: 'fixed', bottom: 'max(24px, env(safe-area-inset-bottom))', right: 24, zIndex: 999,
      display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center'
    }}>
      {/* Brand Icon at top of dock */}
      <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}
        style={{
          width: 44, height: 44, borderRadius: '50%', background: 'rgba(200, 169, 110, 0.1)',
          backdropFilter: 'blur(8px)', border: '1px solid var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 4, transition: 'all 0.3s ease', cursor: 'none',
          overflow: 'hidden'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img src="/images/logo.webp" alt="MJ" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </a>

      {links.map(link => (
        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
          aria-label={link.label}
          style={{
            width: 44, height: 44, borderRadius: '50%', background: 'rgba(6, 6, 12, 0.8)',
            backdropFilter: 'blur(8px)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--gold)', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)', cursor: 'none'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateX(-8px)';
            e.currentTarget.style.borderColor = 'var(--gold)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(200, 169, 110, 0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
          }}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
