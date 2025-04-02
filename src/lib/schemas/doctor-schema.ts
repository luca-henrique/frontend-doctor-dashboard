import { z } from "zod";

// List of Brazilian states for CRM validation
const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

// Medical specialties from CFM (Federal Medical Council)
export const medicalSpecialties = [
  "Acupuntura",
  "Alergia e Imunologia",
  "Anestesiologia",
  "Angiologia",
  "Cancerologia",
  "Cardiologia",
  "Cirurgia Cardiovascular",
  "Cirurgia da Mão",
  "Cirurgia de Cabeça e Pescoço",
  "Cirurgia do Aparelho Digestivo",
  "Cirurgia Geral",
  "Cirurgia Pediátrica",
  "Cirurgia Plástica",
  "Cirurgia Torácica",
  "Cirurgia Vascular",
  "Clínica Médica",
  "Coloproctologia",
  "Dermatologia",
  "Endocrinologia e Metabologia",
  "Endoscopia",
  "Gastroenterologia",
  "Genética Médica",
  "Geriatria",
  "Ginecologia e Obstetrícia",
  "Hematologia e Hemoterapia",
  "Homeopatia",
  "Infectologia",
  "Mastologia",
  "Medicina de Emergência",
  "Medicina de Família e Comunidade",
  "Medicina do Trabalho",
  "Medicina do Tráfego",
  "Medicina Esportiva",
  "Medicina Física e Reabilitação",
  "Medicina Intensiva",
  "Medicina Legal e Perícia Médica",
  "Medicina Nuclear",
  "Medicina Preventiva e Social",
  "Nefrologia",
  "Neurocirurgia",
  "Neurologia",
  "Nutrologia",
  "Oftalmologia",
  "Ortopedia e Traumatologia",
  "Otorrinolaringologia",
  "Patologia",
  "Patologia Clínica/Medicina Laboratorial",
  "Pediatria",
  "Pneumologia",
  "Psiquiatria",
  "Radiologia e Diagnóstico por Imagem",
  "Radioterapia",
  "Reumatologia",
  "Urologia"
];

// Languages spoken options
export const languageOptions = [
  "Português",
  "Inglês",
  "Espanhol",
  "Francês",
  "Alemão",
  "Italiano",
  "Mandarim",
  "Japonês",
  "Árabe",
  "Russo"
];

// Payment method options
export const paymentMethodOptions = [
  "PIX",
  "Cartão de Crédito",
  "Cartão de Débito",
  "Boleto",
  "Dinheiro",
  "Transferência Bancária"
];

// Personal Information schema
export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Nome completo deve ter pelo menos 3 caracteres" }),

  email: z
    .string()
    .min(1, { message: "E-mail é obrigatório" })
    .email({ message: "Formato de e-mail inválido" }),

  password: z
    .string()
    .min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
    .refine(
      (password) => /[A-Za-z]/.test(password) && /[0-9]/.test(password),
      { message: "Senha deve conter pelo menos uma letra e um número" }
    ),

  confirmPassword: z.string(),

  phoneNumber: z
    .string()
    .min(1, { message: "Telefone é obrigatório" })
    .regex(
      /^\+55\s\d{2}\s\d{5}-\d{4}$/,
      { message: "Telefone deve seguir o formato: +55 99 99999-9999" }
    ),

  profilePicture: z.any().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

// Professional Information schema
export const professionalInfoSchema = z.object({
  crm: z
    .string()
    .min(1, { message: "CRM é obrigatório" })
    .regex(/^\d{4,6}$/, { message: "CRM deve conter de 4 a 6 dígitos numéricos" }),

  crmState: z
    .enum(brazilianStates as [string, ...string[]], {
      required_error: "Estado do CRM é obrigatório",
      invalid_type_error: "Estado do CRM inválido",
    }),

  specialty: z
    .enum(medicalSpecialties as [string, ...string[]], {
      required_error: "Especialidade médica é obrigatória",
      invalid_type_error: "Especialidade médica inválida",
    }),

  professionalDescription: z
    .string()
    .max(500, { message: "Descrição deve ter no máximo 500 caracteres" })
    .optional(),

  languagesSpoken: z
    .array(z.string())
    .min(1, { message: "Selecione pelo menos um idioma" }),

  yearsOfExperience: z
    .number()
    .min(0, { message: "Anos de experiência deve ser maior ou igual a 0" })
    .int({ message: "Anos de experiência deve ser um número inteiro" }),
});

