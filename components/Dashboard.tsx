
import React, { useState } from 'react';
import { IngredientAnalysis, AnalysisStatus, User } from '../types';
import { analyzeIngredients } from '../services/gemini';
import Dropzone from './Dropzone';
import AnalysisResults from './AnalysisResults';
import HistoryList from './HistoryList';

interface DashboardProps {
  user: User | null;
  history: IngredientAnalysis[];
  onNewAnalysis: (analysis: IngredientAnalysis) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, history, onNewAnalysis }) => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [currentAnalysis, setCurrentAnalysis] = useState<IngredientAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      setStatus(AnalysisStatus.UPLOADING);
      setError(null);
      setUploadProgress(20);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result as string;
        setTempImage(base64Data);
        setUploadProgress(50);
        
        const base64 = base64Data.split(',')[1];
        
        setStatus(AnalysisStatus.SCANNING);
        setUploadProgress(70);
        
        const analysis = await analyzeIngredients(base64);
        
        const fullAnalysis = {
          ...analysis,
          imageUrl: base64Data,
        } as IngredientAnalysis;

        setUploadProgress(100);
        setTimeout(() => {
          setCurrentAnalysis(fullAnalysis);
          onNewAnalysis(fullAnalysis);
          setStatus(AnalysisStatus.COMPLETED);
        }, 500);
      };
    } catch (err) {
      setError('Toxicology analysis failed. Please ensure the label is clear and try again.');
      setStatus(AnalysisStatus.ERROR);
    }
  };

  const reset = () => {
    setStatus(AnalysisStatus.IDLE);
    setCurrentAnalysis(null);
    setError(null);
    setTempImage(null);
    setUploadProgress(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column - Core Action Area */}
        <div className="lg:col-span-8 space-y-8">
          {status === AnalysisStatus.IDLE || status === AnalysisStatus.ERROR ? (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
              <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                    Welcome back, <span className="text-emerald-600">{user?.name}</span>
                  </h1>
                  <p className="text-lg text-slate-500 font-medium">Ready to analyze your next molecular profile?</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Lab Online</span>
                </div>
              </div>
              
              <div className="bg-white p-2 rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                <Dropzone onUpload={handleFileUpload} disabled={status !== AnalysisStatus.IDLE && status !== AnalysisStatus.ERROR} />
              </div>
              
              {error && (
                <div className="mt-8 p-6 bg-rose-50 text-rose-700 rounded-3xl flex items-start space-x-4 border border-rose-100 animate-bounce">
                  <div className="bg-rose-100 p-2 rounded-xl text-rose-600">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                  </div>
                  <div>
                    <h4 className="font-bold">Analysis Error</h4>
                    <p className="text-sm opacity-90 font-medium">{error}</p>
                  </div>
                </div>
              )}
            </div>
          ) : status === AnalysisStatus.COMPLETED && currentAnalysis ? (
            <div className="space-y-6">
               <button 
                onClick={reset}
                className="group flex items-center space-x-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-slate-300 transition-all active:scale-95"
              >
                <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                <span>New Lab Scan</span>
              </button>
              <AnalysisResults analysis={currentAnalysis} />
            </div>
          ) : (
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl flex flex-col items-center justify-center space-y-8 relative overflow-hidden min-h-[500px]">
              {tempImage && (
                <div className="absolute inset-0 opacity-10 scale-110 blur-sm">
                  <img src={tempImage} className="w-full h-full object-cover" />
                </div>
              )}
              
              {/* Laser Scan Animation */}
              <div className="relative w-72 h-96 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800">
                {tempImage ? (
                  <img src={tempImage} className="w-full h-full object-cover opacity-60" />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <i className="fa-solid fa-image text-slate-700 text-6xl"></i>
                  </div>
                )}
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_20px_#10b981] z-10 animate-scan"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent animate-scan-shadow"></div>
              </div>

              <div className="text-center relative z-20">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                  <i className="fa-solid fa-dna animate-spin"></i>
                  <span>{status === AnalysisStatus.UPLOADING ? 'Uploading Matrix' : 'Toxicology Mapping'}</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                  {status === AnalysisStatus.UPLOADING ? 'Ingesting Label...' : 'Analyzing Molecular Impact...'}
                </h3>
                <div className="w-64 bg-slate-100 h-2 rounded-full mx-auto mt-6 overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full transition-all duration-700 ease-out" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Lab Stats & History */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group border border-slate-800">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-flask-vial text-8xl"></i>
            </div>
            
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Personal Safety Index</h3>
            
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <svg className="w-24 h-24 rotate-[-90deg]">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="40" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="transparent" 
                    className="text-emerald-500" 
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - 0.78)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-black">78</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-black uppercase text-emerald-500">Optimum Health</p>
                <p className="text-xs text-slate-400 font-bold mt-1">Based on {history.length} scans this session.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>Lab Quota</span>
                <span>{history.length} / 50</span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style={{ width: `${Math.min((history.length/50)*100, 100)}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Lab History</h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">Recently Analyzed</p>
              </div>
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                <i className="fa-solid fa-history"></i>
              </div>
            </div>
            <HistoryList history={history} onSelect={setCurrentAnalysis} />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(380px); }
          100% { transform: translateY(0); }
        }
        @keyframes scan-shadow {
          0% { transform: translateY(-50px); opacity: 0; }
          50% { transform: translateY(190px); opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s infinite ease-in-out;
        }
        .animate-scan-shadow {
          animation: scan-shadow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
