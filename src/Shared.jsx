import React, { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth <= 768 : false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

export function AuroraBg({ accent = 'gold' }) {
  const c1 = accent === 'cyan' ? 'rgba(0,201,255,0.12)' : 'rgba(200,169,110,0.1)';
  const c2 = accent === 'cyan' ? 'rgba(0,245,255,0.08)' : 'rgba(240,213,160,0.07)';
  return (
    <div className="aurora-bg" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', transform: 'translateZ(0)', willChange: 'transform' }}>
      <div style={{
        position: 'absolute', width: '80%', height: '80%', top: '-20%', left: '-10%',
        background: `radial-gradient(ellipse at center, ${c1}, transparent 70%)`,
        filter: 'blur(60px)', animation: 'aurora1 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: '60%', height: '70%', top: '20%', right: '-15%',
        background: `radial-gradient(ellipse at center, ${c2}, transparent 70%)`,
        filter: 'blur(80px)', animation: 'aurora2 22s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: '50%', height: '50%', bottom: '-10%', left: '30%',
        background: `radial-gradient(ellipse at center, rgba(138,43,226,0.06), transparent 70%)`,
        filter: 'blur(70px)', animation: 'aurora3 15s ease-in-out infinite',
      }} />
    </div>
  );
}
