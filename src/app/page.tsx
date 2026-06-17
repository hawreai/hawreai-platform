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
    welcomeSupport: "سلام! چطور می‌توانم امروز به کسب‌وکار شما کمک کنم؟",
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
      
      {/* 💎 خورشید کریستالی و فوق‌ملایم ۲۱ پرتو کوردستان در پس‌زمینه ثابت */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-15">
        <div className="relative w-[120vh] h-[120vh] flex items-center justify-center scale-110 md:scale-100">
          
          {/* هاله نوری کریستالی سفید-طلایی در دورترین لایه پس‌زمینه */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-amber-400/10 to-yellow-300/5 blur-[160px] rounded-full" />

          {/* ساختار خورشید اصیل با گرادینت‌های شیشه‌ای خیره‌کننده */}
          <svg viewBox="0 0 200 200" className="w-full h-full text-white/40 drop-shadow-[0_0_80px_rgba(251,191,36,0.25)]">
            <defs>
              {/* گرادینت کریستالی شفاف برای پرتوها */}
              <linearGradient id="crystalRay" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.6} />
                <stop offset="40%" stopColor="#fef08a" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.05} />
              </linearGradient>
              {/* گرادینت مرکز خورشید */}
              <linearGradient id="crystalCore" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <g transform="translate(100,100)">
              {/* هندسه دقیق ۲۱ پرتو کوردستان با استایل کریستالی تراش‌خورده */}
              {Array.from({ length: 21 }).map((_, i) => (
                <g key={i} transform={`rotate(${(i * 360) / 21})`}>
                  {/* پرتو اصلی راست */}
                  <polygon points="0,-95 8,-32 0,-32" fill="url(#crystalRay)" />
                  {/* پرتو متقارن چپ جهت ایجاد افکت تراش سه بعدی کریستال */}
                  <polygon points="0,-95 -8,-32 0,-32" fill="url(#crystalRay)" opacity={0.6} />
                </g>
              ))}
              {/* هسته مرکزی کریستال با لبه‌های نرم */}
              <circle r="32" fill="url(#crystalCore)" className="stroke-white/20 stroke-[0.5]" />
            </g>
          </svg>

          {/* فیلتر بلور کریستالی نهایی بر روی پس‌زمینه کلی خورشید */}
          <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none" />
        </div>
      </div>

      {/* محتوای پلتفرم در لایه جلویی z-10 بدون کوچک‌ترین مزاحمت از بک‌گراند */}
      <div className="relative z-10">
        
        {/* Navbar */}
        <nav className="border-b border-zinc-900/60 sticky top-0 bg-black/50 backdrop-blur-xl z-50">
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
            <div className="flex items-center gap-2 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 z-50">
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
          <h1 className="text-4xl md:text-7xl font-black tracking-tight max-w-5xl mx-auto leading-[1.15] mb-8 bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            {t.heroTitle}
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto mb-12 font-light">
            {t.heroDesc}
          </p>
          <button onClick={() => setIsOpen(true)} className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-xl font-bold hover:opacity-90 transition-all text-sm uppercase tracking-wider shadow-2xl shadow-amber-500/10">
            {t.createBtn}
          </button>
        </main>

        {/* Dashboard Section */}
        <section id="dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-900/60 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="