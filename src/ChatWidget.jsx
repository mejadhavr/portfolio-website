import React, { useState, useEffect, useRef } from 'react';

// Common responses derived from the user's resume
const AI_KNOWLEDGE = [
  {
    keywords: ['stack', 'tools', 'software', 'skills', 'use'],
    answer: "My core post-production suite includes Premiere Pro, After Effects, and DaVinci Resolve, complemented by Photoshop and Blender 3D. Beyond editing, I specialize in Motion Graphics, Color Grading, Sound Design, Rotoscoping, and end-to-end VFX workflows."
  },
  {
    keywords: ['experience', 'work', 'job', 'background', 'past'],
    answer: "I bring over 7 years of cinematic editing experience. Most recently, I served as a Video Editor Executive at Unplug Infinity Media. Previously, I collaborated with Prism Scale and have been delivering high-end freelance projects with studios like Greyscale Films since 2018."
  },
  {
    keywords: ['projects', 'brands', 'clients', 'built', 'portfolio'],
    answer: "To date, I have engineered over 250+ professional edits. My portfolio includes collaborations with global brands like Philips, AT&T, and Henkel, as well as corporate heavyweights like Fujifilm Sericol and Wipro Innovation Network."
  },
  {
    keywords: ['education', 'degree', 'college', 'studied'],
    answer: "My academic background includes a Bachelor of Engineering (B.E.) in Information Technology from Savitribai Phule Pune University, where I graduated with a CGPA of 8.36."
  },
  {
    keywords: ['open to work', 'hire', 'freelance', 'available', 'contact'],
    answer: "I am actively open to discussing new opportunities, whether full-time positions or ambitious freelance collaborations. Please feel free to reach out via the Contact section below."
  },
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'sup'],
    answer: "Welcome to my portfolio. I'm the AI concierge of Rushikesh Jadhav. How can I assist you in exploring my cinematic work and experience?"
  }
];

// Fallback if no keywords match
const FALLBACK_ANSWER = "That is a fascinating question. While I am a highly capable AI concierge trained on Rushikesh's professional history, I do not have that specific detail on hand. I invite you to contact him directly via email for a more nuanced conversation.";

