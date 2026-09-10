import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ScenarioRunner } from "@/components/scenario/ScenarioRunner";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
  head: () => ({
    meta: [{ title: "Laboratório Scenario Engine — PolyBot" }],
  }),
});

function DebugPage() {
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Início
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              Scenario Lab A0
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReloadKey((k) => k + 1)}
              className="gap-1.5 rounded-xl border-slate-300 text-xs font-semibold hover:bg-slate-100"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reiniciar
            </Button>
          </div>
        </header>

        <main>
          <ScenarioRunner
            key={reloadKey}
            slug="first-contact-meeting-someone"
          />
        </main>
      </div>
    </div>
  );
}