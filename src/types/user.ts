export interface User {
  id: string;
  name: string;
  birthDate: string;
  weight: number;
  height: number;
  email: string;
  medicalAuthorization: boolean;
  disease?: {
    general: string;
    specific: string;
    diagnosisDate: string;
    hasTreatment: boolean;
    treatmentStartDate?: string;
    treatments?: string[];
    sideEffects?: string[];
  };
  physicalProfile: Record<number, boolean>;
}