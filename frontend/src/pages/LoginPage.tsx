import { useState, useEffect } from 'react';
import { KeyRound, AlertCircle, Users, Shield, User } from 'lucide-react';
import LoginForm from '../components/LoginForm';
import { loginAgent, loginAdmin, registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [role, setRole] = useState<'client' | 'agent' | 'admin'>('client');
  const [message, setMessage] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cachedUser = localStorage.getItem('smartinfo-user');
    const cachedAgent = localStorage.getItem('smartinfo-agent');
    const cachedAdmin = localStorage.getItem('smartinfo-admin');
    if (cachedUser) {
      navigate('/map');
    } else if (cachedAgent) {
      navigate('/agent');
    } else if (cachedAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleClientRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    
    if (!clientName.trim() || !clientPhone.trim()) {
      setMessage('Nome e telefone são obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      await registerUser(clientName, clientPhone);
      localStorage.setItem('smartinfo-user', JSON.stringify({
        name: clientName,
        phoneNumber: clientPhone,
      }));
      navigate('/map');
    } catch (error) {
      setMessage('Erro ao registrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (formRole: 'agent' | 'admin', credentials: { field1: string; field2: string }) => {
    setMessage('');
    setLoading(true);
    try {
      if (formRole === 'agent') {
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
        formRole === 'agent'
          ? 'Nome ou código do agente inválido.'
          : 'Email ou senha inválidos.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 pb-16 pt-6 sm:px-6 animate-slide-up">
      <div className="rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-mpesaRed to-red-500" />
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setRole('client')}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
              role === 'client'
                ? 'bg-mpesaRed text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <User className="h-4 w-4" /> Cliente
          </button>
          <button
            onClick={() => setRole('agent')}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
              role === 'agent'
                ? 'bg-mpesaGreen text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Users className="h-4 w-4" /> Agente
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
              role === 'admin'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Shield className="h-4 w-4" /> Admin
          </button>
        </div>

        {/* Client Form */}
        {role === 'client' && (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-mpesaRed mb-2">Acesso de Cliente</p>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Entre ou Registre-se</h2>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Acesse o mapa de agentes M-Pesa próximos de você.
            </p>

            <form onSubmit={handleClientRegister} className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Seu nome completo"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mpesaRed focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Seu telefone (ex: 840000000)"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mpesaRed focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-mpesaRed to-red-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
              >
                {loading ? 'Processando...' : 'Continuar'}
              </button>
            </form>
          </>
        )}

        {/* Agent/Admin Form */}
        {(role === 'agent' || role === 'admin') && (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-mpesaRed mb-2">
              {role === 'agent' ? 'Painel de Agente' : 'Painel de Administrador'}
            </p>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {role === 'agent' ? 'Acesso do Agente' : 'Acesso do Administrador'}
            </h2>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              {role === 'agent'
                ? 'Gerencie seu estado de funcionamento, configure sua localização e responda a clientes.'
                : 'Administre agentes, pings e operações.'}
            </p>

            <div className="mt-8">
              <LoginForm onLogin={(_, creds) => handleLogin(role, creds)} />
            </div>
          </>
        )}

        {message ? (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-mpesaError border border-red-100">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{message}</span>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default LoginPage;
