import { Team } from '../types';
import { getTeamById } from './teams';

export interface FriendlyMatch {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  date: string;
  type: 'SINGLE' | 'LEG_1' | 'LEG_2';
  aggregateScore?: string;
  title: string;
  report: string;
  highlights: string[];
}

export const FRIENDLY_MATCHES: FriendlyMatch[] = [
  {
    id: 'f_bayern_labamba_1',
    homeTeamId: 'bayern',
    awayTeamId: 'labamba',
    homeScore: 2,
    awayScore: 0,
    date: '2026-08-05',
    type: 'LEG_1',
    title: 'Bayern se impõe no jogo de ida',
    report:
      'Em um confronto tático e eficiente, o FC Bayern München abriu a série preparatória com uma vitória segura por 2 a 0 sobre o FC Labamba. A defesa bavarese não concedeu espaços para as jogadas individuais do adversário.',
    highlights: ['Defesa sólida do Bayern', 'Domínio de posse de bola', 'Gols cirúrgicos nos dois tempos']
  },
  {
    id: 'f_bayern_labamba_2',
    homeTeamId: 'bayern',
    awayTeamId: 'labamba',
    homeScore: 4,
    awayScore: 1,
    date: '2026-08-06',
    type: 'LEG_2',
    aggregateScore: 'Bayern 6 x 1 Labamba',
    title: 'Goleada bavarese no jogo de volta fecha agregado em 6x1',
    report:
      'No duelo de volta, o FC Bayern München confirmou sua força ofensiva ao vencer por 4 a 1 o FC Labamba. Com alta pressão no ataque, o time alemão construiu o resultado com facilidade.',
    highlights: ['Ataque avassalador', 'Chutes de fora da área', 'Agregado final de 6x1']
  },
  {
    id: 'f_babymaxx_labamba',
    homeTeamId: 'babymaxx',
    awayTeamId: 'labamba',
    homeScore: 3,
    awayScore: 0,
    date: '2026-08-06',
    type: 'SINGLE',
    title: 'Baby Maxx vence Labamba com autoridade',
    report:
      'Os jovens prodígios do Baby Maxx demonstraram grande entrosamento e venceram o FC Labamba por 3 a 0 em partida única. O ritmo acelerado foi o diferencial para a vitória indiscutível.',
    highlights: ['Transições em velocidade', 'Triangulações ofensivas', 'Clean sheet garantido']
  },
  {
    id: 'f_babymaxx_celeste',
    homeTeamId: 'babymaxx',
    awayTeamId: 'celeste',
    homeScore: 5,
    awayScore: 1,
    date: '2026-08-07',
    type: 'SINGLE',
    title: 'Show ofensivo do Baby Maxx com 5 a 1 sobre o FC Celeste',
    report:
      'Em noite inspirada de seus atacantes, o Baby Maxx aplicou a maior goleada da pré-temporada ao bater o FC Celeste por 5 a 1. A equipe mostrou que chega forte para o Grupo D.',
    highlights: ['5 gols marcados', 'Pressionamento alto sem dar chances', 'Atuação de gala do setor ofensivo']
  },
  {
    id: 'f_curacao_dominator',
    homeTeamId: 'curacao',
    awayTeamId: 'dominator',
    homeScore: 1,
    awayScore: 2,
    date: '2026-08-07',
    type: 'SINGLE',
    title: 'Dominator supera Curaçao em teste equilibrado',
    report:
      'Num jogo bastante movimentado e com chances para os dois lados, o Dominator conseguiu a virada por 2 a 1 sobre a seleção de Curaçao, mostrando poder de reação antes do início da Copa.',
    highlights: ['Virada emocionante', 'Duelo físico no meio-campo', 'Excelente teste preparatório']
  }
];

export const OFFICIAL_COMMUNIQUE = {
  title: 'COMUNICADO OFICIAL | AMISTOSOS PRÉ-COMPETIÇÃO',
  subtitle: 'Organização da Copa DLS 26',
  warningBanner:
    '⚠️ AMISTOSOS PRÉ-COPA: As partidas desta seção são exclusivamente preparatórias. Seus resultados, gols e pontos não são contabilizados na classificação oficial da Copa DLS.',
  text: [
    'A organização da Copa DLS informa que os jogos realizados antes do início oficial da competição são considerados amistosos preparatórios.',
    '⚠️ Os resultados dos amistosos não possuem qualquer validade para a classificação da Copa DLS.'
  ],
  rules: [
    'Os pontos obtidos não serão contabilizados.',
    'Os gols marcados não serão considerados para o saldo de gols da competição.',
    'Os resultados não terão influência sobre a classificação dos grupos.',
    'Os amistosos não determinarão classificação ou eliminação de qualquer equipe.'
  ],
  formatTitle: '🔄 FORMATO DOS AMISTOSOS',
  formatRules: [
    'Os confrontos preparatórios poderão ser realizados em jogo único ou em partidas de ida e volta, desde que haja concordância entre as equipes envolvidas.',
    'A realização de uma segunda partida não será obrigatória.',
    '📌 Atenção: os resultados acima pertencem exclusivamente ao período de preparação e não fazem parte da competição oficial.',
    '🏆 A pontuação, os gols, o saldo de gols e os demais critérios de classificação passarão a ser considerados somente a partir do início oficial da Copa DLS.'
  ]
};
