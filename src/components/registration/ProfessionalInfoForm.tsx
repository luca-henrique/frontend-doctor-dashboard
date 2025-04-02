"use client";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  professionalInfoSchema,
  type ProfessionalInfoFormValues,
  medicalSpecialties,
  languageOptions
} from "@/lib/schemas/doctor-schema";
import { brazilianStates } from "@/lib/constants/states";

interface ProfessionalInfoFormProps {
  defaultValues?: Partial<ProfessionalInfoFormValues>;
  onSubmit: (data: ProfessionalInfoFormValues) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function ProfessionalInfoForm({
  defaultValues,
  onSubmit,
  onBack,
  isSubmitting
}: ProfessionalInfoFormProps) {
  const form = useForm<ProfessionalInfoFormValues>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      crm: defaultValues?.crm || "",
      crmState: defaultValues?.crmState || undefined,
      specialty: defaultValues?.specialty || undefined,
      professionalDescription: defaultValues?.professionalDescription || "",
      languagesSpoken: defaultValues?.languagesSpoken || ["Português"],
      yearsOfExperience: defaultValues?.yearsOfExperience || 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="crm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CRM</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123456"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Registro no Conselho Regional de Medicina
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="crmState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado do CRM</FormLabel>
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
        </div>

        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especialidade Médica</FormLabel>
              <Select
                disabled={isSubmitting}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua especialidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {medicalSpecialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
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
          name="professionalDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição Profissional</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva sua formação, experiência e áreas de atuação"
                  className="min-h-32 resize-none"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Máximo de 500 caracteres
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="languagesSpoken"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Idiomas</FormLabel>
                <FormDescription>
                  Selecione os idiomas que você fala
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {languageOptions.map((language) => (
                  <FormField
                    key={language}
                    control={form.control}
                    name="languagesSpoken"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={language}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(language)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, language])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== language
                                      )
                                    )
                              }}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {language}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anos de Experiência</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  min={0}
                  disabled={isSubmitting}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
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
