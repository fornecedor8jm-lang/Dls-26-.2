import { useState, useEffect } from 'react';
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  Trophy,
  X,
  Users,
  ShieldCheck,
  MessageCircle,
  ShieldAlert,
  Clock,
  Globe,
  ArrowLeft,
  Menu,
  Newspaper
} from 'lucide-react';
import { Match, Team, TimezoneMode } from './types';
import { TEAMS } from './data/teams';
import { FriendliesView } from './components/FriendliesView';
import { TrailerSection } from './components/TrailerSection';
import { ConfirmedTeamsView } from './components/ConfirmedTeamsView';
import { MatchList } from './components/MatchList';
import { GroupStandingsView } from './components/GroupStandings';
import { LegendModal } from './components/LegendModal';
import { MatchEditorModal } from './components/MatchEditorModal';
import {
  loadMatchesFromStorage,
  saveMatchesToStorage,
  resetMatchesStorage
} from './utils/storage';

type Tab = 'home' | 'matches' | 'table' | 'teams' | 'contact' | 'friendlies';

const WHATSAPP_LINK = 'https://wa.me/55096991821516';

const PLAYER_CONTACTS = [
  { team: 'FC Labamba', number: '877559587', href: 'tel:+258877559587', type: 'PHONE', actionLabel: '📞 Ligar por Telefone' },
  { team: 'FC Celeste', number: '859136077', href: 'tel:+258859136077', type: 'PHONE', actionLabel: '📞 Ligar por Telefone' },
  { team: 'FC Bayern München', number: '840444822', href: 'tel:+258840444822', type: 'PHONE', actionLabel: '📞 Ligar por Telefone' },
  { team: 'Fundador (Envio de Placares / PV)', number: '+55 096 99182-1516', href: WHATSAPP_LINK, type: 'WHATSAPP', actionLabel: '💬 Abrir Conversa no WhatsApp' }
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
  onBack
}: {
  eyebrow: string;
  title: string;
  onBack?: () => void;
}) {
  return (
    <div className="section-title flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 bg-[#162A3D] hover:bg-[#203a52] text-amber-400 font-extrabold text-xs px-3.5 py-2 rounded-xl border border-[#2B4052] transition-all shadow-xs cursor-pointer shrink-0"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao Início</span>
        </button>
      )}
    </div>
  );
}

