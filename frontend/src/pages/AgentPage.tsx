import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Power, MapPin, Inbox, Users, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import type { Agent } from '../types';
import { fetchPings, acceptPing, rejectPing } from '../services/liquidityPingService';
import { fetchAgentById, updateAgentStatus } from '../services/agentService';

const AgentPage = () => {
  const [agentInfo, setAgentInfo] = useState<any>(null);
  const [online, setOnline] = useState(false);
  const [landmark, setLandmark] = useState('');
  const [requests, setRequests] = useState<any[]>([]);
  const [onTheWay, setOnTheWay] = useState<any[]>([]);
  const navigate = useNavigate();

  // 1. Session check on mount
  useEffect(() => {
    const cachedAgent = localStorage.getItem('smartinfo-agent');
    if (!cachedAgent) {
      navigate('/login');
      return;
    }
    setAgentInfo(JSON.parse(cachedAgent));
  }, [navigate]);

  const loadAgentDetails = async (agentId: string) => {
    try {
      const agentData = await fetchAgentById(agentId);
      setOnline(agentData.online);
      setLandmark(agentData.landmark || '');
    } catch (err) {
      console.error('Erro ao carregar detalhes do agente:', err);
    }
  };

  const loadPings = async (agentId: string) => {
    try {
      const allPings = await fetchPings(agentId);
      setRequests(allPings.filter(p => p.status === 'PENDING'));
      setOnTheWay(allPings.filter(p => p.status === 'ON_THE_WAY'));
    } catch (err) {
      console.error('Erro ao carregar pings da API:', err);
    }
  };

  // 2. Fetch data once agentInfo is loaded
  useEffect(() => {
    if (!agentInfo) return;

    loadAgentDetails(agentInfo.id);
    loadPings(agentInfo.id);

    const interval = setInterval(() => loadPings(agentInfo.id), 3000);
    return () => clearInterval(interval);
  }, [agentInfo]);

  const toggleOnline = async () => {
    if (!agentInfo) return;
    const nextState = !online;
    setOnline(nextState);
    try {
      await updateAgentStatus(agentInfo.id, { isActive: nextState });
    } catch (err) {
      console.error('Erro ao atualizar estado no servidor:', err);
      setOnline(!nextState);
    }
  };

  const handleLandmarkChange = async (val: string) => {
    if (!agentInfo) return;
    setLandmark(val);
    try {
      await updateAgentStatus(agentInfo.id, { referencePoint: val });
    } catch (err) {
      console.error('Erro ao atualizar ponto de referência no servidor:', err);
    }
  };

  const handleDecision = async (id: string, accept: boolean) => {
    if (!agentInfo) return;
    try {
      if (accept) {
        await acceptPing(id);
      } else {
        await rejectPing(id);
      }
      loadPings(agentInfo.id);
    } catch (err) {
      console.error('Erro ao responder ao ping:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('smartinfo-agent');
    navigate('/login');
  };

  if (!agentInfo) {
    return <div className="text-center py-20 text-slate-500 font-medium">Carregando painel do agente...</div>;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-mpesaRed/5 blur-3xl" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mpesaRed mb-1">Área do Agente</p>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Olá, {agentInfo.name}</h1>
            <p className="text-sm text-slate-400 mt-1">Código do parceiro: {agentInfo.code}</p>
          </div>
          <button 
            type="button" 
            onClick={toggleOnline} 
            className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
              online 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600' 
                : 'bg-white/10 text-white/60 border border-white/10 hover:bg-white/20'
            }`}
          >
            <Power className="h-4 w-4" />
            {online ? 'Online' : 'Offline'}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Landmark Card */}
        <div className="rounded-3xl bg-white border border-slate-100 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-xl bg-mpesaRed/10 flex items-center justify-center text-mpesaRed">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Ponto de Referência</p>
              <p className="text-[10px] text-slate-400">Ajude clientes a encontrá-lo</p>
            </div>
          </div>
          <input
            value={landmark}
            onChange={event => handleLandmarkChange(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-mpesaRed focus:bg-white focus:ring-4 focus:ring-mpesaRed/10"
            placeholder="Ex: Perto da banca azul"
          />
        </div>

        {/* Requests */}
        <div className="rounded-3xl bg-white border border-slate-100 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Inbox className="h-4 w-4" />
              </div>
              <p className="text-sm font-bold text-slate-800">Pedidos Recebidos</p>
            </div>
            <span className="text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full">
              {requests.length} pendentes
            </span>
          </div>
          <div className="space-y-3">
            {requests.length ? (
              requests.map(request => (
                <div key={request.id} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:border-slate-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{request.clientName}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{request.type === 'WITHDRAW' ? 'Levantamento' : 'Depósito'} • <span className="font-semibold text-slate-600">{request.amount} MT</span></p>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">Pendente</span>
                  </div>
                  <div className="grid gap-2 grid-cols-2">
                    <button 
                      type="button" 
                      onClick={() => handleDecision(request.id, true)} 
                      className="rounded-xl bg-emerald-500 text-white py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-600 transition active:scale-95"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Aceitar
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleDecision(request.id, false)} 
                      className="rounded-xl border border-red-200 text-mpesaRed py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-red-50 transition active:scale-95"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      Rejeitar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400">
                <Inbox className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-medium">Sem pedidos novos agora.</p>
              </div>
            )}
          </div>
        </div>

        {/* On The Way */}
        <div className="rounded-3xl bg-white border border-slate-100 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Users className="h-4 w-4" />
              </div>
              <p className="text-sm font-bold text-slate-800">Clientes a Caminho</p>
            </div>
            <span className="text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full">
              {onTheWay.length}
            </span>
          </div>
          <div className="space-y-3">
            {onTheWay.length ? (
              onTheWay.map(request => (
                <div key={request.id} className="rounded-2xl bg-gradient-to-r from-blue-50/50 to-sky-50/50 border border-blue-100/50 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{request.clientName}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{request.type === 'WITHDRAW' ? 'Levantamento' : 'Depósito'} • {request.amount} MT</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-white px-3 py-1.5 rounded-full border border-blue-100">
                      <Clock className="h-3 w-3" />
                      ETA {request.eta}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400">
                <Users className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-medium">Nenhum cliente em caminho.</p>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <button 
          type="button" 
          onClick={handleLogout} 
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-500 hover:border-mpesaRed hover:text-mpesaRed transition flex items-center justify-center gap-2 animate-pulse-subtle"
        >
          Terminar Sessão e Sair
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
};

export default AgentPage;
