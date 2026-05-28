import { useState } from 'react';
import { User, Lock, ShieldCheck, UserCheck, Eye, EyeOff, Mail, Hash } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

interface LoginFormProps {
  onLogin: (role: 'agent' | 'admin', credentials: { field1: string; field2: string }) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [activeTab, setActiveTab] = useState<'agent' | 'admin'>('agent');
  const [agentName, setAgentName] = useState('');
  const [agentCode, setAgentCode] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (activeTab === 'agent') {
      onLogin('agent', { field1: agentName, field2: agentCode });
    } else {
      onLogin('admin', { field1: adminEmail, field2: adminPassword });
    }
  };

  return (
    <div className="space-y-5">
      {/* Tab Switcher */}
      <div className="flex rounded-2xl bg-slate-100 p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('agent')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            activeTab === 'agent'
              ? 'bg-white text-mpesaRed shadow-sm'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <UserCheck className="h-3.5 w-3.5" />
          Agente
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('admin')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            activeTab === 'admin'
              ? 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin
        </button>
      </div>

      {/* Agent Login Fields */}
      {activeTab === 'agent' && (
        <div className="space-y-4 animate-slide-up">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Nome do Agente</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <User className="h-4 w-4" />
              </div>
              <input
                value={agentName}
                onChange={e => setAgentName(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-mpesaRed focus:bg-white focus:ring-4 focus:ring-mpesaRed/10"
                placeholder="Insira o seu nome"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Código do Agente</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Hash className="h-4 w-4" />
              </div>
              <input
                value={agentCode}
                onChange={e => setAgentCode(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-mpesaRed focus:bg-white focus:ring-4 focus:ring-mpesaRed/10"
                placeholder="Ex: AG-001"
              />
            </div>
          </div>
        </div>
      )}

      {/* Admin Login Fields */}
      {activeTab === 'admin' && (
        <div className="space-y-4 animate-slide-up">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Email</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                value={adminEmail}
                onChange={e => setAdminEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-mpesaRed focus:bg-white focus:ring-4 focus:ring-mpesaRed/10"
                placeholder="admin@mpesa.co.mz"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Senha</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm text-slate-800 outline-none transition focus:border-mpesaRed focus:bg-white focus:ring-4 focus:ring-mpesaRed/10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        {activeTab === 'agent' ? (
          <PrimaryButton
            type="button"
            onClick={handleSubmit}
            className="w-full py-3.5 font-bold flex justify-center items-center gap-2 shadow-lg shadow-mpesaRed/10 hover:shadow-mpesaRed/25 transform active:scale-98 transition"
          >
            <UserCheck className="h-4 w-4" />
            <span>Entrar como Agente</span>
          </PrimaryButton>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-2xl bg-slate-800 hover:bg-slate-900 py-3.5 text-sm font-bold text-white flex justify-center items-center gap-2 transform active:scale-98 transition shadow-lg shadow-slate-950/10"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Entrar como Administrador</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
