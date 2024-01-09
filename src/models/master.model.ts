export interface AstrologerFormData {
  mobileNumber: string;
  gender: string;
  name: string;
  dateOfBirth: string;
  experience: number;
  country: string;
  introduction: string;
  consultationMobileNumber: string;
  specialties: string[];
  languages: string[];
  profile: File | null;
  gallery: File[];
  incomeRatio: number;
  callStatus: string;
  fullCallFee: number;
  CutCallFee: number;
  skills: string[];
}
