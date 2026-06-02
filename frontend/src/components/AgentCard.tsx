import type { Agent } from '../types';
import StatusBadge from './StatusBadge';
import { MapPin, Navigation, ArrowRight, Star } from 'lucide-react';

const getStatusLabel = (agent: Agent) => {
  if (agent.status === 'online') return 'Agente online';
  if (agent.status === 'offline') return 'Agente offline';
  return agent.status === 'temp-ready' ? 'Temporário disponível' : 'Temporário a caminho';
};

const AgentCard = ({ agent, onSelect }: { agent: Agent; onSelect: () => void }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative flex w-full flex-col rounded-[1.8rem] border-2 border-slate-100 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:border-mpesaRed/50 hover:shadow-md hover:shadow-mpesaRed/10 active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <p className="text-base font-bold text-slate-800 tracking-tight group-hover:text-mpesaRed transition-colors">
              {agent.name}
            </p>
            <div className="flex items-center gap-0.5 text-xs font-semibold text-amber-500">
              <Star className="h-3 w-3 fill-amber-500" />
              <span>{agent.rating ? agent.rating.toFixed(1) : '5.0'}</span>
            </div>
          </div>
          <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-mpesaRed" />
            <span className="font-semibold">{agent.neighborhood}</span>
          </p>
        </div>
        <StatusBadge status={agent.status === 'online' ? 'online' : 'waiting'}>
          {getStatusLabel(agent)}
        </StatusBadge>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span className="font-semibold bg-mpesaGreen/10 text-mpesaGreen px-2.5 py-1.5 rounded-full flex items-center gap-1 transition-colors group-hover:bg-mpesaGreen group-hover:text-white">
          <Navigation className="h-3 w-3" />
          {agent.distance}
        </span>
        <span className="truncate max-w-[150px] italic text-slate-400">{agent.landmark}</span>
        <span className="text-mpesaRed opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
};

export default AgentCard;
