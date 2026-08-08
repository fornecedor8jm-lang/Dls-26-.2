import { Team } from '../types';

export const TEAMS: Team[] = [
  // ================= GRUPO A ✅ =================
  {
    id: 'bayern',
    name: 'FC Bayern',
    shortName: 'BAY',
    group: 'A',
    primaryColor: '#DC052D',
    secondaryColor: '#0066B2',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: '1º do Grupo A. Gigante tradicional na busca pelo título na Copa DLS 26.',
    keyPlayers: ['Lewandowski', 'Müller', 'Sané', 'Neuer']
  },
  {
    id: 'bayer_munchen',
    name: 'Bayern de Munchen',
    shortName: 'BMU',
    group: 'A',
    primaryColor: '#EF4444',
    secondaryColor: '#1E293B',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: '2º do Grupo A. Potência tática com futebol moderno e pressão alta.',
    keyPlayers: ['Musiala', 'Kimmich', 'Coman', 'Upamecano']
  },
  {
    id: 'babymaxx',
    name: 'Baby Maxxx',
    shortName: 'BMX',
    group: 'A',
    primaryColor: '#EC4899',
    secondaryColor: '#8B5CF6',
    badgeSymbol: 'Star',
    badgeType: 'star',
    description: '3º do Grupo A. Jovens prodígios prontos para surpreender na Copa DLS 26.',
    keyPlayers: ['Maxx', 'Endrick', 'Yamal', 'Gavi']
  },
  {
    id: 'sporting',
    name: 'Sporting',
    shortName: 'SPO',
    group: 'A',
    primaryColor: '#15803D',
    secondaryColor: '#FFFFFF',
    badgeSymbol: 'Lion',
    badgeType: 'lion',
    description: '4º do Grupo A. Garra leonina, disciplina tática e forte presença física.',
    keyPlayers: ['Gyökeres', 'Pote', 'Inácio', 'Adán']
  },

  // ================= GRUPO B ✅ =================
  {
    id: 'curacao',
    name: 'Curaçao',
    shortName: 'CUR',
    group: 'B',
    primaryColor: '#1E40AF',
    secondaryColor: '#FACC15',
    badgeSymbol: 'Eagle',
    badgeType: 'eagle',
    description: '1º do Grupo B. Seleção caribenha de alta velocidade e jogadas aéreas mortais.',
    keyPlayers: ['Bacuna', 'Kastaneer', 'Gorré', 'Room']
  },
  {
    id: 'realmadrid',
    name: 'Real Madrid CF',
    shortName: 'RMA',
    group: 'B',
    primaryColor: '#F59E0B',
    secondaryColor: '#FFFFFF',
    badgeSymbol: 'Crown',
    badgeType: 'crown',
    description: '2º do Grupo B. Tradição e mentalidade vencedora no futebol digital.',
    keyPlayers: ['Vinicius Jr', 'Bellingham', 'Rodrygo', 'Valverde']
  },
  {
    id: 'levante',
    name: 'FC Levante',
    shortName: 'LEV',
    group: 'B',
    primaryColor: '#881337',
    secondaryColor: '#1E3A8A',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: '3º do Grupo B. Resiliência e contra-ataques cirúrgicos.',
    keyPlayers: ['Morales', 'Campaña', 'Roger Martí', 'Aitor']
  },
  {
    id: 'dreamsimbe',
    name: 'Dream Simbe',
    shortName: 'DSB',
    group: 'B',
    primaryColor: '#8B5CF6',
    secondaryColor: '#4C1D95',
    badgeSymbol: 'Crown',
    badgeType: 'crown',
    description: '4º do Grupo B. Elenco dos sonhos em busca de construir sua própria história no torneio.',
    keyPlayers: ['Simbe', 'Neymar', 'Messi', 'Salah']
  },

  // ================= GRUPO C ✅ =================
  {
    id: 'dominator',
    name: 'Dominator',
    shortName: 'DOM',
    group: 'C',
    primaryColor: '#A855F7',
    secondaryColor: '#F59E0B',
    badgeSymbol: 'Crown',
    badgeType: 'crown',
    description: '1º do Grupo C. Equipe tática e incansável pronta para dominar o torneio.',
    keyPlayers: ['Dominik', 'Kaiser', 'Vargas', 'Ochoa']
  },
  {
    id: 'argentina',
    name: 'Argentina FC',
    shortName: 'ARG',
    group: 'C',
    primaryColor: '#7DD3FC',
    secondaryColor: '#FFFFFF',
    badgeSymbol: 'Star',
    badgeType: 'star',
    description: '2º do Grupo C. Raça, paixão e futebol coletivo de altíssimo nível.',
    keyPlayers: ['Messi', 'Di Maria', 'Lautaro', 'Dibu Martínez']
  },
  {
    id: 'labamba',
    name: 'FC Labamba',
    shortName: 'LAB',
    group: 'C',
    primaryColor: '#F97316',
    secondaryColor: '#BE185D',
    badgeSymbol: 'Fire',
    badgeType: 'fire',
    description: '3º do Grupo C. Futebol quente com muita dancinha e gols espetaculares.',
    keyPlayers: ['Ritchie Bamba', 'Samba Jr', 'Ronaldinho', 'Richarlison']
  },
  {
    id: 'yuriman',
    name: 'Yuri Man',
    shortName: 'YUR',
    group: 'C',
    primaryColor: '#C084FC',
    secondaryColor: '#4C1D95',
    badgeSymbol: 'Crown',
    badgeType: 'crown',
    description: '4º do Grupo C. Time ousado com meias habilidosos e chutes perigosos.',
    keyPlayers: ['Yuri Alberto', 'Yuri Boyka', 'Modric', 'Dybala']
  },

  // ================= GRUPO D ✅ =================
  {
    id: 'soda',
    name: 'Soda FC',
    shortName: 'SOD',
    group: 'D',
    primaryColor: '#DC2626',
    secondaryColor: '#F8FAFC',
    badgeSymbol: 'Bottle',
    badgeType: 'bottle',
    description: '1º do Grupo D. Jogo efervescente e chutes perigosos de fora da área.',
    keyPlayers: ['Soda King', 'Foden', 'De Bruyne', 'Ederson']
  },
  {
    id: 'zanix',
    name: 'Zanix',
    shortName: 'ZNX',
    group: 'D',
    primaryColor: '#0EA5E9',
    secondaryColor: '#0F172A',
    badgeSymbol: 'Lightning',
    badgeType: 'lightning',
    description: '2º do Grupo D. Velocidade rápida nas pontas e transições fulminantes.',
    keyPlayers: ['Zane', 'Xavier', 'Mbappé', 'Walker']
  },
  {
    id: 'luck',
    name: 'Luck',
    shortName: 'LUK',
    group: 'D',
    primaryColor: '#16A34A',
    secondaryColor: '#F43F5E',
    badgeSymbol: 'Clover',
    badgeType: 'clover',
    description: '3º do Grupo D. Equipe que joga com raça e precisão em busca da glória.',
    keyPlayers: ['Lucky Luke', 'Felix', 'Sanches', 'Fortuna']
  },
  {
    id: 'adra',
    name: 'Adra FC',
    shortName: 'ADR',
    group: 'D',
    primaryColor: '#0284C7',
    secondaryColor: '#F59E0B',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: '4º do Grupo D. Equipe com conjunto forte e defesa muito consistente.',
    keyPlayers: ['Adria', 'Ramos', 'Casemiro', 'Oblak']
  },

  // ================= GRUPO E ✅ =================
  {
    id: 'celeste',
    name: 'FC Celeste',
    shortName: 'CEL',
    group: 'E',
    primaryColor: '#38BDF8',
    secondaryColor: '#FFFFFF',
    badgeSymbol: 'Star',
    badgeType: 'star',
    description: '1º do Grupo E. Futebol bonito e passes rápidos no gramado virtual.',
    keyPlayers: ['Gabriel Celeste', 'Cavani', 'Arrascaeta', 'Muslera']
  },
  {
    id: 'bluelock',
    name: 'Blue Lock',
    shortName: 'BLK',
    group: 'E',
    primaryColor: '#0055FF',
    secondaryColor: '#00E5FF',
    badgeSymbol: 'Lock',
    badgeType: 'lock',
    description: '2º do Grupo E. Projeto focado no atacante mais implacável do torneio.',
    keyPlayers: ['Isagi Yoichi', 'Rin Itoshi', 'Nagi Seishiro', 'Bachira Meguru']
  },
  {
    id: 'realtiktak',
    name: 'Real TIK TAK',
    shortName: 'RTT',
    group: 'E',
    primaryColor: '#14B8A6',
    secondaryColor: '#0F766E',
    badgeSymbol: 'Star',
    badgeType: 'star',
    description: '3º do Grupo E. Especialistas em posse de bola e troca rápida de passes.',
    keyPlayers: ['TikTak Master', 'Xavi', 'Pedri', 'Iniesta']
  },
  {
    id: 'supergiants',
    name: 'Super Giants',
    shortName: 'SGI',
    group: 'E',
    primaryColor: '#10B981',
    secondaryColor: '#064E3B',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: '4º do Grupo E. Gigantes da defesa com poder ofensivo avassalador.',
    keyPlayers: ['Titan', 'Goliath', 'Goretzka', 'Courtois']
  },

  // ================= GRUPO F ✅ =================
  {
    id: 'liverpool',
    name: 'Liverpool',
    shortName: 'LIV',
    group: 'F',
    primaryColor: '#C8102E',
    secondaryColor: '#F6EB61',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: '1º do Grupo F. Tradicional gigante com ritmo intenso e ataque devastador.',
    keyPlayers: ['Salah', 'Van Dijk', 'Darwin', 'Alisson']
  },
  {
    id: 'sc_ninjas',
    name: 'SC Ninjas',
    shortName: 'NIN',
    group: 'F',
    primaryColor: '#1E1B4B',
    secondaryColor: '#818CF8',
    badgeSymbol: 'Star',
    badgeType: 'star',
    description: '2º do Grupo F. Furtivos e precisos nos contra-ataques mortais.',
    keyPlayers: ['Ninja Red', 'Shadow', 'Kuro', 'Hayate']
  },
  {
    id: 'levante_f',
    name: 'Levante',
    shortName: 'LVT',
    group: 'F',
    primaryColor: '#0369A1',
    secondaryColor: '#E0F2FE',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: '3º do Grupo F. Equipe tática focada na posse de bola e jogadas ensaiadas.',
    keyPlayers: ['Morales', 'Campaña', 'Pepa', 'Dani']
  },
  {
    id: 'botafogo',
    name: 'Botafogo',
    shortName: 'BOT',
    group: 'F',
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
    badgeSymbol: 'Star',
    badgeType: 'star',
    description: '4º do Grupo F. A Estrela Solitária em busca da glória na Copa DLS 26.',
    keyPlayers: ['Tiquinho', 'Luiz Henrique', 'Savarino', 'John']
  },

  // ================= GRUPO G ✅ =================
  {
    id: 'madridista',
    name: 'Madridista',
    shortName: 'MAD',
    group: 'G',
    primaryColor: '#4F46E5',
    secondaryColor: '#E0E7FF',
    badgeSymbol: 'Crown',
    badgeType: 'crown',
    description: '1º do Grupo G. Apaixonados pelo futebol vencedor e estilo galáctico.',
    keyPlayers: ['Raul', 'Zidane', 'Figo', 'Casillas']
  },
  {
    id: 'villareal',
    name: 'Villa Real',
    shortName: 'VIL',
    group: 'G',
    primaryColor: '#EAB308',
    secondaryColor: '#1E293B',
    badgeSymbol: 'Star',
    badgeType: 'star',
    description: '2º do Grupo G. O Submarino Amarelo em busca de surpreender os gigantes.',
    keyPlayers: ['Moreno', 'Parejo', 'Baena', 'Asenjo']
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    shortName: 'FCB',
    group: 'G',
    primaryColor: '#A855F7',
    secondaryColor: '#1E3A8A',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: '3º do Grupo G. Tiki-taka de alto nível, toque rápido e toque de mestre.',
    keyPlayers: ['Lewandowski', 'Lamine Yamal', 'Pedri', 'Ter Stegen']
  },
  {
    id: 'barca_fc',
    name: 'Barça FC',
    shortName: 'BAR',
    group: 'G',
    primaryColor: '#9333EA',
    secondaryColor: '#F43F5E',
    badgeSymbol: 'Crown',
    badgeType: 'crown',
    description: '4º do Grupo G. Estilo clássico, habilidade individual e ataques letais.',
    keyPlayers: ['Raphinha', 'Gavi', 'De Jong', 'Araujo']
  },

  // ================= GRUPO H ✅ =================
  {
    id: 'mocambique',
    name: 'Moçambique',
    shortName: 'MOZ',
    group: 'H',
    primaryColor: '#007A3D',
    secondaryColor: '#DA291C',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: '1º do Grupo H. Seleção da casa com garra, velocidade e apoio do público.',
    keyPlayers: ['Geny Catamo', 'Reinildo', 'Dominguês', 'Witi']
  },
  {
    id: 'b_munich',
    name: 'B Munich',
    shortName: 'BMN',
    group: 'H',
    primaryColor: '#DC2626',
    secondaryColor: '#0284C7',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: '2º do Grupo H. Potência alemã em busca de impor seu ritmo dominante.',
    keyPlayers: ['Kane', 'Musiala', 'Sané', 'Neuer']
  },
  {
    id: 'geovane',
    name: 'Geovane',
    shortName: 'GEO',
    group: 'H',
    primaryColor: '#F59E0B',
    secondaryColor: '#1E1B4B',
    badgeSymbol: 'Crown',
    badgeType: 'crown',
    description: '3º do Grupo H. Elenco comandado por Geovane com tática cirúrgica.',
    keyPlayers: ['Geovane', 'Kaka', 'Ronaldinho', 'Ronaldo']
  },
  {
    id: 'ovelhas_majestosas',
    name: 'Ovelhas Majestosas',
    shortName: 'OMA',
    group: 'H',
    primaryColor: '#84CC16',
    secondaryColor: '#1E293B',
    badgeSymbol: 'Crown',
    badgeType: 'crown',
    description: '4º do Grupo H. Futebol leve, divertido e extremamente perigoso nos contra-ataques.',
    keyPlayers: ['Majestic', 'Flock Master', 'Shepherd', 'Golden']
  }
];

export const getTeamById = (id: string): Team => {
  const found = TEAMS.find((t) => t.id === id);
  if (found) return found;
  return {
    id: id,
    name: id,
    shortName: id.slice(0, 3).toUpperCase(),
    primaryColor: '#64748B',
    secondaryColor: '#0F172A',
    badgeSymbol: 'Shield',
    badgeType: 'shield'
  };
};
