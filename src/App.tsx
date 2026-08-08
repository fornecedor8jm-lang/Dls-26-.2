import { useState } from 'react';
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  Dices,
  Menu,
  Medal,
  Newspaper,
  Phone,
  Swords,
  Trophy,
  X,
  Users,
  ShieldCheck,
  UserPlus,
  MessageCircle,
  ShieldAlert,
  Send,
  CalendarCheck
} from 'lucide-react';
import { Team } from './types';
import { TEAMS, getTeamById } from './data/teams';
import { FriendliesView } from './components/FriendliesView';
import { TrailerSection } from './components/TrailerSection';
import { ConfirmedTeamsView } from './components/ConfirmedTeamsView';
import { AwaitingDrawState } from './components/AwaitingDrawState';
import { GroupsSection } from './components/GroupsSection';

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
  onAction
}: {
  eyebrow: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action && (
        <button className="text-button" onClick={onAction}>
          {action}
          <ChevronRight size={16} />
        </button>
      )}
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

  const go = (next: Tab) => {
    setTab(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nav = [
    { id: 'home' as Tab, label: 'Início', icon: Trophy },
    { id: 'grupos' as Tab, label: 'Grupos (A-H)', icon: Dices },
    { id: 'participantes' as Tab, label: 'Participantes (20)', icon: Users },
    { id: 'friendlies' as Tab, label: 'Amistosos', icon: Newspaper },
    { id: 'matches' as Tab, label: 'Jogos', icon: CalendarDays },
    { id: 'table' as Tab, label: 'Tabela', icon: BarChart3 },
    { id: 'bracket' as Tab, label: 'Mata-mata', icon: Swords },
    { id: 'stats' as Tab, label: 'Números', icon: Medal },
    { id: 'contact' as Tab, label: 'Contato PV', icon: MessageCircle }
  ];

  return (
    <div className="app-shell">
      {/* Announcement Banner */}
      <div className="announcement">
        <div className="container announcement-inner">
          <span>
            🏆 <b>COPA DLS 2026</b> · Portal Oficial
          </span>
          <span className="announcement-right">
            🎲 <b>GRUPOS A, B, C, D, E, F DEFINIDOS</b> · G, H Sorteando
            <span className="live-pill bg-amber-500 text-slate-950 font-black ml-2">24/32 VAGAS</span>
          </span>
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
                {label}
              </button>
            ))}
          </nav>
          <div className="header-actions">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs py-2 px-3 rounded-lg transition-colors"
            >
              <MessageCircle size={15} /> Chamar no PV
            </a>
            <button
              className="icon-button menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

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
                    Definição oficial dos Grupos A, B, C, D, E e F! Confira as 24 equipes sorteadas e acompanhe as vagas nos Grupos G e H.
                  </p>

                  {/* Status Box */}
                  <div className="bg-[#162A3D]/90 border border-[#2B4052] p-4 rounded-xl space-y-3 mt-4">
                    <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
                      <Dices size={16} />
                      <span>Status do Campeonato: Grupos A, B, C, D, E, F Definidos ✅</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-1">
                      <div className="bg-[#0E1A26] p-2.5 rounded-lg border border-[#2B4052]">
                        <span className="text-slate-400 block text-[10px]">Grupos Fechados</span>
                        <strong className="text-emerald-400 text-sm font-black">6 Grupos (A-F)</strong>
                      </div>
                      <div className="bg-[#0E1A26] p-2.5 rounded-lg border border-[#2B4052]">
                        <span className="text-slate-400 block text-[10px]">Aguardando Sorteio</span>
                        <strong className="text-amber-400 text-sm font-black">2 Grupos (G-H)</strong>
                      </div>
                      <div className="bg-[#0E1A26] p-2.5 rounded-lg border border-[#2B4052]">
                        <span className="text-slate-400 block text-[10px]">Total de Vagas</span>
                        <strong className="text-sky-300 text-sm font-black">32 Equipes</strong>
                      </div>
                    </div>
                  </div>

                  <div className="hero-buttons pt-2">
                    <button
                      className="primary-button bg-amber-500 hover:bg-amber-600 text-slate-950 font-black"
                      onClick={() => go('grupos')}
                    >
                      <Dices size={18} /> Ver Grupos A-H <ChevronRight size={17} />
                    </button>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="secondary-button inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold"
                    >
                      <MessageCircle size={18} className="text-emerald-400" /> Enviar Resultado / PV
                    </a>
                  </div>
                </div>

                <div className="hero-visual">
                  <img
                    src="/assets/dls-team.jpg"
                    alt="Interface de Dream League Soccer"
                  />
                  <div className="hero-note">
                    <span className="note-label">SITUAÇÃO DO TORNEIO</span>
                    <strong>🎲 Grupos A, B, C, D, E, F ✅</strong>
                    <span>24 Equipes Chaveadas nos Grupos</span>
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

            {/* Seção: Próximas Etapas */}
            <section className="container section-block">
              <div className="bg-[#162A3D] border border-[#2B4052] p-6 sm:p-8 rounded-2xl text-white space-y-6 shadow-xl">
                <div className="space-y-1">
                  <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest inline-flex items-center gap-1.5">
                    <CalendarCheck size={16} /> Planejamento Oficial
                  </span>
                  <h2 className="text-2xl font-black font-display">Próximas Etapas da Copa DLS 2026</h2>
                  <p className="text-slate-300 text-sm">
                    Acompanhe o fluxo oficial de organização antes da bola rolar.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#0E1A26] p-5 rounded-xl border border-emerald-500/50 space-y-2 relative">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-sm">
                      1
                    </div>
                    <strong className="text-white text-base block font-extrabold">
                      ✅ Grupos A, B, C, D Definidos
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Sorteio concluído para as primeiras 16 equipes. Grupos E, F, G e H em andamento.
                    </p>
                  </div>

                  <div className="bg-[#0E1A26] p-5 rounded-xl border border-[#2B4052] space-y-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">
                      2
                    </div>
                    <strong className="text-white text-base block font-extrabold">
                      🎲 Sorteio dos Grupos E a H
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Preenchimento das 12 vagas restantes para fechar o chaveamento completo de 32 participantes.
                    </p>
                  </div>

                  <div className="bg-[#0E1A26] p-5 rounded-xl border border-[#2B4052] space-y-2">
                    <div className="w-8 h-8 rounded-full bg-sky-500 text-slate-950 font-black flex items-center justify-center text-sm">
                      3
                    </div>
                    <strong className="text-white text-base block font-extrabold">
                      📅 Tabela e Confrontos
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Lançamento da tabela de partidas e início dos jogos com envio dos placares via PV.
                    </p>
                  </div>
                </div>
              </div>
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
            <Title eyebrow="Jogos Preparatórios" title="📰 Amistosos Pré-Copa" />
            <FriendliesView onSelectTeam={setSelectedTeam} />
          </section>
        )}

        {tab === 'matches' && (
          <section className="container page-section">
            <AwaitingDrawState
              title="Calendário e Jogos da Copa DLS 2026"
              description="A lista de partidas da fase de grupos e horários das rodadas será divulgada imediatamente após a finalização do sorteio de todos os grupos."
            />
          </section>
        )}

        {tab === 'table' && (
          <section className="container page-section">
            <AwaitingDrawState
              title="Tabela de Classificação em Breve"
              description="A pontuação, saldo de gols e a posição de cada grupo serão habilitadas assim que a competição for iniciada."
            />
          </section>
        )}

        {tab === 'bracket' && (
          <section className="container page-section">
            <AwaitingDrawState
              title="Chaveamento do Mata-Mata"
              description="O diagrama das quartas de final, semifinais e grande final será preenchido após o encerramento da fase de grupos."
            />
          </section>
        )}

        {tab === 'stats' && (
          <section className="container page-section">
            <Title
              eyebrow="Números da competição"
              title="Estatísticas DLS 2026"
            />
            <div className="stats-hero">
              <div>
                <span className="eyebrow">Aguardando Início Oficial</span>
                <h3>
                  20
                  <br />
                  <em>equipes confirmadas</em>
                </h3>
              </div>
              <BarChart3 size={48} />
            </div>
            <div className="summary-grid">
              <div>
                <strong>20</strong>
                <span>Times Confirmados</span>
              </div>
              <div>
                <strong>12</strong>
                <span>Vagas Abertas</span>
              </div>
              <div>
                <strong>32</strong>
                <span>Vagas Totais</span>
              </div>
            </div>
          </section>
        )}

        {tab === 'contact' && (
          <section className="container page-section">
            <ContactList />
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
          <p>Feito por quem joga. Para quem joga.</p>
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
              {selectedTeam.group ? `Grupo ${selectedTeam.group} · Confirmado` : 'Status: Confirmado (Aguardando Sorteio)'}
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
