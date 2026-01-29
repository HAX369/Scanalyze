
import React from 'react';
import { IngredientAnalysis } from '../types';

interface HistoryListProps {
  history: IngredientAnalysis[];
  onSelect: (analysis: IngredientAnalysis) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-200">
          <i className="fa-solid fa-microscope text-3xl"></i>
        </div>
        <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-2">Lab Empty</h4>
        <p className="text-xs text-slate-400 font-bold">Your analysis history will appear here.</p>
      </div>
    );
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500 text-white';
    if (score >= 60) return 'bg-amber-400 text-white';
    return 'bg-rose-500 text-white';
  };

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="w-full group flex items-center justify-between p-5 rounded-[1.5rem] border border-slate-100 bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all text-left"
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 transition-transform ${getScoreBg(item.rating)}`}>
              {item.grade}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-black text-slate-900 text-sm truncate max-w-[140px] tracking-tight">{item.productName}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{new Date(item.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-200 group-hover:text-emerald-500 transition-colors">
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </div>
        </button>
      ))}
    </div>
  );
};

export default HistoryList;
