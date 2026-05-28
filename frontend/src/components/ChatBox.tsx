import { useMemo } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import type { Agent } from '../types';

const ChatBox = ({ agent, message }: { agent: Agent; message: string }) => {
  const chatLines = useMemo(
    () => [
      { type: 'agent', text: `Agente ${agent.name}: Olá, posso ajudar?` },
      { type: 'user', text: message || 'Quero saber se pode atender um pedido.' }
    ],
    [agent.name, message]
  );

  return (
    <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        <MessageSquare className="h-4 w-4 text-mpesaRed" />
        <span>Chat com {agent.name}</span>
      </div>
      
      <div className="space-y-3.5 pt-2">
        {chatLines.map((line, index) => (
          <div
            key={index}
            className={`flex ${line.type === 'agent' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed ${
                line.type === 'agent' 
                  ? 'bg-slate-100 text-slate-800 rounded-tl-none' 
                  : 'bg-mpesaRed text-white rounded-tr-none'
              }`}
            >
              {line.text}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 px-4 py-3 bg-slate-50">
        <span className="text-xs text-slate-500 font-medium">Escolha uma operação abaixo para enviar</span>
        <Send className="h-4 w-4 text-slate-400" />
      </div>
    </div>
  );
};

export default ChatBox;
