import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Volume2, VolumeX, Copy, Check, Terminal, ExternalLink, Flame } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';
import { useTheme } from '../utils/themeContext';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    category?: string;
    college?: string;
    query?: string;
  };
}

interface NexusAIAssistantProps {
  onApplyFilter?: (filters: { category?: string; college?: string; query?: string }) => void;
  onOpenSquadBuilder?: () => void;
}

const KNOWLEDGE_RESPONSES: { keywords: string[]; answer: string; action?: { label: string; category?: string; college?: string; query?: string } }[] = [
  {
    keywords: ['nit raipur', 'aavartan', 'vigyaan', 'technocracy'],
    answer: "🚀 **Aavartan 2026 (NIT Raipur)** is Central India's largest technical festival, organized by **Team Technocracy**.\n\n• **Prize Pool:** ₹4,50,000\n• **Key Tracks:** Autonomous Robotics, Web3 Sovereign Protocols, AI Health-Tech, & 36-Hr Hackathon.\n• **Verification:** Authorised under `technocracy.nitrr.ac.in`.\n• **Venue:** Main Auditorium & CS/IT Department, G.E. Road Campus.",
    action: { label: "Filter NIT Raipur Events", college: "NIT Raipur" }
  },
  {
    keywords: ['iiit', 'naya raipur', 'technovate', 'sac'],
    answer: "⚡ **Technovate 2026 (IIIT Naya Raipur)** is the premier techno-cultural conclave by the Student Activity Council.\n\n• **Prize Pool:** ₹3,00,000\n• **Highlights:** Deep Learning Benchmark Sprint, IoT Drone Rodeo, and Inter-College Hackathon.\n• **Official Domain:** `iiitnr.ac.in`\n• **Contact:** SAC Secretariat `sac@iiitnr.ac.in`.",
    action: { label: "Filter IIIT-NR Events", college: "IIIT Naya Raipur" }
  },
  {
    keywords: ['smart india hackathon', 'sih', 'aicte', 'gov'],
    answer: "🇮🇳 **Smart India Hackathon (SIH 2026)** is the world's biggest open innovation model, backed by AICTE and Ministry of Education.\n\n• **Prize Pool:** ₹1,00,00,000 (1 Crore+ across nodal centers)\n• **Team Size:** 6 Members strictly (Mandatory at least 1 female teammate)\n• **Central India Nodal Center:** Rungta College (RCET Bhilai)\n• **Portal:** `sih.gov.in`",
    action: { label: "View SIH 2026 Details", query: "Smart India" }
  },
  {
    keywords: ['rungta', 'vyom', 'bhilai', 'rcet'],
    answer: "🏆 **VYOM 2026 (Rungta Educational Campus, Bhilai-Raipur)** is the mega youth festival and official SIH Nodal Venue.\n\n• **Prize Pool:** ₹2,50,000\n• **Flagship:** 24-Hour Central India Smart Hackathon & Robo-Wars (15kg & 30kg class).\n• **Website:** `rungta.ac.in`",
    action: { label: "Filter Rungta Events", college: "Rungta" }
  },
  {
    keywords: ['pitch', 'idea', 'problem statement', 'project idea', 'hackathon idea'],
    answer: "💡 **High-Scoring Hackathon Idea Blueprint for 2026:**\n\n**Title:** *SwasthyaSetu — Low-Bandwidth Edge AI for Tribal & Rural Chhattisgarh Clinics*\n\n1. **Problem:** Primary Health Centers (PHCs) lack specialist doctors and high-speed internet.\n2. **Solution:** On-device quantised LLM (Llama 3.2 1B) running locally on phone/laptop to transcribe Chhattisgarhi/Hindi symptoms into ICD-10 medical triage notes.\n3. **Tech Stack:** Whisper.cpp + Ollama + Next.js PWA + SQLite edge sync.\n4. **Judge Magnet:** Offline functionality + zero cloud API bills for rural healthcare.",
  },
  {
    keywords: ['teammate', 'team', 'squad', 'designer', 'developer'],
    answer: "👥 **Need a winning squad?**\n\nThe golden rule of winning hackathons is the **3+1 Rule**:\n1. **1 Systems Architect** (FastAPI / Node / DB)\n2. **1 AI / Core Logic Dev** (Prompting, PyTorch, RAG)\n3. **1 High-Speed Frontend / UI Engineer** (Tailwind, Framer Motion, polish)\n4. **1 Dynamic Presenter / Pitcher** (Clean deck, business metric tie-in)\n\n👉 Head over to our **Teammate Matchmaker** or assemble your squad in the Squad Builder!",
  },
  {
    keywords: ['bit durg', 'ojas'],
    answer: "⚡ **OJAS 2026 (BIT Durg)** is the national technical symposium hosted by IEEE & CSI Student Chapters.\n\n• **Prize Pool:** ₹2,00,000\n• **Focus:** Cloud Computing, Algorithm Battles, Circuit Debugging.\n• **Official Domain:** `bitdurg.ac.in`",
    action: { label: "Filter BIT Durg Events", college: "BIT Durg" }
  }
];

