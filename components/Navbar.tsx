
import React from 'react';
import { AuthState } from '../types';

interface NavbarProps {
  auth: AuthState;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ auth, onLogout, onLoginClick }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="relative">
          {/* Unique Hexagonal Molecular Logo */}
          <div className="bg-slate-900 w-12 h-12 flex items-center justify-center rounded-xl rotate-45 shadow-lg shadow-slate-200 overflow-hidden group hover:rotate-90 transition-transform duration-500">
            <div className="-rotate-45 group-hover:-rotate-90 transition-transform duration-500">
              <i className="fa-solid fa-microscope text-emerald-400 text-xl"></i>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
            <i className="fa-solid fa-bolt text-[8px] text-white"></i>
          </div>
        </div>
        <div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            SCAN<span className="text-emerald-600">ALYZE</span>
          </span>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest -mt-1">Molecular Safety Lab</p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {auth.isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{auth.user?.name}</p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Premium Member</p>
            </div>
            <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-emerald-400 font-bold border border-slate-800 shadow-sm">
              {auth.user?.name.charAt(0)}
            </div>
            <button 
              onClick={onLogout}
              className="px-4 py-2 text-xs font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95 text-sm uppercase tracking-widest"
          >
            Access Lab
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
