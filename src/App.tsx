import { useState, useEffect } from 'react';
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  Dices,
  Medal,
  Newspaper,
  Phone,
  Swords,
  Trophy,
  X,
  Users,
  ShieldCheck,
  MessageCircle,
  ShieldAlert,
  Clock,
  Sparkles,
  Globe,
  ArrowLeft,
  Home
} from 'lucide-react';
import { Match, Team, TimezoneMode } from './types';
import { TEAMS } from './data/teams';
import { FriendliesView } from './components/FriendliesView';
import { TrailerSection } from './components/TrailerSection';
import { ConfirmedTeamsView } from './components/ConfirmedTeamsView';
import { GroupsSection } from './components/GroupsSection';
import { MatchList } from './components/MatchList';
import { GroupStandingsView } from './components/GroupStandings';
import { KnockoutBracket } from './components/KnockoutBracket';
import { StatsLeaderboard } from './components/StatsLeaderboard';
import { LegendModal } from './components/LegendModal';
import { MatchEditorModal } from './components/MatchEditorModal';
import {
  loadMatchesFromStorage,
  saveMatchesToStorage,
  resetMatchesStorage
} from './utils/storage';

type Tab = 'home' | 'grupos' | 'participantes' | 'friendlies' | 'matches' | 'table' | 'bracket' | 'stats' | 'contact';

const WHATSAPP_LINK = 'https://wa.me/55096991821516';

const PLAYER_CONTACTS = [
  { team: 'FC Labamba', number: '877559587', href: 'tel:+258877559587' },
  { team: 'FC Celeste', number: '859136077', href: 'tel:+258859136077' },
  { team: 'FC Bayern München', number: '840444822', href: 'tel:+258840444822' },
  { team: 'Fundador (Envio de Resultados / PV)', number: '+55 096 99182-1516', href: WHATSAPP_LINK }
];

function Badge({ team, large = false }: { team: Team; large?: boolean }) {
  return (
    <div
      className={`team-badge ${large ? 'team-badge-large' : ''}`}
      style={{
        background: `linear-gradient(145deg, ${team.primaryColor}, ${team.secondaryColor})`
      }}
    >
      <span>{team.shortName.slice(0, 2)}</span>
    </div>
  );
}

