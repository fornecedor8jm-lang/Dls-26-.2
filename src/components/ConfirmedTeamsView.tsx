import { useState } from 'react';
import { Team } from '../types';
import { TEAMS } from '../data/teams';
import { ShieldCheck, UserPlus, Send, MessageCircle, ChevronRight, Dices, X } from 'lucide-react';

interface ConfirmedTeamsViewProps {
  onSelectTeam: (team: Team) => void;
}

const WHATSAPP_LINK = 'https://wa.me/55096991821516';

export function ConfirmedTeamsView({ onSelectTeam }: ConfirmedTeamsViewProps) {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'available'>('all');

  const confirmedCount = TEAMS.length;
  const openSlotsCount = Math.max(0, 32 - confirmedCount);
  const availableSlotsArray = Array.from({ length: openSlotsCount }, (_, i) => i + confirmedCount + 1);

  return (
    <div className="space-y-8">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#162A3D] border border-[#2B4052] p-5 rounded-xl text-white flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <ShieldCheck size={28} />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Equipes Confirmadas</span>
            <strong className="text-2xl font-black font-display text-emerald-400">{confirmedCount} / 32</strong>
          </div>
        </div>

        <div className="bg-[#162A3D] border border-[#2B4052] p-5 rounded-xl text-white flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
            <UserPlus size={28} />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Vagas Disponíveis</span>
            <strong className="text-2xl font-black font-display text-amber-400">{openSlotsCount} Restantes</strong>
          </div>
        </div>

        <div className="bg-[#162A3D] border border-[#2B4052] p-5 rounded-xl text-white flex items-center gap-4">
          <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl">
            <Dices size={28} />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Status Atual</span>
            <strong className="text-lg font-black font-display text-sky-300">Grupos A-F Definidos</strong>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="eyebrow text-amber-600">Inscrições Abertas</span>
          <h2 className="text-2xl font-black font-display text-slate-900">
            Lista de Participantes da Copa DLS 26
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold">
          <button
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filter === 'all' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => setFilter('all')}
          >
            Todos (32 Vagas)
          </button>
          <button
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filter === 'confirmed' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => setFilter('confirmed')}
          >
            Confirmados ({confirmedCount})
          </button>
          <button
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filter === 'available' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => setFilter('available')}
          >
            Vagas Abertas ({openSlotsCount})
          </button>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(filter === 'all' || filter === 'confirmed') &&
          TEAMS.map((team, index) => (
            <div
              key={team.id}
              onClick={() => onSelectTeam(team)}
              className="bg-white border border-slate-200 hover:border-amber-400 p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  #{String(index + 1).padStart(2, '0')}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck size={12} /> Confirmado
                </span>
              </div>

              <div className="flex items-center gap-3 py-1">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black font-display text-base shadow-sm shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${team.primaryColor}, ${team.secondaryColor})`
                  }}
                >
                  {team.shortName.slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-amber-600 transition-colors truncate">
                    {team.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">
                    {team.keyPlayers?.slice(0, 2).join(', ') || 'Elenco completo'}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[11px] font-medium text-slate-400">Ver detalhes do time</span>
                <ChevronRight size={14} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}

        {(filter === 'all' || filter === 'available') &&
          availableSlotsArray.map((slotNum) => (
            <div
              key={`slot-${slotNum}`}
              className="bg-amber-50/60 border-2 border-dashed border-amber-300 p-4 rounded-xl flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded">
                  #{String(slotNum).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-black text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded border border-amber-300">
                  🟡 Vaga Disponível
                </span>
              </div>

              <div className="py-2 text-center space-y-1">
                <p className="font-extrabold text-amber-950 text-sm">Sua Equipe Aqui</p>
                <p className="text-[11px] text-amber-800">Garanta sua participação na Copa DLS 26!</p>
              </div>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <MessageCircle size={14} /> Garanta sua Vaga no PV
              </a>
            </div>
          ))}
      </div>

      {/* WhatsApp Founder Callout */}
      <div className="bg-[#0E1A26] border border-[#2B4052] p-5 sm:p-6 rounded-2xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-lg">
        <div className="space-y-1.5 max-w-2xl">
          <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest inline-flex items-center gap-1.5">
            <MessageCircle size={15} /> Contato do Fundador & Inscrições
          </span>
          <h3 className="text-lg sm:text-xl font-black font-display text-white">
            Inscreva sua equipe ou envie seus resultados via PV
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Envie os dados e prints dos resultados diretamente no WhatsApp do fundador. O site é atualizado com as informações e classificações oficiais.
          </p>
        </div>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm py-3 px-5 rounded-xl inline-flex items-center gap-2 transition-colors shrink-0 shadow-md"
        >
          <MessageCircle size={18} /> Chamar no PV (+55 096 99182-1516)
        </a>
      </div>
    </div>
  );
}
