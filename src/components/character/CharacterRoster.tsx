import { Volume2, Mic, Keyboard, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { AlexAvatar } from "./AlexCharacter";

export interface CharacterItem {
  id: string;
  name: string;
  rolePt: string;
  imageSrc?: string | undefined;
  isActive?: boolean | undefined;
}

const CHARACTERS: CharacterItem[] = [
  {
    id: "alex",
    name: "Alex",
    rolePt: "Seu companheiro de jornada.",
    isActive: true,
  },
  {
    id: "emma",
    name: "Emma",
    rolePt: "Traz novas situações e desafios.",
    isActive: false,
  },
  {
    id: "maria",
    name: "Maria",
    rolePt: "Ajuda a praticar o que aprendeu.",
    isActive: false,
  },
  {
    id: "john",
    name: "John",
    rolePt: "Mostra que o inglês está em todo lugar.",
    isActive: false,
  },
];

/**
 * CharacterRoster — Mostruário "OS PERSONAGENS" conforme a referência visual.
 */
export function CharacterRoster({ className }: { className?: string | undefined }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between",
        className,
      )}
    >
      <div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
          Os Personagens
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CHARACTERS.map((char) => (
            <div
              key={char.id}
              className={cn(
                "rounded-2xl p-3 text-center transition-all flex flex-col items-center gap-2",
                char.isActive
                  ? "bg-blue-50/70 border border-blue-200 shadow-sm"
                  : "bg-slate-50 border border-slate-100 opacity-80",
              )}
            >
              {char.id === "alex" ? (
                <AlexAvatar className="h-12 w-12 ring-2 ring-amber-400/50" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-slate-200 to-blue-100 flex items-center justify-center font-black text-slate-700 text-sm border border-slate-200 shadow-inner">
                  {char.name[0]}
                </div>
              )}
              <div>
                <span className="text-sm font-black text-slate-900 block">{char.name}</span>
                <span className="text-[10px] text-slate-500 font-medium leading-tight block mt-0.5">
                  {char.rolePt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * InterfaceElementsShowcase — Componente "ELEMENTOS DA INTERFACE" da referência visual
 */
export function InterfaceElementsShowcase({ className }: { className?: string | undefined }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between",
        className,
      )}
    >
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
        Elementos da Interface
      </h3>

      {/* Controles de Entrada */}
      <div className="space-y-4">
        <div className="flex items-center justify-around py-2 border-b border-slate-100">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Volume2 className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">Áudio</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Mic className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">Falar</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shadow-xs">
              <Keyboard className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">Digitar</span>
          </div>
        </div>

        {/* Indicadores de Feedback */}
        <div className="flex items-center justify-around py-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Sucesso</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <span>Atenção</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700">
            <HelpCircle className="h-4 w-4 text-blue-500" />
            <span>Ajuda</span>
          </div>
        </div>
      </div>
    </div>
  );
}