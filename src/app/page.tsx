import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Portal Médico</h1>
      <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl">
        Plataforma para médicos gerenciarem seus atendimentos, consultas e pacientes de forma simples e eficiente
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Médicos Cadastrados</CardTitle>
            <CardDescription>
              Acesse sua conta para gerenciar consultas e pacientes
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <img
              src="/doctor.svg"
              alt="Médico"
              className="w-40 h-40 opacity-80"
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild size="lg" className="w-full">
              <Link href="/login">
                Entrar
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Novo no Portal?</CardTitle>
            <CardDescription>
              Registre-se para oferecer consultas e gerenciar seus pacientes
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <img
              src="/register.svg"
              alt="Registro"
              className="w-40 h-40 opacity-80"
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link href="/register">
                Registrar como Médico
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
