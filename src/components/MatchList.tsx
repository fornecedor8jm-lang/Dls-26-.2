import React, { useState } from 'react';
import { GroupName, Match, Team, TimezoneMode } from '../types';
import { MatchCard } from './MatchCard';
import { Calendar, Filter, RefreshCw, AlertCircle, Shield } from 'lucide-react';

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
      {/* Notice Banner */}
      <div className="bg-[#162A3D] border border-[#2B4052] p-3.5 rounded-xl text-white flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-xs text-slate-200">
            Programação oficial da Copa DLS 26 ({timezone === 'CAT' ? 'CAT / Moçambique' : 'BRT / Brasília'}).
          </p>
        </div>

        {/* Admin Mode Toggle */}
        <button
          onClick={() => {
            if (!isAdminMode) {
              const pass = window.prompt('Digite a senha de administrador ou clique em OK para ativar visualização Admin:');
              if (pass !== null) setIsAdminMode(true);
            } else {
              setIsAdminMode(false);
            }
          }}
          className={`px-2.5 py-1 rounded text-[11px] font-extrabold inline-flex items-center gap-1 transition-colors border ${
            isAdminMode
              ? 'bg-amber-500 text-slate-950 border-amber-400'
              : 'bg-[#0B1F33] text-slate-400 border-[#2B4052] hover:text-white'
          }`}
          title="Modo Organizador / Admin"
        >
          <Shield size={12} />
          <span>{isAdminMode ? 'Admin Ativo' : 'Área Admin'}</span>
        </button>
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#162A3D] p-3 rounded-xl border border-[#2B4052]">
        {/* Stage Tabs */}
        <div className="flex flex-wrap items-center gap-1 overflow-x-auto p-0.5">
          <button
            onClick={() => setStageFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all whitespace-nowrap uppercase tracking-wider ${
              stageFilter === 'ALL'
                ? 'bg-[#138A4B] text-white shadow-sm'
                : 'bg-[#0B1F33] text-slate-300 hover:text-white border border-[#2B4052]'
            }`}
          >
            Todos os Jogos ({matches.length})
          </button>
          <button
            onClick={() => setStageFilter('R1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all whitespace-nowrap uppercase tracking-wider ${
              stageFilter === 'R1'
                ? 'bg-[#138A4B] text-white shadow-sm'
                : 'bg-[#0B1F33] text-slate-300 hover:text-white border border-[#2B4052]'
            }`}
          >
            Rodada 1 (08/08)
          </button>
          <button
            onClick={() => setStageFilter('R2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all whitespace-nowrap uppercase tracking-wider ${
              stageFilter === 'R2'
                ? 'bg-[#138A4B] text-white shadow-sm'
                : 'bg-[#0B1F33] text-slate-300 hover:text-white border border-[#2B4052]'
            }`}
          >
            Rodada 2 (09/08)
          </button>
          <button
            onClick={() => setStageFilter('R3')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all whitespace-nowrap uppercase tracking-wider ${
              stageFilter === 'R3'
                ? 'bg-[#138A4B] text-white shadow-sm'
                : 'bg-[#0B1F33] text-slate-300 hover:text-white border border-[#2B4052]'
            }`}
          >
            Rodada 3 (10/08)
          </button>
          <button
            onClick={() => setStageFilter('KNOCKOUT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all whitespace-nowrap uppercase tracking-wider ${
              stageFilter === 'KNOCKOUT'
                ? 'bg-[#138A4B] text-white shadow-sm'
                : 'bg-[#0B1F33] text-slate-300 hover:text-white border border-[#2B4052]'
            }`}
          >
            Mata-Mata
          </button>
        </div>

        {/* Secondary filters & Admin Controls */}
        <div className="flex items-center gap-2">
          {/* Group Filter */}
          <div className="flex items-center gap-1 bg-[#0B1F33] p-1 rounded-lg border border-[#2B4052] text-xs font-bold text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value as any)}
              className="bg-transparent text-white font-bold focus:outline-none pr-2 cursor-pointer"
            >
              <option value="ALL" className="bg-[#0B1F33]">Grupo: Todos</option>
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

          {/* Reset button - Only rendered in Admin Mode */}
          {isAdminMode && (
            <button
              onClick={onResetMatches}
              className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors border border-amber-500/40"
              title="Restaurar tabela original de jogos (Admin)"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Match Cards List */}
      {filteredMatches.length === 0 ? (
        <div className="text-center p-12 bg-[#162A3D] rounded-xl border border-[#2B4052] text-slate-300 space-y-3">
          <Calendar className="w-10 h-10 mx-auto text-slate-400" />
          <p className="font-bold text-white leading-relaxed max-w-md mx-auto">
            {getEmptyStateMessage()}
          </p>
          <button
            onClick={() => {
              setStageFilter('ALL');
              setGroupFilter('ALL');
            }}
            className="px-4 py-2 bg-[#138A4B] text-white font-bold text-xs rounded-lg hover:bg-[#0f733e] transition-colors"
          >
            Ver Todos os Jogos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
};
