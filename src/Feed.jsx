import { useState, useEffect, useCallback, memo } from "react";
import { AuroraBg } from './Shared';
import { useIsMobile, useSEO } from './hooks';

/* ─────────────────────────────────────────────
   FEED DATA — Realistic content mapped to actual projects
───────────────────────────────────────────── */

const FEED_POSTS = [
  {
    id: 'licious-case-study',
    type: 'Case study',
    date: 'Apr 2025',
    readTime: '5 min read',
    title: "How we made Licious feel like cinema — not just an ad",
    excerpt: "The brief was simple: show why Licious is premium. The challenge was avoiding every tired food-video cliché. Here's the frame-by-frame thinking behind the grade, the pacing, and why we cut 40 seconds the client loved.",
    cta: 'Read case study',
    ctaIcon: '→',
    videoId: 'd3xqNKXgMO4',
    link: '/#/case-study/licious-brand-film',
    featured: true,
  },
  {
    id: 'astik-bts',
    type: 'Behind the scenes',
    date: 'Mar 2025',
    readTime: '3 min',
    title: "Shooting a corporate film in a live factory — what nobody tells you",
    excerpt: "Astik Dyestuff gave us 6 hours, one shift, and no second chance. Here's how we mapped audio, light, and b-roll in a chemical plant.",
    cta: 'Read more',
    ctaIcon: '→',
    videoId: 'jtSj3KXBXEQ',
    link: '/#/case-study/astik-dyestuff-corporate-film',
  },
  {
    id: 'saas-3-second-rule',
    type: 'Process & tips',
    date: 'Feb 2025',
    readTime: '4 min',
    title: 'How I open every SaaS demo video — and why most get it wrong',
    excerpt: "After editing the Bible Notes app demo and three other SaaS products, a pattern emerged. Here's the 3-second rule I now follow.",
    cta: 'Read more',
    ctaIcon: '→',
    quote: '"The first 3 seconds decide everything. After that you\'re just keeping the promise."',
    link: '/#/case-study/bible-notes-app-demo',
  },
  {
    id: 'real-estate-spotlight',
    type: 'Client work',
    date: 'Jan 2025',
    readTime: '2 min watch',
    title: "Luxury real estate film — Wakad project walkthrough",
    excerpt: "The brief asked for aspirational. We delivered cinematic. A look at how aerial + interior work together when the property sells a lifestyle, not just a flat.",
    cta: 'Watch film',
    ctaIcon: '→',
    videoId: 'y6BYSaINq2w',
    link: '/#/realestate-portfolio',
  },
  {
    id: 'indian-brands-thoughts',
    type: 'Thoughts',
    date: 'Dec 2024',
    readTime: '4 min',
    title: "Are Indian D2C brands ready for cinematic video?",
    excerpt: "After working with food, fashion, and SaaS brands across Pune and Mumbai, a clear split is emerging — and it's not about budget.",
    cta: 'Read more',
    ctaIcon: '→',
    quote: '"Most Indian brands still treat video as photography with movement. The ones who don\'t are winning attention budgets they never expected."',
  },
  {
    id: 'davinci-node-tree',
    type: 'Process & tips',
    date: 'Nov 2024',
    readTime: '5 min',
    title: "Brand film vs. corporate film — why my DaVinci Resolve node tree changes",
    excerpt: "Same LUT, same footage, two different storytelling goals. Here's how my DaVinci Resolve node tree changes between the two.",
    cta: 'Read more',
    ctaIcon: '→',
    quote: '"Brand film grading: push saturation, kill neutrals. Corporate film: trust is muted. Know which mode you\'re in."',
  },
  {
    id: 'tabletop-bts',
    type: 'Behind the scenes',
    date: 'Oct 2024',
    readTime: '3 min',
    title: "Product table-top shoots — 6 shots that made the final cut vs 40 that didn't",
    excerpt: "Table-top product films look simple. They're not. A look at the lighting rig, lens choices, and the 6 shots that made the final cut vs the 40 that didn't.",
    cta: 'Read more',
    ctaIcon: '→',
    videoId: 'mP404v4w1_A',
    link: '/#/product-portfolio',
  },
  {
    id: 'event-coverage-tips',
    type: 'Process & tips',
    date: 'Sep 2024',
    readTime: '4 min',
    title: "Why I always record room tone — and 4 other habits that save hours in post",
    excerpt: "Small habits compound. Room tone, slate discipline, color charts, proxy workflows — the boring stuff that separates amateurs from professionals.",
    cta: 'Read more',
    ctaIcon: '→',
  },
  {
    id: 'bible-notes-spotlight',
    type: 'Client work',
    date: 'Aug 2024',
    readTime: '2 min watch',
    title: "Bible Notes app — motion graphics demo that took 200+ layers",
    excerpt: "A clean, minimal demo that looks effortless. Behind it: 200+ After Effects layers, Element 3D, and a Figma-to-motion pipeline that took weeks to refine.",
    cta: 'Watch demo',
    ctaIcon: '→',
    videoId: 'NbqM5eTjYKI',
    link: '/#/case-study/bible-notes-app-demo',
  },
];