export const NexusAIAssistant: React.FC<NexusAIAssistantProps> = ({ onApplyFilter, onOpenSquadBuilder }) => {
  const { themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "👋 Salutations! I am **Nexus AI**, your autonomous campus intelligence copilot.\n\nAsk me anything about fests in **NIT Raipur, IIIT-NR, Rungta, BIT Durg**, winning hackathon strategies, or squad recommendations.",
      timestamp: 'LIVE',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const speakText = (text: string) => {
    if (!speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`•]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    haptics.playClick();

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // AI Neural Matching
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matched = KNOWLEDGE_RESPONSES.find(item =>
        item.keywords.some(k => lower.includes(k))
      );

      let responseText = '';
      let action = matched?.action;

      if (matched) {
        responseText = matched.answer;
      } else if (lower.includes('free') || lower.includes('registration fee')) {
        responseText = "💸 **Fee Telemetry:** Over 80% of listed hackathons on NexusCampus (including SIH 2026, NIT Raipur Vigyaan, and CSVTU Expo) have **FREE registration** for verified university students.";
      } else if (lower.includes('food') || lower.includes('stay') || lower.includes('accommodation')) {
        responseText = "🍕 **Campus Hospitality:** Offline 24h/36h hackathons (like Aavartan at NIT Raipur and VYOM at Rungta) provide **free food, caffeine rations, red-bull, and hostel accommodation** for shortlisted teams.";
      } else {
        responseText = `🤖 **Telemetry Analysis:** I analyzed your inquiry regarding *"${query}"* across the Central India academic grid.\n\n• For live event dates, verify the countdown badges in the **Events & Fests** radar.\n• To build a team for an upcoming sprint, click **"Assemble Dream Squad"** below.\n\nNeed specific advice on problem statements, tech stacks, or NIT/IIIT criteria? Ask away!`;
      }

      const assistantMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: action,
      };

      setIsTyping(false);
      setMessages(prev => [...prev, assistantMsg]);
      haptics.playTyping();
      speakText(responseText);
    }, 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    haptics.playClick();
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <>
      {/* Floating Cyber Orb Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            haptics.playClick();
            setIsOpen(!isOpen);
          }}
          className="relative group p-4 rounded-2xl bg-[#030712] border border-white/10 shadow-[0_0_35px_-5px_rgba(16,185,129,0.35)] hover:border-emerald-400/50 hover:shadow-[0_0_45px_-5px_rgba(16,185,129,0.6)] transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Open Nexus AI"
        >
          {/* Animated Orbiting Rings */}
          <div className="absolute inset-0 rounded-2xl border border-emerald-400/30 animate-ping opacity-25" />
          <div className="relative flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="text-left hidden sm:block pr-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-heading font-extrabold text-white">NEXUS AI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400/80">Campus Copilot</span>
            </div>
          </div>
        </button>
      </div>

      {/* Cyber AI Terminal Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[440px] sm:h-[620px] z-50 bg-[#05070B]/95 backdrop-blur-2xl border border-white/15 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Terminal Header */}
          <div className="p-4 bg-[#030508] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-sm text-white">NEXUS AI COPILOT</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    V4 NEURAL
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  RADAR ACTIVE • CENTRAL INDIA CORPUS
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Voice Readout Toggle */}
              <button
                onClick={() => {
                  setSpeechEnabled(!speechEnabled);
                  haptics.playClick();
                }}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  speechEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'text-slate-400 hover:text-white border-transparent'
                }`}
                title={speechEnabled ? 'Mute Speech' : 'Enable Speech Output'}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  haptics.playClick();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Ticker */}
          <div className="px-3 py-2 bg-white/[0.02] border-b border-white/[0.05] overflow-x-auto no-scrollbar flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 text-cyan-400" /> PROMPTS:
            </span>
            <button
              onClick={() => handleSend("Winning pitch for Smart India Hackathon?")}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-500/30 border border-white/[0.06] text-[10px] font-mono text-slate-300 whitespace-nowrap transition-colors cursor-pointer"
            >
              💡 SIH 2026 Winning Idea
            </button>
            <button
              onClick={() => handleSend("Tell me about NIT Raipur Aavartan 2026")}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-500/30 border border-white/[0.06] text-[10px] font-mono text-slate-300 whitespace-nowrap transition-colors cursor-pointer"
            >
              🏛️ NIT Raipur Aavartan
            </button>
            <button
              onClick={() => handleSend("How to assemble the best hackathon team?")}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-500/30 border border-white/[0.06] text-[10px] font-mono text-slate-300 whitespace-nowrap transition-colors cursor-pointer"
            >
              👥 Team 3+1 Formula
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl relative group ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-600/30 to-teal-600/30 text-white border border-emerald-500/30 rounded-tr-none'
                      : 'bg-white/[0.04] text-slate-200 border border-white/[0.08] rounded-tl-none leading-relaxed'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Smart Contextual Action Button */}
                  {msg.suggestedAction && (
                    <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center gap-2">
                      <button
                        onClick={() => {
                          haptics.playClick();
                          if (onApplyFilter && msg.suggestedAction) {
                            onApplyFilter({
                              college: msg.suggestedAction.college,
                              category: msg.suggestedAction.category,
                              query: msg.suggestedAction.query,
                            });
                          }
                          setIsOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-400 text-black font-heading font-bold text-[11px] hover:bg-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{msg.suggestedAction.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Copy snippet button */}
                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-black/50 text-slate-400 hover:text-white transition-opacity cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>

                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono p-2">
                <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
                <span className="animate-pulse">Nexus AI synthesizing telemetry...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Dock */}
          <div className="p-3 bg-[#030508] border-t border-white/[0.08]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about NIT Raipur, SIH, rules, pitch ideas..."
                className="flex-1 bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors font-sans"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-emerald-400 text-black hover:bg-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