function Title({
  eyebrow,
  title,
  action,
  onAction,
  onBack
}: {
  eyebrow: string;
  title: string;
  action?: string;
  onAction?: () => void;
  onBack?: () => void;
}) {
  return (
    <div className="section-title flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 bg-[#162A3D] hover:bg-[#203a52] text-amber-400 font-extrabold text-xs px-3.5 py-2 rounded-xl border border-[#2B4052] transition-all shadow-sm"
          >
            <ArrowLeft size={16} />
            <span>Voltar ao Menu Principal</span>
          </button>
        )}
        {action && (
          <button className="text-button" onClick={onAction}>
            {action}
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function ContactList() {
  return (
    <section className="contacts-section space-y-6">
      <div className="section-title">
        <div>
          <span className="eyebrow">Atendimento & Inscrições</span>
          <h2>Contato dos Jogadores e Fundador</h2>
        </div>
        <span className="contacts-note">Inscrições & Envio de Resultados</span>
      </div>

      {/* Primary Founder Contact Banner */}
      <div className="bg-[#162A3D] text-white p-6 rounded-2xl border border-[#2B4052] flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-lg">
        <div className="space-y-2">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest inline-flex items-center gap-1.5">
            <MessageCircle size={16} /> Envio de Placares no PV
          </span>
          <h3 className="text-xl font-black font-display">
            WhatsApp Oficial da Administração da Copa DLS 26
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Os resultados dos jogos devem ser enviados via PV para o fundador, que atualizará o site com os dados e estatísticas oficiais do torneio.
          </p>
        </div>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm py-3 px-6 rounded-xl inline-flex items-center gap-2 transition-colors shrink-0 shadow-md"
        >
          <MessageCircle size={20} /> Entrar em Contato no WhatsApp
        </a>
      </div>

      <div className="contact-grid">
        {PLAYER_CONTACTS.map((contact) => (
          <a
            className="contact-card"
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : '_self'}
            rel="noreferrer"
            key={contact.number}
          >
            <span className="contact-icon">
              <Phone size={18} />
            </span>
            <span>
              <strong>{contact.team}</strong>
              <small>Contato para o torneio</small>
            </span>
            <b>{contact.number}</b>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [matches, setMatches] = useState<Match[]>(loadMatchesFromStorage());
  const [timezone, setTimezone] = useState<TimezoneMode>('CAT');
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [legendOpen, setLegendOpen] = useState(false);

  useEffect(() => {
    saveMatchesToStorage(matches);
  }, [matches]);

  const handleSaveMatch = (updated: Match) => {
    setMatches((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    setEditingMatch(null);
  };

  const handleResetMatches = () => {
    if (window.confirm('Deseja restaurar a programação e partidas oficiais originais da Copa DLS 26?')) {
      const reset = resetMatchesStorage();
      setMatches(reset);
    }
  };

  const go = (next: Tab) => {
    setTab(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nav = [
    { id: 'home' as Tab, label: 'Início', icon: Trophy },
    { id: 'grupos' as Tab, label: 'Grupos (A-H)', icon: Dices },
    { id: 'participantes' as Tab, label: 'Participantes (32)', icon: Users },
    { id: 'friendlies' as Tab, label: 'Amistosos', icon: Newspaper },
    { id: 'matches' as Tab, label: 'Jogos & Horários', icon: CalendarDays },
    { id: 'table' as Tab, label: 'Tabela', icon: BarChart3 },
    { id: 'bracket' as Tab, label: 'Mata-mata', icon: Swords },
    { id: 'stats' as Tab, label: 'Números', icon: Medal },
    { id: 'contact' as Tab, label: 'Contato PV', icon: MessageCircle }
  ];

  return (
    <div className="app-shell">
      {/* Announcement Banner */}
      <div className="announcement">
        <div className="container announcement-inner flex items-center justify-between">
          <div className="flex items-center gap-2">
            🏆 <b>COPA DLS 2026</b> · <span>Sorteio Oficial Concluído!</span>
          </div>
          <div className="announcement-right flex items-center gap-3">
            <span className="hidden sm:inline">🎲 <b>GRUPOS A, B, C, D, E, F, G, H DEFINIDOS</b></span>
            <span className="live-pill bg-emerald-500 text-slate-950 font-black">32/32 VAGAS COMPLETAS ✅</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="site-header">
        <div className="container header-inner">
          <button className="brand" onClick={() => go('home')}>
            <img
              src="https://raw.githubusercontent.com/fornecedor8jm-lang/Dls-26/main/public/copa-dls-26-logo-final.png"
              alt="Copa DLS 26 Logo"
              className="h-10 sm:h-12 w-auto object-contain flex-shrink-0"
              referrerPolicy="no-referrer"
            />
            <span>
              <b>COPA</b>
              <strong>
                DLS <em>26</em>
              </strong>
            </span>
          </button>
          <nav className={menuOpen ? 'open' : ''}>
            {nav.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={tab === id ? 'active' : ''}
                onClick={() => go(id)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Timezone Switcher Bar */}
      <div className="bg-[#0B1F33] border-b border-[#2B4052] py-2 px-4">
        <div className="container flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2 font-bold">
            <Clock size={14} className="text-amber-400" />
            <span>Horários dos Jogos:</span>
            <span className="text-amber-400 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              {timezone === 'CAT' ? '🇲🇿 Moçambique (CAT / GMT+2)' : '🇧🇷 Brasília (BRT / GMT-3)'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-bold">
            <Globe size={13} className="text-slate-400" />
            <button
              onClick={() => setTimezone(timezone === 'CAT' ? 'BRT' : 'CAT')}
              className="px-2.5 py-1 rounded bg-[#162A3D] hover:bg-[#203a52] text-amber-300 transition-colors border border-[#2B4052] font-black text-[11px]"
            >
              Mudar p/ {timezone === 'CAT' ? '🇧🇷 Brasília (BRT)' : '🇲🇿 Moçambique (CAT)'}
            </button>
          </div>
        </div>
      </div>

      <main>
        {tab === 'home' && (
          <>
            {/* Banner / Hero Principal */}
            <section className="hero">
              <div className="container hero-grid">
                <div className="hero-copy">
                  <span className="kicker">
                    <span className="kicker-line" /> O campeonato da sua liga
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
                    🏆 COPA DLS 2026
                  </h1>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed pt-1">
                    Sorteio dos 8 Grupos (A-H) concluído! Todas as 32 equipes estão chaveadas com a programação oficial dos confrontos e horários de Moçambique divulgados.
                  </p>

                  {/* Status Box */}
                  <div className="bg-[#162A3D]/90 border border-[#2B4052] p-4 rounded-xl space-y-3 mt-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
                      <ShieldCheck size={16} />
                      <span>Status do Torneio: Grupos A, B, C, D, E, F, G, H Definidos ✅</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-1">
                      <div className="bg-[#0E1A26] p-2.5 rounded-lg border border-[#2B4052]">
                        <span className="text-slate-400 block text-[10px]">Grupos Fechados</span>
                        <strong className="text-emerald-400 text-sm font-black">8 Grupos (A-H)</strong>
                      </div>
                      <div className="bg-[#0E1A26] p-2.5 rounded-lg border border-[#2B4052]">
                        <span className="text-slate-400 block text-[10px]">Primeira Rodada</span>
                        <strong className="text-amber-400 text-sm font-black">16 Jogos Divulgados</strong>
                      </div>
                      <div className="bg-[#0E1A26] p-2.5 rounded-lg border border-[#2B4052]">
                        <span className="text-slate-400 block text-[10px]">Total de Vagas</span>
                        <strong className="text-sky-300 text-sm font-black">32 / 32 Preenchidas</strong>
                      </div>
                    </div>
                  </div>

                  <div className="hero-buttons pt-2">
                    <button
                      className="primary-button bg-amber-500 hover:bg-amber-600 text-slate-950 font-black"
                      onClick={() => go('matches')}
                    >
                      <CalendarDays size={18} /> Ver Tabela & Horários de Moçambique <ChevronRight size={17} />
                    </button>
                    <button
                      className="secondary-button inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold"
                      onClick={() => go('grupos')}
                    >
                      <Dices size={18} className="text-amber-400" /> Chaveamento dos Grupos (A-H)
                    </button>
                  </div>
                </div>

                <div className="hero-visual">
                  <img
                    src="/assets/dls-team.jpg"
                    alt="Interface de Dream League Soccer"
                  />
                  <div className="hero-note">
                    <span className="note-label">SITUAÇÃO DO TORNEIO</span>
                    <strong>🎲 Grupos A a H Definidos ✅</strong>
                    <span>32 Equipes Chaveadas na Competição</span>
                  </div>
                  <div className="hero-stamp">
                    <Trophy size={21} />
                    <span>
                      DADOS
                      <br />
                      <b>OFICIAIS</b>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Match Schedule Spotlight */}
            <section className="container section-block space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="eyebrow text-amber-600">Horários de Moçambique (CAT)</span>
                  <h2 className="text-2xl font-black font-display text-slate-900">
                    📅 Tabela de Jogos da 1ª Rodada (08/08)
                  </h2>
                </div>
                <button
                  onClick={() => go('matches')}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200"
                >
                  <span>Ver Todos os 16 Jogos</span>
                  <ChevronRight size={15} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {matches.slice(0, 4).map((m) => (
                  <div
                    key={m.id}
                    onClick={() => go('matches')}
                    className="p-3 bg-white border border-slate-200 hover:border-amber-400 rounded-xl transition-all cursor-pointer shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px] font-black text-slate-500 border-b border-slate-100 pb-1.5">
                      <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded">Grupo {m.group}</span>
                      <span className="text-amber-600 font-bold flex items-center gap-1">
                        <Clock size={12} /> {m.timeCAT} CAT
                      </span>
                    </div>

                    <div className="space-y-1 text-xs font-bold text-slate-800">
                      <div className="flex justify-between items-center">
                        <span className="truncate">{TEAMS.find(t => t.id === m.homeTeamId)?.name}</span>
                        <span className="font-mono font-black text-slate-400">-</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="truncate">{TEAMS.find(t => t.id === m.awayTeamId)?.name}</span>
                        <span className="font-mono font-black text-slate-400">-</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Official Tournament Trailer */}
            <section className="container section-block">
              <TrailerSection />
            </section>

            {/* Seção: Grupos A, B, C, D, E, F, G, H */}
            <section className="container section-block">
              <GroupsSection onSelectTeam={setSelectedTeam} />
            </section>

            {/* Seção: Participantes Confirmados (Cards) */}
            <section className="container section-block">
              <ConfirmedTeamsView onSelectTeam={setSelectedTeam} />
            </section>

            {/* Friendly Announcement Banner on Home */}
            <section className="container section-block">
              <div className="bg-[#162A3D] text-white p-5 sm:p-6 rounded-2xl border border-[#2B4052] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-widest">
                    <ShieldAlert size={16} />
                    <span>Comunicado Oficial · Amistosos Pré-Competição</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black font-display text-white">
                    Resultados da Pré-Temporada & Reportagens
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    ⚠️ Os jogos preparatórios não possuem validade para a pontuação da Copa DLS. Confira todas as reportagens e resultados na aba de Amistosos.
                  </p>
                </div>
                <button
                  className="primary-button bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shrink-0"
                  onClick={() => go('friendlies')}
                >
                  <Newspaper size={17} /> Ver Aba de Amistosos <ChevronRight size={17} />
                </button>
              </div>
            </section>

            <ContactList />
          </>
        )}

        {/* Global Exit/Return Button at the top of inner tabs */}
        {tab !== 'home' && (
          <div className="container pt-5 pb-2">
            <button
              onClick={() => go('home')}
              className="inline-flex items-center gap-2 bg-[#162A3D] hover:bg-[#203a52] text-amber-400 font-extrabold text-xs px-4 py-2.5 rounded-xl border border-[#2B4052] transition-all shadow-md group cursor-pointer"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>⬅️ Voltar ao Menu Principal (Início)</span>
            </button>
          </div>
        )}

        {tab === 'grupos' && (
          <section className="container page-section">
            <GroupsSection onSelectTeam={setSelectedTeam} />
          </section>
        )}

        {tab === 'participantes' && (
          <section className="container page-section">
            <ConfirmedTeamsView onSelectTeam={setSelectedTeam} />
          </section>
        )}

        {tab === 'friendlies' && (
          <section className="container page-section">
            <Title
              eyebrow="Jogos Preparatórios"
              title="📰 Amistosos Pré-Copa"
              onBack={() => go('home')}
            />
            <FriendliesView onSelectTeam={setSelectedTeam} />
          </section>
        )}

        {tab === 'matches' && (
          <section className="container page-section space-y-6">
            <Title
              eyebrow="Tabela Oficial de Jogos & Horários (CAT / Moçambique)"
              title="📅 Programação da Fase de Grupos"
              onBack={() => go('home')}
            />
            <MatchList
              matches={matches}
              timezone={timezone}
              onEditMatch={setEditingMatch}
              onSelectTeam={setSelectedTeam}
              onResetMatches={handleResetMatches}
              onGoHome={() => go('home')}
            />
          </section>
        )}

        {tab === 'table' && (
          <section className="container page-section space-y-6">
            <Title
              eyebrow="Fase de Grupos (A-H)"
              title="📊 Classificação Oficial das Equipes"
              onBack={() => go('home')}
            />
            <GroupStandingsView
              teams={TEAMS}
              matches={matches}
              onSelectTeam={setSelectedTeam}
              onOpenLegend={() => setLegendOpen(true)}
            />
          </section>
        )}

        {tab === 'bracket' && (
          <section className="container page-section space-y-6">
            <Title
              eyebrow="Fase Eliminatória"
              title="⚔️ Chaveamento do Mata-Mata"
              onBack={() => go('home')}
            />
            <KnockoutBracket
              matches={matches}
              timezone={timezone}
              onEditMatch={setEditingMatch}
              onSelectTeam={setSelectedTeam}
            />
          </section>
        )}

        {tab === 'stats' && (
          <section className="container page-section space-y-6">
            <Title
              eyebrow="Estatísticas da Competição"
              title="🏅 Artilharia e Dados Gerais da Copa DLS 26"
              onBack={() => go('home')}
            />
            <StatsLeaderboard
              matches={matches}
              teams={TEAMS}
              onSelectTeam={setSelectedTeam}
            />
          </section>
        )}

        {tab === 'contact' && (
          <section className="container page-section">
            <ContactList />
          </section>
        )}

        {/* Global Exit/Return Button at the bottom of inner tabs */}
        {tab !== 'home' && (
          <div className="container py-8 flex justify-center border-t border-slate-200 mt-8">
            <button
              onClick={() => go('home')}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <Home size={18} />
              <span>Voltar ao Menu Principal</span>
            </button>
          </div>
        )}
      </main>

      <footer>
        <div className="container footer-inner">
          <button className="brand footer-brand" onClick={() => go('home')}>
            <img
              src="https://raw.githubusercontent.com/fornecedor8jm-lang/Dls-26/main/public/copa-dls-26-logo-final.png"
              alt="Copa DLS 26 Logo"
              className="h-10 w-auto object-contain flex-shrink-0"
              referrerPolicy="no-referrer"
            />
            <span>
              <b>COPA</b>
              <strong>
                DLS <em>26</em>
              </strong>
            </span>
          </button>
          <p>Feito por quem joga. Para quem joga. · Horários oficiais em CAT (Moçambique)</p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400 hover:underline font-bold text-xs"
          >
            Envio de resultados via PV (+55 096 99182-1516)
          </a>
        </div>
      </footer>

      {/* Match Editor Modal */}
      {editingMatch && (
        <MatchEditorModal
          match={editingMatch}
          teams={TEAMS}
          onSave={handleSaveMatch}
          onClose={() => setEditingMatch(null)}
        />
      )}

      {/* Legend Modal */}
      {legendOpen && (
        <LegendModal onClose={() => setLegendOpen(false)} />
      )}

      {/* Team Details Modal */}
      {selectedTeam && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedTeam(null)}
        >
          <div
            className="team-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setSelectedTeam(null)}
            >
              <X size={18} />
            </button>
            <Badge team={selectedTeam} large />
            <span className="eyebrow">
              {selectedTeam.group ? `Grupo ${selectedTeam.group} · Confirmado` : 'Status: Confirmado'}
            </span>
            <h2>{selectedTeam.name}</h2>
            <p>
              {selectedTeam.description ||
                'Equipe confirmada na Copa DLS 26.'}
            </p>
            <div className="modal-players">
              <span>Destaques da equipe</span>
              <strong>
                {selectedTeam.keyPlayers?.join(' · ') ||
                  'Dados do elenco não informados'}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
