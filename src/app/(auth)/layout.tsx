import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-xl flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            Portal Médico
          </Link>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">Registrar</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex justify-center items-center p-4">
        {children}
      </main>
      <footer className="border-t px-4 py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 Portal Médico. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
