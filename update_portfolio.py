import codecs
import re

with codecs.open("src/Portfolio.jsx", "r", "utf-8") as f:
    orig = f.read()

# Replace LoadingScreen
old_loading_screen = """/* ─────────────────────────────────────────────
   LOADING SCREEN – film leader countdown
───────────────────────────────────────────── */
function LoadingScreen({ onDone }) {
  const [count, setCount] = useState(5);
  const [phase, setPhase] = useState('count');

  useEffect(() => {
    if (count > 0) {
      const t = setTimeout(() => setCount(c => c - 1), 420);
      return () => clearTimeout(t);
    } else {
      setPhase('reveal');
      const t = setTimeout(onDone, 800);
      return () => clearTimeout(t);
    }
  }, [count, onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99990, background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', overflow: 'hidden',
      opacity: phase === 'reveal' ? 0 : 1,
      transition: 'opacity 0.8s ease',
    }}>
      {/* Film leader frame lines */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: i % 2 === 0 ? '4%' : 'auto',
          right: i % 2 === 1 ? '4%' : 'auto',
          top: `${10 + i * 11}%`,
          width: 28, height: 20,
          border: '2px solid rgba(255,255,255,0.15)',
          borderRadius: 2,
          animation: `frameFlicker ${0.3 + i * 0.05}s ease-in-out infinite alternate`,
        }} />
      ))}
      {/* Scanline */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        background: 'rgba(255,255,255,0.04)',
        animation: 'scanline 2s linear infinite',
      }} />
      {/* SMTPE color bars tiny */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, display: 'flex',
      }}>
        {['#C0C0C0', '#C0C000', '#00C0C0', '#00C000', '#C000C0', '#C00000', '#0000C0'].map((c, i) => (
          <div key={i} style={{ flex: 1, background: c, opacity: 0.4 }} />
        ))}
      </div>

      {phase === 'count' && (
        <>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 6,
            color: 'rgba(255,255,255,0.3)', marginBottom: 60,
            textTransform: 'uppercase',
          }}>
            MEJADHAVR · {new Date().getFullYear()} · PRODUCTION
          </div>
          <div key={count} style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(120px,25vw,220px)',
            color: '#fff', lineHeight: 1,
            animation: 'countDown 0.42s ease forwards',
            textShadow: '0 0 60px rgba(255,255,255,0.3)',
          }}>
            {count}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: 10,
            color: 'var(--gold)', marginTop: 60,
            animation: 'pulse 1s infinite alternate',
          }}>
            STAND BY
          </div>
        </>
      )}
    </div>
  );
}"""


new_loading_screen = """/* ─────────────────────────────────────────────
   LOADING SCREEN – linear progress bar
───────────────────────────────────────────── */
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    if (progress < 100) {
      // 100 steps of 60ms = 6000ms duration (half speed)
      const t = setTimeout(() => setProgress(p => Math.min(p + 1, 100)), 60);
      return () => clearTimeout(t);
    } else {
      setPhase('reveal');
      const t = setTimeout(onDone, 800);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99990, background: '#08080c',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', overflow: 'hidden',
      opacity: phase === 'reveal' ? 0 : 1,
      transition: 'opacity 0.8s ease',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 6,
        color: 'var(--gold)', marginBottom: 20, textTransform: 'uppercase',
      }}>
        LOADING {Math.floor(progress)}%
      </div>
      <div style={{
        width: 200, height: 2, background: 'rgba(255,255,255,0.1)',
        overflow: 'hidden', borderRadius: 1
      }}>
        <div style={{
          width: `${progress}%`, height: '100%',
          background: 'var(--gold)',
          transition: 'width 0.1s linear'
        }} />
      </div>
    </div>
  );
}"""

# Do regex replacement to avoid exact whitespace matching issues:
# Find the LoadingScreen block using regex
orig = re.sub(
    r'/\* ─+\n\s+LOADING SCREEN – film leader countdown\n─+ \*/\nfunction LoadingScreen.*?\}\n',
    new_loading_screen + "\n",
    orig,
    flags=re.DOTALL
)


# Replace LazySections with IDs
orig = orig.replace("<LazySection><Suspense fallback={null}><AboutSection /></Suspense></LazySection>", "<LazySection id=\"about\"><Suspense fallback={null}><AboutSection /></Suspense></LazySection>")
orig = orig.replace("<LazySection><Suspense fallback={null}><WorkSection /></Suspense></LazySection>", "<LazySection id=\"work\"><Suspense fallback={null}><WorkSection /></Suspense></LazySection>")
orig = orig.replace("<LazySection><Suspense fallback={null}><ServicesSection /></Suspense></LazySection>", "<LazySection id=\"services\"><Suspense fallback={null}><ServicesSection /></Suspense></LazySection>")
orig = orig.replace("<LazySection><Suspense fallback={null}><ClientsSection /></Suspense></LazySection>", "<LazySection id=\"clients\"><Suspense fallback={null}><ClientsSection /></Suspense></LazySection>")
orig = orig.replace("<LazySection><Suspense fallback={null}><VisualSection /></Suspense></LazySection>", "<LazySection id=\"visual\"><Suspense fallback={null}><VisualSection /></Suspense></LazySection>")
orig = orig.replace("<LazySection><Suspense fallback={null}><ContactSection /></Suspense></LazySection>", "<LazySection id=\"contact\"><Suspense fallback={null}><ContactSection /></Suspense></LazySection>")

with codecs.open("src/Portfolio.jsx", "w", "utf-8") as f:
    f.write(orig)

print("Portfolio updated.")
