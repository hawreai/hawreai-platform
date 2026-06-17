"use client";

import { useState } from "react";

interface Agent {
  id: string;
  name: string;
  role: string;
  status: "active" | "training";
  createdAt: string;
}

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
}

const translations = {
  en: {
    dir: "ltr",
    logo: "HAWRE",
    heroBadge: "Next-Gen AI, Rooted in Partnership",
    heroTitle: "Build Intelligent AI Agents For Business",
    heroDesc: "Meet Hawre AI. A sleek, hyper-fast console designed to craft personalized digital companions that automate workflows.",
    createBtn: "Create Agent 🚀",
    launchBtn: "Launch Agent",
    consoleTitle: "Active Command Console",
    consoleDesc: "Deploy, interact, and monitor your organizational intelligence clusters.",
    clusterCount: "CLUSTER_COUNT",
    empty: "Console empty. Ready for new neural deployments.",
    purge: "Purge",
    modalTitle: "Initialize Agent Core",
    modalDesc: "Input configuration parameters below.",
    agentNameLabel: "Agent Name",
    objectiveLabel: "Objective Cluster",
    deployBtn: "Deploy Agent →",
    loadingBtn: "Injecting Data...",
    welcomeSupport: "Hello! How can I assist your business today?",
    typing: "Hawre neural core responding...",
    queryPlaceholder: "Query",
    send: "Send"
  },
  ku: {
    dir: "rtl",
    logo: "هاوڕێ",
    heroBadge: "نەوەی نوێی ژیری دەستکرد، ڕەگداکوتاو لە هاوڕێیەتی",
    heroTitle: "بریکارانی زیرەک بۆ بزنسەکەت دروست بکە",
    heroDesc: "ناسینێ دۆستی نوێ لایەنی هاوڕێ AI. کۆنسڵێکی خێرا و مۆدێرن بۆ دیزاینکردنی هاوڕێی دیجیتاڵی تایبەت.",
    createBtn: "دروستکردنی هاوڕێ 🚀",
    launchBtn: "ڕاگەیاندنی بریکار",
    consoleTitle: "کۆنسۆڵی سەرەکی چالاک",
    consoleDesc: "بریکارە زیرەکەکانی خۆت جێگیر بکە و چاودێرییان بکە.",
    clusterCount: "ژمارەی_بریکارەکان",
    empty: "کۆنسۆڵ چۆڵە. ئامادەیە بۆ دامەزراندنی نوێ.",
    purge: "سڕینەوە",
    modalTitle: "ڕێکخستنی سەرەکی بریکار",
    modalDesc: "زانیارییەکان لە خوارەوە بنووسە.",
    agentNameLabel: "ناوی بریکار",
    objectiveLabel: "ئامانجی سەرەکی",
    deployBtn: "جێگیرکردنی بریکار ←",
    loadingBtn: "داتاکان دەنێردرێن...",
    welcomeSupport: "سڵاو! ئەتوانم چۆن یارمەتی بزنسەکەت بدەم؟",
    typing: "هاوڕێ خەریکی وەڵامدانەوەیە...",
    queryPlaceholder: "نامە بنووسە بۆ",
    send: "بنێرە"
  },
  fa: {
    dir: "rtl",
    logo: "هاورێ",
    heroBadge: "نسل جدید هوش مصنوعی، ریشه در دوستی و همکاری",
    heroTitle: "ساخت ایجنت‌های هوشمند برای کسب‌وکار شما",
    heroDesc: "با هاورێ AI آشنا شوید. یک کنسول پیشرفته و سریع برای خلق دستیارهای دیجیتالی شخصی‌سازی شده.",
    createBtn: "ساخت ایجنت جدید 🚀",
    launchBtn: "راه‌اندازی ایجنت",
    consoleTitle: "کنسول فرماندهی فعال",
    consoleDesc: "ایجنت‌های هوشمند خود را مستقر کرده و بر آن‌ها نظارت کنید.",
    clusterCount: "تعداد_ایجنت‌ها",
    empty: "کنسول خالی است. آماده برای استقرار هسته‌های جدید.",
    purge: "حذف",
    modalTitle: "تنظیمات اولیه ایجنت",
    modalDesc: "پارامترهای پیکربندی را در زیر وارد کنید.",
    agentNameLabel: "نام ایجنت",
    objectiveLabel: "هدف اصلی دستیار",
    deployBtn: "استقرار ایجنت ←",
    loadingBtn: "در حال تزریق داده‌ها...",
    welcomeSupport: "سلام! چطور می‌توانم امروز به کسب‌وکار شما کمک کنم?‌",
    typing: "هسته هوشمند هاورێ در حال پاسخگویی...",
    queryPlaceholder: "پیام به",
    send: "ارسال"
  }
};

