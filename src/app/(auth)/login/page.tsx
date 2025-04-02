"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { doctorLoginSchema, type DoctorLoginFormValues } from "@/lib/schemas/doctor-schema";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const form = useForm<DoctorLoginFormValues>({
    resolver: zodResolver(doctorLoginSchema),
    defaultValues: {
      emailOrCRM: "",
      password: "",
    },
  });

  const onSubmit = (data: DoctorLoginFormValues) => {
    if (isLocked) {
      toast.error("Conta temporariamente bloqueada por segurança. Tente novamente em 5 minutos.");
      return;
    }

    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);

      // For demo purposes, we're simulating a failed login
      const isLoginSuccessful = false;

      if (isLoginSuccessful) {
        toast.success("Login realizado com sucesso!");
        // Here we would redirect to the dashboard
      } else {
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);

        toast.error("E-mail/CRM ou senha incorretos. Por favor, tente novamente.");

        if (newFailedAttempts >= 3) {
          setIsLocked(true);
          toast.error("Conta temporariamente bloqueada por segurança. Tente novamente em 5 minutos.");

          // Unlock after 5 minutes
          setTimeout(() => {
            setIsLocked(false);
            setFailedAttempts(0);
            toast.success("Conta desbloqueada. Você pode tentar fazer login novamente.");
          }, 5 * 60 * 1000);
        }
      }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>
          Acesse sua conta para gerenciar suas consultas e pacientes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="emailOrCRM"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail ou CRM</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nome@exemplo.com ou 123456"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Sua senha"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-6"
              disabled={isLoading || isLocked}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center w-full">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <div className="text-center w-full text-sm">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Registre-se
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
