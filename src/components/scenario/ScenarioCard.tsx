import { ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ScenarioCardProps {
  number: number;
  id: string;
  title: string;
  situationPt: string;
  descriptionPt?: string | undefined;
  imageSrc: string;
  levelBadge: string;
  status: "active" | "locked" | "completed";
  onClick?: (() => void) | undefined;
  className?: string | undefined;
}

export function ScenarioCard({
  number,
  title,
  situationPt,
  imageSrc,
  levelBadge,
  status,
  onClick,
  className,
}: ScenarioCardProps) {
  const isAvailable = status === "active" || status === "completed";

  return (
    <div
      onClick={isAvailable ? onClick : undefined}
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-3xl transition-all duration-300 select-none text-left",
        isAvailable
          ? "border-2 border-amber-400/90 bg-white shadow-xl shadow-amber-500/10 hover:shadow-2xl hover:scale-[1.02] cursor-pointer ring-4 ring-amber-400/15 group"
          : "border border-slate-200/80 bg-white/95 shadow-sm opacity-90 hover:opacity-100 hover:border-slate-300",
        className,
      )}
    >
      {/* Imagem do Cenário Real */}
      <div className="relative h-32 w-full overflow-hidden bg-slate-100">
        <img
          src={imageSrc}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500",
            isAvailable ? "group-hover:scale-105" : "filter saturate-[0.85]",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Número da Unidade */}
        <div className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/85 backdrop-blur-md text-xs font-black text-white shadow-sm border border-white/20">
          {number}
        </div>

        {/* Badge da Situação */}
        {isAvailable ? (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-amber-400 text-slate-950 px-2.5 py-1 text-[10px] font-black shadow-sm">
            <span>📍 Ponto atual</span>
          </div>
        ) : (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-slate-950/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-medium text-slate-200 border border-white/10">
            <span>Próximo destino</span>
          </div>
        )}
      </div>

      {/* Conteúdo Textual do Cenário */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
            {title}
          </span>
          <h3 className="text-sm font-black text-slate-900 leading-snug line-clamp-2">
            {situationPt}
          </h3>
        </div>

        {/* Nível e Ação */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700">
              {levelBadge}
            </span>
          </div>

          {isAvailable ? (
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-2.5 shadow-sm transition-colors"
            >
              <span>Entrar com Alex</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <div className="w-full text-center py-2 text-[10px] font-semibold text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
              Destino seguinte
            </div>
          )}
        </div>
      </div>
    </div>
  );
}