import { Link } from 'react-router-dom';
import { AuroraBg } from './Shared';
import { useIsMobile } from './hooks';

export default function NotFound() {
  const isMobile = useIsMobile();

  return (
    <div style={{
      position: 'relative',
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: 'var(--bg)',
      color: 'var(--white)',
      padding: '20px',
      overflow: 'hidden',
      textAlign: 'center'
    }}>
      <AuroraBg accent="gold" />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 'clamp(80px, 30vw, 150px)' : 'clamp(100px, 20vw, 240px)',
          lineHeight: 1,
          color: 'var(--gold)',
          textShadow: '0 0 30px rgba(200, 169, 110, 0.4)',
          marginBottom: 16
        }}>
          404
        </h1>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 'clamp(24px, 8vw, 36px)' : 'clamp(32px, 5vw, 48px)',
          letterSpacing: 3,
          textTransform: 'uppercase',
          marginBottom: 24,
          color: 'var(--white)'
        }}>
          Lost in Transmission
        </h2>
        <p style={{
          fontFamily: 'var(--font-editorial)',
          fontSize: 'clamp(16px, 4vw, 20px)',
          color: 'rgba(255, 255, 255, 0.7)',
          maxWidth: 450,
          margin: '0 auto 40px auto',
          lineHeight: 1.6
        }}>
          The page you are looking for seems to have been lost in the digital ether. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="cine-cta"
          style={{
            textDecoration: 'none',
            padding: '16px 32px',
            cursor: 'none'
          }}
        >
          <span className="cine-cta-label">Return to Home <span className="cine-cta-arrow">→</span></span>
        </Link>
      </div>
    </div>
  );
}