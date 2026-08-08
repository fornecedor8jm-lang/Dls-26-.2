import { Play, Tv, Clock, Globe2, Sparkles } from 'lucide-react';

export const TRAILER_URL = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663853833735/cQoOOVhljskxBemW.mp4';

export function TrailerSection() {
  return (
    <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 p-5 sm:p-8 shadow-2xl overflow-hidden relative">
      {/* Background glow gradient */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              <Tv size={14} className="animate-pulse" />
              🎬 Trailer Oficial · Copa DLS 2026
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display pt-1">
              Horários Oficiais & Transmissão nos Fusos BRT e CAT
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <Globe2 size={15} className="text-amber-400" />
            <span>BRT (Brasília) · CAT (Moçambique)</span>
          </div>
        </div>

        {/* Video Player Box */}
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-slate-800 shadow-2xl group">
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-contain bg-black"
          >
            <source src={TRAILER_URL} type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
          </video>
        </div>

        {/* Informational Cards beneath Video */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800/90 flex items-start gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg shrink-0">
              <Clock size={20} />
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <strong className="text-white font-black block">
                Horário do Brasil (BRT / UTC-3)
              </strong>
              <p className="text-slate-400 leading-relaxed">
                Acompanhe os jogos a partir das <strong>15:30 BRT</strong>. Os horários locais brasileiros garantem a cobertura ao vivo do torneio.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800/90 flex items-start gap-3">
            <div className="p-2.5 bg-orange-500/20 text-orange-400 rounded-lg shrink-0">
              <Globe2 size={20} />
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <strong className="text-white font-black block">
                Horário de Moçambique / CAT (UTC+2)
              </strong>
              <p className="text-slate-400 leading-relaxed">
                Transmitido às <strong>20:30 CAT</strong> para os torcedores em Moçambique, Angola e África Central.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