// Location and Consultation schema
export const locationConsultationSchema = z.object({
  offersInPersonConsultation: z.boolean(),

  // Only required if offersInPersonConsultation is true
  clinicAddress: z.object({
    street: z.string().min(1, { message: "Rua é obrigatória" }),
    number: z.string().min(1, { message: "Número é obrigatório" }),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, { message: "Bairro é obrigatório" }),
    city: z.string().min(1, { message: "Cidade é obrigatória" }),
    state: z.enum(brazilianStates as [string, ...string[]], {
      required_error: "Estado é obrigatório",
      invalid_type_error: "Estado inválido",
    }),
    zipCode: z
      .string()
      .min(1, { message: "CEP é obrigatório" })
      .regex(/^\d{5}-\d{3}$/, { message: "CEP deve seguir o formato: 12345-678" }),
  }).optional().refine(
    (data) => !data || Object.values(data).some(val => val !== undefined && val !== ""),
    {
      message: "Endereço da clínica é obrigatório para consultas presenciais",
      path: ["street"]
    }
  ),

  offersHomeConsultation: z.boolean(),

  offersTelemedicine: z.boolean(),
});

// Financial Configuration schema
export const financialConfigSchema = z.object({
  inPersonConsultationFee: z
    .number()
    .min(0, { message: "Valor deve ser maior ou igual a 0" })
    .optional(),

  onlineConsultationFee: z
    .number()
    .min(0, { message: "Valor deve ser maior ou igual a 0" })
    .optional(),

  acceptedPaymentMethods: z
    .array(z.string())
    .min(1, { message: "Selecione pelo menos um método de pagamento" }),

  bankAccount: z.object({
    bank: z.string().min(1, { message: "Banco é obrigatório" }),
    branch: z.string().min(1, { message: "Agência é obrigatória" }),
    accountNumber: z.string().min(1, { message: "Número da conta é obrigatório" }),
    accountType: z.enum(["checking", "savings"], {
      required_error: "Tipo de conta é obrigatório",
    }),
  }),
});

// Document Upload schema
export const documentUploadSchema = z.object({
  crmDocument: z
    .any()
    .refine((file) => file !== undefined, {
      message: "Documento CRM é obrigatório",
    }),

  diplomaOrCertificate: z.any().optional(),

  identityDocument: z
    .any()
    .refine((file) => file !== undefined, {
      message: "Documento de identidade é obrigatório",
    }),
});

// Complete doctor registration schema
export const doctorRegistrationSchema = z.object({
  personalInfo: personalInfoSchema,
  professionalInfo: professionalInfoSchema,
  locationConsultation: locationConsultationSchema,
  financialConfig: financialConfigSchema,
  documentUpload: documentUploadSchema,
});

// Doctor login schema
export const doctorLoginSchema = z.object({
  emailOrCRM: z
    .string()
    .min(1, { message: "E-mail ou CRM é obrigatório" }),
  password: z
    .string()
    .min(1, { message: "Senha é obrigatória" }),
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  emailOrCRM: z
    .string()
    .min(1, { message: "E-mail ou CRM é obrigatório" }),
});

// Reset password schema
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
    .refine(
      (password) => /[A-Za-z]/.test(password) && /[0-9]/.test(password),
      { message: "Senha deve conter pelo menos uma letra e um número" }
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

// Types derived from schemas
export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
export type ProfessionalInfoFormValues = z.infer<typeof professionalInfoSchema>;
export type LocationConsultationFormValues = z.infer<typeof locationConsultationSchema>;
export type FinancialConfigFormValues = z.infer<typeof financialConfigSchema>;
export type DocumentUploadFormValues = z.infer<typeof documentUploadSchema>;
export type DoctorRegistrationFormValues = z.infer<typeof doctorRegistrationSchema>;
export type DoctorLoginFormValues = z.infer<typeof doctorLoginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
