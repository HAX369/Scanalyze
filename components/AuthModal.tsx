
import React, { useState } from 'react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User, token: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUser: User = {
        id: 'user_1',
        name: formData.name || 'Demo User',
        email: formData.email,
        role: 'user',
      };
      onSuccess(mockUser, 'fake_jwt_token');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md p-10 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="mb-10 text-center">
          <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-400 text-3xl shadow-xl">
            <i className="fa-solid fa-fingerprint"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Identity'}
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            {isLogin ? 'Authorize your lab access' : 'Join the molecular safety revolution'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-bold text-slate-900 shadow-sm"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Identity</label>
            <input 
              type="email" 
              required
              className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-bold text-slate-900 shadow-sm"
              placeholder="name@science.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Access Key</label>
            <input 
              type="password" 
              required
              className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-bold text-slate-900 shadow-sm"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all flex items-center justify-center space-x-3 uppercase tracking-widest"
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              <>
                <span>{isLogin ? 'Authorize' : 'Initialize'}</span>
                <i className="fa-solid fa-arrow-right text-emerald-400"></i>
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          {isLogin ? "New Researcher?" : "Already Authorized?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-600 font-black hover:underline ml-2"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
