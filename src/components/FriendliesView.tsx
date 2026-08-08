import { useState } from 'react';
import {
  AlertTriangle,
  FileText,
  Flame,
  Newspaper,
  ShieldAlert,
  Trophy,
  CheckCircle2,
  BarChart2,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Team } from '../types';
import { getTeamById } from '../data/teams';
import { FRIENDLY_MATCHES, OFFICIAL_COMMUNIQUE, FriendlyMatch } from '../data/friendlies';

function FriendlyBadge({ team }: { team: Team }) {
  return (
    <div
      className="team-badge team-badge-large"
      style={{
        background: `linear-gradient(145deg, ${team.primaryColor}, ${team.secondaryColor})`
      }}
    >
      <span>{team.shortName.slice(0, 2)}</span>
    </div>
  );
}

export function FriendliesView({ onSelectTeam }: { onSelectTeam?: (team: Team) => void }) {
  const [showCommunique, setShowCommunique] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<FriendlyMatch | null>(null);

  // Stats calculation
  const totalMatches = FRIENDLY_MATCHES.length;
  const totalGoals = FRIENDLY_MATCHES.reduce(
    (acc, m) => acc + m.homeScore + m.awayScore,
    0
  );
  const avgGoals = (totalGoals / totalMatches).toFixed(1);

  return (
    <div className="friendlies-container space-y-8">
      {/* ⚠️ Fixed Warning Top Banner */}
      <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-4 sm:p-5 text-amber-900 shadow-sm flex items-start gap-3.5">
        <ShieldAlert className="text-amber-600 shrink-0 mt-0.5" size={24} />
        <div className="space-y-1">
          <strong className="block text-sm sm:text-base font-black tracking-wide uppercase text-amber-700">
            ⚠️ AMISTOSOS PRÉ-COPA
          </strong>
          <p className="text-xs sm:text-sm font-medium leading-relaxed text-amber-900/90">
            {OFFICIAL_COMMUNIQUE.warningBanner.replace('⚠️ AMISTOSOS PRÉ-COPA: ', '')}
          </p>
        </div>
      </div>

      {/* Official Announcement Card */}
      <div className="bg-[#162A3D] text-white rounded-xl border border-[#2B4052] p-5 sm:p-6 shadow-md">
        <div
          className="flex items-center justify-between cursor-pointer select-none"
          onClick={() => setShowCommunique(!showCommunique)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Trophy size={20} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 block">
                {OFFICIAL_COMMUNIQUE.subtitle}
              </span>
              <h2 className="text-base sm:text-lg font-black text-white">
                {OFFICIAL_COMMUNIQUE.title}
              </h2>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white p-1">
            {showCommunique ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {showCommunique && (
          <div className="mt-5 pt-5 border-t border-[#2B4052] space-y-4 text-xs sm:text-sm text-slate-200">
            <div className="space-y-2">
              {OFFICIAL_COMMUNIQUE.text.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed font-medium">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="bg-[#0E1A26] p-4 rounded-lg border border-[#2B4052] space-y-2">
              <strong className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                Dessa forma:
              </strong>
              <ul className="space-y-1.5 pl-1">
                {OFFICIAL_COMMUNIQUE.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-amber-400 font-black text-xs uppercase tracking-wider">
                {OFFICIAL_COMMUNIQUE.formatTitle}
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {OFFICIAL_COMMUNIQUE.formatRules.map((fRule, idx) => (
                  <li key={idx} className="leading-relaxed flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>{fRule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 text-right">
              <span className="text-xs font-bold text-slate-400 italic">
                Copa DLS | Organização
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 📊 Friendly Statistics Summary */}
      <section className="space-y-3">
        <div className="section-title">
          <div>
            <span className="eyebrow">Números preparatórios</span>
            <h2>📊 Estatísticas dos Amistosos</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD3] text-center">
            <strong className="text-2xl sm:text-3xl font-black text-[#172033] block font-display">
              {totalMatches}
            </strong>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Partidas Realizadas
            </span>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD3] text-center">
            <strong className="text-2xl sm:text-3xl font-black text-amber-600 block font-display">
              {totalGoals}
            </strong>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Gols Anotados
            </span>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD3] text-center">
            <strong className="text-2xl sm:text-3xl font-black text-emerald-600 block font-display">
              {avgGoals}
            </strong>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Média por Jogo
            </span>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD3] text-center">
            <strong className="text-2xl sm:text-3xl font-black text-[#172033] block font-display">
              8x1
            </strong>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Maior Goleada (Baby Maxx)
            </span>
          </div>
        </div>
      </section>

      {/* 🏟️ Resultados dos Amistosos & 🔄 Jogos de ida e volta */}
      <section className="space-y-4">
        <div className="section-title">
          <div>
            <span className="eyebrow">Resultados dos jogos preparatórios</span>
            <h2>🏟️ Resultados dos Amistosos</h2>
          </div>
          <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Pré-Temporada
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {FRIENDLY_MATCHES.map((match) => {
            const home = getTeamById(match.homeTeamId);
            const away = getTeamById(match.awayTeamId);
            return (
              <article
                key={match.id}
                className="match-card hover:border-amber-400 transition-colors cursor-pointer"
                onClick={() => setSelectedMatch(match)}
              >
                <div className="match-meta flex-wrap gap-1.5">
                  <span className="flex items-center gap-1.5 font-bold text-amber-700 shrink-0">
                    <Flame size={14} />
                    {match.type === 'LEG_1'
                      ? 'Jogo de ida'
                      : match.type === 'LEG_2'
                      ? 'Jogo de volta'
                      : 'Jogo único'}
                  </span>
                  {match.aggregateScore && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded border border-amber-300 shrink-0">
                      Agregado: {match.aggregateScore}
                    </span>
                  )}
                </div>

                <div className="match-teams">
                  <div
                    className="cursor-pointer hover:opacity-80"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTeam?.(home);
                    }}
                  >
                    <FriendlyBadge team={home} />
                    <strong>{home.name}</strong>
                  </div>

                  <div className="score">
                    {match.homeScore} <small>x</small> {match.awayScore}
                  </div>

                  <div
                    className="cursor-pointer hover:opacity-80"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTeam?.(away);
                    }}
                  >
                    <FriendlyBadge team={away} />
                    <strong>{away.name}</strong>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-1.5 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800 min-w-0 flex-1 truncate pr-1">
                    {match.title}
                  </span>
                  <span className="text-amber-600 font-bold shrink-0 hover:underline">
                    Ver reportagem →
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 📰 Notícias, Comunicados & 📸 Destaques */}
      <section className="space-y-4">
        <div className="section-title">
          <div>
            <span className="eyebrow">Reportagens da pré-temporada</span>
            <h2>📰 Notícias e Comunicados</h2>
          </div>
        </div>

        <div className="space-y-4">
          {FRIENDLY_MATCHES.map((match) => {
            const home = getTeamById(match.homeTeamId);
            const away = getTeamById(match.awayTeamId);
            return (
              <div
                key={`news_${match.id}`}
                className="bg-[#FAF7F2] border border-[#E5DFD3] rounded-xl p-5 hover:border-amber-400 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      Amistoso
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {home.name} {match.homeScore} x {match.awayScore} {away.name}
                    </span>
                  </div>
                  {match.aggregateScore && (
                    <span className="text-xs font-extrabold text-amber-700">
                      (Agregado: {match.aggregateScore})
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#172033] mb-2 font-display">
                  {match.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  {match.report}
                </p>

                {/* 📸 Destaques das partidas */}
                <div className="bg-white/80 p-3 rounded-lg border border-[#E5DFD3]">
                  <strong className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                    <Sparkles size={14} className="text-amber-500" />
                    📸 Destaques do jogo:
                  </strong>
                  <div className="flex flex-wrap gap-1.5">
                    {match.highlights.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold text-slate-700 bg-[#F4F0E8] px-2.5 py-1 rounded-full border border-slate-300/80"
                      >
                        • {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 📅 Próximos Amistosos */}
      <section className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-amber-400" />
          <h3 className="text-base font-black uppercase tracking-wide">
            📅 Próximos Amistosos
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Novas partidas preparatórias podem ser marcadas a qualquer momento pelas equipes
          mediante comum acordo antes da abertura oficial da Copa DLS no dia 8 de Agosto.
        </p>
      </section>

      {/* Modal for match detail report */}
      {selectedMatch && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedMatch(null)}
        >
          <div
            className="team-modal max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                Reportagem Amistosa
              </span>
              <button
                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
                onClick={() => setSelectedMatch(null)}
              >
                ✕ Fechar
              </button>
            </div>

            <div className="my-4 text-center">
              <h3 className="text-lg font-black text-[#172033] font-display">
                {selectedMatch.title}
              </h3>
              <div className="text-2xl font-black text-amber-600 my-2">
                {getTeamById(selectedMatch.homeTeamId).name} {selectedMatch.homeScore} x{' '}
                {selectedMatch.awayScore} {getTeamById(selectedMatch.awayTeamId).name}
              </div>
              {selectedMatch.aggregateScore && (
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  Placar Agregado: {selectedMatch.aggregateScore}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
              {selectedMatch.report}
            </p>

            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
              <strong className="text-xs font-bold text-amber-900 block mb-2">
                📸 Destaques do confronto:
              </strong>
              <ul className="text-xs text-amber-900 space-y-1">
                {selectedMatch.highlights.map((h, idx) => (
                  <li key={idx}>• {h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
