
import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
      <div className="inline-block px-4 py-2 bg-slate-900 text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl shadow-slate-200">
        ✨ The Future of Consumption
      </div>
      <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-6">
        Decode Your Food. <br />
        <span className="text-emerald-600 italic">Protect Your DNA.</span>
      </h1>
      <p className="text-sm md:text-lg font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 max-w-3xl">
        — The Ultimate Molecular Bodyguard for Your Health —
      </p>
      
      <p className="text-xl text-slate-500 max-w-2xl mb-12 font-medium leading-relaxed">
        Stop guessing. Our AI-driven toxicology engine scans ingredient labels to reveal 
        the hidden physiological impact of every chemical on your body.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        <button 
          onClick={onGetStarted}
          className="px-10 py-5 bg-slate-900 text-white text-lg font-black rounded-[2rem] hover:bg-slate-800 shadow-2xl shadow-slate-300 transition-all active:scale-95 flex items-center justify-center space-x-3 uppercase tracking-widest"
        >
          <span>Initialize Scan</span>
          <i className="fa-solid fa-bolt text-emerald-400"></i>
        </button>
        <button className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 text-lg font-black rounded-[2rem] hover:bg-slate-50 transition-all flex items-center justify-center space-x-3 uppercase tracking-widest">
          <span>Explore Science</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-shadow group">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:rotate-12 transition-transform">
            <i className="fa-solid fa-dna"></i>
          </div>
          <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Genetic Safety</h3>
          <p className="text-slate-500 font-medium">Detect endocrine disruptors and carcinogens that impact your cellular health long-term.</p>
        </div>
        <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-shadow group">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:rotate-12 transition-transform">
            <i className="fa-solid fa-brain"></i>
          </div>
          <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Neuro-Protection</h3>
          <p className="text-slate-500 font-medium">Identify additives linked to cognitive decline, ADHD, and neurological inflammation.</p>
        </div>
        <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-shadow group">
          <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:rotate-12 transition-transform">
            <i className="fa-solid fa-shield-virus"></i>
          </div>
          <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Gut Integrity</h3>
          <p className="text-slate-500 font-medium">Screen for emulsifiers and preservatives that destroy microbiome diversity and gut lining.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