function ContactList() {
  return (
    <section className="contacts-section space-y-5">
      <div className="section-title">
        <div>
          <span className="eyebrow">Atendimento & Inscrições</span>
          <h2>Contato dos Jogadores e Fundador</h2>
        </div>
        <span className="contacts-note">Inscrições & Envio de Resultados</span>
      </div>

      {/* Primary Founder Contact Banner */}
      <div className="bg-[#162A3D] text-white p-5 rounded-2xl border border-[#2B4052] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1.5">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest inline-flex items-center gap-1.5">
            <MessageCircle size={16} /> Envio de Placares no PV
          </span>
          <h3 className="text-lg sm:text-xl font-black font-display">
            WhatsApp Oficial da Administração da Copa DLS 26
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Os resultados dos jogos devem ser enviados via PV para o fundador (+55 096 99182-1516), que atualizará a tabela oficial do torneio.
          </p>
        </div>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm py-3 px-5 rounded-xl inline-flex items-center gap-2 transition-colors shrink-0 shadow-md w-full md:w-auto justify-center"
        >
          <MessageCircle size={20} /> Entrar em Contato no WhatsApp
        </a>
      </div>

      <div className="contact-grid">
        {PLAYER_CONTACTS.map((contact) => (
          <a
            className="contact-card hover:border-amber-400 transition-all cursor-pointer group"
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : '_self'}
            rel="noreferrer"
            key={contact.number}
          >
            <span className="contact-icon">
              <MessageCircle size={18} className="text-emerald-500" />
            </span>
            <span>
              <strong>{contact.team}</strong>
              <small className="block text-slate-500 text-[11px] font-semibold mt-0.5">{contact.actionLabel}</small>
            </span>
            <b className="font-mono text-sm">{contact.number}</b>
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

  // Exactly 5 main mobile navigation options
  const nav = [
    { id: 'home' as Tab, label: 'INÍCIO', icon: Trophy },
    { id: 'matches' as Tab, label: 'JOGOS', icon: CalendarDays },
    { id: 'table' as Tab, label: 'TABELA', icon: BarChart3 },
    { id: 'teams' as Tab, label: 'TIMES', icon: Users },
    { id: 'contact' as Tab, label: 'CONTATO', icon: MessageCircle }
  ];

  const finishedMatches = matches.filter((m) => m.status === 'FINISHED');

  return (
    <div className="app-shell">
      {/* Announcement Banner */}
      <div className="announcement">
        <div className="container announcement-inner flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            🏆 <b>COPA DLS 2026</b> · <span>Chaveamento dos 8 Grupos Concluído!</span>
          </div>
          <div className="announcement-right flex items-center gap-3">
            <span className="live-pill bg-emerald-500 text-slate-950 font-black">32/32 TIMES CONFIRMADOS ✅</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="site-header">
        <div className="container header-inner flex items-center justify-between">
          <button className="brand" onClick={() => go('home')}>
            <img
              src="https://raw.githubusercontent.com/fornecedor8jm-lang/Dls-26/main/public/copa-dls-26-logo-final.png"
              alt="Copa DLS 26 Logo"
              className="h-9 sm:h-11 w-auto object-contain flex-shrink-0"
              referrerPolicy="no-referrer"
            />
            <span>
              <b>COPA</b>
              <strong>
                DLS <em>26</em>
              </strong>
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#162A3D] text-white border border-[#2B4052] flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} className="text-amber-400" /> : <Menu size={20} className="text-amber-400" />}
            <span className="text-[11px] font-extrabold uppercase">{menuOpen ? 'Fechar' : 'Menu'}</span>
          </button>

          {/* 5 Core Navigation Tabs */}
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
            <span className="hidden sm:inline">Horários:</span>
            <span className="text-amber-400 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              {timezone === 'CAT' ? '🇲🇿 Moçambique (CAT)' : '🇧🇷 Brasília (BRT)'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-bold">
            <Globe size={13} className="text-slate-400" />
            <button
              onClick={() => setTimezone(timezone === 'CAT' ? 'BRT' : 'CAT')}
              className="px-2.5 py-1 rounded-lg bg-[#162A3D] hover:bg-[#203a52] text-amber-300 transition-colors border border-[#2B4052] font-black text-[11px] cursor-pointer"
            >
              Mudar p/ {timezone === 'CAT' ? '🇧🇷 BRT' : '🇲🇿 CAT'}
            </button>
          </div>
        </div>
      </div>

      <main>
        {tab === 'home' && (
          <>
            {/* Banner / Hero Principal Resumo */}
            <section className="hero">
              <div className="container hero-grid">
                <div className="hero-copy space-y-3">
                  <span className="kicker">
                    <span className="kicker-line" /> O campeonato da sua liga
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
                    🏆 COPA DLS 2026
                  </h1>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    Acompanhe os próximos confrontos, a classificação atualizada dos 8 grupos e a lista oficial das 32 equipes.
                  </p>

                  {/* Status Box */}
                  <div className="bg-[#162A3D]/90 border border-[#2B4052] p-3.5 rounded-xl space-y-2 mt-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
                      <ShieldCheck size={16} />
                      <span>32 Equipes Confirmadas & Grupos A-H Definidos ✅</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-1">
                      <div className="bg-[#0E1A26] p-2 rounded-lg border border-[#2B4052]">
                        <span className="text-slate-400 block text-[10px]">Grupos</span>
                        <strong className="text-emerald-400 text-sm font-black">8 (A-H)</strong>
                      </div>
                      <div className="bg-[#0E1A26] p-2 rounded-lg border border-[#2B4052]">
                        <span className="text-slate-400 block text-[10px]">Realizadas</span>
                        <strong className="text-amber-400 text-sm font-black">{finishedMatches.length} Partidas</strong>
                      </div>
                      <div className="bg-[#0E1A26] p-2 rounded-lg border border-[#2B4052]">
                        <span className="text-slate-400 block text-[10px]">Clubes</span>
                        <strong className="text-sky-300 text-sm font-black">32 Times</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hero-visual">
                  <img
                    src="/assets/dls-team.jpg"
                    alt="Interface de Dream League Soccer"
                  />
                  <div className="hero-note">
                    <span className="note-label">COMPETIÇÃO</span>
                    <strong>🎲 32 Clubes Chaveados ✅</strong>
                    <span>8 Grupos de A a H</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Mobile Directives Hub: 3 Primary Actions */}
            <section className="container py-5 space-y-3">
              <div className="bg-[#162A3D] border border-[#2B4052] rounded-2xl p-4 text-white">
                <span className="text-amber-400 font-black text-xs uppercase tracking-wider block mb-1">
                  📱 Navegação Rápida
                </span>
                <h2 className="text-lg font-black font-display text-white">
                  O que você deseja consultar?
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Acesse cada conteúdo em seu único local oficial:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. Ver Jogos */}
                <div
                  onClick={() => go('matches')}
                  className="bg-white border-2 border-slate-200 hover:border-amber-500 p-4 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0">
                      <CalendarDays size={22} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm font-display">
                        1. Próximos Jogos & Horários
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Ver tabela de partidas completa
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-amber-500 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>

                {/* 2. Ver Tabela */}
                <div
                  onClick={() => go('table')}
                  className="bg-white border-2 border-slate-200 hover:border-emerald-500 p-4 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0">
                      <BarChart3 size={22} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm font-display">
                        2. Classificação dos Grupos
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Pontuação, vitórias e saldo (SG)
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-emerald-500 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>

                {/* 3. Ver Times */}
                <div
                  onClick={() => go('teams')}
                  className="bg-white border-2 border-slate-200 hover:border-sky-500 p-4 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-sky-500/15 text-sky-600 flex items-center justify-center shrink-0">
                      <Users size={22} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm font-display">
                        3. Times Participantes
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Ver os 32 clubes por grupo
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-sky-500 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </section>

            {/* Concise Matches Preview (MAX 2 FEATURED MATCHES) */}
            <section className="container section-block space-y-3 pt-0">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <span className="eyebrow text-amber-600">Resumo da Rodada</span>
                  <h2 className="text-lg sm:text-xl font-black font-display text-slate-900">
                    ⚽ Próximos Jogos em Destaque
                  </h2>
                </div>
                <button
                  onClick={() => go('matches')}
                  className="inline-flex items-center gap-1 text-xs font-black text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 cursor-pointer shrink-0"
                >
                  <span>Ver todos os jogos</span>
                  <ChevronRight size={15} />
                </button>
              </div>

              {/* Show maximum 2 featured matches */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {matches.slice(0, 2).map((m) => {
                  const home = TEAMS.find((t) => t.id === m.homeTeamId);
                  const away = TEAMS.find((t) => t.id === m.awayTeamId);
                  return (
                    <div
                      key={m.id}
                      onClick={() => go('matches')}
                      className="p-3.5 bg-white border border-slate-200 hover:border-amber-400 rounded-xl transition-all cursor-pointer shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between text-[11px] font-black text-slate-500 border-b border-slate-100 pb-1.5">
                        <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded">Grupo {m.group}</span>
                        <span className="text-amber-600 font-bold flex items-center gap-1">
                          <Clock size={12} /> {m.timeCAT} CAT
                        </span>
                      </div>

                      <div className="space-y-1 text-xs font-bold text-slate-800">
                        <div className="flex justify-between items-center">
                          <span className="truncate">{home?.name}</span>
                          <span className="font-mono font-black text-slate-900">
                            {m.status === 'FINISHED' ? m.homeScore : 'VS'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="truncate">{away?.name}</span>
                          <span className="font-mono font-black text-slate-900">
                            {m.status === 'FINISHED' ? m.awayScore : ''}
                          </span>
                        </div>
                      </div>

                      {m.status === 'SCHEDULED' && (
                        <div className="text-[10px] text-slate-400 font-extrabold uppercase text-center pt-1 border-t border-slate-50">
                          Aguardando início
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Trailer Section */}
            <section className="container section-block pt-0">
              <TrailerSection />
            </section>

            {/* Friendlies Notice Banner */}
            <section className="container section-block pt-0">
              <div className="bg-[#162A3D] text-white p-5 rounded-2xl border border-[#2B4052] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-widest">
                    <ShieldAlert size={16} />
                    <span>Amistosos Pré-Copa</span>
                  </div>
                  <h3 className="text-lg font-black font-display text-white">
                    Resultados da Pré-Temporada
                  </h3>
                  <p className="text-xs text-slate-300">
                    Os amistosos não pontuam na tabela oficial. Acesse os resultados preparatórios.
                  </p>
                </div>
                <button
                  className="primary-button bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shrink-0 cursor-pointer text-xs"
                  onClick={() => go('friendlies')}
                >
                  <Newspaper size={16} /> Ver Amistosos <ChevronRight size={16} />
                </button>
              </div>
            </section>

            <ContactList />
          </>
        )}

        {/* Global Return Button for Sub-pages */}
        {tab !== 'home' && (
          <div className="container pt-4 pb-1">
            <button
              onClick={() => go('home')}
              className="inline-flex items-center gap-2 bg-[#162A3D] hover:bg-[#203a52] text-amber-400 font-extrabold text-xs px-3.5 py-2 rounded-xl border border-[#2B4052] transition-all shadow-xs group cursor-pointer"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Voltar ao Menu Principal</span>
            </button>
          </div>
        )}

        {/* JOGOS PAGE */}
        {tab === 'matches' && (
          <section className="container page-section space-y-5">
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

        {/* TABELA PAGE */}
        {tab === 'table' && (
          <section className="container page-section space-y-5">
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

        {/* TIMES PAGE (UNIFIED PARTICIPANTES & GRUPOS) */}
        {tab === 'teams' && (
          <section className="container page-section space-y-5">
            <Title
              eyebrow="32 Clubes Confirmados"
              title="🛡️ Participantes & Grupos da Copa DLS 26"
              onBack={() => go('home')}
            />
            <ConfirmedTeamsView onSelectTeam={setSelectedTeam} />
          </section>
        )}

        {/* CONTATO PAGE */}
        {tab === 'contact' && (
          <section className="container page-section">
            <ContactList />
          </section>
        )}

        {/* FRIENDLIES PAGE (SECONDARY) */}
        {tab === 'friendlies' && (
          <section className="container page-section space-y-5">
            <Title
              eyebrow="Jogos Preparatórios"
              title="📰 Amistosos Pré-Copa"
              onBack={() => go('home')}
            />
            <FriendliesView onSelectTeam={setSelectedTeam} />
          </section>
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
          <p>
            Copa DLS 2026 · Horários exibidos em{' '}
            <b>{timezone === 'CAT' ? 'CAT (Moçambique)' : 'BRT (Brasília)'}</b>
          </p>
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
