"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { toast } from "sonner";
import { StepHeader } from "@/components/registration/StepHeader";
import { PersonalInfoForm } from "@/components/registration/PersonalInfoForm";
import { ProfessionalInfoForm } from "@/components/registration/ProfessionalInfoForm";
import { LocationConsultationForm } from "@/components/registration/LocationConsultationForm";
import { FinancialConfigForm } from "@/components/registration/FinancialConfigForm";
import { DocumentUploadForm } from "@/components/registration/DocumentUploadForm";
import { RegistrationSuccess } from "@/components/registration/RegistrationSuccess";
import type {
  PersonalInfoFormValues,
  ProfessionalInfoFormValues,
  LocationConsultationFormValues,
  FinancialConfigFormValues,
  DocumentUploadFormValues
} from "@/lib/schemas/doctor-schema";

type RegistrationStep =
  | 'personal-info'
  | 'professional-info'
  | 'location-consultation'
  | 'financial-config'
  | 'document-upload'
  | 'success';

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('personal-info');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [registrationData, setRegistrationData] = useState({
    personalInfo: {} as PersonalInfoFormValues,
    professionalInfo: {} as ProfessionalInfoFormValues,
    locationConsultation: {} as LocationConsultationFormValues,
    financialConfig: {} as FinancialConfigFormValues,
    documentUpload: {} as DocumentUploadFormValues,
  });

  const steps = [
    "Informações Pessoais",
    "Informações Profissionais",
    "Localização e Consultas",
    "Configuração Financeira",
    "Documentos"
  ];

  const currentStepIndex = (() => {
    switch (currentStep) {
      case 'personal-info': return 0;
      case 'professional-info': return 1;
      case 'location-consultation': return 2;
      case 'financial-config': return 3;
      case 'document-upload': return 4;
      case 'success': return 5;
    }
  })();

  // Handlers for form submissions
  const handlePersonalInfoSubmit = (data: PersonalInfoFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setRegistrationData(prev => ({
        ...prev,
        personalInfo: data
      }));
      setCurrentStep('professional-info');
      setIsSubmitting(false);
      toast.success("Informações pessoais salvas com sucesso!");
    }, 1000);
  };

  const handleProfessionalInfoSubmit = (data: ProfessionalInfoFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setRegistrationData(prev => ({
        ...prev,
        professionalInfo: data
      }));
      setCurrentStep('location-consultation');
      setIsSubmitting(false);
      toast.success("Informações profissionais salvas com sucesso!");
    }, 1000);
  };

  const handleLocationConsultationSubmit = (data: LocationConsultationFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setRegistrationData(prev => ({
        ...prev,
        locationConsultation: data
      }));
      setCurrentStep('financial-config');
      setIsSubmitting(false);
      toast.success("Informações de localização e consulta salvas com sucesso!");
    }, 1000);
  };

  const handleFinancialConfigSubmit = (data: FinancialConfigFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setRegistrationData(prev => ({
        ...prev,
        financialConfig: data
      }));
      setCurrentStep('document-upload');
      setIsSubmitting(false);
      toast.success("Informações financeiras salvas com sucesso!");
    }, 1000);
  };

  const handleDocumentUploadSubmit = (data: DocumentUploadFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setRegistrationData(prev => ({
        ...prev,
        documentUpload: data
      }));
      setCurrentStep('success');
      setIsSubmitting(false);
      toast.success("Documentos enviados com sucesso!");
    }, 1500);
  };

  const goBack = () => {
    switch (currentStep) {
      case 'professional-info':
        setCurrentStep('personal-info');
        break;
      case 'location-consultation':
        setCurrentStep('professional-info');
        break;
      case 'financial-config':
        setCurrentStep('location-consultation');
        break;
      case 'document-upload':
        setCurrentStep('financial-config');
        break;
    }
  };

  // If registration is complete, show success page
  if (currentStep === 'success') {
    return <RegistrationSuccess />;
  }

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>Cadastro de Médico</CardTitle>
        <CardDescription>
          Preencha o formulário para se cadastrar como médico no Portal Médico
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Step indicator */}
        <StepHeader
          currentStep={currentStepIndex}
          steps={steps}
        />

        {/* Forms based on current step */}
        {currentStep === 'personal-info' && (
          <PersonalInfoForm
            defaultValues={registrationData.personalInfo}
            onSubmit={handlePersonalInfoSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {currentStep === 'professional-info' && (
          <ProfessionalInfoForm
            defaultValues={registrationData.professionalInfo}
            onSubmit={handleProfessionalInfoSubmit}
            onBack={goBack}
            isSubmitting={isSubmitting}
          />
        )}

        {currentStep === 'location-consultation' && (
          <LocationConsultationForm
            defaultValues={registrationData.locationConsultation}
            onSubmit={handleLocationConsultationSubmit}
            onBack={goBack}
            isSubmitting={isSubmitting}
          />
        )}

        {currentStep === 'financial-config' && (
          <FinancialConfigForm
            defaultValues={registrationData.financialConfig}
            onSubmit={handleFinancialConfigSubmit}
            onBack={goBack}
            isSubmitting={isSubmitting}
            offersInPerson={registrationData.locationConsultation.offersInPersonConsultation || false}
            offersTelemedicine={registrationData.locationConsultation.offersTelemedicine || false}
          />
        )}

        {currentStep === 'document-upload' && (
          <DocumentUploadForm
            defaultValues={registrationData.documentUpload}
            onSubmit={handleDocumentUploadSubmit}
            onBack={goBack}
            isSubmitting={isSubmitting}
          />
        )}
      </CardContent>
    </Card>
  );
}
