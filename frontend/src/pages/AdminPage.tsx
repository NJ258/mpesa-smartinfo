import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Wifi, Clock, Navigation, AlertTriangle, TrendingUp, ChevronRight, Shield, MapPin, LogOut } from 'lucide-react';
import PrimaryButton from '../components/PrimaryButton';
import { fetchAgents } from '../services/agentService';
import { fetchPings } from '../services/liquidityPingService';
import { requestTemporaryAgent } from '../services/temporaryAgentService';
import axios from 'axios';

const AdminPage = () => {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState<any>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [pings, setPings] = useState<any[]>([]);
  const [tempAgentsCount, setTempAgentsCount] = useState(0);

  // 1. Session check on mount
  useEffect(() => {
    const cachedAdmin = localStorage.getItem('smartinfo-admin');
    if (!cachedAdmin) {
      navigate('/login');
      return;
    }
    setAdminInfo(JSON.parse(cachedAdmin));
  }, [navigate]);

  const loadData = async () => {
    try {
      const fetchedAgents = await fetchAgents();
      setAgents(fetchedAgents);

      const fetchedPings = await fetchPings();
      setPings(fetchedPings);

      const resTemp = await axios.get('http://localhost:5000/api/temporary-agents');
      setTempAgentsCount(resTemp.data.length);
    } catch (err) {
      console.error('Erro ao carregar dados do admin:', err);
    }
  };

  // 2. Fetch data once adminInfo is loaded
  useEffect(() => {
    if (!adminInfo) return;

    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, [adminInfo]);

  const totalAgents = agents.length;
  const onlineAgents = agents.filter(agent => agent.status === 'online').length;
  const pendingRequests = pings.filter(request => request.status === 'PENDING').length;
  const onTheWayCount = pings.filter(request => request.status === 'ON_THE_WAY').length;
  const tempAgents = tempAgentsCount;

  const handleRequestReforco = async () => {
    const neighborhood = prompt('Digite o nome do bairro para enviar reforço temporário:', 'Xipamanine');
    if (!neighborhood) return;
    try {
      const lat = -25.95 + (Math.random() - 0.5) * 0.02;
      const lng = 32.57 + (Math.random() - 0.5) * 0.02;
      await requestTemporaryAgent(neighborhood, lat, lng);
      alert(`Reforço temporário solicitado com sucesso para ${neighborhood}!`);
      loadData();
    } catch (err) {
      console.error('Erro ao solicitar reforço:', err);
      alert('Falha ao solicitar reforço temporário.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('smartinfo-admin');
    navigate('/login');
  };

  const zones = useMemo(
    () => [
      { name: 'Polana Cimento', demand: 'Alta', color: 'text-red-600 bg-red-50 border-red-100' },
      { name: 'Xikhelene', demand: 'Média', color: 'text-amber-600 bg-amber-50 border-amber-100' },
      { name: 'Zimpeto', demand: 'Alta', color: 'text-red-600 bg-red-50 border-red-100' }
    ],
    []
  );

  const stats = [
    { label: 'Total Agentes', value: totalAgents, icon: Users, color: 'bg-slate-100 text-slate-600' },
    { label: 'Online Agora', value: onlineAgents, icon: Wifi, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Pedidos Pendentes', value: pendingRequests, icon: Clock, color: 'bg-amber-50 text-amber-600' },
    { label: 'A Caminho', value: onTheWayCount, icon: Navigation, color: 'bg-blue-50 text-blue-600' },
  ];

  if (!adminInfo) {
    return <div className="text-center py-20 text-slate-500 font-medium">Carregando painel do administrador...</div>;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 relative overflow-hidden mb-6">
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative flex justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-mpesaRed" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-mpesaRed">Painel do Admin</p>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Olá, {adminInfo.name}</h1>
            <p className="text-sm text-slate-400 mt-1">E-mail: {adminInfo.email}</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-1.5 rounded-2xl bg-white/10 text-white/80 hover:bg-red-500 hover:text-white border border-white/10 px-4 py-2.5 text-xs font-bold transition-all duration-300"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sair
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-2xl bg-white border border-slate-100 p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className={`h-9 w-9 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">{stat.value}</p>
            <p className="text-xs font-medium text-slate-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        {/* Critical Zones */}
        <div className="rounded-3xl bg-white border border-slate-100 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-9 w-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Zonas Críticas</p>
              <p className="text-[10px] text-slate-400">Áreas com alta procura de agentes</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {zones.map(zone => (
              <div key={zone.name} className="rounded-2xl bg-slate-50/50 border border-slate-100 p-4 flex items-center justify-between transition-all hover:border-slate-200">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <p className="text-sm font-bold text-slate-800">{zone.name}</p>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${zone.color}`}>
                  Procura {zone.demand}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Temporary Agents */}
        <div className="rounded-3xl bg-gradient-to-r from-violet-50/50 to-purple-50/50 border border-violet-100/50 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Agentes Temporários</p>
                <p className="text-xs text-slate-400 mt-0.5">{tempAgents} agentes em reforço activo</p>
              </div>
            </div>
            <span className="text-lg font-extrabold text-violet-600">{tempAgents}</span>
          </div>
        </div>

        {/* Action */}
        <PrimaryButton 
          type="button" 
          onClick={handleRequestReforco} 
          className="w-full py-4 font-bold flex justify-center items-center gap-2 shadow-lg shadow-mpesaRed/10 hover:shadow-mpesaRed/20 transition transform active:scale-95"
        >
          Solicitar Reforço Temporário
          <ChevronRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </main>
  );
};

export default AdminPage;
