import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Send, Clock, CheckCircle2, XCircle, ArrowRight, Loader2 } from 'lucide-react';
import ChatBox from '../components/ChatBox';
import PrimaryButton from '../components/PrimaryButton';
import ReservationTimer from '../components/ReservationTimer';
import type { Agent } from '../types';
import { fetchAgentById } from '../services/agentService';
import { rateAgent } from '../services/agentService';
import { createPing, setOnTheWay, confirmArrival, rejectPing, fetchPings } from '../services/liquidityPingService';
import { api } from '../services/apiClient';

const ChatPage = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loadingAgent, setLoadingAgent] = useState(true);
  const [type, setType] = useState<'Levantamento' | 'Depósito' | ''>('');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'select' | 'amount' | 'pending' | 'confirmed' | 'rejected' | 'eta' | 'arrived'>('select');
  const [etaMinutes, setEtaMinutes] = useState<number>(10);
  const [responseMessage, setResponseMessage] = useState('');
  const [currentPing, setCurrentPing] = useState<any | null>(null);
  const [showRating, setShowRating] = useState(false);
  const [ratingStars, setRatingStars] = useState<number>(5);
  const [ratingComment, setRatingComment] = useState<string>('');
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [customEtaValue, setCustomEtaValue] = useState('15');
  const [etaError, setEtaError] = useState('');

  useEffect(() => {
    if (!agentId) return;
    const getAgent = async () => {
      try {
        const data = await fetchAgentById(agentId);
        setAgent(data);
      } catch (err) {
        console.error('Erro ao buscar agente:', err);
      } finally {
        setLoadingAgent(false);
      }
    };
    getAgent();
  }, [agentId]);

  useEffect(() => {
    if (step !== 'pending' || !currentPing?.id) return;
    
    const interval = setInterval(async () => {
      try {
        const response = await api.get('/liquidity-pings');
        const found = response.data.find((p: any) => p.id === currentPing.id);
        if (found) {
          if (found.status === 'ACCEPTED') {
            setStep('confirmed');
            setResponseMessage('Agente confirmou a sua solicitação. Pode deslocar-se agora!');
            setCurrentPing(found);
            clearInterval(interval);
          } else if (found.status === 'REJECTED') {
            setStep('rejected');
            setResponseMessage('Este agente não consegue atender agora. Tente outro agente próximo.');
            setCurrentPing(found);
            clearInterval(interval);
          }
        }
      } catch (err) {
        console.error('Erro ao verificar estado do ping:', err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [step, currentPing]);

  useEffect(() => {
    if (step !== 'arrived' || !currentPing?.id) return;
    
    const interval = setInterval(async () => {
      try {
        const response = await api.get('/liquidity-pings');
        const found = response.data.find((p: any) => p.id === currentPing.id);
        if (found) {
          if (found.status === 'ARRIVED') {
            setShowRating(true);
            clearInterval(interval);
          } else if (found.status === 'EXPIRED') {
            alert('A sua reserva expirou!');
            navigate('/map');
            clearInterval(interval);
          } else if (found.status === 'REJECTED') {
            alert('O pedido foi cancelado.');
            navigate('/map');
            clearInterval(interval);
          }
        }
      } catch (err) {
        console.error('Erro ao verificar estado do ping:', err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [step, currentPing, navigate]);


  const sendRequest = async () => {
    if (!type || !amount.trim() || !agent) return;
    setStep('pending');
    setResponseMessage('Aguardando resposta do agente...');

    const clientData = localStorage.getItem('smartinfo-user');
    const client = clientData ? JSON.parse(clientData) : { name: 'Cliente Anónimo', phoneNumber: '840000000' };

    try {
      const numericAmount = parseFloat(amount.replace(/[^\d]/g, '')) || 100;
      const ping = await createPing({
        clientName: client.name,
        clientPhone: client.phoneNumber || client.phone || '840000000',
        agentId: agent.id,
        amount: numericAmount,
        type: type === 'Levantamento' ? 'WITHDRAW' : 'DEPOSIT'
      });
      setCurrentPing(ping);
    } catch (err) {
      console.error('Erro ao enviar ping:', err);
      // Fallback simulating locally if backend fails
      setTimeout(() => {
        setStep('confirmed');
        setResponseMessage('Agente confirmou a sua solicitação. (Simulado offline)');
      }, 2500);
    }
  };

  const handleEtaSelect = async (etaMinutes: number) => {
    const eta = `${etaMinutes} min`;
    setEtaMinutes(etaMinutes);

    if (!currentPing?.id) {
      setStep('arrived');
      return;
    }
    try {
      const updated = await setOnTheWay(currentPing.id, eta);
      setCurrentPing(updated);
      setStep('arrived');
    } catch (err) {
      console.error('Erro ao confirmar a caminho:', err);
      setStep('arrived');
    }
  };

  if (loadingAgent) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center animate-fade-in">
        <Loader2 className="h-12 w-12 text-mpesaRed mx-auto mb-3 animate-spin" />
        <p className="text-sm font-bold text-slate-600">A carregar detalhes do agente...</p>
      </main>
    );
  }

  if (!agent) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center animate-fade-in">
        <XCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
        <p className="text-lg font-bold text-slate-600">Agente não encontrado.</p>
        <button onClick={() => navigate('/map')} className="mt-4 text-sm font-bold text-mpesaRed hover:underline">
          Voltar ao mapa
        </button>
      </main>
    );
  }


  return (
    <main className="mx-auto max-w-4xl px-4 pb-28 pt-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header */}
      <div className="rounded-3xl bg-white border border-slate-100 p-5 shadow-sm mb-5">
        <div className="flex items-center justify-between gap-3">
          <button 
            type="button" 
            onClick={() => navigate('/map')} 
            className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-mpesaRed transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Mapa
          </button>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Chat com Agente</p>
          <div className="w-14" />
        </div>

        {/* Agent Info Bar */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-100 p-3">
          <div className="h-10 w-10 rounded-xl bg-mpesaRed/10 flex items-center justify-center text-mpesaRed font-bold text-sm">
            {agent.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{agent.name}</p>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5" />
              {agent.neighborhood}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
            <Star className="h-3 w-3 fill-amber-500" />
            {agent.rating?.toFixed(1) || '5.0'}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="rounded-3xl bg-white border border-slate-100 p-5 shadow-sm space-y-5">
        <ChatBox agent={agent} message={type ? `${type} ${amount}` : ''} />
        
        {/* Step: Select Type */}
        {step === 'select' && (
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Que operação pretende?</p>
            <div className="grid gap-3 grid-cols-2">
              <button 
                type="button" 
                onClick={() => setType('Levantamento')}
                className={`rounded-2xl border-2 py-4 text-sm font-bold transition-all duration-300 active:scale-95 ${
                  type === 'Levantamento' 
                    ? 'border-mpesaRed bg-mpesaRed/5 text-mpesaRed' 
                    : 'border-slate-100 text-slate-600 hover:border-mpesaRed/30'
                }`}
              >
                Levantamento
              </button>
              <button 
                type="button" 
                onClick={() => setType('Depósito')}
                className={`rounded-2xl border-2 py-4 text-sm font-bold transition-all duration-300 active:scale-95 ${
                  type === 'Depósito' 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-slate-100 text-slate-600 hover:border-blue-300'
                }`}
              >
                Depósito
              </button>
            </div>
            {type && (
              <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 animate-slide-up">
                <p className="text-sm font-bold text-slate-700">Quanto pretende?</p>
                <input
                  value={amount}
                  onChange={event => setAmount(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-mpesaRed focus:ring-4 focus:ring-mpesaRed/10"
                  placeholder="Ex: 2000 MT"
                  inputMode="numeric"
                />
                <PrimaryButton 
                  type="button" 
                  onClick={sendRequest} 
                  className="w-full py-3.5 font-bold flex justify-center items-center gap-2 shadow-lg shadow-mpesaRed/10 transition transform active:scale-95"
                >
                  <Send className="h-4 w-4" />
                  Enviar pedido ao agente
                </PrimaryButton>
              </div>
            )}
          </div>
        )}

        {/* Step: Pending */}
        {step === 'pending' && (
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-center">
            <Loader2 className="h-8 w-8 text-mpesaRed mx-auto mb-3 animate-spin" />
            <p className="text-sm font-bold text-slate-700">{responseMessage}</p>
            <p className="text-xs text-slate-400 mt-1">Isto demora normalmente menos de 1 minuto</p>
          </div>
        )}

        {/* Step: Confirmed */}
        {step === 'confirmed' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-emerald-700">Confirmado!</p>
                <p className="text-xs text-emerald-600 mt-0.5">{responseMessage}</p>
              </div>
            </div>
            <PrimaryButton 
              type="button" 
              onClick={() => setStep('eta')} 
              className="w-full py-3.5 font-bold flex justify-center items-center gap-2 shadow-lg shadow-mpesaRed/10 transition transform active:scale-95"
            >
              <ArrowRight className="h-4 w-4" />
              Estou a caminho
            </PrimaryButton>
          </div>
        )}

        {/* Step: Rejected */}
        {step === 'rejected' && (
          <div className="rounded-2xl bg-red-50 border border-red-100 p-5 flex items-start gap-3">
            <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-red-700">Não disponível</p>
              <p className="text-xs text-red-600 mt-0.5">{responseMessage}</p>
              <button 
                onClick={() => navigate('/map')} 
                className="mt-3 text-xs font-bold text-mpesaRed hover:underline"
              >
                Procurar outro agente →
              </button>
            </div>
          </div>
        )}

        {/* Step: ETA */}
        {step === 'eta' && (
          <div className="rounded-2xl border border-mpesaGreen bg-mpesaGreen/5 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-mpesaGreen" />
              <p className="text-sm font-bold text-slate-800">Quanto tempo até chegar?</p>
            </div>
            <p className="text-xs text-slate-600">Escolha entre 1 e 30 minutos</p>
            <div className="grid gap-2 grid-cols-4 sm:grid-cols-6">
              {[5, 10, 15, 20, 25, 30].map(minutes => (
                <button 
                  key={minutes} 
                  type="button" 
                  className="rounded-xl border-2 border-mpesaGreen bg-white text-mpesaGreen px-2 py-3 text-sm font-bold transition-all duration-300 hover:bg-mpesaGreen hover:text-white active:scale-95" 
                  onClick={() => handleEtaSelect(minutes)}
                >
                  {minutes}m
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-mpesaGreen/20">
              <label className="block text-xs font-bold text-slate-700 mb-2">Ou escolha outro tempo:</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={customEtaValue}
                  onChange={e => setCustomEtaValue(e.target.value)}
                  className="flex-1 rounded-xl border-2 border-mpesaGreen bg-white px-3 py-2.5 text-sm font-bold text-mpesaGreen outline-none focus:ring-2 focus:ring-mpesaGreen/20"
                  placeholder="Ex: 12"
                />
                <button
                  type="button"
                  className="rounded-xl bg-mpesaGreen text-white px-4 py-2.5 font-bold text-sm transition hover:bg-mpesaGreen/90 active:scale-95"
                  onClick={() => {
                    const parsed = parseInt(customEtaValue, 10);
                    if (isNaN(parsed) || parsed < 1) {
                      setEtaError('Informe um valor entre 1 e 30 minutos.');
                      return;
                    }
                    const limited = parsed > 30 ? 30 : parsed;
                    handleEtaSelect(limited);
                    setEtaError('');
                  }}
                >
                  OK
                </button>
              </div>
              {etaError && <p className="text-xs text-mpesaError mt-2">{etaError}</p>}
            </div>
          </div>
        )}

        {/* Step: Arrived / Timer */}
        {step === 'arrived' && (
          <div className="space-y-4">
            <ReservationTimer minutes={etaMinutes} onExpire={() => navigate('/map')} />
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="rounded-2xl bg-emerald-600 text-white py-3.5 font-bold"
                onClick={async () => {
                  try {
                    if (currentPing?.id) await confirmArrival(currentPing.id);
                    setShowRating(true);
                  } catch (err) {
                    console.error('Erro ao confirmar chegada:', err);
                    setShowRating(true);
                  }
                }}
              >
                Cheguei
              </button>
              <button
                type="button"
                className="rounded-2xl bg-red-600 text-white py-3.5 font-bold"
                onClick={async () => {
                  try {
                    if (currentPing?.id) await rejectPing(currentPing.id);
                    navigate('/map');
                  } catch (err) {
                    console.error('Erro ao cancelar pedido:', err);
                    navigate('/map');
                  }
                }}
              >
                Não virei mais
              </button>
            </div>
            {showRating && agent && (
              <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4">
                <p className="text-sm font-bold text-slate-700">Avalie o agente</p>
                <div className="flex items-center gap-2 mt-2">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" onClick={() => setRatingStars(s)} className={`text-2xl ${ratingStars>=s? 'text-amber-400':'text-slate-300'}`}>
                      ★
                    </button>
                  ))}
                </div>
                <textarea value={ratingComment} onChange={e=>setRatingComment(e.target.value)} placeholder="Comentário (opcional)" className="w-full mt-3 p-3 rounded-xl border border-slate-200" />
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button className="rounded-2xl bg-emerald-600 text-white py-3.5 font-bold" type="button" onClick={async ()=>{
                    try{
                      setRatingSubmitting(true);
                      const clientData = localStorage.getItem('smartinfo-user');
                      const client = clientData ? JSON.parse(clientData) : { phoneNumber: '' };
                      await rateAgent(agent.id, ratingStars, ratingComment, client.phoneNumber || client.phone || '');
                      setRatingSubmitting(false);
                      navigate('/map');
                    }catch(err){
                      console.error('Erro ao enviar avaliação:', err);
                      setRatingSubmitting(false);
                      navigate('/map');
                    }
                  }}>{ratingSubmitting? 'Enviando...':'Enviar avaliação'}</button>
                  <button className="rounded-2xl bg-slate-200 text-slate-700 py-3.5 font-bold" type="button" onClick={()=>{setShowRating(false); navigate('/map');}}>Pular</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default ChatPage;
