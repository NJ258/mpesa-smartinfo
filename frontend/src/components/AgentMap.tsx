import { MapContainer, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Agent } from '../types';

const colorMap = {
  online: '#16A34A',
  offline: '#6B7280',
  'temp-approaching': '#2563EB',
  'temp-ready': '#8B5CF6'
};

const createColoredIcon = (color: string) => {
  return new L.DivIcon({
    html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.12)"></div>`,
    className: ''
  });
};

const createUserIcon = () => {
  return new L.DivIcon({
    html: `<div class="relative flex h-5 w-5">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-5 w-5 bg-sky-500 border-2 border-white shadow-md"></span>
    </div>`,
    className: '',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

// Deterministic offsets based on agent ID so they stay in place on map re-renders
const getAgentOffset = (id: string): [number, number] => {
  if (id === 'agent-01') return [0.003, -0.004];
  if (id === 'agent-02') return [-0.005, 0.008];
  if (id === 'agent-03') return [0.006, 0.005];
  if (id === 'agent-04') return [-0.002, -0.006];
  return [0.001, 0.001];
};

interface AgentMapProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
  userCoords: [number, number];
  searchRadius: number;
}

const AgentMap = ({ agents, onAgentClick, userCoords, searchRadius }: AgentMapProps) => {
  return (
    <div className="h-[58vh] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <MapContainer center={userCoords} zoom={14} key={`${userCoords[0]}-${userCoords[1]}`} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* User Location Marker */}
        <Marker position={userCoords} icon={createUserIcon()}>
          <Popup>
            <div className="p-1 text-center font-bold text-xs text-slate-800">Sua localização atual</div>
          </Popup>
        </Marker>

        {/* Search Radius Area */}
        <Circle 
          center={userCoords} 
          radius={searchRadius} 
          pathOptions={{ fillColor: '#0ea5e9', fillOpacity: 0.1, color: '#0ea5e9', weight: 1.5, dashArray: '4, 4' }} 
        />

        {/* Agent Markers */}
        {agents.map(agent => {
          const offset = getAgentOffset(agent.id);
          const position: [number, number] = [userCoords[0] + offset[0], userCoords[1] + offset[1]];
          return (
            <Marker
              key={agent.id}
              position={position}
              icon={createColoredIcon(colorMap[agent.status])}
              eventHandlers={{ click: () => onAgentClick(agent) }}
            >
              <Popup>
                <div className="max-w-xs font-sans p-1">
                  <p className="font-bold text-sm text-slate-800">{agent.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{agent.neighborhood}</p>
                  <div className="mt-2 flex items-center justify-between gap-4 border-t border-slate-100 pt-1.5 text-[10px] text-slate-400">
                    <span>{agent.distance}</span>
                    <span className="font-bold text-mpesaRed">Clique para ver</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default AgentMap;