const FILTER_TABS = ['All', 'Case study', 'Behind the scenes', 'Process & tips', 'Client work', 'Thoughts'];

const BADGE_COLORS = {
  'Case study': { bg: 'rgba(200,169,110,0.15)', color: '#C8A96E', border: 'rgba(200,169,110,0.3)' },
  'Behind the scenes': { bg: 'rgba(255,90,90,0.12)', color: '#FF6B6B', border: 'rgba(255,90,90,0.25)' },
  'Process & tips': { bg: 'rgba(0,201,255,0.12)', color: '#00C9FF', border: 'rgba(0,201,255,0.25)' },
  'Client work': { bg: 'rgba(130,200,110,0.12)', color: '#82C86E', border: 'rgba(130,200,110,0.25)' },
  'Thoughts': { bg: 'rgba(180,140,255,0.12)', color: '#B48CFF', border: 'rgba(180,140,255,0.25)' },
};

/* ─────────────────────────────────────────────
   VideoThumbnail — lazy-loaded, play-on-click
───────────────────────────────────────────── */
const VideoThumbnail = memo(function VideoThumbnail({ videoId, title, large }) {
  const [playing, setPlaying] = useState(false);

  if (!videoId) return null;

  return (
    <div className="feed-video-thumb" style={{ aspectRatio: large ? '16/9' : '16/10' }}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', cursor: 'pointer', background: 'none', padding: 0 }}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="feed-play-btn">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><polygon points="8,5 19,12 8,19" /></svg>
          </div>
        </button>
      )}
    </div>
  );
});

