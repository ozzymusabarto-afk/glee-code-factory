import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Send, 
  ArrowLeft, 
  Settings, 
  Volume2, 
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PolyMascot } from '@/components/poly/PolyMascot';
import { useAppStore } from '@/hooks/use-app-store';
import { useDailyTimer } from '@/hooks/use-daily-timer';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const Route = createFileRoute('/chat/$id')({
  component: ChatInterface,
});

type Message = {
  id: string;
  sender: 'bot' | 'user' | 'poly';
  text: string;
  senderName?: string;
  status?: 'pending' | 'success' | 'error';
  audioUrl?: string;
  isTip?: boolean;
};

function ChatInterface() {
  const { id } = useParams({ from: '/chat/$id' });
  const { appMode, displayName, skillLevel, updateStreak } = useAppStore();
  const { remainingSeconds, isActive: isTimerActive, startTimer, resetGoal } = useDailyTimer();
  const navigate = useNavigate();
  
  // Initialize with hardcoded messages if scenario is 'airport'
  const [messages, setMessages] = useState<Message[]>(() => {
    if (id === 'airport') {
      return [
        { 
          id: '1', 
          sender: 'bot', 
          senderName: 'Oficial da Imigração', 
          text: 'Good morning. What brings you to the country today?',
          audioUrl: 'auto' 
        },
        { 
          id: '2', 
          sender: 'poly', 
          text: '💡 Dica do Poly: O oficial perguntou o motivo da sua viagem. Experimente responder usando o microfone: I am here for tourism.', 
          isTip: true 
        }
      ];
    }
    return [];
  });

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessons, setLessons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAdult = appMode === 'adult';
  const audioPlayedRef = useRef(false);

  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition({
    lang: 'en-US',
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playText = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const initTimer = async () => {
      await resetGoal();
      startTimer();
    };
    initTimer();
  }, [resetGoal, startTimer]);

  useEffect(() => {
    const fetchLessons = async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('category', id)
        .eq('level', skillLevel)
        .order('sort_order', { ascending: true });

      if (data && data.length > 0) {
        setLessons(data);
        
        // If not airport or if messages are empty, initialize from data
        if (id !== 'airport' || messages.length === 0) {
          const firstLesson = data[0];
          const firstMsg: Message = {
            id: '1',
            sender: 'bot',
            senderName: id === 'survival' ? 'Oficial da Imigração' : 'Interlocutor',
            text: firstLesson.message_text,
          };
          
          const tipMsg: Message = {
            id: 'tip-1',
            sender: 'poly',
            text: `Olá ${displayName}, ${id === 'survival' ? 'o oficial perguntou seu motivo' : 'responda à pergunta'}. Diga: "${firstLesson.expected_response}"`,
            isTip: true
          };

          setMessages([firstMsg, tipMsg]);
        }
      }
      setIsLoading(false);
    };
    fetchLessons();
  }, [id, skillLevel]);

  // Handle auto-audio for the first message
  useEffect(() => {
    if (!isLoading && messages.length > 0 && !audioPlayedRef.current) {
      const firstBotMsg = messages.find(m => m.sender === 'bot');
      if (firstBotMsg) {
        // Short delay to ensure browser allows speech after interaction
        const timer = setTimeout(() => {
          playText(firstBotMsg.text);
          audioPlayedRef.current = true;
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);


  const calculateSimilarity = (s1: string, s2: string) => {
    const str1 = s1.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
    const str2 = s2.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
    
    if (str1 === str2) return 100;
    
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);
    const matches = words1.filter(word => words2.includes(word)).length;
    
    return (matches / Math.max(words1.length, words2.length)) * 100;
  };

  const handleMicRelease = async () => {
    stopListening();
    
    setTimeout(async () => {
      if (!transcript) return;

      const currentLesson = lessons[currentLessonIndex];
      if (!currentLesson) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: transcript,
        status: 'pending'
      };
      
      setMessages(prev => [...prev, userMsg]);
      
      const similarity = calculateSimilarity(transcript, currentLesson.expected_response);
      
      setTimeout(async () => {
        if (similarity >= 80) {
          setMessages(prev => prev.map(m => m.id === userMsg.id ? { ...m, status: 'success' } : m));
          toast.success(isAdult ? "Exato!" : "Incrível! 🌟");
          
          if (currentLessonIndex < lessons.length - 1) {
            const nextIndex = currentLessonIndex + 1;
            setCurrentLessonIndex(nextIndex);
            const nextLesson = lessons[nextIndex];
            
            const nextMsg: Message = {
              id: (Date.now() + 1).toString(),
              sender: 'bot',
              senderName: id === 'survival' ? 'Oficial da Imigração' : 'Interlocutor',
              text: nextLesson.message_text
            };
            
            const nextTip: Message = {
              id: (Date.now() + 2).toString(),
              sender: 'poly',
              text: nextLesson.phonetic_hint || `Diga: "${nextLesson.expected_response}"`,
              isTip: true
            };
            
            setMessages(prev => [...prev, nextMsg, nextTip]);
            playText(nextLesson.message_text);
          } else {
            await updateStreak();
            toast.success("Missão concluída!");
            setTimeout(() => navigate({ to: '/' }), 2000);
          }
        } else {
          setMessages(prev => prev.map(m => m.id === userMsg.id ? { ...m, status: 'error' } : m));
          toast.error(isAdult ? "Tente novamente." : "Quase lá! Vamos tentar de novo? 🤖");
          
          const retryMsg: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: currentLesson.phonetic_hint || "Tente dizer: " + currentLesson.expected_response
          };
          setMessages(prev => [...prev, retryMsg]);
        }
      }, 500);
    }, 100);
  };

  if (isLoading) return null;

  return (
    <div className={cn(
      "flex flex-col h-screen font-jakarta",
      isAdult ? "bg-[#0F172A] text-slate-100" : "bg-[#F5F7FA] text-[#0D47A1]"
    )}>
      {/* Header */}
      <header className={cn(
        "p-6 flex items-center justify-between border-b backdrop-blur-md sticky top-0 z-20",
        isAdult ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-100"
      )}>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="rounded-full w-12 h-12">
            <ArrowLeft size={24} />
          </Button>
          <div>
            <h2 className="text-xl font-black uppercase font-space tracking-tighter">
              {lessons[0]?.category || 'Chat'}
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-bold opacity-60">
              <Clock size={12} />
              <span>{formatTime(remainingSeconds)} RESTANTES</span>
            </div>
          </div>
        </div>
        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
          <PolyMascot size="sm" pose={isListening ? 'thinking' : 'neutral'} />
        </div>
      </header>

      {/* Chat Area */}
      <main 
        ref={scrollRef}
        className={cn(
          "flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth flex flex-col",
          messages.length < 4 && "justify-center"
        )}
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: i * 0.1 
              }}
              className={cn(
                "flex w-full items-end gap-3",
                msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              {msg.sender !== 'user' && (
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 mb-1 shadow-sm border border-slate-100">
                  {msg.sender === 'poly' ? (
                    <div className="bg-blue-500 w-full h-full flex items-center justify-center">
                      <PolyMascot size="sm" pose="neutral" />
                    </div>
                  ) : (
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.senderName || 'bot'}`} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}
              <div className={cn(
                "max-w-[80%] flex flex-col gap-1",
                msg.sender === 'user' ? "items-end" : "items-start"
              )}>
                {msg.senderName && (
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">
                    {msg.senderName}
                  </span>
                )}
                <div className={cn(
                  "p-4 rounded-[22px] shadow-sm relative",
                  msg.sender === 'user' 
                    ? (isAdult ? "bg-cyan-600 text-white rounded-tr-none" : "bg-blue-600 text-white rounded-tr-none")
                    : msg.sender === 'poly'
                      ? (isAdult ? "bg-slate-700/50 text-slate-200 border border-slate-600 rounded-tl-none italic" : "bg-blue-50 text-blue-700 border border-blue-100 rounded-tl-none italic")
                      : (isAdult ? "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700" : "bg-white text-blue-900 rounded-tl-none")
                )}>
                  {msg.sender === 'poly' && (
                    <span className="text-[10px] font-black uppercase text-blue-400 block mb-1">Dica do Poly</span>
                  )}
                  <p className={cn("text-base leading-relaxed", msg.sender === 'poly' ? "font-medium" : "font-bold")}>
                    {msg.text}
                  </p>
                  
                  {msg.sender === 'bot' && (
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => playText(msg.text)}
                        className={cn(
                          "h-8 gap-2 rounded-full",
                          isAdult ? "hover:bg-slate-700 text-cyan-400" : "hover:bg-blue-100 text-blue-600"
                        )}
                      >
                        <Volume2 size={14} />
                        <span className="text-[10px] font-bold">OUVIR NOVAMENTE</span>
                      </Button>
                    </div>
                  )}
                  
                  {msg.sender === 'user' && msg.status && (
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                      {msg.status === 'success' && <CheckCircle2 size={16} className="text-green-500" />}
                      {msg.status === 'error' && <AlertCircle size={16} className="text-red-500" />}
                      {msg.status === 'pending' && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent animate-spin rounded-full" />}
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* Input Area */}
      <footer className={cn(
        "p-8 border-t",
        isAdult ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
      )}>
        <div className="max-w-md mx-auto relative flex flex-col items-center gap-6">
          {transcript && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "w-full p-4 rounded-2xl text-center font-bold text-lg border-2",
                isAdult ? "bg-slate-800 border-cyan-500/30" : "bg-blue-50 border-blue-100"
              )}
            >
              "{transcript}"
            </motion.div>
          )}

          <div className="flex items-center gap-8">
            <button 
              onMouseDown={startListening}
              onMouseUp={handleMicRelease}
              onTouchStart={startListening}
              onTouchEnd={handleMicRelease}
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative",
                isListening 
                  ? (isAdult ? "bg-cyan-500 scale-110" : "bg-blue-600 scale-110")
                  : (isAdult ? "bg-slate-800 text-cyan-500" : "bg-blue-50 text-blue-600")
              )}
            >
              {isListening && (
                <motion.div 
                  layoutId="pulse"
                  className="absolute inset-0 rounded-full bg-current opacity-20"
                  animate={{ scale: [1, 1.5], opacity: [0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
              <Mic size={40} className={cn(isListening && "text-white animate-pulse")} />
            </button>
          </div>
          
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
            {isListening ? "OUVINDO AGORA..." : "SEGURE PARA FALAR INGLÊS"}
          </p>
        </div>
      </footer>
    </div>
  );
}
