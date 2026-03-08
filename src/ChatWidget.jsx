import React, { useState, useEffect } from 'react';

export default function ChatWidget() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000); // appears after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
      {/* Tooltip */}
      <div 
        className="wa-tooltip"
        style={{
          position: 'absolute', right: '100%', top: '50%', transform: 'translateY(-50%)',
          marginRight: 16, background: 'rgba(12,12,22,0.9)', color: 'var(--white)',
          padding: '8px 14px', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 11,
          whiteSpace: 'nowrap', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        Chat with me
      </div>

      {/* Button */}
      <a 
        href="https://wa.me/919309964035?text=Hi%20Rushikesh%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project." 
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={(e) => {
            if(e.currentTarget.previousElementSibling) {
                e.currentTarget.previousElementSibling.style.opacity = 1;
            }
        }}
        onMouseLeave={(e) => {
            if(e.currentTarget.previousElementSibling) {
                e.currentTarget.previousElementSibling.style.opacity = 0;
            }
        }}
        onClick={() => {
            if(window.trackEvent) window.trackEvent("whatsapp_click");
        }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 56, height: 56, borderRadius: '50%', 
          background: 'linear-gradient(135deg, #c8a04a 0%, #a07830 100%)',
          boxShadow: '0 4px 24px rgba(200, 160, 74, 0.35)', 
          border: '1px solid rgba(200, 160, 74, 0.3)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          textDecoration: 'none',
          animation: 'glow-pulse 2s infinite'
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.031 0C5.385 0 0 5.386 0 12.031C0 14.653 0.852 17.086 2.27 19.06L0.648 24l5.06-1.6c1.884 1.253 4.148 1.983 6.323 1.983 6.645 0 12.03-5.385 12.03-12.03S18.676 0 12.031 0zm5.669 17.513c-.237.669-1.383 1.233-1.928 1.34-.486.096-1.12.164-3.52-.828-3.428-1.417-5.65-4.9-5.819-5.122-.169-.224-1.39-1.848-1.39-3.526 0-1.678.871-2.513 1.183-2.846.311-.334.675-.418.899-.418.224 0 .448.002.646.012.211.01.493-.08.769.585.292.705.992 2.42 1.077 2.589.085.169.141.366.028.591-.112.224-.169.366-.338.563-.169.197-.354.444-.509.569-.169.141-.345.302-.148.64.197.338.875 1.442 1.874 2.336 1.288 1.155 2.366 1.508 2.704 1.664.338.156.536.128.734-.098.198-.226.853-1.006 1.079-1.353.226-.347.452-.289.761-.174.31.115 1.968.928 2.306 1.097.338.169.564.254.648.395.084.141.084.818-.153 1.487z"/>
        </svg>
      </a>
    </div>
  );
}
