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
  sender: 'bot' | 'user';
  text: string;
  status?: 'pending' | 'success' | 'error';
  audioUrl?: string;
};

function ChatInterface() {
  const { id } = useParams({ from: '/chat/$id' });
  const { appMode, displayName, skillLevel, updateStreak } = useAppStore();
  const { remainingSeconds, isActive: isTimerActive, startTimer } = useDailyTimer();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessons, setLessons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAdult = appMode === 'adult';

  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition({
    lang: 'en-US',
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    startTimer();
  }, [startTimer]);

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
        const firstMsg: Message = {
          id: '1',
          sender: 'bot',
          text: data[0].message_text,
        };
        setMessages([firstMsg]);
        playText(data[0].message_text);
      }

      setIsLoading(false);
    };
    fetchLessons();
  }, [id, skillLevel]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const playText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

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
            const nextMsg: Message = {
              id: (Date.now() + 1).toString(),
              sender: 'bot',
              text: lessons[nextIndex].message_text
            };
            setMessages(prev => [...prev, nextMsg]);
            playText(lessons[nextIndex].message_text);
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
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full",
                msg.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[85%] p-5 rounded-[24px] shadow-sm relative",
                msg.sender === 'user' 
                  ? (isAdult ? "bg-cyan-600 text-white rounded-tr-none" : "bg-blue-600 text-white rounded-tr-none")
                  : (isAdult ? "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700" : "bg-white text-blue-900 rounded-tl-none")
              )}>
                <p className="text-lg font-medium leading-relaxed">{msg.text}</p>
                
                {msg.sender === 'user' && msg.status && (
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                    {msg.status === 'success' && <CheckCircle2 size={16} className="text-green-500" />}
                    {msg.status === 'error' && <AlertCircle size={16} className="text-red-500" />}
                    {msg.status === 'pending' && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent animate-spin rounded-full" />}
                  </div>
                )}

                {msg.sender === 'bot' && (
                  <button 
                    onClick={() => playText(msg.text)}
                    className="absolute -bottom-2 -left-2 bg-blue-500 text-white rounded-full p-1.5 shadow-md hover:scale-110 transition-transform"
                  >
                    <Volume2 size={14} />
                  </button>
                )}
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
