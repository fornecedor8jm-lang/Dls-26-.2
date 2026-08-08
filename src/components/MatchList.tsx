import React, { useState } from 'react';
import { GroupName, Match, Team, TimezoneMode } from '../types';
import { MatchCard } from './MatchCard';
import { Calendar, Filter, RefreshCw, AlertCircle, Shield, Layers } from 'lucide-react';

interface MatchListProps {
  matches: Match[];
  timezone: TimezoneMode;
  onEditMatch: (match: Match) => void;
  onSelectTeam: (team: Team) => void;
  onResetMatches: () => void;
  onGoHome?: () => void;
}

export const MatchList: React.FC<MatchListProps> = ({
  matches,
  timezone,
  onEditMatch,
  onSelectTeam,
  onResetMatches
}) => {
  const [stageFilter, setStageFilter] = useState<'ALL' | 'R1' | 'R2' | 'R3' | 'KNOCKOUT'>('ALL');
  const [groupFilter, setGroupFilter] = useState<GroupName | 'ALL'>('ALL');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const filteredMatches = matches.filter((m) => {
    // Stage filter
    if (stageFilter === 'R1' && (m.stage !== 'GROUP' || m.round !== 1)) return false;
    if (stageFilter === 'R2' && (m.stage !== 'GROUP' || m.round !== 2)) return false;
    if (stageFilter === 'R3' && (m.stage !== 'GROUP' || m.round !== 3)) return false;
    if (stageFilter === 'KNOCKOUT' && m.stage === 'GROUP') return false;

    // Group filter
    if (groupFilter !== 'ALL' && m.group !== groupFilter) return false;

    return true;
  });

  const getEmptyStateMessage = () => {
    if (stageFilter === 'R2') {
      return '📅 A Rodada 2 (09/08) ainda não possui confrontos cadastrados na tabela oficial.';
    }
    if (stageFilter === 'R3') {
      return '📅 A Rodada 3 (10/08) ainda não possui confrontos cadastrados na tabela oficial.';
    }
    if (stageFilter === 'KNOCKOUT') {
      return '⚔️ Os confrontos do Mata-Mata serão definidos após o encerramento da Fase de Grupos.';
    }
    if (groupFilter !== 'ALL') {
      return `Nenhuma partida cadastrada para o Grupo ${groupFilter} nesta rodada.`;
    }
    return 'Nenhuma partida encontrada com os filtros selecionados.';
  };

  return (
    <div className="space-y-5">
      {/* Timezone Notice Header */}
      <div className="bg-[#162A3D] border border-[#2B4052] p-3.5 rounded-2xl text-white flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-xs text-slate-200">
            Tabela oficial de jogos e horários da Copa DLS 26 ({timezone === 'CAT' ? 'CAT / Moçambique' : 'BRT / Brasília'}).
          </p>
        </div>
      </div>

      {/* Vertical Stacked Dropdown Filters (Mobile Optimized) */}
      <div className="bg-[#162A3D] p-3.5 rounded-xl border border-[#2B4052] space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
          {/* 1. Rodada Select Dropdown */}
          <div className="flex items-center gap-2 bg-[#0B1F33] px-3 py-2 rounded-lg border border-[#2B4052] text-xs font-bold text-slate-200">
            <Layers className="w-4 h-4 text-amber-400 shrink-0" />
            <label htmlFor="round-select" className="shrink-0 text-slate-400">Rodada:</label>
            <select
              id="round-select"
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value as any)}
              className="bg-transparent text-white font-black focus:outline-none cursor-pointer w-full"
            >
              <option value="ALL" className="bg-[#0B1F33]">Todas as Rodadas ({matches.length} jogos)</option>
              <option value="R1" className="bg-[#0B1F33]">Rodada 1 (08/08)</option>
              <option value="R2" className="bg-[#0B1F33]">Rodada 2 (09/08)</option>
              <option value="R3" className="bg-[#0B1F33]">Rodada 3 (10/08)</option>
              <option value="KNOCKOUT" className="bg-[#0B1F33]">Mata-Mata / Eliminatórias</option>
            </select>
          </div>

          {/* 2. Grupo Select Dropdown */}
          <div className="flex items-center gap-2 bg-[#0B1F33] px-3 py-2 rounded-lg border border-[#2B4052] text-xs font-bold text-slate-200">
            <Filter className="w-4 h-4 text-amber-400 shrink-0" />
            <label htmlFor="matches-group-select" className="shrink-0 text-slate-400">Grupo:</label>
            <select
              id="matches-group-select"
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value as any)}
              className="bg-transparent text-white font-black focus:outline-none cursor-pointer w-full"
            >
              <option value="ALL" className="bg-[#0B1F33]">Todos os Grupos (A-H)</option>
              <option value="A" className="bg-[#0B1F33]">Grupo A</option>
              <option value="B" className="bg-[#0B1F33]">Grupo B</option>
              <option value="C" className="bg-[#0B1F33]">Grupo C</option>
              <option value="D" className="bg-[#0B1F33]">Grupo D</option>
              <option value="E" className="bg-[#0B1F33]">Grupo E</option>
              <option value="F" className="bg-[#0B1F33]">Grupo F</option>
              <option value="G" className="bg-[#0B1F33]">Grupo G</option>
              <option value="H" className="bg-[#0B1F33]">Grupo H</option>
            </select>
          </div>
        </div>
      </div>

      {/* Match Cards List */}
      {filteredMatches.length === 0 ? (
        <div className="text-center p-10 bg-[#162A3D] rounded-xl border border-[#2B4052] text-slate-300 space-y-3">
          <Calendar className="w-10 h-10 mx-auto text-slate-400" />
          <p className="font-bold text-white leading-relaxed max-w-md mx-auto text-xs sm:text-sm">
            {getEmptyStateMessage()}
          </p>
          <button
            onClick={() => {
              setStageFilter('ALL');
              setGroupFilter('ALL');
            }}
            className="px-4 py-2 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl hover:bg-emerald-400 transition-colors cursor-pointer"
          >
            Ver Todos os Jogos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              timezone={timezone}
              onEditMatch={isAdminMode ? onEditMatch : undefined}
              onSelectTeam={onSelectTeam}
            />
          ))}
        </div>
      )}

      {/* Isolated Admin Access at the bottom */}
      <div className="pt-4 border-t border-[#2B4052]/60 flex items-center justify-between text-xs text-slate-400">
        <span className="text-[11px] font-medium text-slate-400">Área restrita de lançamento de placares:</span>
        <button
          onClick={() => {
            if (!isAdminMode) {
              const pass = window.prompt('Digite a senha de administrador para ativar lançamento de placares:');
              if (pass !== null) setIsAdminMode(true);
            } else {
              setIsAdminMode(false);
            }
          }}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold inline-flex items-center gap-1.5 transition-colors border cursor-pointer ${
            isAdminMode
              ? 'bg-amber-500 text-slate-950 border-amber-400'
              : 'bg-[#0B1F33] text-slate-400 border-[#2B4052] hover:text-white'
          }`}
        >
          <Shield size={13} />
          <span>{isAdminMode ? 'Sair do Modo Admin' : 'Acesso Organizador / Admin'}</span>
        </button>
      </div>
    </div>
  );
};
