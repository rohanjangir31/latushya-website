import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, MessageSquare, Send, Bot, Phone } from 'lucide-react';
import { CHATBOT_KNOWLEDGE, FALLBACK_MESSAGE } from '../data/chatbotKnowledge';

const SANS = "'Inter', system-ui, sans-serif";
const DISPLAY = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'greeting',
          type: 'bot',
          text: "Welcome to Latushya! I'm your AI design assistant. How can I help you today?",
          isOptions: true
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleOptionClick = (qa) => {
    // Add user message
    const userMsg = { id: Date.now().toString(), type: 'user', text: qa.question };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), type: 'bot', text: qa.answer }
      ]);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = { id: Date.now().toString(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Check if question matches knowledge base loosely
    const lowerInput = inputValue.toLowerCase();
    const match = CHATBOT_KNOWLEDGE.find(qa => 
      lowerInput.includes(qa.question.toLowerCase()) || 
      lowerInput.includes(qa.id)
    );

    setTimeout(() => {
      setIsTyping(false);
      if (match) {
        setMessages(prev => [
          ...prev,
          { id: (Date.now() + 1).toString(), type: 'bot', text: match.answer }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { id: (Date.now() + 1).toString(), type: 'bot', text: FALLBACK_MESSAGE, showWhatsApp: true }
        ]);
      }
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] max-w-[380px] h-[550px] max-h-[70vh] bg-black/70 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col origin-bottom-right"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 bg-gradient-to-r from-pink/10 to-blue/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DF4C73] to-[#5AB9EA] flex items-center justify-center shadow-lg">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <h3 style={{ fontFamily: DISPLAY }} className="text-white text-xl font-medium leading-tight">Latushya AI</h3>
                  <p style={{ fontFamily: SANS }} className="text-white/50 text-[11px] uppercase tracking-wider">Design Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
              {messages.map((msg, i) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex flex-col max-w-[85%] ${msg.type === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <div 
                    style={{ fontFamily: SANS, lineHeight: 1.5 }}
                    className={`p-3.5 text-[14px] ${
                      msg.type === 'user' 
                        ? 'bg-gradient-to-br from-[#DF4C73] to-[#5AB9EA] text-white rounded-2xl rounded-br-sm shadow-lg' 
                        : 'bg-white/10 text-white/90 rounded-2xl rounded-bl-sm border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Options (only show for initial greeting) */}
                  {msg.isOptions && (
                    <div className="mt-3 flex flex-col gap-2 w-[115%]">
                      {CHATBOT_KNOWLEDGE.map((qa) => (
                        <button
                          key={qa.id}
                          onClick={() => handleOptionClick(qa)}
                          style={{ fontFamily: SANS }}
                          className="text-left p-3 text-[13px] text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:border-pink/30 hover:text-white hover:-translate-y-0.5"
                        >
                          {qa.question}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Fallback WhatsApp Action */}
                  {msg.showWhatsApp && (
                    <a 
                      href="https://wa.me/919999999999?text=Hello%20Latushya%20Team!%20I%20have%20a%20custom%20design%20query."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-xl text-[13px] font-medium hover:bg-[#20bd5a] transition-colors shadow-lg"
                      style={{ fontFamily: SANS }}
                    >
                      <Phone size={16} />
                      Connect on WhatsApp
                    </a>
                  )}
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="self-start bg-white/5 border border-white/5 rounded-2xl rounded-bl-sm p-4 flex gap-1.5"
                >
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/40 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  style={{ fontFamily: SANS }}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-pink/50 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 w-8 h-8 rounded-full bg-gradient-to-r from-[#DF4C73] to-[#5AB9EA] flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#DF4C73] to-[#5AB9EA] shadow-[0_10px_30px_rgba(223,76,115,0.4)] flex items-center justify-center text-white relative z-50 group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
