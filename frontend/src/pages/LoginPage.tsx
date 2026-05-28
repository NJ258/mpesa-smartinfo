import { useState, useEffect } from 'react';
import { KeyRound, AlertCircle } from 'lucide-react';
import LoginForm from '../components/LoginForm';
import { loginAgent, loginAdmin } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cachedAgent = localStorage.getItem('smartinfo-agent');
    const cachedAdmin = localStorage.getItem('smartinfo-admin');
    if (cachedAgent) {
      navigate('/agent');
    } else if (cachedAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (role: 'agent' | 'admin', credentials: { field1: string; field2: string }) => {
    setMessage('');
    try {
      if (role === 'agent') {
        const data = await loginAgent(credentials.field1, credentials.field2);
        localStorage.setItem('smartinfo-agent', JSON.stringify(data.agent));
        navigate('/agent');
      } else {
        const data = await loginAdmin(credentials.field1, credentials.field2);
        localStorage.setItem('smartinfo-admin', JSON.stringify(data.admin));
        navigate('/admin');
      }
    } catch (error) {
      setMessage(
        role === 'agent'
          ? 'Nome ou código do agente inválido.'
          : 'Email ou senha inválidos.'
      );
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 pb-16 pt-6 sm:px-6 animate-slide-up">
      <div className="rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-mpesaRed to-red-500" />
        
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-mpesaRed mb-2">Painel de Acesso</p>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Área do Parceiro</h2>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          Gerencie seu estado de funcionamento, configure sua localização e responda a clientes.
        </p>

        <div className="mt-8">
          <LoginForm onLogin={handleLogin} />
          
          {message ? (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-mpesaError border border-red-100">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{message}</span>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
