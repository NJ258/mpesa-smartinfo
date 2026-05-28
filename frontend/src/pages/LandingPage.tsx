import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  MessageSquare, 
  Clock, 
  ArrowRight, 
  Smartphone, 
  Sparkles, 
  ShieldCheck, 
  Compass,
  CheckCircle2,
  Users,
  Zap,
  Globe,
  Star,
  TrendingUp
} from 'lucide-react';
import PrimaryButton from '../components/PrimaryButton';

const LandingPage = () => {
  const [activeSimTab, setActiveSimTab] = useState<'map' | 'chat'>('map');

  return (
    <main className="overflow-hidden">

      {/* ─── HERO ─── */}
      <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-mpesaRed/8 via-transparent to-transparent blur-3xl" />

        <div className="grid gap-14 lg:grid-cols-12 lg:items-center relative">
          {/* Left Column */}
          <div className="lg:col-span-7 text-left space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-mpesaRed/10 to-red-50 px-5 py-2 text-xs font-bold text-mpesaRed animate-slide-up border border-mpesaRed/10">
              <Sparkles className="h-3.5 w-3.5" />
              <span>M-Pesa Inteligente & Confiável</span>
            </div>

            {/* Headline */}
            <div className="space-y-5 animate-slide-up-delay-1">
              <h1 className="text-4xl font-extrabold tracking-tight text-mpesaGray sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                Saiba antes de{' '}
                <span className="relative inline-block text-mpesaRed">
                  sair de casa.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-mpesaRed/20" viewBox="0 0 200 8" preserveAspectRatio="none">
                    <path d="M0 7 C50 0, 150 0, 200 7" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="max-w-xl text-lg text-gray-500 leading-relaxed">
                Evite viagens em vão. Veja quais agentes M-Pesa estão ativos agora, confirme a disponibilidade de fundos via chat e <strong className="text-gray-700">poupe o seu tempo</strong>.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid gap-3 sm:grid-cols-3 animate-slide-up-delay-2">
              {[
                { icon: MapPin, color: 'bg-mpesaRed/5 text-mpesaRed', title: 'Evite Viagens', desc: 'Saiba se o agente tem liquidez.' },
                { icon: MessageSquare, color: 'bg-emerald-50 text-emerald-600', title: 'Chat Integrado', desc: 'Confirme valores diretamente.' },
                { icon: Clock, color: 'bg-blue-50 text-blue-600', title: 'Tempo Real', desc: 'Agentes online agora mesmo.' },
              ].map((f, i) => (
                <div 
                  key={i}
                  className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-mpesaRed/20 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${f.color} transition-transform duration-300 group-hover:scale-110`}>
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">{f.title}</h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row animate-slide-up-delay-3">
              <Link to="/register" className="flex-1 sm:flex-none">
                <PrimaryButton className="w-full flex justify-center items-center gap-2.5 px-8 py-4 shadow-lg shadow-mpesaRed/20 hover:shadow-mpesaRed/30 transition-all transform active:scale-95 animate-glow-pulse">
                  Procurar Agentes <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </Link>
              <Link to="/login" className="flex-1 sm:flex-none">
                <button className="w-full rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-mpesaRed hover:text-mpesaRed hover:bg-mpesaRed/5 active:scale-95">
                  Área do Agente
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center animate-scale-in">
            <div className="relative w-full max-w-[320px]">
              {/* Glow behind phone */}
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-mpesaRed/10 via-red-200/10 to-transparent blur-2xl scale-110" />
              
              <div className="relative rounded-[3rem] border-[10px] border-slate-900 bg-slate-900 p-2 shadow-2xl shadow-slate-900/30">
                {/* Notch */}
                <div className="absolute left-1/2 top-3.5 h-4 w-24 -translate-x-1/2 rounded-full bg-slate-950 flex items-center justify-center">
                  <div className="h-1 w-8 rounded-full bg-slate-800" />
                </div>

                {/* Screen */}
                <div className="overflow-hidden rounded-[2.3rem] bg-slate-50 w-full h-[500px] relative flex flex-col pt-5 font-sans">
                  
                  {/* Status Bar */}
                  <div className="px-4 py-1 flex justify-between items-center text-[10px] font-semibold text-slate-500">
                    <span>15:30</span>
                    <div className="flex items-center gap-1.5">
                      <Compass className="h-3 w-3 animate-spin" style={{ animationDuration: '4s' }} />
                      <span className="rounded-full bg-green-500 h-1.5 w-1.5 inline-block" />
                      <span>4G</span>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="px-3.5 py-2 border-b border-slate-100 bg-white flex items-center justify-between">
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-800">SmartInfo Maputo</h4>
                      <p className="text-[9px] text-green-600 flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-green-500 inline-block animate-pulse" />
                        3 agentes online perto de si
                      </p>
                    </div>
                    <Smartphone className="h-3.5 w-3.5 text-slate-400" />
                  </div>

                  {/* Tabs */}
                  <div className="grid grid-cols-2 gap-1 p-1.5 bg-slate-100/80">
                    <button 
                      onClick={() => setActiveSimTab('map')}
                      className={`py-1.5 text-[10px] font-bold rounded-xl transition-all duration-300 ${activeSimTab === 'map' ? 'bg-white text-mpesaRed shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      Mapa de Agentes
                    </button>
                    <button 
                      onClick={() => setActiveSimTab('chat')}
                      className={`py-1.5 text-[10px] font-bold rounded-xl transition-all duration-300 ${activeSimTab === 'chat' ? 'bg-white text-mpesaRed shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      Chat em Tempo Real
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 relative overflow-hidden">
                    {activeSimTab === 'map' ? (
                      <div className="p-2.5 space-y-2.5 h-full flex flex-col justify-between animate-fade-in">
                        <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200/60 flex-1 relative flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:14px_24px]" />
                          
                          {/* Pin 1 */}
                          <div className="absolute top-6 left-10 flex flex-col items-center">
                            <div className="bg-mpesaRed text-white p-1.5 rounded-full shadow-lg shadow-mpesaRed/30 animate-bounce" style={{ animationDuration: '2s' }}>
                              <MapPin className="h-3 w-3" />
                            </div>
                            <span className="mt-0.5 text-[7px] font-bold bg-white/95 px-1.5 py-0.5 rounded-full shadow-sm border border-slate-100">Julio (200m)</span>
                          </div>

                          {/* Pin 2 */}
                          <div className="absolute bottom-12 right-8 flex flex-col items-center">
                            <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-lg shadow-blue-600/30 animate-float">
                              <MapPin className="h-3 w-3" />
                            </div>
                            <span className="mt-0.5 text-[7px] font-bold bg-white/95 px-1.5 py-0.5 rounded-full shadow-sm border border-slate-100">Móvel a caminho</span>
                          </div>

                          {/* Pin 3 */}
                          <div className="absolute top-16 right-14 flex flex-col items-center">
                            <div className="bg-emerald-500 text-white p-1 rounded-full shadow-md">
                              <MapPin className="h-2.5 w-2.5" />
                            </div>
                            <span className="mt-0.5 text-[6px] font-bold bg-white/95 px-1 py-0.5 rounded-full shadow-sm">Ana (450m)</span>
                          </div>

                          <span className="text-[9px] font-medium text-sky-700 bg-white/90 px-3 py-1.5 rounded-full border border-sky-200 shadow-sm">
                            Bairro Polana Cimento
                          </span>
                        </div>

                        {/* Agent Preview */}
                        <div className="rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[10px] font-bold text-slate-800">Julio SmartService</p>
                              <p className="text-[8px] text-slate-400 flex items-center gap-1">
                                Polana Cimento • <Star className="h-2 w-2 text-yellow-400 fill-yellow-400 inline" /> 4.9
                              </p>
                            </div>
                            <span className="text-[8px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
                              Disponível
                            </span>
                          </div>
                          <button 
                            onClick={() => setActiveSimTab('chat')}
                            className="w-full mt-2 text-center py-1.5 bg-mpesaRed text-white text-[9px] font-bold rounded-lg hover:bg-mpesaRed/90 transition active:scale-95"
                          >
                            Simular Conversa →
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 flex flex-col h-full justify-between bg-slate-50 animate-fade-in">
                        <div className="space-y-2 text-[10px] overflow-y-auto">
                          <div className="bg-white text-slate-700 rounded-2xl rounded-tl-sm p-2.5 max-w-[85%] self-start shadow-sm border border-slate-100">
                            Olá! O agente Julio tem liquidez para levantamento de 15.000 MT?
                          </div>
                          <div className="bg-gradient-to-br from-mpesaRed to-red-600 text-white rounded-2xl rounded-tr-sm p-2.5 max-w-[85%] ml-auto">
                            <div className="flex items-center gap-1 mb-0.5">
                              <span className="font-bold text-[8px] opacity-80">Agente Julio</span>
                              <CheckCircle2 className="h-2 w-2 opacity-80" />
                            </div>
                            Sim, estou com liquidez disponível agora! Pode vir, a reserva está ativa por 15 min.
                          </div>
                          <div className="bg-white text-slate-700 rounded-2xl rounded-tl-sm p-2.5 max-w-[85%] self-start shadow-sm border border-slate-100">
                            Excelente! Já a caminho. Obrigado! 🙏
                          </div>
                        </div>

                        <div className="mt-2 flex gap-1 border-t border-slate-100 pt-2 bg-white -mx-2.5 -mb-2.5 p-2">
                          <input 
                            type="text" 
                            readOnly 
                            placeholder="Mensagem reservada..." 
                            className="flex-1 bg-slate-50 rounded-xl px-3 py-1.5 text-[9px] outline-none border border-slate-100"
                          />
                          <button className="bg-mpesaRed text-white p-1.5 rounded-xl">
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1.5 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            {[
              { value: '2.500+', label: 'Agentes Activos', icon: Users },
              { value: '98%', label: 'Taxa de Sucesso', icon: TrendingUp },
              { value: '< 2min', label: 'Tempo de Resposta', icon: Zap },
              { value: '11', label: 'Províncias', icon: Globe },
            ].map((s, i) => (
              <div key={i} className="space-y-1.5">
                <s.icon className="h-5 w-5 text-mpesaRed mx-auto mb-2" />
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{s.value}</p>
                <p className="text-xs font-medium text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mpesaRed mb-3">Simples & Rápido</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-mpesaGray tracking-tight">Como funciona</h2>
          <p className="mt-3 text-gray-500 max-w-md mx-auto">Três passos para nunca mais perder uma viagem ao agente M-Pesa.</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { step: '01', title: 'Busca Rápida', desc: 'Aceda à aplicação e visualize o mapa de agentes ativos no seu bairro.', color: 'from-mpesaRed/10 to-red-50' },
            { step: '02', title: 'Confirmação Directa', desc: 'Abra um chat instantâneo para garantir que o agente tem o valor pretendido.', color: 'from-emerald-50 to-green-50' },
            { step: '03', title: 'Transação Segura', desc: 'Vá ao encontro do agente com a certeza absoluta de que será atendido.', color: 'from-blue-50 to-sky-50' },
          ].map((item, i) => (
            <div key={i} className="group relative rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              {/* Step Number */}
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} mb-5`}>
                <span className="text-lg font-extrabold text-mpesaGray">{item.step}</span>
              </div>

              <h4 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              
              {/* Connector line (between cards) */}
              {i < 2 && (
                <div className="hidden sm:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-slate-200" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── TRUST / SECURITY SECTION ─── */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-mpesaRed/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl" />
          
          <div className="relative grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white/80">
                <ShieldCheck className="h-3.5 w-3.5" />
                Segurança Garantida
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                A sua tranquilidade é a nossa prioridade.
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Cada interacção é protegida com encriptação de ponta a ponta. 
                Os seus dados pessoais e transacções estão sempre seguros connosco.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: ShieldCheck, label: 'Encriptação E2E' },
                { icon: Users, label: 'Agentes Verificados' },
                { icon: Zap, label: 'Resposta Rápida' },
                { icon: Globe, label: 'Cobertura Nacional' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center transition-all duration-300 hover:bg-white/10">
                  <item.icon className="h-6 w-6 text-mpesaRed mx-auto mb-2" />
                  <p className="text-xs font-bold text-white/80">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-slate-100 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-mpesaRed flex items-center justify-center text-white font-black text-xs">M</div>
              <span className="text-xs font-bold text-slate-400">M-Pesa SmartInfo © {new Date().getFullYear()}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Feito com ❤️ em Moçambique • Vodacom
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
