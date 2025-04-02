"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function RegistrationSuccess() {
  return (
    <Card className="mx-auto max-w-md w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
        </div>
        <CardTitle className="text-2xl">Cadastro Enviado com Sucesso!</CardTitle>
        <CardDescription className="mt-4 text-base">
          Sua solicitação de cadastro foi recebida e está em análise.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p>
          Nossa equipe irá verificar seus dados e documentos para concluir o processo de aprovação.
          Você receberá um e-mail com o resultado da análise em até 48 horas.
        </p>

        <div className="rounded-md bg-primary/10 p-4 text-sm">
          <h4 className="font-medium mb-2">Próximos Passos:</h4>
          <ol className="list-decimal pl-4 text-left space-y-1">
            <li>Aguarde a aprovação do seu cadastro</li>
            <li>Após aprovado, você receberá um e-mail de confirmação</li>
            <li>Acesse sua conta com o e-mail e senha cadastrados</li>
            <li>Configure seus horários de atendimento</li>
            <li>Comece a receber solicitações de consultas!</li>
          </ol>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button asChild className="w-full">
          <Link href="/login">Ir para o Login</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/">Voltar para o Início</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
