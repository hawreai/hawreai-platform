"use client";

import { useState } from "react";

export default function Home() {
  // وضعیت برای باز و بسته شدن پاپ‌آپ ساخت ایجنت
  const [isOpen, setIsOpen] = useState(false);
  
  // وضعیت اطلاعات فرم ایجنت
  const [agentName, setAgentName] = useState("");
  const [agentRole, setAgentRole] = useState("support");
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentName) return;
    
    setIsCreated(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsCreated(false);
      alert(`Agent "${agentName}" created successfully! 🚀`);
      setAgentName("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 sticky top-0 bg-black/50 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-xl tracking-tighter">
              H
            </div>
            <span className="font-bold text-xl tracking-tight">HAWRE <span className="text-zinc-500">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#why-us" className="hover:text-white transition-colors">Why Hawre</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          HAWRE AI v0.1 Is Now Live
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] mb-8 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Build AI Agents For Your Business
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Automate support, qualify leads, and streamline workflows with custom AI agents tailored precisely to your business knowledge.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-all text-base shadow-xl shadow-white/10"
          >
            Create Agent 🚀
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all text-base">
            Watch Demo
          </button>
        </div>
      </main>

      {/* Agent Builder Modal (پاپ‌آپ فرم) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white text-lg"
            >
              ✕
            </button>
            
            <h2 className="text-xl font-bold mb-1">Create Your AI Agent</h2>
            <p className="text-sm text-zinc-400 mb-6">Configure your custom assistant in seconds.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Agent Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Sarah (Support Expert)" 
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Primary Objective</label>
                <select 
                  value={agentRole}
                  onChange={(e) => setAgentRole(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
                >
                  <option value="support">Customer Support & FAQ</option>
                  <option value="sales">Lead Generation & Sales</option>
                  <option value="internal">Internal Operations Expert</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={isCreated}
                className="w-full mt-2 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all disabled:bg-zinc-700 disabled:text-zinc-400"
              >
                {isCreated ? "Assembling Agent..." : "Deploy Agent →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}