export default function Home() {
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
          <button className="text-sm font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-all shadow-lg shadow-white/5">
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
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-all text-base shadow-xl shadow-white/10">
            Create Agent 🚀
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all text-base">
            Watch Demo
          </button>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm hover:border-zinc-800 transition-all">
            <div className="text-2xl mb-4">⚡</div>
            <h3 className="text-lg font-bold mb-2">Instant Deployment</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Train your agent on your data and deploy it to WhatsApp, Web, or Telegram in clicks.</p>
          </div>
          <div className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm hover:border-zinc-800 transition-all">
            <div className="text-2xl mb-4">🧠</div>
            <h3 className="text-lg font-bold mb-2">Custom Knowledge</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Upload PDFs, URLs, or text documents. Your agent learns your business rules perfectly.</p>
          </div>
          <div className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm hover:border-zinc-800 transition-all">
            <div className="text-2xl mb-4">📊</div>
            <h3 className="text-lg font-bold mb-2">Advanced Analytics</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Track conversations, conversion rates, and agent performance from a clean dashboard.</p>
          </div>
        </div>
      </section>
    </div>
  );
}