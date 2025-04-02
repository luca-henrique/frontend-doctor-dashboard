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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  financialConfigSchema,
  type FinancialConfigFormValues,
  paymentMethodOptions
} from "@/lib/schemas/doctor-schema";

interface FinancialConfigFormProps {
  defaultValues?: Partial<FinancialConfigFormValues>;
  onSubmit: (data: FinancialConfigFormValues) => void;
  onBack: () => void;
  isSubmitting: boolean;
  offersInPerson: boolean;
  offersTelemedicine: boolean;
}

export function FinancialConfigForm({
  defaultValues,
  onSubmit,
  onBack,
  isSubmitting,
  offersInPerson,
  offersTelemedicine
}: FinancialConfigFormProps) {
  const form = useForm<FinancialConfigFormValues>({
    resolver: zodResolver(financialConfigSchema),
    defaultValues: {
      inPersonConsultationFee: defaultValues?.inPersonConsultationFee || 0,
      onlineConsultationFee: defaultValues?.onlineConsultationFee || 0,
      acceptedPaymentMethods: defaultValues?.acceptedPaymentMethods || ["PIX"],
      bankAccount: defaultValues?.bankAccount || {
        bank: "",
        branch: "",
        accountNumber: "",
        accountType: "checking",
      },
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {offersInPerson && (
          <FormField
            control={form.control}
            name="inPersonConsultationFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor da Consulta Presencial (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="200"
                    min={0}
                    step="0.01"
                    disabled={isSubmitting}
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Valor cobrado por consulta presencial em seu consultório
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {offersTelemedicine && (
          <FormField
            control={form.control}
            name="onlineConsultationFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor da Consulta Online (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="150"
                    min={0}
                    step="0.01"
                    disabled={isSubmitting}
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Valor cobrado por consulta online (telemedicina)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="acceptedPaymentMethods"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Métodos de Pagamento Aceitos</FormLabel>
                <FormDescription>
                  Selecione todas as formas de pagamento que você aceita
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethodOptions.map((method) => (
                  <FormField
                    key={method}
                    control={form.control}
                    name="acceptedPaymentMethods"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={method}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(method)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, method])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== method
                                      )
                                    )
                              }}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {method}
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

        <div className="rounded-md border p-4 space-y-4">
          <h3 className="font-medium">Dados Bancários</h3>

          <FormField
            control={form.control}
            name="bankAccount.bank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banco</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Banco do Brasil"
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
              name="bankAccount.branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agência</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234"
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
              name="bankAccount.accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número da Conta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="12345-6"
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
            name="bankAccount.accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Conta</FormLabel>
                <Select
                  disabled={isSubmitting}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de conta" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="checking">Conta Corrente</SelectItem>
                    <SelectItem value="savings">Conta Poupança</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
