
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Globe } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'HI' | 'TA'>('EN');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userMessage }] }]);
    setIsLoading(true);

    try {
      const promptSuffix = {
        EN: '',
        HI: ' (Please reply in Hindi)',
        TA: ' (Please reply in Tamil)'
      }[language];
      
      const prompt = userMessage + promptSuffix;
        
      const response = await geminiService.getChatResponse(prompt, messages);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = {
        EN: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        HI: "क्षमा करें, मुझे इस समय परेशानी हो रही है। कृपया बाद में पुनः प्रयास करें।",
        TA: "மன்னிக்கவும், தற்போது இணைப்பதில் சிக்கல் உள்ளது. பின்னர் மீண்டும் முயற்சிக்கவும்."
      }[language];
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: errorMsg }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    if (language === 'EN') setLanguage('HI');
    else if (language === 'HI') setLanguage('TA');
    else setLanguage('EN');
  };

  const welcomeText = {
    EN: "Hello! I am your ALZCARE assistant. Ask me anything about Alzheimer's stages or caregiving.",
    HI: "नमस्ते! मैं आपका अल्ज़केர் सहायक हूँ। मुझसे कुछ भी पूछें।",
    TA: "வணக்கம்! நான் உங்கள் அல்சைக்கர் உதவியாளர். அல்சைமர் நிலைகள் அல்லது பராமரிப்பு பற்றி என்னிடம் கேளுங்கள்."
  }[language];

  const placeholderText = {
    EN: "Ask your query...",
    HI: "संदेश टाइप करें...",
    TA: "உங்கள் கேள்வியைக் கேளுங்கள்..."
  }[language];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[550px] bg-white rounded-[2.5rem] shadow-2xl border-4 border-white flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
          <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-black text-sm tracking-tight">ALZCARE AI</h3>
                <div className="flex items-center gap-1.5 opacity-80">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                   <p className="text-[10px] font-bold uppercase tracking-widest">Medical Logic Active</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleLanguage}
                className="bg-white/10 hover:bg-white/20 p-1.5 rounded-lg text-[10px] font-black tracking-widest transition-colors flex items-center gap-1 min-w-[40px] justify-center"
              >
                <Globe size={12} />
                {language}
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1.5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center py-12 px-6 space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-[1.5rem] flex items-center justify-center mx-auto mb-2 shadow-inner">
                  <Bot className="text-blue-600" size={32} />
                </div>
                <p className="text-xs font-bold text-slate-800 tracking-tight leading-relaxed">
                  {welcomeText}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                   {['Stages', 'Care tips', 'Risk factors'].map(tag => (
                     <button 
                      key={tag}
                      onClick={() => setInput(tag)}
                      className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 hover:border-blue-500 hover:text-blue-500 transition-all shadow-sm"
                     >
                       {tag}
                     </button>
                   ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-[1.5rem] p-4 text-sm font-medium shadow-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white border text-slate-800 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap">{m.parts[0].text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border rounded-[1.5rem] p-4 shadow-sm rounded-tl-none">
                  <Loader2 className="animate-spin text-blue-600" size={18} />
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={placeholderText}
                className="flex-1 bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-center text-slate-400 mt-4">
               Consult medical professionals for validated diagnosis.
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="neu-button p-5 rounded-full text-blue-600 hover:scale-110 active:scale-95 transition-all duration-300 group relative"
        >
          <MessageSquare size={32} className="group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
