import React, { useState } from 'react';
import { GroupName, Match, Team } from '../types';
import { calculateGroupStandings } from '../utils/standings';
import { TeamBadge } from './TeamBadge';
import { Info, Clock, RefreshCw, ChevronDown, ChevronUp, Copy, Check, FileText, Table } from 'lucide-react';

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
  const [showLegendDetails, setShowLegendDetails] = useState(true);
  const [viewMode, setViewMode] = useState<'TABLE' | 'TEXT'>('TABLE');
  const [copied, setCopied] = useState(false);

  const groups: GroupName[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  // Count finished matches
  const finishedMatches = matches.filter((m) => m.status === 'FINISHED');
  const lastUpdatedText = '08/08/2026 às 17:30 (Horário Oficial BRT)';

  // Helper to generate full textual report for all or selected group
  const generateTextReport = (targetGroup?: GroupName) => {
    const activeGroups = targetGroup ? [targetGroup] : groups;
    let report = `📊 REGISTRO OFICIAL CBF DLS 2026\n🔄 Última atualização: ${lastUpdatedText}\n\n`;

    activeGroups.forEach((g) => {
      const groupTeams = teams.filter((t) => t.group === g);
      const rows = calculateGroupStandings(g, matches, groupTeams);
      const groupMatches = matches.filter((m) => m.group === g && m.status === 'FINISHED');

      report += `=== GRUPO ${g} ===\n`;
      if (groupMatches.length > 0) {
        groupMatches.forEach((m) => {
          const home = teams.find((t) => t.id === m.homeTeamId)?.name || m.homeTeamId;
          const away = teams.find((t) => t.id === m.awayTeamId)?.name || m.awayTeamId;
          report += `Grupo ${g}: ${home} ${m.homeScore} × ${m.awayScore} ${away}\n`;
        });
      } else {
        report += `Grupo ${g}: (Aguardando jogos)\n`;
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
    <div className="space-y-5">
      {/* Official Status Box */}
      <div className="bg-[#162A3D] border border-[#2B4052] rounded-xl p-4 text-white space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2B4052] pb-2">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase font-display">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Status Oficial da Classificação</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold bg-[#0B1F33] px-2.5 py-1 rounded border border-[#2B4052]">
            <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin-slow" />
            <span>Última atualização: {lastUpdatedText}</span>
          </div>
        </div>

        {finishedMatches.length > 0 ? (
          <div>
            <p className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {finishedMatches.length} {finishedMatches.length === 1 ? 'Partida Computada Oficialmente' : 'Partidas Computadas Oficialmente'}:
            </p>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {finishedMatches.map((fm) => {
                const home = teams.find((t) => t.id === fm.homeTeamId);
                const away = teams.find((t) => t.id === fm.awayTeamId);
                return (
                  <span
                    key={fm.id}
                    className="text-xs text-amber-300 font-bold bg-[#0B1F33] px-3 py-1.5 rounded border border-[#2B4052] inline-flex items-center gap-1.5"
                  >
                    <span>{home?.name || fm.homeTeamId}</span>
                    <strong className="text-white">{fm.homeScore} × {fm.awayScore}</strong>
                    <span>{away?.name || fm.awayTeamId}</span>
                    <span className="text-[10px] text-slate-400 font-normal">(Gr. {fm.group})</span>
                  </span>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-300 mt-2">
              Os demais {matches.length - finishedMatches.length} jogos permanecem devidamente AGENDADOS sem resultado. O Saldo de Gols (SG) e a pontuação de cada grupo são atualizados automaticamente a cada placar registrado.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-bold text-white">
              Aguardando início dos jogos oficiais.
            </p>
            <p className="text-xs text-slate-300">
              Nenhuma partida foi disputada até o momento.
            </p>
          </div>
        )}
      </div>

      {/* Mode View Switcher & Group selector tabs bar */}
      <div className="space-y-3 bg-[#162A3D] p-3 rounded-xl border border-[#2B4052]">
        {/* Top Control Bar: Mode Toggle + Copy Button */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2B4052] pb-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#0B1F33] p-1 rounded-lg border border-[#2B4052]">
            <button
              onClick={() => setViewMode('TABLE')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'TABLE'
                  ? 'bg-[#138A4B] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Tabela Clássica</span>
            </button>
            <button
              onClick={() => setViewMode('TEXT')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'TEXT'
                  ? 'bg-[#138A4B] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Formato Texto / Relatório CBF</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors cursor-pointer shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado para WhatsApp!' : 'Copiar Texto da Tabela'}</span>
            </button>

            <button
              onClick={onOpenLegend}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1F33] hover:bg-[#12283e] text-xs text-slate-300 font-bold transition-colors border border-[#2B4052] cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Regulamento</span>
            </button>
          </div>
        </div>

        {/* Group Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedGroup('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              selectedGroup === 'ALL'
                ? 'bg-[#138A4B] text-white shadow-sm'
                : 'bg-[#0B1F33] text-slate-300 hover:text-white border border-[#2B4052]'
            }`}
          >
            Todos os Grupos
          </button>
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                selectedGroup === g
                  ? 'bg-[#138A4B] text-white shadow-sm'
                  : 'bg-[#0B1F33] text-slate-300 hover:text-white border border-[#2B4052]'
              }`}
            >
              Grupo {g}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW MODE 1: STANDARD TABLE GRID */}
      {viewMode === 'TABLE' && (
        <div
          className={`grid gap-5 ${
            selectedGroup === 'ALL'
              ? 'grid-cols-1 lg:grid-cols-2'
              : 'grid-cols-1'
          }`}
        >
          {groups
            .filter((g) => selectedGroup === 'ALL' || selectedGroup === g)
            .map((groupName) => {
              const groupTeams = teams.filter((t) => t.group === groupName);
              const rows = calculateGroupStandings(groupName, matches, groupTeams);
              const groupFinishedCount = matches.filter(
                (m) => m.group === groupName && m.status === 'FINISHED'
              ).length;

              return (
                <div
                  key={groupName}
                  className="bg-[#162A3D] border border-[#2B4052] rounded-xl overflow-hidden shadow-md"
                >
                  {/* Table Group Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0B1F33] text-white border-b border-[#2B4052]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded bg-[#138A4B] text-white font-black text-sm flex items-center justify-center font-display">
                        {groupName}
                      </span>
                      <div>
                        <h3 className="font-extrabold text-white text-sm font-display tracking-wide uppercase">
                          GRUPO {groupName}
                        </h3>
                        <p className="text-[10px] text-slate-400">
                          Classificação Oficial • Fase de Grupos
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-slate-300 bg-[#162A3D] px-2.5 py-1 rounded border border-[#2B4052]">
                      Top 2 avançam para Quartas
                    </span>
                  </div>

                  {/* Table Data */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#2B4052] bg-[#0B1F33]/70 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">
                          <th className="py-2.5 px-3 text-center w-10">Pos</th>
                          <th className="py-2.5 px-3">Clube</th>
                          <th className="py-2.5 px-2 text-center text-white font-black bg-[#2B4052]/40">Pts</th>
                          <th className="py-2.5 px-2 text-center">J</th>
                          <th className="py-2.5 px-2 text-center text-slate-300">V</th>
                          <th className="py-2.5 px-2 text-center text-slate-300">E</th>
                          <th className="py-2.5 px-2 text-center text-slate-300">D</th>
                          <th className="py-2.5 px-2 text-center text-slate-300">GP</th>
                          <th className="py-2.5 px-2 text-center text-slate-300">GC</th>
                          <th className="py-2.5 px-2 text-center text-white font-bold">SG</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2B4052]/60 text-slate-200">
                        {rows.map((row, idx) => {
                          return (
                            <tr
                              key={row.team.id}
                              onClick={() => onSelectTeam(row.team)}
                              className="group hover:bg-[#0B1F33] cursor-pointer transition-colors"
                            >
                              {/* Rank */}
                              <td className="py-3 px-3 text-center font-bold">
                                <span
                                  className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-black ${
                                    idx < 2 && row.played > 0
                                      ? 'bg-[#138A4B] text-white'
                                      : 'bg-[#0B1F33] text-slate-300 border border-[#2B4052]'
                                  }`}
                                >
                                  {idx + 1}
                                </span>
                              </td>

                              {/* Team */}
                              <td className="py-3 px-3 font-semibold text-white group-hover:text-green-400 transition-colors">
                                <div className="flex items-center gap-2.5">
                                  <TeamBadge team={row.team} size="sm" />
                                  <span className="truncate max-w-[140px] sm:max-w-none font-bold">
                                    {row.team.name}
                                  </span>
                                </div>
                              </td>

                              {/* Points */}
                              <td className="py-3 px-2 text-center font-black text-white bg-[#0B1F33]/80 text-sm font-mono">
                                {row.points}
                              </td>

                              {/* Played (J) */}
                              <td className="py-3 px-2 text-center font-bold text-slate-300 font-mono">
                                {row.played}
                              </td>

                              {/* Won (V) */}
                              <td className="py-3 px-2 text-center font-bold text-slate-300 font-mono">
                                {row.won}
                              </td>

                              {/* Drawn (E) */}
                              <td className="py-3 px-2 text-center font-bold text-slate-300 font-mono">
                                {row.drawn}
                              </td>

                              {/* Lost (D) */}
                              <td className="py-3 px-2 text-center font-bold text-slate-300 font-mono">
                                {row.lost}
                              </td>

                              {/* Goals For (GP) */}
                              <td className="py-3 px-2 text-center font-medium text-slate-400 font-mono">
                                {row.goalsFor}
                              </td>

                              {/* Goals Against (GC) */}
                              <td className="py-3 px-2 text-center font-medium text-slate-400 font-mono">
                                {row.goalsAgainst}
                              </td>

                              {/* Goal Difference (SG) */}
                              <td className="py-3 px-2 text-center font-black text-white font-mono">
                                {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer */}
                  <div className="px-4 py-2 bg-[#0B1F33] border-t border-[#2B4052] flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      {groupFinishedCount > 0
                        ? `${groupFinishedCount} jogo finalizado neste grupo`
                        : `Aguardando início dos jogos do Grupo ${groupName}`}
                    </span>
                    <span className="font-semibold text-slate-300">4 Clubes</span>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* VIEW MODE 2: TEXTUAL FORMAT / CBF BULLETIN STYLE */}
      {viewMode === 'TEXT' && (
        <div className="space-y-4">
          <div className="bg-[#162A3D] border border-[#2B4052] rounded-xl p-4 text-white">
            <div className="flex items-center justify-between border-b border-[#2B4052] pb-3 mb-3">
              <div>
                <h3 className="font-black text-amber-400 text-sm font-display uppercase tracking-wide flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  Formato de Texto Oficial (Estilo Boletim CBF)
                </h3>
                <p className="text-xs text-slate-300">
                  Ideal para copiar e compartilhar rapidamente no WhatsApp e grupos de redes sociais.
                </p>
              </div>

              <button
                onClick={handleCopyReport}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Tudo'}</span>
              </button>
            </div>

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
                      className="bg-[#0B1F33] p-4 rounded-xl border border-[#2B4052] font-mono text-xs space-y-3 shadow-inner"
                    >
                      <div className="flex items-center justify-between border-b border-[#2B4052] pb-2">
                        <span className="font-extrabold text-amber-400 font-sans uppercase text-xs">
                          🏆 GRUPO {groupName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans">
                          {groupFinishedMatches.length > 0 ? 'Jogos Computados' : 'Aguardando Jogos'}
                        </span>
                      </div>

                      {/* Finished matches list for this group */}
                      {groupFinishedMatches.length > 0 ? (
                        <div className="bg-[#162A3D] p-2 rounded border border-[#2B4052] text-emerald-300 font-bold text-xs space-y-1">
                          {groupFinishedMatches.map((fm) => {
                            const home = teams.find((t) => t.id === fm.homeTeamId)?.name || fm.homeTeamId;
                            const away = teams.find((t) => t.id === fm.awayTeamId)?.name || fm.awayTeamId;
                            return (
                              <p key={fm.id} className="text-white">
                                <span className="text-amber-400 font-sans font-black">Grupo {groupName}:</span> {home} {fm.homeScore} × {fm.awayScore} {away}
                              </p>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 font-sans italic">
                          Grupo {groupName}: Nenhum jogo finalizado ainda.
                        </p>
                      )}

                      {/* Text lines for each team */}
                      <div className="space-y-1.5 pt-1 text-slate-200">
                        {rows.map((row) => {
                          const sg = row.goalDifference > 0 ? `+${row.goalDifference}` : `${row.goalDifference}`;
                          return (
                            <div
                              key={row.team.id}
                              className="bg-[#162A3D]/80 p-2 rounded border border-[#2B4052]/80 hover:border-amber-400/50 transition-colors"
                            >
                              <span className="font-black text-amber-300 font-sans block text-xs">
                                {row.team.name}:
                              </span>
                              <span className="text-slate-100 font-mono text-[11px] block mt-0.5">
                                {row.played}J | {row.won}V | {row.drawn}E | {row.lost}D | {row.goalsFor} GP | {row.goalsAgainst} GC | {sg} SG | <strong className="text-amber-400">{row.points} PTS</strong>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Discrete, Responsive Inline Legend Block */}
      <div className="bg-[#162A3D] border border-[#2B4052] rounded-xl overflow-hidden shadow-sm">
        <button
          onClick={() => setShowLegendDetails(!showLegendDetails)}
          className="w-full px-4 py-3 bg-[#0B1F33] flex items-center justify-between text-left text-white font-bold text-xs hover:bg-[#0f283f] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-black uppercase font-display tracking-wide">
              ℹ️ Entenda a Classificação e Siglas
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <span>{showLegendDetails ? 'Ocultar Legenda' : 'Exibir Legenda'}</span>
            {showLegendDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showLegendDetails && (
          <div className="p-4 space-y-4 text-xs text-slate-200 border-t border-[#2B4052]">
            {/* Abbreviations grid */}
            <div>
              <p className="text-[11px] font-extrabold uppercase text-slate-400 mb-2">
                Abreviações Utilizadas na Tabela:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="bg-[#0B1F33] p-2 rounded border border-[#2B4052]">
                  <strong className="text-white font-black font-mono">J</strong> = Jogos disputados
                </div>
                <div className="bg-[#0B1F33] p-2 rounded border border-[#2B4052]">
                  <strong className="text-emerald-400 font-black font-mono">V</strong> = Vitórias
                </div>
                <div className="bg-[#0B1F33] p-2 rounded border border-[#2B4052]">
                  <strong className="text-amber-400 font-black font-mono">E</strong> = Empates
                </div>
                <div className="bg-[#0B1F33] p-2 rounded border border-[#2B4052]">
                  <strong className="text-red-400 font-black font-mono">D</strong> = Derrotas
                </div>
                <div className="bg-[#0B1F33] p-2 rounded border border-[#2B4052]">
                  <strong className="text-white font-black font-mono">GP</strong> = Gols Pró (marcados)
                </div>
                <div className="bg-[#0B1F33] p-2 rounded border border-[#2B4052]">
                  <strong className="text-slate-400 font-black font-mono">GC</strong> = Gols Contra (sofridos)
                </div>
                <div className="bg-[#0B1F33] p-2 rounded border border-[#2B4052]">
                  <strong className="text-white font-black font-mono">SG</strong> = Saldo de Gols (GP − GC)
                </div>
                <div className="bg-[#0B1F33] p-2 rounded border border-[#2B4052]">
                  <strong className="text-amber-400 font-black font-mono">PTS</strong> = Pontos acumulados
                </div>
              </div>
            </div>

            {/* Scoring & Automated Calc */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#2B4052]/60 text-[11px]">
              <div className="bg-[#0B1F33] p-2.5 rounded border border-[#2B4052] space-y-1">
                <p className="font-extrabold text-amber-400 uppercase">Pontuação Oficial:</p>
                <div className="flex flex-wrap gap-3 font-semibold">
                  <span>🟢 Vitória = <strong>3 pontos</strong></span>
                  <span>🟡 Empate = <strong>1 ponto</strong></span>
                  <span>🔴 Derrota = <strong>0 pontos</strong></span>
                </div>
              </div>

              <div className="bg-[#0B1F33] p-2.5 rounded border border-[#2B4052] space-y-1">
                <p className="font-extrabold text-emerald-400 uppercase">Cálculo Automático:</p>
                <p className="text-slate-300">
                  O Saldo de Gols (<strong>SG</strong>) e a pontuação total são calculados automaticamente pelo sistema a partir dos gols marcados (GP) e sofridos (GC).
                </p>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
              <span>🔄 Última atualização dos dados: <strong>{lastUpdatedText}</strong></span>
              <span>Copa DLS 2026 • CBF DLS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
