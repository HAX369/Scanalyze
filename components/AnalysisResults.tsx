
import React from 'react';
import { IngredientAnalysis } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface AnalysisResultsProps {
  analysis: IngredientAnalysis;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
  const chartData = [
    { name: 'Safe', value: analysis.safe.length },
    { name: 'Harmful', value: analysis.harmful.length },
  ];
  
  const COLORS = ['#10b981', '#f43f5e'];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-emerald-600';
    if (grade.startsWith('B')) return 'text-emerald-500';
    if (grade.startsWith('C')) return 'text-amber-500';
    if (grade.startsWith('D')) return 'text-orange-500';
    return 'text-rose-600';
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Endocrine': return <i className="fa-solid fa-dna"></i>;
      case 'Carcinogen': return <i className="fa-solid fa-skull-crossbones"></i>;
      case 'Toxic': return <i className="fa-solid fa-flask-vial"></i>;
      case 'Gut Health': return <i className="fa-solid fa-bacteria"></i>;
      case 'Allergen': return <i className="fa-solid fa-virus-covid"></i>;
      default: return <i className="fa-solid fa-circle-nodes"></i>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* High-Level Summary Card */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
           <div className={`text-7xl font-black italic opacity-20 select-none ${getGradeColor(analysis.grade)}`}>
            {analysis.grade}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <div className="w-64 h-64 relative flex-shrink-0 bg-slate-50/50 rounded-full border-8 border-white shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={2000}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-6xl font-black tracking-tighter ${getGradeColor(analysis.grade)}`}>
                {analysis.rating}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Molecular Score</span>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-3">
               <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg">
                Lab Verified
              </span>
              {analysis.brandName && (
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                  {analysis.brandName}
                </span>
              )}
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-4">
              {analysis.productName}
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              {analysis.summary}
            </p>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Ingredients</p>
                 <p className="text-2xl font-black text-slate-900">{analysis.safe.length + analysis.harmful.length}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Safe</p>
                 <p className="text-2xl font-black text-emerald-700">{analysis.safe.length}</p>
              </div>
              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
                 <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Warnings</p>
                 <p className="text-2xl font-black text-rose-700">{analysis.harmful.length}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-2xl">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Health Grade</p>
                 <p className={`text-2xl font-black ${getGradeColor(analysis.grade)}`}>{analysis.grade}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Physiological Impact Mapping */}
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-px bg-slate-200 flex-1"></div>
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Critical Health Warnings</h3>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {analysis.harmful.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysis.harmful.map((ing, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 group hover:border-rose-200 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      {getCategoryIcon(ing.category)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg tracking-tight group-hover:text-rose-600 transition-colors">
                        {ing.name}
                      </h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {ing.category}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    ing.risk === 'High' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {ing.risk}
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Physiological Impact</span>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                      "{ing.effects}"
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {ing.affectedSystems.map((system, sidx) => (
                      <span key={sidx} className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                        <i className="fa-solid fa-gear mr-1.5 text-emerald-400"></i>
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-emerald-50/30 p-12 rounded-[2.5rem] border-2 border-dashed border-emerald-200 text-center">
             <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl">
              <i className="fa-solid fa-face-smile-wink"></i>
             </div>
             <h4 className="text-2xl font-black text-slate-900 tracking-tight">Pure Molecular Profile</h4>
             <p className="text-slate-500 font-bold mt-2">Zero harmful chemicals detected in this analysis.</p>
          </div>
        )}
      </div>

      {/* Safe Ingredients Matrix */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-leaf"></i>
             </div>
             <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Safe Core Ingredients</h3>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified GRAS</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {analysis.safe.map((ing, idx) => (
            <div key={idx} className="px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all cursor-default">
              {ing}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
