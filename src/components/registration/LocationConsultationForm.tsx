"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  locationConsultationSchema,
  type LocationConsultationFormValues
} from "@/lib/schemas/doctor-schema";
import { brazilianStates } from "@/lib/constants/states";

interface LocationConsultationFormProps {
  defaultValues?: Partial<LocationConsultationFormValues>;
  onSubmit: (data: LocationConsultationFormValues) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function LocationConsultationForm({
  defaultValues,
  onSubmit,
  onBack,
  isSubmitting
}: LocationConsultationFormProps) {
  const [offersInPerson, setOffersInPerson] = useState<boolean>(
    defaultValues?.offersInPersonConsultation || false
  );

  const form = useForm<LocationConsultationFormValues>({
    resolver: zodResolver(locationConsultationSchema),
    defaultValues: {
      offersInPersonConsultation: defaultValues?.offersInPersonConsultation || false,
      clinicAddress: defaultValues?.clinicAddress || {
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: undefined,
        zipCode: "",
      },
      offersHomeConsultation: defaultValues?.offersHomeConsultation || false,
      offersTelemedicine: defaultValues?.offersTelemedicine || false,
    },
  });

  // Watch changes to offersInPersonConsultation
  const watchOffersInPerson = form.watch("offersInPersonConsultation");
  if (watchOffersInPerson !== offersInPerson) {
    setOffersInPerson(watchOffersInPerson);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="offersInPersonConsultation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  Ofereço consultas presenciais em consultório
                </FormLabel>
                <FormDescription>
                  Marque esta opção se você atende em um consultório próprio ou clínica
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {offersInPerson && (
          <div className="rounded-md border p-4 space-y-4">
            <h3 className="font-medium">Endereço do Consultório</h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="clinicAddress.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rua</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Rua das Flores"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="clinicAddress.number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="clinicAddress.complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento (opcional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sala 101"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clinicAddress.neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Centro"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clinicAddress.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="São Paulo"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clinicAddress.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brazilianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clinicAddress.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="12345-678"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="offersHomeConsultation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  Ofereço consultas domiciliares
                </FormLabel>
                <FormDescription>
                  Marque esta opção se você realiza atendimentos na residência do paciente
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="offersTelemedicine"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  Ofereço telemedicina (consultas online)
                </FormLabel>
                <FormDescription>
                  Marque esta opção se você realiza consultas por videochamada
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Voltar
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Próximo"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
