
import React, { useState, useEffect } from 'react';
import { AuthState, User, IngredientAnalysis } from './types';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [history, setHistory] = useState<IngredientAnalysis[]>([]);

  // Mock auto-login
  useEffect(() => {
    const savedAuth = localStorage.getItem('scanalyze_auth');
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth));
    }
    const savedHistory = localStorage.getItem('scanalyze_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleLogin = (user: User, token: string) => {
    const newAuth = { user, token, isAuthenticated: true };
    setAuth(newAuth);
    localStorage.setItem('scanalyze_auth', JSON.stringify(newAuth));
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setAuth({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('scanalyze_auth');
  };

  const addToHistory = (analysis: IngredientAnalysis) => {
    const newHistory = [analysis, ...history];
    setHistory(newHistory);
    localStorage.setItem('scanalyze_history', JSON.stringify(newHistory));
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <Navbar 
        auth={auth} 
        onLogout={handleLogout} 
        onLoginClick={() => setIsAuthModalOpen(true)} 
      />
      
      <main className="flex-1 overflow-y-auto">
        {auth.isAuthenticated ? (
          <Dashboard 
            user={auth.user}
            history={history} 
            onNewAnalysis={addToHistory} 
          />
        ) : (
          <LandingPage onGetStarted={() => setIsAuthModalOpen(true)} />
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleLogin} 
      />
    </div>
  );
};

export default App;
