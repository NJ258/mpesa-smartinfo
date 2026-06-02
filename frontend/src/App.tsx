import { Route, Routes, Navigate, useLocation, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import MapPage from './pages/MapPage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import AgentPage from './pages/AgentPage';
import AdminPage from './pages/AdminPage';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import { useEffect, useState } from 'react';
import { Home, Map, UserSquare2, Compass } from 'lucide-react';

function App() {
  const [online, setOnline] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  if (!location) {
    return <LoadingScreen />;
  }

  // Helper to determine active path
  const isActive = (path: string) => location.pathname === path;
  
  // Check if client is registered
  const hasClient = !!localStorage.getItem('smartinfo-client');
  const clientPath = hasClient ? '/map' : '/register';

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-mpesaGray pb-24 md:pb-0">
      <ScrollToTop />
      {/* Top Navbar */}
      <nav className="fixed inset-x-0 top-0 z-[1000] border-b border-slate-100 bg-white/80 backdrop-blur-md px-4 py-3.5 shadow-sm sm:px-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="h-8 w-8 rounded-lg bg-mpesaRed flex items-center justify-center text-white font-black text-sm shadow-sm shadow-mpesaRed/10">
              M
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">SmartInfo</p>
              <p className="text-xs font-bold text-mpesaRed -mt-0.5">Vodacom M-Pesa</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold">
            <Link 
              to="/" 
              className={`transition-colors relative py-1 ${isActive('/') ? 'text-mpesaRed after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-mpesaRed' : 'text-slate-500 hover:text-mpesaRed'}`}
            >
              Início
            </Link>
            <Link 
              to={clientPath} 
              className={`transition-colors relative py-1 ${isActive('/map') || isActive('/register') ? 'text-mpesaRed after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-mpesaRed' : 'text-slate-500 hover:text-mpesaRed'}`}
            >
              Procurar Agentes
            </Link>
            <Link 
              to="/login" 
              className={`transition-colors relative py-1 ${isActive('/login') || isActive('/agent') || isActive('/admin') ? 'text-mpesaRed after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-mpesaRed' : 'text-slate-500 hover:text-mpesaRed'}`}
            >
              Área do Agente
            </Link>
          </div>

          <div className="flex items-center gap-2 bg-gradient-to-r from-mpesaGreen/5 to-slate-50 px-3 py-1.5 rounded-full border border-mpesaGreen/20">
            <span className={`h-2 w-2 rounded-full ${online ? 'bg-mpesaGreen animate-pulse' : 'bg-mpesaRed'}`} />
            <span className="text-xs font-bold text-slate-600 hidden sm:inline">
              {online ? 'Online' : 'Sem conexão'}
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/chat/:agentId" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/agent" element={<AgentPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {/* Mobile Sticky Bottom Nav Bar (Centered & Spaced Uniformly) */}
      <div className="fixed bottom-0 inset-x-0 z-[1000] bg-white/95 backdrop-blur-md border-t border-slate-100 py-3.5 px-2 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.04)] flex justify-evenly items-center">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 text-[10px] font-bold w-20 text-center transition-colors ${isActive('/') ? 'text-mpesaRed' : 'text-slate-400 hover:text-mpesaRed'}`}
        >
          <Home className="h-5 w-5" />
          <span>Início</span>
        </Link>
        <Link 
          to={clientPath} 
          className={`flex flex-col items-center gap-1 text-[10px] font-bold w-20 text-center transition-colors ${isActive('/map') || isActive('/register') ? 'text-mpesaRed' : 'text-slate-400 hover:text-mpesaRed'}`}
        >
          <Map className="h-5 w-5" />
          <span>Mapa</span>
        </Link>
        <Link 
          to="/login" 
          className={`flex flex-col items-center gap-1 text-[10px] font-bold w-20 text-center transition-colors ${isActive('/login') || isActive('/agent') || isActive('/admin') ? 'text-mpesaRed' : 'text-slate-400 hover:text-mpesaRed'}`}
        >
          <UserSquare2 className="h-5 w-5" />
          <span>Painel</span>
        </Link>
      </div>
    </div>
  );
}

export default App;
