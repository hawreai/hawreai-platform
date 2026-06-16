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
  
  // وضعیت مربوط به ایجنت در حال چت
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
    e.stopPropagation(); // جلوگیری از باز شدن چت موقع حذف کردن
    setAgents(agents.filter(agent => agent.id !== id));
    if (activeChatAgent?.id === id) {
      setActiveChatAgent(null);
    }
  };

  // باز کردن پنجره چت با ایجنت انتخاب شده
  const handleOpenChat = (agent: Agent) => {
    setActiveChatAgent(agent);
    
    // پیام خوش‌آمدگویی پیش‌فرض بر اساس نقش ایجنت
    let welcomeText = `Hello! I am ${agent.name}. How can I assist your business today?`;
    if (agent.role.includes("Sales")) {
      welcomeText = `Hi there! I am ${agent.name}, your sales expert. Looking for a custom deal or lead qualification? Let's talk!`;
    } else if (agent.role.includes("Internal")) {
      welcomeText = `Systems online. I am ${agent.name}, your internal ops assistant. Ready to analyze company guidelines or docs.`;
    }

    setChatMessages([
      { id: "welcome", sender: "agent", text: welcomeText }
    ]);
  };

  // ارسال پیام کاربر و پاسخ ایجنت
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatAgent) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsAgentTyping(true);

    // شبیه‌سازی فکر کردن و پاسخ هوش مصنوعی
    setTimeout(() => {
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "agent",
        text: `This is a demo response from "${activeChatAgent.name}". Soon, I'll be connected to a real LLM brain to process your exact business query: "${userMsg.text}"`
      };
      setChatMessages(prev => [...prev, agentMsg]);
      setIsAgentTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Navbar */}
      <nav className="border-b border-zinc-900 sticky top-0 bg-black/50 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-xl tracking-tighter">
              H
            </div>
            <span className="font-bold text-xl tracking-tight">HAWRE <span className="text-zinc-500">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#dashboard" className="hover:text-white transition-colors">Console Dashboard</a>
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className="text-sm font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-all shadow-lg shadow-white/5"
          >
            Create Agent
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          HAWRE AI v0.3 Chat Interface Is Active
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] mb-8 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Build AI Agents For Your Business
        </h1>
        <button 
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-all text-base shadow-xl shadow-white/10"
        >
          Create Agent 🚀
        </button>
      </main>

      {/* Dashboard Section */}
      <section id="dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-900">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Your AI Agents</h2>
            <p className="text-sm text-zinc-400">Click on any agent to start talking or testing their knowledge.</p>
          </div>
        </div>

        {agents.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20">
            <p className="text-zinc-500 mb-4">No agents found. Create your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {agents.map((agent) => (
              <div 
                key={agent.id} 
                onClick={() => handleOpenChat(agent)}
                className="p-6 rounded-xl border border-zinc-900 bg-zinc-950/50 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-zinc-700 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg">{agent.name}</h3>
                    <span className="px-2 py-0.5 text-[10px] uppercase font-extrabold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400">{agent.role}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 text-sm">
                  <span className="text-zinc-500 text-xs">Created: {agent.createdAt}</span>
                  <button 
                    onClick={(e) => handleDeleteAgent(agent.id, e)}
                    className="text-zinc-500 hover:text-red-400 transition-colors text-xs border border-zinc-800 hover:border-red-500/30 px-3 py-1.5 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Chat Console Panel (پنجره چت زنده) */}
      {activeChatAgent && (
        <div className="fixed bottom-6 right-6 w-full max-w-md h-[500px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Chat Header */}
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/40 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {activeChatAgent.name}
              </h3>
              <p className="text-[11px] text-zinc-500">{activeChatAgent.role}</p>
            </div>
            <button 
              onClick={() => setActiveChatAgent(null)}
              className="text-zinc-400 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>

          {/* Chat Messages List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                  msg.sender === "user" 
                    ? "bg-white text-black rounded-tr-none" 
                    : "bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isAgentTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs animate-pulse">
                  Agent is formulating response...
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-800 bg-zinc-950">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder={`Message ${activeChatAgent.name}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
              />
              <button 
                type="submit"
                className="bg-white text-black font-bold px-4 rounded-xl text-sm hover:bg-zinc-200 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Create Agent Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white text-lg">✕</button>
            <h2 className="text-xl font-bold mb-1">Create Your AI Agent</h2>
            <p className="text-sm text-zinc-400 mb-6">Configure your custom assistant in seconds.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Agent Name</label>
                <input 
                  type="text" required placeholder="e.g., Sarah (Support Expert)" 
                  value={agentName} onChange={(e) => setAgentName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Primary Objective</label>
                <select 
                  value={agentRole} onChange={(e) => setAgentRole(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500"
                >
                  <option value="support">Customer Support & FAQ</option>
                  <option value="sales">Lead Generation & Sales</option>
                  <option value="internal">Internal Operations Expert</option>
                </select>
              </div>
              <button type="submit" disabled={isCreated} className="w-full mt-2 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all">
                {isCreated ? "Assembling Agent..." : "Deploy Agent →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}