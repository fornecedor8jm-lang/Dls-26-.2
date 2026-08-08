import React, { useState } from 'react';
import { GroupName, Match, Team } from '../types';
import { calculateGroupStandings } from '../utils/standings';
import { TeamBadge } from './TeamBadge';
import { StatsLeaderboard } from './StatsLeaderboard';
import { Info, Clock, RefreshCw, ChevronDown, ChevronUp, Copy, Check, Filter, Table, FileText } from 'lucide-react';

interface GroupStandingsProps {
  teams: Team[];
  matches: Match[];
  onSelectTeam: (team: Team) => void;
  onOpenLegend: () => void;
}

export const GroupStandingsView: React.FC<GroupStandingsProps> = ({
  teams,
  matches,
  onSelectTeam,
  onOpenLegend
}) => {
  const [selectedGroup, setSelectedGroup] = useState<GroupName | 'ALL'>('ALL');
  const [showLegendDetails, setShowLegendDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'TEXT' | 'TABLE'>('TEXT');
  const [copied, setCopied] = useState(false);

  const groups: GroupName[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  // Count finished matches
  const finishedMatches = matches.filter((m) => m.status === 'FINISHED');
  const lastUpdatedText = '08/08/2026 (Horário Oficial CAT/BRT)';

  // Helper to generate clean textual report for WhatsApp
  const generateTextReport = (targetGroup?: GroupName) => {
    const activeGroups = targetGroup ? [targetGroup] : groups;
    let report = `📊 CLASSIFICAÇÃO OFICIAL COPA DLS 2026\n\n`;

    activeGroups.forEach((g) => {
      const groupTeams = teams.filter((t) => t.group === g);
      const rows = calculateGroupStandings(g, matches, groupTeams);
      const groupMatches = matches.filter((m) => m.group === g && m.status === 'FINISHED');

      report += `GRUPO ${g}\n`;
      if (groupMatches.length > 0) {
        groupMatches.forEach((m) => {
          const home = teams.find((t) => t.id === m.homeTeamId)?.name || m.homeTeamId;
          const away = teams.find((t) => t.id === m.awayTeamId)?.name || m.awayTeamId;
          report += `Placar: ${home} ${m.homeScore} × ${m.awayScore} ${away}\n`;
        });
      }

      rows.forEach((row) => {
        const sg = row.goalDifference > 0 ? `+${row.goalDifference}` : `${row.goalDifference}`;
        report += `${row.team.name}: ${row.played}J | ${row.won}V | ${row.drawn}E | ${row.lost}D | ${row.goalsFor} GP | ${row.goalsAgainst} GC | ${sg} SG | ${row.points} PTS\n`;
      });
      report += `\n`;
    });

    return report.trim();
  };

  const handleCopyReport = () => {
    const reportText = generateTextReport(selectedGroup === 'ALL' ? undefined : selectedGroup);
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Official Status Box */}
      <div className="bg-[#162A3D] border border-[#2B4052] rounded-2xl p-4 text-white space-y-2.5 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2B4052] pb-2">
          <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase font-display">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Classificação em Tempo Real</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-extrabold bg-[#0B1F33] px-2.5 py-1 rounded-lg border border-[#2B4052]">
            <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin-slow" />
            <span>Atualizado: {lastUpdatedText}</span>
          </div>
        </div>

        {finishedMatches.length > 0 ? (
          <div className="space-y-1.5">
            <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {finishedMatches.length} {finishedMatches.length === 1 ? 'Partida Finalizada' : 'Partidas Finalizadas'}:
            </p>
            <div className="flex flex-wrap gap-2">
              {finishedMatches.map((fm) => {
                const home = teams.find((t) => t.id === fm.homeTeamId);
                const away = teams.find((t) => t.id === fm.awayTeamId);
                return (
                  <span
                    key={fm.id}
                    className="text-xs text-amber-300 font-extrabold bg-[#0B1F33] px-3 py-1.5 rounded-lg border border-[#2B4052] inline-flex items-center gap-1.5"
                  >
                    <span>{home?.name || fm.homeTeamId}</span>
                    <strong className="text-white font-mono">{fm.homeScore} × {fm.awayScore}</strong>
                    <span>{away?.name || fm.awayTeamId}</span>
                    <span className="text-[10px] text-slate-400 font-bold">(Gr. {fm.group})</span>
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-300">
            Aguardando início das partidas da fase de grupos.
          </p>
        )}
      </div>

      {/* Single Toolbar: Selector Dropdown & Single Copy Button */}
      <div className="bg-[#162A3D] p-3 rounded-xl border border-[#2B4052] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Dropdown Selector */}
        <div className="flex items-center gap-2 bg-[#0B1F33] px-3 py-2 rounded-lg border border-[#2B4052] text-xs font-bold text-slate-200">
          <Filter className="w-4 h-4 text-amber-400 shrink-0" />
          <label htmlFor="standings-group-select" className="shrink-0 text-slate-400">Selecionar grupo:</label>
          <select
            id="standings-group-select"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value as any)}
            className="bg-transparent text-white font-black focus:outline-none cursor-pointer w-full"
          >
            <option value="ALL" className="bg-[#0B1F33]">Todos os Grupos (A-H)</option>
            {groups.map((g) => (
              <option key={g} value={g} className="bg-[#0B1F33]">
                Grupo {g}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle & Copy Button */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#0B1F33] p-1 rounded-lg border border-[#2B4052]">
            <button
              onClick={() => setViewMode('TEXT')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-black transition-all cursor-pointer ${
                viewMode === 'TEXT'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Formato Texto Vertical"
            >
              <FileText size={14} />
              <span>Texto Vertical</span>
            </button>
            <button
              onClick={() => setViewMode('TABLE')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-black transition-all cursor-pointer ${
                viewMode === 'TABLE'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tabela Clássica"
            >
              <Table size={14} />
              <span>Tabela Clássica</span>
            </button>
          </div>

          {/* Unified Copy Button */}
          <button
            onClick={handleCopyReport}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition-colors cursor-pointer shadow-xs shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado!' : 'Copiar tabela'}</span>
          </button>
        </div>
      </div>

      {/* PRIMARY PRESENTATION: TEXTUAL VERTICAL FORMAT (OPTIMIZED FOR MOBILE / WHATSAPP) */}
      {viewMode === 'TEXT' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups
            .filter((g) => selectedGroup === 'ALL' || selectedGroup === g)
            .map((groupName) => {
              const groupTeams = teams.filter((t) => t.group === groupName);
              const rows = calculateGroupStandings(groupName, matches, groupTeams);
              const groupFinishedMatches = matches.filter(
                (m) => m.group === groupName && m.status === 'FINISHED'
              );

              return (
                <div
                  key={groupName}
                  className="bg-[#0B1F33] p-4 rounded-xl border border-[#2B4052] space-y-3 shadow-inner"
                >
                  <div className="flex items-center justify-between border-b border-[#2B4052] pb-2">
                    <span className="font-black text-amber-400 text-sm tracking-wide uppercase font-display">
                      🏆 GRUPO {groupName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-[#162A3D] px-2 py-0.5 rounded border border-[#2B4052]">
                      Top 2 Avançam
                    </span>
                  </div>

                  {groupFinishedMatches.length > 0 && (
                    <div className="bg-[#162A3D] p-2.5 rounded-lg border border-[#2B4052] text-xs font-bold space-y-1">
                      {groupFinishedMatches.map((fm) => {
                        const home = teams.find((t) => t.id === fm.homeTeamId)?.name || fm.homeTeamId;
                        const away = teams.find((t) => t.id === fm.awayTeamId)?.name || fm.awayTeamId;
                        return (
                          <p key={fm.id} className="text-white text-[11px]">
                            <span className="text-emerald-400 font-extrabold">✅ Resultado:</span> {home} <strong className="text-amber-300 font-mono">{fm.homeScore} × {fm.awayScore}</strong> {away}
                          </p>
                        );
                      })}
                    </div>
                  )}

                  {/* Clean Vertical Text Rows */}
                  <div className="space-y-2 pt-1">
                    {rows.map((row, idx) => {
                      const sg = row.goalDifference > 0 ? `+${row.goalDifference}` : `${row.goalDifference}`;
                      return (
                        <div
                          key={row.team.id}
                          onClick={() => onSelectTeam(row.team)}
                          className="bg-[#162A3D] p-2.5 rounded-xl border border-[#2B4052] hover:border-amber-400/80 transition-colors cursor-pointer space-y-1"
                        >
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-amber-300 font-black font-display text-sm truncate flex items-center gap-1.5">
                              <span className="text-slate-400 text-[10px] font-mono">#{idx + 1}</span>
                              {row.team.name}
                            </span>
                            <span className="font-mono font-black text-emerald-400 bg-[#0B1F33] px-2 py-0.5 rounded border border-[#2B4052] text-xs">
                              {row.points} PTS
                            </span>
                          </div>
                          <div className="text-slate-300 font-mono text-[11px] block tracking-tight">
                            {row.played}J | {row.won}V | {row.drawn}E | {row.lost}D | {row.goalsFor} GP | {row.goalsAgainst} GC | <strong className="text-amber-400">{sg} SG</strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* SECONDARY PRESENTATION: CLASSIC TABLE */}
      {viewMode === 'TABLE' && (
        <div
          className={`grid gap-5 ${
            selectedGroup === 'ALL' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {groups
            .filter((g) => selectedGroup === 'ALL' || selectedGroup === g)
            .map((groupName) => {
              const groupTeams = teams.filter((t) => t.group === groupName);
              const rows = calculateGroupStandings(groupName, matches, groupTeams);

              return (
                <div
                  key={groupName}
                  className="bg-[#162A3D] border border-[#2B4052] rounded-2xl overflow-hidden shadow-md"
                >
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0B1F33] text-white border-b border-[#2B4052]">
                    <span className="font-black text-amber-400 text-sm font-display tracking-wide uppercase">
                      GRUPO {groupName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 bg-[#162A3D] px-2.5 py-1 rounded border border-[#2B4052]">
                      Top 2 Classificam
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#2B4052] bg-[#0B1F33]/70 text-slate-400 text-[10px] font-extrabold uppercase">
                          <th className="py-2.5 px-3 text-center w-8">#</th>
                          <th className="py-2.5 px-3">Clube</th>
                          <th className="py-2.5 px-2 text-center text-white font-black bg-[#2B4052]/40">Pts</th>
                          <th className="py-2.5 px-2 text-center">J</th>
                          <th className="py-2.5 px-2 text-center">V</th>
                          <th className="py-2.5 px-2 text-center">E</th>
                          <th className="py-2.5 px-2 text-center">D</th>
                          <th className="py-2.5 px-2 text-center">GP</th>
                          <th className="py-2.5 px-2 text-center">GC</th>
                          <th className="py-2.5 px-2 text-center text-white font-bold">SG</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2B4052]/60 text-slate-200">
                        {rows.map((row, idx) => (
                          <tr
                            key={row.team.id}
                            onClick={() => onSelectTeam(row.team)}
                            className="hover:bg-[#0B1F33] cursor-pointer transition-colors"
                          >
                            <td className="py-2.5 px-3 text-center font-black text-slate-400">
                              {idx + 1}
                            </td>
                            <td className="py-2.5 px-3 font-extrabold text-white">
                              <div className="flex items-center gap-2">
                                <TeamBadge team={row.team} size="sm" />
                                <span className="truncate max-w-[120px]">{row.team.name}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-2 text-center font-black text-amber-400 bg-[#0B1F33]/80 font-mono text-sm">
                              {row.points}
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono font-bold">{row.played}</td>
                            <td className="py-2.5 px-2 text-center font-mono">{row.won}</td>
                            <td className="py-2.5 px-2 text-center font-mono">{row.drawn}</td>
                            <td className="py-2.5 px-2 text-center font-mono">{row.lost}</td>
                            <td className="py-2.5 px-2 text-center font-mono text-slate-400">{row.goalsFor}</td>
                            <td className="py-2.5 px-2 text-center font-mono text-slate-400">{row.goalsAgainst}</td>
                            <td className="py-2.5 px-2 text-center font-mono font-black text-white">
                              {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Discrete Rules & Regulations Block */}
      <div className="bg-[#162A3D] border border-[#2B4052] rounded-2xl overflow-hidden shadow-xs">
        <button
          onClick={() => setShowLegendDetails(!showLegendDetails)}
          className="w-full px-4 py-3 bg-[#0B1F33] flex items-center justify-between text-left text-white font-bold text-xs hover:bg-[#0f283f] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-black uppercase font-display tracking-wide">
              ℹ️ Entenda as Siglas e Critérios de Desempate
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <span>{showLegendDetails ? 'Ocultar' : 'Exibir'}</span>
            {showLegendDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showLegendDetails && (
          <div className="p-4 space-y-3 text-xs text-slate-200 border-t border-[#2B4052]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="bg-[#0B1F33] p-2 rounded border border-[#2B4052]">
                <strong className="text-white font-mono">J</strong> = Jogos disputados
              </div>
              <div className="bg-[#0B1F33] p-2 rounded border border-[#2B4052]">
                <strong className="text-emerald-400 font-mono">V</strong> = Vitórias (3 pts)
              </div>
              <div className="bg-[#0B1F33] p-2 rounded border border-[#2B4052]">
                <strong className="text-amber-400 font-mono">E</strong> = Empates (1 pt)
              </div>
              <div className="bg-[#0B1F33] p-2 rounded border border-[#2B4052]">
                <strong className="text-red-400 font-mono">D</strong> = Derrotas (0 pt)
              </div>
            </div>
          </div>
        )}
      </div>

      {/* INTEGRATED STATS LEADERBOARD AT THE BOTTOM OF TABELA */}
      <div className="pt-4 border-t border-[#2B4052]">
        <div className="mb-4">
          <span className="eyebrow text-amber-400">Números Gerais da Competição</span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-white">
            🏅 Estatísticas & Artilharia
          </h2>
        </div>
        <StatsLeaderboard
          matches={matches}
          teams={teams}
          onSelectTeam={onSelectTeam}
        />
      </div>
    </div>
  );
};
