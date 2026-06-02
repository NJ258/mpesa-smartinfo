import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, AlertCircle, Compass, Loader2 } from 'lucide-react';
import PrimaryButton from '../components/PrimaryButton';
import { registerUser } from '../services/authService';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    if (!name.trim() || !phone.trim()) {
      setError('Por favor preencha o seu nome e número M-Pesa.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 8 || cleanPhone.length > 12) {
      setError('Por favor, introduza um número M-Pesa válido (84/85).');
      return;
    }

    setLoading(true);
    try {
      await registerUser(name.trim(), cleanPhone);
      navigate('/map');
    } catch (err) {
      setError('Erro ao registrar. Tente novamente.');
      console.error('Erro de registro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 pb-16 pt-6 sm:px-6 animate-slide-up">

      <div className="rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-mpesaRed to-red-500" />
        
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-mpesaRed mb-2">Acesso Rápido</p>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Comece a poupar tempo</h2>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          Basta inserir o seu nome e número de telefone para consultar a disponibilidade de agentes ao seu redor.
        </p>

        <div className="mt-8 space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Como gostaria de ser tratado?</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <User className="h-4 w-4" />
              </div>
              <input
                value={name}
                onChange={event => setName(event.target.value)}
                disabled={loading}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-mpesaRed focus:bg-white focus:ring-4 focus:ring-mpesaRed/10 disabled:opacity-50"
                placeholder="Ex: Maria Manuel"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Número M-Pesa</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Phone className="h-4 w-4" />
              </div>
              <input
                value={phone}
                onChange={event => setPhone(event.target.value)}
                disabled={loading}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-mpesaRed focus:bg-white focus:ring-4 focus:ring-mpesaRed/10 disabled:opacity-50"
                placeholder="84 123 4567"
                inputMode="tel"
              />
            </div>
            <p className="text-[10px] text-slate-400">Utilizado apenas para o agente identificá-lo no chat.</p>
          </div>

          {/* Error Message */}
          {error ? (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-mpesaError border border-red-100">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          {/* Submit Button */}
          <PrimaryButton 
            type="button" 
            onClick={handleSubmit} 
            disabled={loading}
            className="w-full py-4 font-bold flex justify-center items-center gap-2 shadow-lg shadow-mpesaRed/10 hover:shadow-mpesaRed/20 transition transform active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <Compass className="h-4 w-4" />
                <span>Ver Agentes Próximos</span>
              </>
            )}
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
