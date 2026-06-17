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

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [agentRole, setAgentRole] = useState("support");
  const [isCreated, setIsCreated] = useState(false);
  
  const [activeChatAgent, setActiveChatAgent] = useState<Agent | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Hawre Support Bot",
      role: "Customer Support & FAQ",
      status: "active",
      createdAt: "2026-06-17"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentName) return;
    
    setIsCreated(true);
    setTimeout(() => {
      const newAgent: Agent = {
        id: Date.now().toString(),
        name: agentName,
        role: agentRole === "support" ? "Customer Support & FAQ" : agentRole === "sales" ? "Lead Generation & Sales" : "Internal Operations Expert",
        status: "active",
        createdAt: new Date().toISOString().split('T')[0]
      };

      setAgents([...agents, newAgent]);
      setIsCreated(false);
      setIsOpen(false);
      setAgentName("");
    }, 1200);
  };

  const handleDeleteAgent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAgents(agents.filter(agent => agent.id !== id));
    if (activeChatAgent?.id === id) setActiveChatAgent(null);
  };

  const handleOpenChat = (agent: Agent) => {
    setActiveChatAgent(agent);
    let welcomeText = `Slaw! I am ${agent.name}, your virtual Hawre. How can I empower your business operations today?`;
    if (agent.role.includes("Sales")) {
      welcomeText = `Welcome! I am ${agent.name}. Ready to boost your revenue and automate client acquisitions.`;
    } else if (agent.role.includes("Internal")) {
      welcomeText = `Systems active. I am ${agent.name}, trained on your company knowledge base. Let's work.`;
    }

    setChatMessages([{ id: "welcome", sender: "agent", text: welcomeText }]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
// ارسال پیام به هوش مصنوعی واقعی
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatAgent) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: inputMessage };
    // اضافه کردن پیام کاربر به صفحه چت
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setInputMessage("");
    setIsAgentTyping(true);

    try {
      // صدا زدن API داخلی که ساختیم
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          agentRole: activeChatAgent.role,
          agentName: activeChatAgent.name
        }),
      });

      const data = await response.json();
      
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "agent",
        text: data.text
      };
      
      setChatMessages(prev => [...prev, agentMsg]);
    } catch (error) {
      console.error("Failed to fetch response:", error);
    } finally {
      setIsAgentTyping(false);
    }
  };  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      
      {/* هاله‌های نوری پس‌زمینه الهام‌گرفته از رنگ‌های آفتاب و طبیعت کوردستان (مینیمال و تاریک) */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-[60%] left-[10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Navbar */}
      <nav className="border-b border-zinc-900 sticky top-0 bg-black/60 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* لوگوی جدید ترکیبی: خورشید ۲۱ پره مدرن و حرف H */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-emerald-600 p-[1px] shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center relative overflow-hidden">
                {/* نماد خطی پرتوهای خورشید در بک‌گراند لوگو */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent animate-spin-slow" />
                <span className="font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300 relative z-10">H</span>
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              HAWRE <span className="text-amber-500 font-medium">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest text-zinc-400 uppercase">
            <a href="#dashboard" className="hover:text-amber-400 transition-colors">Console</a>
            <a href="#about" className="hover:text-emerald-400 transition-colors">Identity</a>
          </div>

          <button 
            onClick={() => setIsOpen(true)}
            className="text-xs uppercase tracking-widest font-bold bg-zinc-900 text-amber-400 border border-amber-500/30 px-5 py-2.5 rounded-xl hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 shadow-md shadow-amber-500/5"
          >
            Launch Agent
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center relative z-10">
        
        {/* نشانگر وضعیت بالای هیرو */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 text-xs text-zinc-400 mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          Next-Gen AI, Rooted in Partnership
        </div>

        {/* عنوان بزرگ با استایل فوق‌مدرن و گرادینت گلد سنتی خورشید */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tight max-w-5xl mx-auto leading-[1.05] mb-8 bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent">
          Build Intelligent AI Agents For Business
        </h1>

        <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Meet <span className="text-white font-medium">Hawre AI</span>. A sleek, hyper-fast console designed to craft personalized digital companions that automate workflows, secure business datasets, and guide operations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-xl font-bold hover:opacity-90 transition-all text-sm uppercase tracking-wider shadow-lg shadow-orange-500/10"
          >
            Create Your Hawre 🚀
          </button>
        </div>
      </main>

      {/* Dashboard Console Section */}
      <section id="dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-900 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500" />
              <h2 className="text-xl font-bold uppercase tracking-wider">Active Command Console</h2>
            </div>
            <p className="text-xs text-zinc-500">Deploy, interact, and monitor your organizational intelligence clusters.</p>
          </div>
          <div className="text-xs font-mono bg-zinc-900/60 border border-zinc-800 px-4 py-2 rounded-xl text-zinc-400">
            CLUSTER_COUNT: <span className="text-amber-400 font-bold">{agents.length}</span>
          </div>
        </div>

        {agents.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20 backdrop-blur-sm">
            <p className="text-zinc-500 text-sm mb-4">Console empty. Ready for new neural deployments.</p>
            <button 
              onClick={() => setIsOpen(true)}
              className="text-xs uppercase tracking-widest font-bold bg-zinc-900 border border-zinc-800 text-white px-5 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              + Initialize Agent
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <div 
                key={agent.id} 
                onClick={() => handleOpenChat(agent)}
                className="group p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-md flex flex-col justify-between gap-6 hover:border-amber-500/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {/* یک خط تزئینی مینیمال قرمز/سبز در بالای کارت‌ها هماهنگ با پرچم */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-bold text-base text-zinc-200 group-hover:text-white transition-colors">{agent.name}</h3>
                      <span className="text-[9px] px-2 py-0.5 rounded uppercase font-mono font-extrabold tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {agent.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 font-mono">{agent.role}</p>
                  </div>
                  
                  {/* آیکون خورشید مینیاتوری مپ شده روی دکمه چت تکی */}
                  <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-amber-400 group-hover:border-amber-500/30 transition-colors">
                    ☼
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] border-t border-zinc-900/60 pt-4 font-mono text-zinc-600">
                  <span>DEPLOYED: {agent.createdAt}</span>
                  <button 
                    onClick={(e) => handleDeleteAgent(agent.id, e)}
                    className="hover:text-red-400 transition-colors border border-zinc-900 group-hover:border-zinc-800 px-2.5 py-1 rounded-md"
                  >
                    Purge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Chat Terminal Panel (پنجره چت سایبرپانک و کوردی-مینیمال) */}
      {activeChatAgent && (
        <div className="fixed bottom-6 right-6 w-full max-w-md h-[520px] bg-black border border-zinc-800 rounded-2xl shadow-2xl shadow-amber-500/5 z-40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* بخش هدر چت باکس */}
          <div className="p-4 border-b border-zinc-900 bg-zinc-950/80 flex items-center justify-between relative">
            {/* خط باریک تم پلتفرم */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500" />
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider">{activeChatAgent.name}</h3>
                <p className="text-[10px] text-zinc-500 font-mono">{activeChatAgent.role}</p>
              </div>
            </div>
            <button onClick={() => setActiveChatAgent(null)} className="text-zinc-500 hover:text-white text-xs p-1">✕</button>
          </div>

          {/* پیام‌ها */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-light">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-xl px-4 py-3 leading-relaxed border ${
                  msg.sender === "user" 
                    ? "bg-zinc-100 text-black border-transparent font-medium" 
                    : "bg-zinc-900/60 text-zinc-200 border-zinc-800/80"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isAgentTyping && (
              <div className="flex justify-start">
                <div className="text-zinc-600 font-mono text-[10px] flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-400 animate-bounce" />
                  Hawre neural core responding...
                </div>
              </div>
            )}
          </div>

          {/* فرم ورودی مسیج */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-900 bg-zinc-950/40 backdrop-blur-md">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder={`Query ${activeChatAgent.name}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/40 transition-colors"
              />
              <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-4 rounded-xl text-xs transition-colors tracking-wider uppercase">
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Create Agent Modal (پاپ‌آپ فرم مینیمال) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-900 w-full max-w-sm rounded-2xl p-6 relative shadow-2xl">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white text-sm">✕</button>
            
            <h2 className="text-base uppercase tracking-widest font-bold mb-1">Initialize Agent Core</h2>
            <p className="text-xs text-zinc-500 mb-6">Input configuration parameters below.</p>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">Agent Name</label>
                <input 
                  type="text" required placeholder="e.g., Shivan (Sales Core)" 
                  value={agentName} onChange={(e) => setAgentName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-amber-500/30"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">Objective Cluster</label>
                <select 
                  value={agentRole} onChange={(e) => setAgentRole(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/30"
                >
                  <option value="support">Customer Support & FAQ</option>
                  <option value="sales">Lead Generation & Sales</option>
                  <option value="internal">Internal Operations Expert</option>
                </select>
              </div>

              <button type="submit" disabled={isCreated} className="w-full mt-4 py-3.5 bg-zinc-100 text-black font-bold rounded-xl hover:bg-amber-400 transition-all uppercase tracking-widest text-[11px]">
                {isCreated ? "Injecting Data..." : "Deploy Agent →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}