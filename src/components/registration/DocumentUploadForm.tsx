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
import {
  documentUploadSchema,
  type DocumentUploadFormValues
} from "@/lib/schemas/doctor-schema";

interface DocumentUploadFormProps {
  defaultValues?: Partial<DocumentUploadFormValues>;
  onSubmit: (data: DocumentUploadFormValues) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function DocumentUploadForm({
  defaultValues,
  onSubmit,
  onBack,
  isSubmitting
}: DocumentUploadFormProps) {
  const [crmFile, setCrmFile] = useState<string | null>(null);
  const [diplomaFile, setDiplomaFile] = useState<string | null>(null);
  const [idFile, setIdFile] = useState<string | null>(null);

  const form = useForm<DocumentUploadFormValues>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: {
      crmDocument: defaultValues?.crmDocument || undefined,
      diplomaOrCertificate: defaultValues?.diplomaOrCertificate || undefined,
      identityDocument: defaultValues?.identityDocument || undefined,
    },
  });

  const handleFileChange = (
    onChange: (...event: any[]) => void,
    setPreview: (value: string | null) => void,
    file: FileList | null
  ) => {
    if (file && file.length > 0) {
      const selectedFile = file[0];
      onChange(selectedFile);

      // Create preview URL for image files
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        // For non-image files, just display the file name
        setPreview(null);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Verificação Profissional</h3>
          <p className="text-sm text-muted-foreground">
            Para garantir a segurança dos pacientes, precisamos verificar sua identidade e credenciais médicas.
            Estes documentos serão analisados e não serão compartilhados publicamente.
          </p>
        </div>

        <FormField
          control={form.control}
          name="crmDocument"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem className="space-y-4">
              <div>
                <FormLabel>Documento CRM (PDF ou Imagem)</FormLabel>
                <FormDescription>
                  Faça upload de uma cópia do seu documento CRM. Formatos aceitos: PDF, JPG, PNG
                </FormDescription>
              </div>

              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={isSubmitting}
                  onChange={(e) => handleFileChange(onChange, setCrmFile, e.target.files)}
                  {...rest}
                />
              </FormControl>

              {crmFile && crmFile.startsWith('data:image') && (
                <div className="mt-2 max-w-xs">
                  <img
                    src={crmFile}
                    alt="Documento CRM"
                    className="rounded-md border object-cover h-40 w-full"
                  />
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diplomaOrCertificate"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem className="space-y-4">
              <div>
                <FormLabel>Diploma ou Certificado de Especialização (opcional)</FormLabel>
                <FormDescription>
                  Faça upload de uma cópia do seu diploma de medicina ou certificado de especialização.
                </FormDescription>
              </div>

              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={isSubmitting}
                  onChange={(e) => handleFileChange(onChange, setDiplomaFile, e.target.files)}
                  {...rest}
                />
              </FormControl>

              {diplomaFile && diplomaFile.startsWith('data:image') && (
                <div className="mt-2 max-w-xs">
                  <img
                    src={diplomaFile}
                    alt="Diploma ou Certificado"
                    className="rounded-md border object-cover h-40 w-full"
                  />
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="identityDocument"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem className="space-y-4">
              <div>
                <FormLabel>Documento de Identidade (RG/CPF)</FormLabel>
                <FormDescription>
                  Faça upload de uma cópia do seu RG, CPF ou CNH para verificação de identidade.
                </FormDescription>
              </div>

              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={isSubmitting}
                  onChange={(e) => handleFileChange(onChange, setIdFile, e.target.files)}
                  {...rest}
                />
              </FormControl>

              {idFile && idFile.startsWith('data:image') && (
                <div className="mt-2 max-w-xs">
                  <img
                    src={idFile}
                    alt="Documento de Identidade"
                    className="rounded-md border object-cover h-40 w-full"
                  />
                </div>
              )}

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
            {isSubmitting ? "Enviando..." : "Enviar Documentos"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