const PREDETERMINED_QUESTIONS = [
  "What is your technology stack?",
  "Tell me about your experience.",
  "Are you open to collaborations?",
  "What major brands have you worked with?"
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      text: "Welcome. I am the AI representative for Rushikesh Jadhav. How may I assist you with your project inquiries today?" 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Custom scrollbar CSS injected locally
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .chat-scroll::-webkit-scrollbar { width: 4px; }
      .chat-scroll::-webkit-scrollbar-track { background: transparent; }
      .chat-scroll::-webkit-scrollbar-thumb { background: rgba(200,169,110,0.2); border-radius: 4px; }
      .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgba(200,169,110,0.5); }
      
      @keyframes chatGlowPulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(200, 169, 110, 0.4); }
        70% { transform: scale(1); box-shadow: 0 0 0 4px rgba(200, 169, 110, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(200, 169, 110, 0); }
      }
      .online-gold-dot { animation: chatGlowPulse 2s infinite; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: 'user', text: text.trim() }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let matchedAnswer = FALLBACK_ANSWER;
      const lowerQuery = text.toLowerCase();

      for (let item of AI_KNOWLEDGE) {
        if (item.keywords.some(kw => lowerQuery.includes(kw))) {
          matchedAnswer = item.answer;
          break;
        }
      }

      setMessages([...newMessages, { role: 'ai', text: matchedAnswer }]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend(inputValue);
  };

  const clearChat = () => {
    setMessages([{ 
      role: 'ai', 
      text: "Conversation cleared. I am ready when you are." 
    }]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: 24, right: 24, width: 64, height: 64, borderRadius: '50%',
          background: isOpen ? '#111' : 'var(--gold)',
          border: isOpen ? '1px solid rgba(255,255,255,0.1)' : 'none',
          color: isOpen ? 'var(--gold)' : '#000',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          zIndex: 9999, boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(200,169,110,0.3)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)'
        }}
        onMouseEnter={e => {
          if (!isOpen) { 
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(200,169,110,0.5)';
          }
        }}
        onMouseLeave={e => {
          if (!isOpen) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(200,169,110,0.3)';
          }
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Premium Chat Modal */}
      <div 
        style={{
          position: 'fixed', bottom: isOpen ? 100 : 80, right: 24,
          width: 'calc(100vw - 48px)', maxWidth: 420, height: 600, maxHeight: 'calc(100vh - 120px)',
          background: 'rgba(10,10,12,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24,
          boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset',
          zIndex: 9998, display: 'flex', flexDirection: 'column',
          opacity: isOpen ? 1 : 0, visibility: isOpen ? 'visible' : 'hidden',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          transformOrigin: 'bottom right', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden'
        }}
      >
        {/* Luxury Header */}
        <div style={{
          padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.04)',
          background: 'radial-gradient(ellipse at top, rgba(200,169,110,0.08) 0%, transparent 80%)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative' }}>
              <img src="/images/logo.png" alt="Avatar" width="44" height="44" loading="lazy" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', background: '#000', border: '1px solid rgba(200,169,110,0.3)' }} />
              <div className="online-gold-dot" style={{ position: 'absolute', bottom: 2, right: 0, width: 8, height: 8, background: 'var(--gold)', borderRadius: '50%', border: '2px solid #0a0a0c' }}></div>
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 2, color: 'var(--white)', margin: '0 0 2px 0', lineHeight: 1 }}>
                RUSHIKESH AI
              </h2>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: 'var(--gold)', margin: 0, textTransform: 'uppercase' }}>
                Virtual Concierge
              </p>
            </div>
          </div>
          <button 
            onClick={clearChat}
            style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            title="Clear Conversation"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
          </button>
        </div>

        {/* Chat Area */}
        <div className="chat-scroll" style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              
              {/* Bot Avatar (only show for AI) */}
              {m.role === 'ai' && (
                <div style={{ flexShrink: 0 }}>
                  <img src="/images/logo.png" alt="AI" width="28" height="28" loading="lazy" style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
              )}

              {/* Message Bubble */}
              <div style={{
                fontFamily: 'var(--font-editorial)', fontSize: 16, lineHeight: 1.5,
                color: m.role === 'ai' ? 'rgba(242,238,232,0.8)' : '#000',
                background: m.role === 'user' ? 'linear-gradient(135deg, #EAD7AE 0%, #C8A96E 100%)' : 'rgba(255,255,255,0.03)',
                padding: '14px 18px',
                border: m.role === 'ai' ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                boxShadow: m.role === 'user' ? '0 4px 15px rgba(200,169,110,0.15)' : 'none'
              }}>
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
             <div style={{ display: 'flex', gap: 12, alignSelf: 'flex-start', maxWidth: '85%' }}>
                <div style={{ flexShrink: 0 }}>
                  <img src="/images/logo.png" alt="AI" width="28" height="28" loading="lazy" style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', opacity: 0.5 }} />
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
                  padding: '14px 18px', borderRadius: '4px 18px 18px 18px',
                  display: 'flex', gap: 6, alignItems: 'center', height: 42
                }}>
                  <div style={{ width: 5, height: 5, background: 'var(--gold)', borderRadius: '50%', animation: 'chatGlowPulse 1.4s infinite 0s' }} />
                  <div style={{ width: 5, height: 5, background: 'var(--gold)', borderRadius: '50%', animation: 'chatGlowPulse 1.4s infinite 0.2s' }} />
                  <div style={{ width: 5, height: 5, background: 'var(--gold)', borderRadius: '50%', animation: 'chatGlowPulse 1.4s infinite 0.4s' }} />
                </div>
            </div>
          )}

          {/* Quick Prompts */}
          {messages.length === 1 && !isTyping && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8, paddingLeft: 40 }}>
              {PREDETERMINED_QUESTIONS.map((q, j) => (
                <button
                  key={j} onClick={() => handleSend(q)}
                  style={{
                    background: 'rgba(200,169,110,0.05)', border: '1px solid rgba(200,169,110,0.2)',
                    padding: '8px 14px', borderRadius: 30, color: 'var(--gold)',
                    fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer',
                    transition: 'all 0.2s', textAlign: 'left', letterSpacing: 0.5
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,169,110,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200,169,110,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '16px 24px 24px' }}>
          <div style={{
            position: 'relative', background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16,
            transition: 'border-color 0.3s'
          }}>
            <input
              type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Ask me anything..." disabled={isTyping}
              style={{
                width: '100%', background: 'transparent', border: 'none',
                padding: '16px 54px 16px 20px',
                fontFamily: 'var(--font-editorial)', fontSize: 16, color: 'var(--white)',
                outline: 'none'
              }}
              onFocus={e => e.currentTarget.parentElement.style.borderColor = 'rgba(200,169,110,0.5)'}
              onBlur={e => e.currentTarget.parentElement.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
            <button
              onClick={() => handleSend(inputValue)} disabled={!inputValue.trim() || isTyping}
              style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                background: inputValue.trim() ? 'var(--gold)' : 'rgba(255,255,255,0.05)', 
                border: 'none', color: inputValue.trim() ? '#000' : 'rgba(255,255,255,0.2)',
                cursor: inputValue.trim() ? 'pointer' : 'default',
                width: 36, height: 36, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(-1px)' }}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
