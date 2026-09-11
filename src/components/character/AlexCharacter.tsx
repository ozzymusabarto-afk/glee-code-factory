import { useState } from "react";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WebSpeechAudioService } from "@/lib/scenario-engine/AudioService";

export interface AlexCharacterProps {
  pose?:
    | "neutral"
    | "waving"
    | "talking"
    | "encouraging"
    | "listening"
    | "celebrating"
    | "hero"
    | "explaining"
    | undefined;
  size?: "sm" | "md" | "lg" | "xl" | "hero" | "avatar" | undefined;
  variant?: "photo" | "vector" | undefined;
  className?: string | undefined;
}

/**
 * AlexCharacter — Personagem oficial do Polybot School.
 * Representa o modelo visual oficial da referência:
 * Rapaz jovem, bonito, simpático, cabelo castanho ondulado, fones no pescoço,
 * jaqueta azul com logotipo dourado e mochila.
 */
export function AlexCharacter({
  pose = "hero",
  size = "md",
  variant = "photo",
  className,
}: AlexCharacterProps) {
  const [imageError, setImageError] = useState(false);

  if (size === "avatar") {
    return <AlexAvatar className={className} />;
  }

  // Se o modo fotográfico estiver ativo e a imagem carregar com sucesso:
  if (variant === "photo" && !imageError) {
    const photoSrc =
      pose === "explaining" || pose === "talking" || pose === "encouraging"
        ? "/assets/character/alex-explaining.jpg"
        : "/assets/character/alex-hero.jpg";

    const dimensions = {
      sm: "h-32 w-28",
      md: "h-52 w-44",
      lg: "h-72 w-60",
      xl: "h-96 w-80",
      hero: "h-[380px] w-[300px] max-w-full",
    }[size];

    return (
      <div
        className={cn(
          "relative flex items-center justify-center select-none overflow-hidden rounded-3xl",
          dimensions,
          className,
        )}
      >
        <img
          src={photoSrc}
          alt="Alex — Companheiro de Jornada Polybot School"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-top drop-shadow-md rounded-3xl transition-transform duration-300 hover:scale-[1.02]"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-b-3xl" />
      </div>
    );
  }

  const dimensions = {
    sm: "h-28 w-28",
    md: "h-44 w-44",
    lg: "h-64 w-64",
    xl: "h-80 w-80",
    hero: "h-96 w-96",
  }[size];

  return (
    <div className={cn("relative flex items-center justify-center select-none", dimensions, className)}>
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="alex-skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDDFC7" />
            <stop offset="100%" stopColor="#F7CDB0" />
          </linearGradient>
          <linearGradient id="alex-jacket" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="alex-hair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D1B14" />
            <stop offset="100%" stopColor="#1C100B" />
          </linearGradient>
          <linearGradient id="alex-yellow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>

        {/* --- Sombra sutil de apoio --- */}
        <ellipse cx="100" cy="232" rx="48" ry="5" fill="#CBD5E1" fillOpacity="0.4" />

        {/* --- Tronco / Jaqueta Azul Editorial --- */}
        <path
          d="M56 160 C56 142 70 134 100 134 C130 134 144 142 144 160 L148 230 C148 230 125 234 100 234 C75 234 52 230 52 230 Z"
          fill="url(#alex-jacket)"
        />

        {/* Camiseta / Gola interna em branco e detalhe amarelo */}
        <path
          d="M84 134 C84 146 92 156 100 156 C108 156 116 146 116 134 Z"
          fill="#FFFFFF"
        />
        <path
          d="M88 134 C88 142 94 148 100 148 C106 148 112 142 112 134"
          stroke="url(#alex-yellow)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Lapelas da Jaqueta */}
        <path d="M78 134 L88 175 L68 185" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M122 134 L112 175 L132 185" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* --- Braços dependendo da Pose --- */}
        {pose === "waving" ? (
          // Braço direito acenando amigavelmente
          <g>
            <path
              d="M140 145 C158 138 170 120 166 94"
              stroke="url(#alex-jacket)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Mão acenando */}
            <circle cx="166" cy="86" r="10" fill="url(#alex-skin)" />
            <path d="M162 82 Q164 74 168 80" stroke="url(#alex-skin)" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M168 81 Q172 75 174 82" stroke="url(#alex-skin)" strokeWidth="3.5" strokeLinecap="round" />
            {/* Ondas de aceno discretas */}
            <path d="M178 78 C182 82 182 88 178 92" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : pose === "encouraging" ? (
          // Polegar positivo / gesto motivacional
          <g>
            <path
              d="M140 148 C155 152 162 142 158 128"
              stroke="url(#alex-jacket)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <circle cx="158" cy="120" r="9" fill="url(#alex-skin)" />
            <path d="M158 118 L158 111" stroke="url(#alex-skin)" strokeWidth="4" strokeLinecap="round" />
          </g>
        ) : pose === "celebrating" ? (
          // Braços abertos comemorando
          <g>
            <path d="M60 148 C42 132 36 112 44 96" stroke="url(#alex-jacket)" strokeWidth="15" strokeLinecap="round" />
            <circle cx="44" cy="90" r="9" fill="url(#alex-skin)" />
            <path d="M140 148 C158 132 164 112 156 96" stroke="url(#alex-jacket)" strokeWidth="15" strokeLinecap="round" />
            <circle cx="156" cy="90" r="9" fill="url(#alex-skin)" />
          </g>
        ) : pose === "listening" ? (
          // Mão perto da orelha / postura atenta
          <g>
            <path d="M140 148 C154 142 158 120 150 102" stroke="url(#alex-jacket)" strokeWidth="15" strokeLinecap="round" />
            <circle cx="147" cy="96" r="9" fill="url(#alex-skin)" />
          </g>
        ) : (
          // Postura natural relaxada
          <g>
            <path d="M58 150 C50 170 54 195 58 208" stroke="url(#alex-jacket)" strokeWidth="14" strokeLinecap="round" />
            <path d="M142 150 C150 170 146 195 142 208" stroke="url(#alex-jacket)" strokeWidth="14" strokeLinecap="round" />
          </g>
        )}

        {/* --- Pescoço --- */}
        <rect x="91" y="112" width="18" height="24" rx="4" fill="url(#alex-skin)" />

        {/* --- Cabeça e Rosto --- */}
        <ellipse cx="100" cy="80" rx="36" ry="40" fill="url(#alex-skin)" />

        {/* Orelhas */}
        <ellipse cx="64" cy="80" rx="5" ry="9" fill="url(#alex-skin)" />
        <ellipse cx="136" cy="80" rx="5" ry="9" fill="url(#alex-skin)" />

        {/* Cabelo Moderno Editorial */}
        <path
          d="M64 74 C64 46 76 34 100 34 C124 34 136 46 136 74 C136 74 131 66 122 66 C112 66 108 72 100 70 C92 68 84 64 76 66 C70 68 64 74 64 74 Z"
          fill="url(#alex-hair)"
        />
        {/* Franja estilizada */}
        <path
          d="M68 58 C80 50 94 48 108 52 C120 56 128 62 134 70"
          stroke="#1C100B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Sobrancelhas simpáticas */}
        <path d="M80 66 Q88 63 94 67" stroke="#2D1B14" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M106 67 Q112 63 120 66" stroke="#2D1B14" strokeWidth="2.8" strokeLinecap="round" fill="none" />

        {/* Olhos expressivos */}
        <ellipse cx="86" cy="76" rx="4" ry="4.5" fill="#1E293B" />
        <ellipse cx="114" cy="76" rx="4" ry="4.5" fill="#1E293B" />
        {/* Brilho nos olhos */}
        <circle cx="85" cy="74.5" r="1.5" fill="#FFFFFF" />
        <circle cx="113" cy="74.5" r="1.5" fill="#FFFFFF" />

        {/* Nariz sutil */}
        <path d="M99 78 Q102 85 98 87" stroke="#E2A687" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* Boca amigável */}
        {pose === "talking" ? (
          <path
            d="M92 94 Q100 105 108 94 Q100 97 92 94 Z"
            fill="#B91C1C"
            stroke="#991B1B"
            strokeWidth="1.5"
          />
        ) : (
          <path
            d="M91 94 Q100 102 109 94"
            stroke="#A34628"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Pequeno rubor / bochechas simpáticas */}
        <ellipse cx="78" cy="85" rx="5" ry="2.5" fill="#F472B6" fillOpacity="0.35" />
        <ellipse cx="122" cy="85" rx="5" ry="2.5" fill="#F472B6" fillOpacity="0.35" />
      </svg>
    </div>
  );
}

/**
 * AlexAvatar — Versão circular de altíssima definição para balões de chat e cabeçalhos.
 */
export function AlexAvatar({ className }: { className?: string | undefined }) {
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(
        "relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-amber-400 bg-slate-900 shadow-sm",
        className,
      )}
    >
      {!error ? (
        <img
          src="/assets/character/alex-avatar.jpg"
          alt="Alex Avatar"
          onError={() => setError(true)}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-blue-700 text-white font-black text-sm">
          A
        </div>
      )}
    </div>
  );
}

/**
 * AlexCompanionCard — Cartão do companheiro Alex (conforme referência visual).
 * Mostra o Alex com headphones, o balão "Vamos nessa? O inglês é mais simples do que você imagina!"
 * e botão com áudio real do Alex falando em inglês.
 */
export function AlexCompanionCard({ className }: { className?: string | undefined }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playCompanionVoice = () => {
    const audioService = new WebSpeechAudioService();
    setIsPlaying(true);
    audioService.speak("Let's do this together! English is much simpler than you think.", {
      lang: "en-US",
      rate: 0.9,
    });
    setTimeout(() => setIsPlaying(false), 3800);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 p-6 text-white shadow-xl flex flex-col justify-between min-h-[310px]",
        className,
      )}
    >
      {/* Imagem de Fundo com Alex */}
      <div className="absolute inset-0 opacity-40 mix-blend-luminosity overflow-hidden pointer-events-none">
        <img
          src="/assets/character/alex-hero.jpg"
          alt=""
          className="w-full h-full object-cover object-top scale-110"
        />
      </div>

      {/* Balão de Fala do Alex */}
      <div className="relative z-10 bg-white/95 text-slate-900 p-4 rounded-2xl shadow-md text-xs font-semibold leading-relaxed border border-white/40">
        <p className="font-bold text-blue-900 mb-1">Vamos nessa?</p>
        <p className="text-slate-700">
          O inglês é mais simples do que você imagina! Estou aqui para praticar com você passo a passo.
        </p>
      </div>

      {/* Barra de Áudio / Waveform e Identificação */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlexAvatar className="h-10 w-10 ring-2 ring-amber-400/40" />
          <div>
            <span className="text-sm font-black tracking-tight block">Alex</span>
            <span className="text-[11px] text-slate-300 font-medium">Seu companheiro de jornada</span>
          </div>
        </div>

        {/* Botão de Áudio com Waveform */}
        <button
          type="button"
          onClick={playCompanionVoice}
          className={cn(
            "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all shadow-sm",
            isPlaying
              ? "bg-amber-400 text-slate-950 scale-105"
              : "bg-white/15 hover:bg-white/25 text-white border border-white/20",
          )}
          title="Ouvir a voz do Alex"
        >
          <Volume2 className={cn("h-4 w-4", isPlaying && "animate-pulse text-slate-950")} />
          <span className="text-[10px] uppercase tracking-wider">
            {isPlaying ? "Falando..." : "Ouvir"}
          </span>
        </button>
      </div>
    </div>
  );
}

/**
 * AlexDicaCard — Widget com a "Dica do Alex" do cabeçalho da referência:
 * "Little steps make big progress!"
 */
export function AlexDicaCard({ className }: { className?: string | undefined }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-blue-100 bg-white/90 backdrop-blur-sm p-3 shadow-sm",
        className,
      )}
    >
      <AlexAvatar className="h-10 w-10 border border-blue-200" />
      <div className="text-left">
        <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">
          Dica do Alex
        </span>
        <p className="text-xs font-bold text-slate-800 italic">
          "Little steps make big progress!"
        </p>
      </div>
    </div>
  );
}
