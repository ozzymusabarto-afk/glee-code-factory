import { cn } from "@/lib/utils";

export interface AlexCharacterProps {
  pose?: "neutral" | "waving" | "talking" | "encouraging" | "listening" | "celebrating" | undefined;
  size?: "sm" | "md" | "lg" | "avatar" | undefined;
  className?: string | undefined;
}

/**
 * AlexCharacter — Personagem humano jovem e amigável da jornada Polybot School.
 * Estilo: Ilustração editorial contemporânea (clean vector art, paleta azul navy, amarelo quente, branco e tons suaves).
 * Estático, elegante e expressivo, sem animações caóticas.
 */
export function AlexCharacter({
  pose = "neutral",
  size = "md",
  className,
}: AlexCharacterProps) {
  if (size === "avatar") {
    return <AlexAvatar className={className} />;
  }

  const dimensions = {
    sm: "h-28 w-28",
    md: "h-44 w-44",
    lg: "h-64 w-64",
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
 * AlexAvatar — Versão circular compacta para balões de chat e cabeçalhos.
 */
export function AlexAvatar({ className }: { className?: string | undefined }) {
  return (
    <div
      className={cn(
        "relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-blue-200 bg-gradient-to-b from-blue-50 to-blue-100 shadow-sm",
        className,
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center transform translate-y-1 scale-125">
        <AlexCharacter pose="neutral" size="sm" />
      </div>
    </div>
  );
}
