import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const SUGGESTIONS = [
  'What projects has Shayan built?',
  'What are Shayan\u2019s skills?',
  'How can I contact Shayan?',
  'Tell me about Shayan\u2019s education',
];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Shayan's Assistant. Ask me anything about Shayan's portfolio \u2014 his projects, skills, education, certifications, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: 'user', content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          message: content,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        aria-label="Toggle chat assistant"
        className="fixed bottom-5 right-5 z-[70] w-14 h-14 rounded-full bg-[var(--lime)] text-black flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_rgba(182,255,0,0.4)] transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-[70] w-[calc(100vw-2.5rem)] max-w-sm h-[28rem] max-h-[70vh] carbon-panel flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="carbon-fiber border-b border-white/10 px-5 py-4 flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[var(--lime)]/10 border border-[var(--lime)]/30 flex items-center justify-center">
                <Sparkles size={16} className="lime-text" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--lime)] pulse-lime" />
              </div>
              <div>
                <div className="font-grotesk text-sm font-semibold">Shayan's Assistant</div>
                <div className="text-[10px] text-[var(--soft)] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)]" /> Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 no-scrollbar">
            {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[var(--lime)] text-black font-medium rounded-br-md'
                        : 'bg-[var(--carbon-4)] text-[var(--white)] rounded-bl-md border border-white/5'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[var(--carbon-4)] rounded-2xl rounded-bl-md border border-white/5 px-4 py-3 flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Suggestions on first load */}
              {messages.length === 1 && !loading && (
                <div className="pt-2 space-y-2">
                  <p className="text-[10px] text-[var(--dark-grey)] uppercase tracking-wider px-1">Suggested questions</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full text-left text-xs text-[var(--soft)] bg-[var(--carbon-3)] hover:bg-[var(--carbon-4)] border border-white/5 hover:border-[var(--lime)]/20 rounded-lg px-3 py-2 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Shayan..."
                  className="flex-1 bg-[var(--carbon-2)] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm focus:border-[var(--lime)]/40 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="w-10 h-10 rounded-lg bg-[var(--lime)] text-black flex items-center justify-center disabled:opacity-40 hover:shadow-[0_0_20px_rgba(182,255,0,0.3)] transition-shadow shrink-0"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
