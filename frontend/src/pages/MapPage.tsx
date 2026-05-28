import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, MessageSquare, Compass, LocateFixed, MapPin } from 'lucide-react';
import AgentMap from '../components/AgentMap';
import AgentCard from '../components/AgentCard';
import BottomSheet from '../components/BottomSheet';
import PrimaryButton from '../components/PrimaryButton';
import { mockAgents } from '../data/mockAgents';
import { fetchAgents } from '../services/agentService';
import type { Agent } from '../types';

const neighborhoodCoords: Record<string, [number, number]> = {
  'polana cimento': [-25.9627, 32.5800],
  'fórum de maputo': [-25.9550, 32.5720],
  'forum de maputo': [-25.9550, 32.5720],
  'zimpeto': [-25.8500, 32.5600],
  'xikhelene': [-25.9200, 32.5900],
};

const MapPage = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [search, setSearch] = useState('');
  const [userCoords, setUserCoords] = useState<[number, number]>([-25.9627, 32.5800]);
  const [searchRadius] = useState(1500); // 1.5km
  const [locating, setLocating] = useState(false);
  const navigate = useNavigate();

  const client = useMemo(() => {
    const saved = localStorage.getItem('smartinfo-client');
    if (!saved) return null;
    return JSON.parse(saved) as { name: string; phone: string };
  }, []);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada por este navegador.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords([position.coords.latitude, position.coords.longitude]);
        setLocating(false);
      },
      (error) => {
        console.warn('Erro ao obter geolocalização:', error);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  useEffect(() => {
    handleLocate();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const query = value.toLowerCase().trim();
    if (!query) return;
    
    // Check if search matches any neighborhood to shift coordinates dynamically
    for (const [name, coords] of Object.entries(neighborhoodCoords)) {
      if (name.includes(query) || query.includes(name)) {
        setUserCoords(coords);
        break;
      }
    }
  };

  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const data = await fetchAgents();
        setAgents(data);
      } catch (err) {
        console.error('Erro ao carregar agentes da API:', err);
        setAgents(mockAgents);
      }
    };
    loadAgents();
  }, []);

  const onlineAgents = useMemo(
    () => agents.filter(agent => agent.status === 'online' || agent.status.startsWith('temp')),
    [agents]
  );

  const filteredAgents = onlineAgents.filter(agent =>
    agent.neighborhood.toLowerCase().includes(search.toLowerCase()) || agent.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!client) {
    navigate('/register');
    return null;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:px-8 animate-fade-in">
      <div className="space-y-6">
        
        {/* User Welcome and Info Header */}
        <div className="rounded-[2.2rem] bg-white border border-slate-100 p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-mpesaRed/10 text-mpesaRed flex items-center justify-center font-bold">
                  {client.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cliente M-Pesa</p>
                  <p className="text-lg font-extrabold text-slate-800 leading-tight">{client.name}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => {
                  localStorage.removeItem('smartinfo-client');
                  navigate('/');
                }} 
                className="rounded-full border border-slate-200 hover:border-mpesaRed hover:text-mpesaRed px-4 py-2 text-xs font-bold text-slate-600 transition"
              >
                Sair
              </button>
            </div>

            {/* Search inputs and locate controls */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  value={search}
                  onChange={event => handleSearchChange(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-mpesaRed focus:bg-white focus:ring-4 focus:ring-mpesaRed/10"
                  placeholder="Pesquisar bairro (ex: Polana Cimento, Zimpeto, Xikhelene)..."
                />
              </div>
              
              <button
                type="button"
                onClick={handleLocate}
                disabled={locating}
                className="rounded-2xl bg-slate-800 text-white hover:bg-slate-900 px-5 py-3.5 text-sm font-bold flex items-center justify-center gap-2 transition disabled:opacity-70 active:scale-95"
              >
                <LocateFixed className={`h-4 w-4 ${locating ? 'animate-spin' : ''}`} />
                <span>{locating ? 'Obtendo posição...' : 'Usar Minha Localização'}</span>
              </button>
            </div>

            {/* Badges explanation */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                <span className="rounded-full bg-green-500/10 text-green-700 border border-green-200 px-3 py-1 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Online Fixos
                </span>
                <span className="rounded-full bg-blue-500/10 text-blue-700 border border-blue-200 px-3 py-1 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  A Caminho (Móvel)
                </span>
                <span className="rounded-full bg-violet-500/10 text-violet-700 border border-violet-200 px-3 py-1 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
                  Disponíveis Temporários
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Agent List */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Map Column */}
          <div className="rounded-[2.2rem] overflow-hidden border border-slate-100 shadow-sm lg:col-span-8 min-h-[350px] lg:h-[550px] relative">
            <AgentMap 
              agents={onlineAgents} 
              onAgentClick={agent => setSelectedAgent(agent)} 
              userCoords={userCoords}
              searchRadius={searchRadius}
            />
          </div>

          {/* List Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-[2.2rem] bg-white border border-slate-100 p-5 shadow-sm h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-extrabold text-slate-800 tracking-tight">Agentes nesta área</p>
                <span className="text-[10px] font-bold bg-mpesaRed/10 text-mpesaRed px-2 py-0.5 rounded-full">
                  {filteredAgents.length} encontrados
                </span>
              </div>
              <div className="space-y-3.5 overflow-y-auto pr-1 no-scrollbar flex-1 max-h-[480px]">
                {filteredAgents.length > 0 ? (
                  filteredAgents.map(agent => (
                    <AgentCard key={agent.id} agent={agent} onSelect={() => setSelectedAgent(agent)} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-center space-y-2">
                    <MapPin className="h-8 w-8 text-slate-300" />
                    <p className="text-sm font-medium">Nenhum agente online encontrado nesta busca.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Agent Details BottomSheet */}
      {selectedAgent ? (
        <BottomSheet
          title={selectedAgent.name}
          onClose={() => setSelectedAgent(null)}
          footer={
            <PrimaryButton 
              type="button" 
              onClick={() => navigate(`/chat/${selectedAgent.id}`)}
              className="w-full py-4 font-bold flex justify-center items-center gap-2 shadow-lg shadow-mpesaRed/10 hover:shadow-mpesaRed/25 transform active:scale-98 transition"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Confirmar disponibilidade via Chat</span>
            </PrimaryButton>
          }
        >
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Bairro</span>
                <span className="text-sm font-bold text-slate-800">{selectedAgent.neighborhood}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Avaliação</span>
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  {selectedAgent.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Ponto de Referência</span>
              <span className="text-sm font-semibold text-slate-700">{selectedAgent.landmark}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Estado de Trabalho</span>
                <span className="text-sm font-bold text-slate-800 capitalize">
                  {selectedAgent.status === 'online' ? 'Online Fixo' : selectedAgent.status === 'temp-ready' ? 'Temporário Disponível' : 'A Caminho'}
                </span>
              </div>
              <span className={`h-2.5 w-2.5 rounded-full ${selectedAgent.status === 'online' ? 'bg-green-500' : selectedAgent.status === 'temp-ready' ? 'bg-violet-500' : 'bg-blue-500'}`} />
            </div>
          </div>
        </BottomSheet>
      ) : null}
    </main>
  );
};

export default MapPage;