/* ─────────────────────────────────────────────
   QuoteBlock — for posts with pull-quotes
───────────────────────────────────────────── */
function QuoteBlock({ quote, badgeColor }) {
  if (!quote) return null;
  return (
    <div className="feed-quote-block" style={{ borderLeftColor: badgeColor || 'var(--gold)' }}>
      <p>{quote}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FeedCard — individual post card
───────────────────────────────────────────── */
const FeedCard = memo(function FeedCard({ post, index, featured }) {
  const badge = BADGE_COLORS[post.type] || BADGE_COLORS['Case study'];

  return (
    <article
      className={`feed-card ${featured ? 'feed-card--featured' : ''} cine-reveal cine-rise`}
      style={{ '--delay': `${0.08 + index * 0.06}s`, animationDelay: `${0.08 + index * 0.06}s` }}
    >
      {/* Video thumbnail or quote visual */}
      {post.videoId ? (
        <VideoThumbnail videoId={post.videoId} title={post.title} large={featured} />
      ) : post.quote ? (
        <QuoteBlock quote={post.quote} badgeColor={badge.color} />
      ) : null}

      {/* Card body */}
      <div className="feed-card__body">
        {/* Meta row: badge + date */}
        <div className="feed-card__meta">
          <span
            className="feed-badge"
            style={{
              background: badge.bg,
              color: badge.color,
              border: `1px solid ${badge.border}`,
            }}
          >
            {post.type}
          </span>
          <span className="feed-card__date">{post.date}</span>
          {featured && <span className="feed-card__date">{post.readTime}</span>}
        </div>

        {/* Title */}
        <h2 className={`feed-card__title ${featured ? 'feed-card__title--featured' : ''}`}>
          {post.link ? <a href={post.link}>{post.title}</a> : post.title}
        </h2>

        {/* Excerpt */}
        <p className="feed-card__excerpt">{post.excerpt}</p>

        {/* CTA + read time */}
        <div className="feed-card__footer">
          {post.link ? (
            <a href={post.link} className="feed-card__cta">
              {post.cta} <span className="feed-card__cta-arrow">{post.ctaIcon}</span>
            </a>
          ) : (
            <span className="feed-card__cta feed-card__cta--draft">
              {post.cta} <span className="feed-card__cta-arrow">{post.ctaIcon}</span>
            </span>
          )}
          {!featured && <span className="feed-card__readtime">{post.readTime}</span>}
        </div>
      </div>
    </article>
  );
});

/* ─────────────────────────────────────────────
   MAIN FEED COMPONENT
───────────────────────────────────────────── */
export default function Feed() {
  useSEO({
    title: "From the Edit Bay — Creative Journal | Rushikesh Jadhav",
    description: "Case studies, behind-the-scenes stories, editing tips, and creative thoughts from a cinematic video editor in Pune, India. See how the work gets made.",
  });

  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState('All');
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(t);
  }, []);

  const filteredPosts = activeFilter === 'All'
    ? FEED_POSTS
    : FEED_POSTS.filter(p => p.type === activeFilter);

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const gridPosts = filteredPosts.filter(p => p !== featuredPost);

  const handleFilterClick = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  return (
    <div className="feed-page" style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--white)', position: 'relative', overflowX: 'hidden' }}>
      <AuroraBg accent="gold" />

      {/* ── Navigation ── */}
      <nav
        className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`}
        style={{
          '--delay': '0.02s',
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: isMobile ? '16px 16px' : '20px 40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'linear-gradient(to bottom, rgba(6,6,12,0.92), rgba(6,6,12,0.6), transparent)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <a href="/#/" style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 4, color: 'rgba(242,238,232,0.5)', textDecoration: 'none' }}>MEJADHAVR</a>
        <a href="/#/contact" className="cine-cta-ghost" style={{ cursor: 'pointer', fontSize: 10, padding: '10px 20px' }}>
          <span className="cine-cta-label">Work with me <span className="cine-cta-arrow">→</span></span>
        </a>
      </nav>

      {/* ── Main ── */}
      <main style={{ maxWidth: 960, margin: '0 auto', padding: isMobile ? '100px 16px 64px' : '130px 24px 80px', position: 'relative', zIndex: 2 }}>

        {/* ── Header ── */}
        <header className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.06s', marginBottom: isMobile ? 32 : 48 }}>
          <h1 className="feed-page-title">From the Edit Bay</h1>
          <p className="feed-page-subtitle">
            Projects, process notes and perspectives — Rushikesh Jadhav, Pune
          </p>
        </header>

        {/* ── Filter Tabs ── */}
        <div className={`feed-filters cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.12s' }}>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              className={`feed-filter-pill ${activeFilter === tab ? 'feed-filter-pill--active' : ''}`}
              onClick={() => handleFilterClick(tab)}
              aria-pressed={activeFilter === tab}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Featured Post ── */}
        {featuredPost && (
          <section className={`cine-reveal cine-zoom ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.18s', marginBottom: isMobile ? 40 : 56 }}>
            <FeedCard post={featuredPost} index={0} featured={true} />
          </section>
        )}

        {/* ── Grid Section Label ── */}
        {gridPosts.length > 0 && (
          <div className={`feed-section-label cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.24s' }}>
            <span>More from the feed</span>
            <div className="feed-section-line" />
          </div>
        )}

        {/* ── Card Grid ── */}
        <div className="feed-grid">
          {gridPosts.map((post, i) => (
            <div key={post.id} className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': `${0.28 + i * 0.06}s` }}>
              <FeedCard post={post} index={i + 1} />
            </div>
          ))}
        </div>

        {/* ── Empty State ── */}
        {filteredPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'rgba(242,238,232,0.3)' }}>
            <p style={{ fontFamily: 'var(--font-editorial)', fontSize: 20, fontStyle: 'italic' }}>No posts in this category yet.</p>
          </div>
        )}

        {/* ── Footer CTA ── */}
        <div className={`feed-footer-cta cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.6s' }}>
          <div className="feed-footer-line" />
          <p className="feed-footer-text">Have a project in mind?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="/#/contact" className="cine-cta">
              <span className="cine-cta-label">Let's work together <span className="cine-cta-arrow">→</span></span>
            </a>
            <a href="/#/" className="cine-cta-secondary">
              <span className="cine-cta-label">View portfolio</span>
            </a>
          </div>
        </div>

        {/* ── Page Footer ── */}
        <footer className={`cine-reveal cine-rise ${revealed ? 'visible' : ''}`} style={{ '--delay': '0.66s', marginTop: 80, textAlign: 'center', paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: 'rgba(242,238,232,0.25)', marginBottom: 20 }}>
            From the Edit Bay · {new Date().getFullYear()}
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cine-cta-ghost" style={{ cursor: 'pointer', padding: '10px 20px' }}>
            <span className="cine-cta-label">Back to Top <span className="cine-cta-arrow">↑</span></span>
          </button>
        </footer>
      </main>
    </div>
  );
}
