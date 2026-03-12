import React, { useRef, useState, useEffect } from 'react';

export default function LazySection({ children, id, minHeight = "100dvh", forceVisible = false }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const shouldRender = forceVisible || isVisible;

  useEffect(() => {
    if (forceVisible) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '300px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [forceVisible]);

  return (
    <div id={id} ref={ref} style={{ minHeight }}>
      {shouldRender ? children : null}
    </div>
  );
}
