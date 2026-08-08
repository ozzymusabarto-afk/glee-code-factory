import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-poly-cream px-4">
      <div className="max-w-md text-center poly-card bg-white p-12">
        <h1 className="text-8xl font-black text-poly-navy">404</h1>
        <h2 className="mt-4 text-2xl font-black text-poly-navy">Ops! Página não encontrada</h2>
        <p className="mt-4 text-muted-foreground font-medium">
          O Poly não encontrou esse caminho. Vamos voltar para a base?
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="poly-button-primary inline-flex"
          >
            VOLTAR AO INÍCIO
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-poly-cream px-4">
      <div className="max-w-md text-center poly-card bg-white p-12">
        <h1 className="text-2xl font-black tracking-tight text-poly-navy">
          Algo deu errado no sistema
        </h1>
        <p className="mt-4 text-muted-foreground font-medium">
          O Poly está reiniciando os módulos. Tente novamente em instantes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="poly-button-primary"
          >
            TENTAR NOVAMENTE
          </Button>
          <Link
            to="/"
            className="flex items-center justify-center rounded-2xl border border-input bg-background px-8 py-4 text-sm font-black text-poly-navy transition-colors hover:bg-accent"
          >
            INÍCIO
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PolyBot — Seu Tutor de Idiomas para a Vida Real" },
      { name: "description", content: "Aprenda idiomas com missões reais de 10 minutos por dia." },
      { name: "author", content: "PolyBot" },
      { property: "og:title", content: "PolyBot — Tutor de Idiomas" },
      { property: "og:description", content: "Transforme sua vida com 10 minutos por dia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@PolyBot" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body className="font-['Plus_Jakarta_Sans',_sans-serif]">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
