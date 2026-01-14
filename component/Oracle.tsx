
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';
import { Message } from '../types';

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const speed = 10;
    const timer = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

const OtherSide: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Signal established. This is The Other Side. I'm the voice Mahesh hears when he decides to take the wrong turn. What brings you to this frequency?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await getAIResponse(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg bg-dark border-4 border-posterOrange shadow-[20px_20px_0px_#1a1a1a] flex flex-col overflow-hidden mx-auto lg:mx-0">
      {/* Radio HUD */}
      <div className="bg-posterOrange p-4 flex justify-between items-center border-b-4 border-dark select-none">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-dark rounded-full animate-pulse shadow-[0_0_10px_#000]"></div>
          <h2 className="font-display font-black uppercase text-dark text-xs tracking-[0.2em]">RADIO: THE OTHER SIDE</h2>
        </div>
        <div className="flex items-center gap-1.5 opacity-60">
          <div className="w-1 h-2 bg-dark"></div>
          <div className="w-1 h-4 bg-dark"></div>
          <div className="w-1 h-3 bg-dark"></div>
          <div className="w-1 h-5 bg-dark"></div>
        </div>
      </div>

      {/* Transmission Screen */}
      <div 
        ref={scrollRef}
        className="h-80 md:h-96 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#080808] relative"
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] scanlines"></div>
        
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] px-4 py-3 border-2 transition-all ${
              m.role === 'user' 
              ? 'bg-vintageYellow border-dark text-dark font-black shadow-[4px_4px_0px_rgba(255,255,255,0.1)]' 
              : 'bg-transparent border-posterOrange/40 text-posterOrange font-bold'
            }`}>
              <div className="text-[8px] uppercase tracking-widest opacity-40 mb-1">
                {m.role === 'user' ? 'Local_Signal' : 'Remote_Transmission'}
              </div>
              <p className="font-mono text-xs leading-relaxed uppercase">
                 {m.role === 'model' ? <TypewriterText text={m.text} /> : m.text}
              </p>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex items-center gap-3 text-vintageYellow font-mono text-[10px] animate-pulse">
            <span className="tracking-[0.4em]">DECRYPTING...</span>
          </div>
        )}
      </div>

      {/* Transmitter Controls */}
      <form onSubmit={handleSubmit} className="p-4 bg-dark border-t-4 border-posterOrange/20">
        <div className="flex gap-3">
          <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="TYPE BURST..."
              className="flex-1 bg-black text-posterOrange border-2 border-posterOrange/20 p-3 font-mono text-xs focus:outline-none focus:border-posterOrange uppercase placeholder:opacity-20"
          />
          <button 
              type="submit"
              className="bg-posterOrange text-dark px-6 py-3 font-display font-black uppercase text-xs hover:bg-vintageYellow hover:scale-105 transition-all shadow-[4px_4px_0px_#1a1a1a]"
              disabled={loading}
          >
              TX
          </button>
        </div>
        <div className="mt-3 flex justify-between font-mono text-[8px] text-white/30 uppercase tracking-[0.2em] font-bold">
          <span>104.2 / WHYNOT</span>
          <span className="animate-pulse">SIG: 98%</span>
        </div>
      </form>
    </div>
  );
};

export default OtherSide;
