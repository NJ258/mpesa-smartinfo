import type { Agent } from '../types';

const AgentMarker = ({ agent, onClick }: { agent: Agent; onClick: () => void }) => {
  return (
    <button type="button" onClick={onClick} className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-mpesaRed/50">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-mpesaGray">{agent.name}</p>
          <p className="text-sm text-gray-500">{agent.neighborhood}</p>
        </div>
        <p className="text-sm font-semibold text-gray-500">{agent.distance}</p>
      </div>
    </button>
  );
};

export default AgentMarker;
