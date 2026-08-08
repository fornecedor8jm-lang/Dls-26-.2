import { useState } from 'react';
import { GroupName, Team } from '../types';
import { TEAMS } from '../data/teams';
import { ShieldCheck, ChevronRight, Filter, Search } from 'lucide-react';

interface ConfirmedTeamsViewProps {
  onSelectTeam: (team: Team) => void;
}

export function ConfirmedTeamsView({ onSelectTeam }: ConfirmedTeamsViewProps) {
  const [selectedGroup, setSelectedGroup] = useState<GroupName | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const groups: GroupName[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const filteredTeams = TEAMS.filter((team) => {
    if (selectedGroup !== 'ALL' && team.group !== selectedGroup) return false;
    if (
      searchTerm.trim() &&
      !team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !team.shortName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Overview Stat Header */}
      <div className="bg-[#162A3D] border border-[#2B4052] p-4 sm:p-5 rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck size={16} /> 32 Clubes Confirmados
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-white">
            Participantes & Grupos (A-H)
          </h2>
          <p className="text-xs text-slate-300">
            Selecione um grupo no filtro abaixo para visualizar os 4 clubes chaveados.
          </p>
        </div>

        <div className="bg-[#0B1F33] px-4 py-2.5 rounded-xl border border-[#2B4052] shrink-0 text-center">
          <span className="text-slate-400 text-[10px] font-extrabold uppercase block">Vagas Preenchidas</span>
          <strong className="text-emerald-400 text-lg font-black font-display">32 / 32 ✅</strong>
        </div>
      </div>

      {/* Filter Toolbar: Group Select & Search */}
      <div className="bg-[#162A3D] p-3 rounded-xl border border-[#2B4052] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Dropdown Selector */}
        <div className="flex items-center gap-2 bg-[#0B1F33] px-3 py-2 rounded-lg border border-[#2B4052] text-xs font-bold text-slate-200">
          <Filter className="w-4 h-4 text-amber-400 shrink-0" />
          <label htmlFor="group-select" className="shrink-0 text-slate-400">Selecionar grupo:</label>
          <select
            id="group-select"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value as any)}
            className="bg-transparent text-white font-extrabold focus:outline-none cursor-pointer w-full"
          >
            <option value="ALL" className="bg-[#0B1F33]">Todos os 32 Times (Grupos A-H)</option>
            {groups.map((g) => (
              <option key={g} value={g} className="bg-[#0B1F33]">
                Grupo {g}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 bg-[#0B1F33] px-3 py-2 rounded-lg border border-[#2B4052] text-xs text-slate-200 flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Buscar por nome ou sigla..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white font-semibold focus:outline-none w-full placeholder-slate-500"
          />
        </div>
      </div>

      {/* Teams Grid */}
      {filteredTeams.length === 0 ? (
        <div className="text-center p-8 bg-[#162A3D] rounded-xl border border-[#2B4052] text-slate-300">
          <p className="font-bold text-white">Nenhum time encontrado com esse filtro.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              onClick={() => onSelectTeam(team)}
              className="bg-white border-2 border-slate-200 hover:border-amber-400 p-3.5 rounded-xl shadow-xs transition-all cursor-pointer group flex flex-col justify-between space-y-2.5"
            >
              {/* Badge & Info */}
              <div className="flex items-center justify-between">
                <span className="font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded text-[11px] border border-amber-200 font-mono">
                  Grupo {team.group}
                </span>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Sigla: {team.shortName}
                </span>
              </div>

              <div className="flex items-center gap-3 py-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black font-display text-sm shadow-xs shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${team.primaryColor}, ${team.secondaryColor})`
                  }}
                >
                  {team.shortName.slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-black text-slate-900 text-sm group-hover:text-amber-600 transition-colors truncate">
                    {team.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate font-medium">
                    {team.keyPlayers?.slice(0, 2).join(', ') || 'Elenco completo'}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTeam(team);
                  }}
                  className="inline-flex items-center justify-between w-full text-xs font-black text-amber-600 hover:text-amber-700 focus:outline-none"
                >
                  <span>Detalhes do time</span>
                  <ChevronRight size={15} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
