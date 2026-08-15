import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronLeft, ArrowUpRight, Phone, AlertCircle } from 'lucide-react';
import { CATEGORIES, KNOWLEDGE } from '../data/chatbotKnowledge';
import { sendMessage as geminiSend, startNewChat } from '../services/gemini';

const SANS    = "'Inter', system-ui, sans-serif";
const DISPLAY = "'Cormorant Garamond', Georgia, serif";

// ─── Typing indicator ────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.07] w-fit">
      {[0, 0.18, 0.36].map((delay, i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/40 block"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ duration: 0.9, delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─── Single chat bubble ──────────────────────────────────
function Bubble({ msg }) {
  const isBot = msg.type === 'bot';
  const isError = msg.isError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-2 ${isBot ? 'items-start' : 'items-end'} max-w-[88%] ${isBot ? 'self-start' : 'self-end'}`}
    >
      <div
        style={{ fontFamily: SANS, fontSize: '13.5px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}
        className={`px-4 py-3 ${
          isError
            ? 'bg-red-500/10 border border-red-500/20 text-red-300 rounded-2xl rounded-bl-sm'
            : isBot
              ? 'bg-white/[0.08] border border-white/[0.07] text-white/90 rounded-2xl rounded-bl-sm'
              : 'bg-gradient-to-br from-[#DF4C73] to-[#c73d60] text-white rounded-2xl rounded-br-sm shadow-[0_4px_20px_rgba(223,76,115,0.35)]'
        }`}
      >
        {isError && <AlertCircle size={14} className="inline mr-1.5 -mt-0.5" />}
        {msg.text}
      </div>

      {/* WhatsApp CTA */}
      {msg.showWhatsApp && (
        <a
          href="https://wa.me/919741415887?text=Hello%20Latushya!%20I%20have%20a%20design%20query."
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: SANS, fontSize: '13px' }}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366] hover:bg-[#1fba59] text-white rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(37,211,102,0.35)]"
        >
          <Phone size={15} strokeWidth={2.5} />
          Speak to a Design Expert
        </a>
      )}
    </motion.div>
  );
}

// ─── Home screen ──────────────────────────────────────────
function HomeScreen({ onCategorySelect, onQuestionSelect }) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      data-lenis-prevent="true"
      className="flex flex-col h-full overflow-y-auto p-5 gap-4"
    >
      {/* Hero greeting */}
      <div className="pt-1 pb-2">
        <p style={{ fontFamily: DISPLAY, fontSize: '22px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.25 }}>
          How can we help<br />you today?
        </p>
        <p style={{ fontFamily: SANS, fontSize: '12.5px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>
          Ask me anything — I'm powered by Gemini AI.
        </p>
      </div>

      {/* Category tiles */}
      <div className="grid grid-cols-2 gap-2.5">
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            onClick={() => onCategorySelect(cat)}
            className="group flex flex-col items-start gap-2 p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 text-left"
          >
            <span className="text-lg leading-none" style={{ color: '#DF4C73' }}>{cat.icon}</span>
            <span style={{ fontFamily: SANS, fontSize: '12.5px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
              {cat.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Popular questions */}
      <div>
        <p style={{ fontFamily: SANS, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '10px' }}>
          Popular questions
        </p>
        <div className="flex flex-col gap-2">
          {KNOWLEDGE.slice(0, 4).map((qa, i) => (
            <motion.button
              key={qa.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              onClick={() => onQuestionSelect(qa.question)}
              style={{ fontFamily: SANS, fontSize: '13px' }}
              className="group flex items-center justify-between gap-3 p-3 rounded-xl bg-transparent border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-250 text-left text-white/70 hover:text-white/95"
            >
              <span>{qa.question}</span>
              <ArrowUpRight size={14} className="shrink-0 opacity-40 group-hover:opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Category screen ──────────────────────────────────────
function CategoryScreen({ category, onBack, onQuestionSelect }) {
  const items = KNOWLEDGE.filter(qa => qa.category === category.id);

  return (
    <motion.div
      key="category"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <div className="px-5 py-4 border-b border-white/[0.07] flex items-center gap-3 shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        <p style={{ fontFamily: SANS, fontSize: '12px', color: '#DF4C73', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{category.icon} {category.label}</p>
      </div>

      <div data-lenis-prevent="true" className="flex-1 overflow-y-auto p-5 flex flex-col gap-2.5">
        {items.map((qa, i) => (
          <motion.button
            key={qa.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => onQuestionSelect(qa.question)}
            style={{ fontFamily: SANS, fontSize: '13.5px' }}
            className="group flex items-center justify-between gap-3 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-250 text-left text-white/75 hover:text-white"
          >
            <span>{qa.question}</span>
            <ArrowUpRight size={14} className="shrink-0 opacity-40 group-hover:opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Chat screen ──────────────────────────────────────────
function ChatScreen({ messages, isTyping, onBack, onSend, inputValue, setInputValue }) {
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto-focus input when chat opens
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(e);
    }
  };

  return (
    <motion.div
      key="chat"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <div className="px-5 py-3 border-b border-white/[0.07] flex items-center gap-3 shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-pulse" />
          <span style={{ fontFamily: SANS, fontSize: '12px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>AI Concierge · Online</span>
        </div>
      </div>

      {/* Messages */}
      <div data-lenis-prevent="true" className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3">
        {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start">
            <TypingDots />
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={onSend} className="p-4 border-t border-white/[0.07] shrink-0 bg-black/30">
        <div className="relative flex items-center gap-2">
          <textarea
            ref={inputRef}
            rows={1}
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
              // auto grow
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
            }}
            onKeyDown={handleKey}
            placeholder="Ask anything about our designs…"
            style={{ fontFamily: SANS, fontSize: '13.5px', resize: 'none', overflowY: 'auto' }}
            className="flex-1 bg-white/[0.06] border border-white/[0.1] rounded-2xl py-2.5 pl-4 pr-12 text-white placeholder-white/25 focus:outline-none focus:border-white/25 transition-colors min-h-[44px] max-h-24"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 bottom-2 w-8 h-8 rounded-xl bg-[#DF4C73] flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#c73d60] active:scale-95 transition-all duration-200 shrink-0"
          >
            <Send size={14} strokeWidth={2.5} />
          </button>
        </div>
        <p style={{ fontFamily: SANS, fontSize: '10.5px', color: 'rgba(255,255,255,0.2)', marginTop: '6px', textAlign: 'center' }}>
          Powered by Gemini AI · Press Enter to send
        </p>
      </form>
    </motion.div>
  );
}

// ─── Main Chatbot component ───────────────────────────────
export default function AIChatbot() {
  const [isOpen, setIsOpen]             = useState(false);
  const [screen, setScreen]             = useState('home');
  const [activeCategory, setActiveCategory] = useState(null);
  const [messages, setMessages]         = useState([]);
  const [isTyping, setIsTyping]         = useState(false);
  const [inputValue, setInputValue]     = useState('');
  const [hasUnread, setHasUnread]       = useState(false);
  const pulseTimerRef                   = useRef(null);
  const hasApiKey = !!import.meta.env.VITE_GEMINI_API_KEY;
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    pulseTimerRef.current = setTimeout(() => {
      if (!isOpen) setHasUnread(true);
    }, 10000);
    return () => clearTimeout(pulseTimerRef.current);
  }, []);

  const openChat = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  // Core AI reply function
  const botReply = useCallback(async (userText) => {
    setIsTyping(true);
    try {
      let reply;
      if (hasApiKey) {
        reply = await geminiSend(userText);
      } else {
        // Graceful fallback when no key is configured
        await new Promise(r => setTimeout(r, 800));
        reply = "I'm not quite set up yet — please reach out on WhatsApp and our team will answer you right away!";
      }
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        text: reply,
        showWhatsApp: !hasApiKey,
      }]);
    } catch (err) {
      console.error('Gemini error:', err);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        text: "I couldn't connect right now. Please try again or reach us on WhatsApp.",
        isError: false,
        showWhatsApp: true,
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [hasApiKey]);

  const sendUserMessage = useCallback((text) => {
    if (!text.trim() || isTyping) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text }]);
    botReply(text);
  }, [isTyping, botReply]);

  const handleQuestionSelect = (questionText) => {
    setScreen('chat');
    sendUserMessage(questionText);
  };

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setScreen('category');
  };

  const handleSend = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    setScreen('chat');
    sendUserMessage(text);
  };

  const handleBack = () => {
    if (screen === 'chat') {
      startNewChat(); // reset conversation context
      setMessages([]);
      setInputValue('');
      setScreen(activeCategory ? 'category' : 'home');
    } else {
      setActiveCategory(null);
      setScreen('home');
    }
  };

  return (
    <div ref={wrapperRef} className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="w-[calc(100vw-3rem)] max-w-[370px] h-[580px] max-h-[75vh] bg-[#0a0a0f]/85 backdrop-blur-[40px] border border-white/[0.09] rounded-[24px] shadow-[0_40px_100px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col"
          >
            {/* Persistent header */}
            <div className="px-5 pt-4 pb-3 border-b border-white/[0.07] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DF4C73] to-[#9b2d4a] flex items-center justify-center shadow-[0_0_20px_rgba(223,76,115,0.4)]">
                    <span style={{ fontSize: '14px' }}>✦</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0f] block" />
                </div>
                <div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: '18px', color: 'rgba(255,255,255,0.95)', lineHeight: 1 }}>Latushya Concierge</h3>
                  <p style={{ fontFamily: SANS, fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2px' }}>AI · Design Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Screens */}
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {screen === 'home' && (
                  <HomeScreen
                    key="home"
                    onCategorySelect={handleCategorySelect}
                    onQuestionSelect={handleQuestionSelect}
                  />
                )}
                {screen === 'category' && activeCategory && (
                  <CategoryScreen
                    key="category"
                    category={activeCategory}
                    onBack={handleBack}
                    onQuestionSelect={handleQuestionSelect}
                  />
                )}
                {screen === 'chat' && (
                  <ChatScreen
                    key="chat"
                    messages={messages}
                    isTyping={isTyping}
                    onBack={handleBack}
                    onSend={handleSend}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Footer input — home screen only */}
            {screen === 'home' && (
              <div className="px-5 pb-4 pt-2 border-t border-white/[0.06] shrink-0">
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Or type your question here…"
                    style={{ fontFamily: SANS, fontSize: '13px' }}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-full py-2.5 pl-4 pr-11 text-white placeholder-white/25 focus:outline-none focus:border-white/20 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="absolute right-1.5 w-8 h-8 rounded-full bg-[#DF4C73] flex items-center justify-center text-white disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#c73d60] active:scale-95 transition-all"
                  >
                    <Send size={14} strokeWidth={2.5} />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={isOpen ? () => setIsOpen(false) : openChat}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 md:w-[58px] md:h-[58px] rounded-full bg-[#0e0e14] border border-white/[0.12] flex items-center justify-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-br from-[#DF4C73]/80 to-[#9b2d4a]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -80, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 80, opacity: 0 }} transition={{ duration: 0.2 }} className="relative z-10">
              <X size={22} strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.2 }} className="relative z-10 flex items-center justify-center">
              <span style={{ fontSize: '20px', lineHeight: 1 }}>✦</span>
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#DF4C73] border-2 border-[#0e0e14] z-20"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
