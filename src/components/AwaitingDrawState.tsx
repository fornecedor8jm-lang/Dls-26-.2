import { Dices, ShieldCheck, Trophy, CalendarDays, MessageCircle, ArrowRight } from 'lucide-react';

interface AwaitingDrawStateProps {
  title: string;
  description: string;
}

const WHATSAPP_LINK = 'https://wa.me/55096991821516';

export function AwaitingDrawState({ title, description }: AwaitingDrawStateProps) {
  return (
    <div className="bg-[#162A3D] text-white rounded-2xl border border-[#2B4052] p-6 sm:p-10 shadow-xl space-y-6 text-center max-w-3xl mx-auto my-6">
      <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/30">
        <Dices size={36} className="animate-bounce" />
      </div>

      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
          🎲 Status Atual · Aguardando Sorteio
        </span>
        <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
          {title}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto pt-1">
          {description}
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
        <div className="bg-[#0E1A26] p-4 rounded-xl border border-[#2B4052]/80 space-y-1">
          <span className="text-emerald-400 font-black text-xs block flex items-center gap-1">
            <ShieldCheck size={14} /> 1. Inscrições
          </span>
          <strong className="text-white text-sm font-bold block">20 de 32 Confirmados</strong>
          <p className="text-[11px] text-slate-400">12 vagas restantes abertas</p>
        </div>

        <div className="bg-[#0E1A26] p-4 rounded-xl border border-amber-500/40 space-y-1 relative overflow-hidden">
          <span className="text-amber-400 font-black text-xs block flex items-center gap-1">
            <Dices size={14} /> 2. Sorteio
          </span>
          <strong className="text-white text-sm font-bold block">Definição dos Grupos</strong>
          <p className="text-[11px] text-slate-400">Em breve data oficial</p>
        </div>

        <div className="bg-[#0E1A26] p-4 rounded-xl border border-[#2B4052]/80 space-y-1">
          <span className="text-slate-400 font-black text-xs block flex items-center gap-1">
            <CalendarDays size={14} /> 3. Confrontos
          </span>
          <strong className="text-white text-sm font-bold block">Calendário e Jogos</strong>
          <p className="text-[11px] text-slate-400">Tabela e mata-mata gerados</p>
        </div>
      </div>

      <div className="pt-3 border-t border-[#2B4052] flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm py-2.5 px-4 rounded-lg inline-flex items-center gap-2 transition-colors shadow-md w-full sm:w-auto justify-center"
        >
          <MessageCircle size={16} /> Enviar Resultados via PV no WhatsApp
        </a>
      </div>
    </div>
  );
}