export default function Home() {
  const [lang, setLang] = useState<"en" | "ku" | "fa">("en");
  const t = translations[lang] || translations.en;

  const [isOpen, setIsOpen] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [agentRole, setAgentRole] = useState("support");
  const [isCreated, setIsCreated] = useState(false);
  
  const [activeChatAgent, setActiveChatAgent] = useState<Agent | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  const [agents, setAgents] = useState<Agent[]>([
    { id: "1", name: "Hawre Support Bot", role: "Customer Support & FAQ", status: "active", createdAt: "2026-06-17" }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentName) return;
    setIsCreated(true);
    setTimeout(() => {
      setAgents([...agents, {
        id: Date.now().toString(),
        name: agentName,
        role: agentRole === "support" ? "Customer Support & FAQ" : agentRole === "sales" ? "Lead Generation & Sales" : "Internal Operations Expert",
        status: "active",
        createdAt: new Date().toISOString().split('T')[0]
      }]);
      setIsCreated(false); setIsOpen(false); setAgentName("");
    }, 1200);
  };

  const handleDeleteAgent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAgents(agents.filter(agent => agent.id !== id));
    if (activeChatAgent?.id === id) setActiveChatAgent(null);
  };

  const handleOpenChat = (agent: Agent) => {
    setActiveChatAgent(agent);
    setChatMessages([{ id: "welcome", sender: "agent", text: t.welcomeSupport }]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatAgent) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: inputMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsAgentTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chatMessages, userMsg], agentRole: activeChatAgent.role, agentName: activeChatAgent.name, language: lang }),
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: "agent", text: data.text }]);
    } catch (error) { console.error(error); } finally { setIsAgentTyping(false); }
  };

  return (
    <div dir={t.dir} className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      
      {/* ☀️ خورشید شیشه‌ای مینیمال در اعماق پس‌زمینه */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="relative w-[150vh] h-[150vh] flex items-center justify-center">
          
          {/* مرکز خورشید: تاریک و غیرقابل دیدن */}
          <div className="absolute w-[20%] h-[20%] bg-black rounded-full shadow-[0_0_150px_70px_rgba(251,191,36,0.3)] z-10" />

          {/* لایه‌های شیشه‌ای (Glassmorphism) و نور پخش‌شده در اطراف */}
          <div className="absolute w-[35%] h-[35%] rounded-full bg-amber-400/5 backdrop-blur-3xl border border-amber-400/10 shadow-[0_0_100px_40px_rgba(251,191,36,0.2)] z-0" />
          <div className="absolute w-[60%] h-[60%] rounded-full bg-amber-400/3 backdrop-blur-xl border border-amber-400/5 shadow-[0_0_150px_90px_rgba(251,191,36,0.15)] -z-10" />
          <div className="absolute w-[100%] h-[100%] rounded-full bg-amber-400/2 blur-[130px] opacity-70 -z-20" />
        </div>
      </div>

      {/* تمام محتوای سایت با z-10 در جلوی خورشید قرار گرفته‌اند */}
      <div className="relative z-10">
        
        {/* Navbar */}
        <nav className="border-b border-zinc-900 sticky top-0 bg-black/60 backdrop-blur-xl z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-emerald-600 p-[1px]">
                <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center">
                  <span className="font-black text-lg text-white">H</span>
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight">
                {t.logo} <span className="text-amber-500 font-medium">AI</span>
              </span>
            </div>

            {/* منوی زبان دکمه‌ای */}
            <div className="flex items-center gap-2 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 z-50">
              <button type="button" onClick={() => setLang("en")} className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${lang === "en" ? "bg-amber-500 text-black shadow" : "text-zinc-400 hover:text-white"}`}>EN</button>
              <button type="button" onClick={() => setLang("ku")} className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${lang === "ku" ? "bg-amber-500 text-black shadow" : "text-zinc-400 hover:text-white"}`}>کوردی</button>
              <button type="button" onClick={() => setLang("fa")} className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${lang === "fa" ? "bg-amber-500 text-black shadow" : "text-zinc-400 hover:text-white"}`}>فارسی</button>
            </div>

            <button onClick={() => setIsOpen(true)} className="text-xs font-bold bg-zinc-900 text-amber-400 border border-amber-500/30 px-4 py-2 rounded-xl hover:bg-amber-500 hover:text-black transition-all">
              {t.launchBtn}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 text-xs text-zinc-400 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {t.heroBadge}
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight max-w-5xl mx-auto leading-[1.15] mb-8 bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            {t.heroTitle}
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto mb-12 font-light">
            {t.heroDesc}
          </p>
          <button onClick={() => setIsOpen(true)} className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-xl font-bold hover:opacity-90 transition-all text-sm uppercase tracking-wider shadow-xl shadow-orange-500/10">
            {t.createBtn}
          </button>
        </main>

        {/* Dashboard Section */}
        <section id="dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-900 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider">{t.consoleTitle}</h2>
              <p className="text-xs text-zinc-500">{t.consoleDesc}</p>
            </div>
            <div className="text-xs font-mono bg-zinc-900/60 border border-zinc-800 px-4 py-2 rounded-xl text-zinc-400 backdrop-blur-sm">
              {t.clusterCount}: <span className="text-amber-400 font-bold">{agents.length}</span>
            </div>
          </div>

          {agents.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20 backdrop-blur-sm">
              <p className="text-zinc-500 text-sm">{t.empty}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.map((agent) => (
                <div key={agent.id} onClick={() => handleOpenChat(agent)} className="group p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm flex flex-col justify-between gap-6 hover:border-amber-500/30 transition-all duration-300 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-bold text-base text-zinc-200">{agent.name}</h3>
                        <span className="text-[9px] px-2 py-0.5 rounded uppercase font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {agent.status}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">{agent.role}</p>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">☼</div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] border-t border-zinc-900/60 pt-4 font-mono text-zinc-600">
                    <span>{agent.createdAt}</span>
                    <button onClick={(e) => handleDeleteAgent(agent.id, e)} className="hover:text-red-400 transition-colors">
                      {t.purge}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Chat Terminal */}
        {activeChatAgent && (
          <div className={`fixed bottom-6 ${lang === "en" ? "right-6" : "left-6"} w-full max-w-md h-[520px] bg-black border border-zinc-800 rounded-2xl shadow-2xl shadow-amber-500/5 z-40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300`}>
            <div className="p-4 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <div>
                  <h3 className="font-bold text-xs uppercase">{activeChatAgent.name}</h3>
                </div>
              </div>
              <button onClick={() => setActiveChatAgent(null)} className="text-zinc-500 hover:text-white text-xs">✕</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-light">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl px-4 py-3 border ${
                    msg.sender === "user" ? "bg-zinc-100 text-black border-transparent font-medium shadow-lg" : "bg-zinc-900/60 text-zinc-200 border-zinc-800/80 backdrop-blur-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAgentTyping && <div className="text-zinc-600 font-mono text-[10px] animate-pulse">{t.typing}</div>}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-900 bg-zinc-950/40 backdrop-blur-md">
              <div className="flex gap-2">
                <input type="text" placeholder={`${t.queryPlaceholder} ${activeChatAgent.name}...`} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/40 transition-colors" />
                <button type="submit" className="bg-amber-400 text-black font-bold px-4 rounded-xl text-xs hover:bg-amber-500 transition-colors tracking-wider">
                  {t.send}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Create Agent Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-950 border border-zinc-800 w-full max-w-sm rounded-2xl p-6 relative shadow-2xl shadow-amber-500/5 animate-in fade-in zoom-in-95 duration-200">
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white text-sm p-1">✕</button>
              <h2 className="text-base font-bold mb-1 uppercase tracking-wider">{t.modalTitle}</h2>
              <p className="text-xs text-zinc-500 mb-6">{t.modalDesc}</p>
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1">{t.agentNameLabel}</label>
                  <input type="text" required value={agentName} onChange={(e) => setAgentName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1">{t.objectiveLabel}</label>
                  <select value={agentRole} onChange={(e) => setAgentRole(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/30 transition-colors">
                    <option value="support">Customer Support & FAQ</option>
                    <option value="sales">Lead Generation & Sales</option>
                    <option value="internal">Internal Operations Expert</option>
                  </select>
                </div>
                <button type="submit" disabled={isCreated} className="w-full mt-4 py-3.5 bg-zinc-100 text-black font-bold rounded-xl text-[11px] uppercase tracking-widest hover:bg-amber-400 transition-colors disabled:opacity-70">
                  {isCreated ? t.loadingBtn : t.deployBtn}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}