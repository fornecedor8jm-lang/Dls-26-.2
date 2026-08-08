import { Team } from '../types';
import { TEAMS } from '../data/teams';
import { ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';

interface GroupsSectionProps {
  onSelectTeam?: (team: Team) => void;
}

const GROUPS_DATA = [
  {
    name: 'GRUPO A',
    status: 'CONFIRMED',
    teams: [
      { pos: '1º', teamId: 'bayern' },
      { pos: '2º', teamId: 'bayer_munchen' },
      { pos: '3º', teamId: 'babymaxx' },
      { pos: '4º', teamId: 'sporting' },
    ],
  },
  {
    name: 'GRUPO B',
    status: 'CONFIRMED',
    teams: [
      { pos: '1º', teamId: 'curacao' },
      { pos: '2º', teamId: 'realmadrid' },
      { pos: '3º', teamId: 'levante' },
      { pos: '4º', teamId: 'dreamsimbe' },
    ],
  },
  {
    name: 'GRUPO C',
    status: 'CONFIRMED',
    teams: [
      { pos: '1º', teamId: 'dominator' },
      { pos: '2º', teamId: 'argentina' },
      { pos: '3º', teamId: 'labamba' },
      { pos: '4º', teamId: 'yuriman' },
    ],
  },
  {
    name: 'GRUPO D',
    status: 'CONFIRMED',
    teams: [
      { pos: '1º', teamId: 'soda' },
      { pos: '2º', teamId: 'zanix' },
      { pos: '3º', teamId: 'luck' },
      { pos: '4º', teamId: 'adra' },
    ],
  },
  {
    name: 'GRUPO E',
    status: 'CONFIRMED',
    teams: [
      { pos: '1º', teamId: 'celeste' },
      { pos: '2º', teamId: 'bluelock' },
      { pos: '3º', teamId: 'realtiktak' },
      { pos: '4º', teamId: 'supergiants' },
    ],
  },
  {
    name: 'GRUPO F',
    status: 'CONFIRMED',
    teams: [
      { pos: '1º', teamId: 'liverpool' },
      { pos: '2º', teamId: 'sc_ninjas' },
      { pos: '3º', teamId: 'levante_f' },
      { pos: '4º', teamId: 'botafogo' },
    ],
  },
  {
    name: 'GRUPO G',
    status: 'CONFIRMED',
    teams: [
      { pos: '1º', teamId: 'madridista' },
      { pos: '2º', teamId: 'villareal' },
      { pos: '3º', teamId: 'barcelona' },
      { pos: '4º', teamId: 'barca_fc' },
    ],
  },
  {
    name: 'GRUPO H',
    status: 'CONFIRMED',
    teams: [
      { pos: '1º', teamId: 'mocambique' },
      { pos: '2º', teamId: 'b_munich' },
      { pos: '3º', teamId: 'geovane' },
      { pos: '4º', teamId: 'ovelhas_majestosas' },
    ],
  },
];

const WHATSAPP_LINK = 'https://wa.me/55096991821516';

export function GroupsSection({ onSelectTeam }: GroupsSectionProps) {
  const getTeam = (teamId?: string) => {
    if (!teamId) return null;
    return TEAMS.find((t) => t.id === teamId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="eyebrow text-amber-600">Sorteio Oficial Concluído</span>
          <h2 className="text-2xl font-black font-display text-slate-900">
            Fase de Grupos · Copa DLS 2026 (A-H)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 pt-1">
            Todos os 8 Grupos (A, B, C, D, E, F, G, H) com as 32 equipes 100% definidas e chaveadas!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1.5 rounded-lg border border-emerald-300">
            <ShieldCheck size={14} /> 8 Grupos Definidos ✅
          </span>
          <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-900 text-xs font-black px-3 py-1.5 rounded-lg border border-sky-300">
            <Sparkles size={14} /> 32 Times Confirmados
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {GROUPS_DATA.map((groupData) => {
          const isConfirmed = groupData.status === 'CONFIRMED';

          return (
            <div
              key={groupData.name}
              className="bg-white border border-slate-200 hover:border-amber-400 rounded-xl transition-all overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              {/* Group Card Header */}
              <div className="p-3.5 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 font-black font-display text-base">
                  <span className="text-amber-400">
                    {groupData.name === 'GRUPO A' && '🅰️'}
                    {groupData.name === 'GRUPO B' && '🅱️'}
                    {groupData.name === 'GRUPO C' && '🅲'}
                    {groupData.name === 'GRUPO D' && '🅳'}
                    {groupData.name === 'GRUPO E' && '🅴'}
                    {groupData.name === 'GRUPO F' && '🅵'}
                    {groupData.name === 'GRUPO G' && '🅶'}
                    {groupData.name === 'GRUPO H' && '🅷'}
                  </span>
                  <span>{groupData.name}</span>
                </div>

                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck size={11} /> Definido ✅
                </span>
              </div>

              {/* Group Teams List */}
              <div className="p-3.5 space-y-2 flex-1">
                {groupData.teams.map((item) => {
                  const team = getTeam(item.teamId);

                  if (team) {
                    return (
                      <div
                        key={team.id}
                        onClick={() => onSelectTeam && onSelectTeam(team)}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-[11px] font-black text-slate-400 w-4 shrink-0">
                            {item.pos}
                          </span>
                          <div
                            className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs"
                            style={{
                              background: `linear-gradient(135deg, ${team.primaryColor}, ${team.secondaryColor})`
                            }}
                          >
                            {team.shortName.slice(0, 2)}
                          </div>
                          <strong className="text-xs font-bold text-slate-900 group-hover:text-amber-600 truncate">
                            {team.name}
                          </strong>
                        </div>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-amber-500 shrink-0" />
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Footer call to action */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center flex items-center justify-between px-3.5 text-[11px] font-bold text-slate-500">
                <span>4 Clubes Chaveados</span>
                <span className="text-emerald-600 font-black">Chave Ok ✅</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
