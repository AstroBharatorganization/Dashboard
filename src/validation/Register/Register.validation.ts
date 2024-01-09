import { AstrologerFormData } from "@/models/master.model";

export const validateForm = (formData: AstrologerFormData) => {
  const errors: Partial<Record<keyof AstrologerFormData, string>> = {};

  if (!formData.mobileNumber.trim()) {
    errors.mobileNumber = "Mobile Number is required";
  } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
    errors.mobileNumber = "Invalid Mobile Number";
  }

  if (!formData.consultationMobileNumber.trim()) {
    errors.consultationMobileNumber = "Mobile Number is required";
  } else if (!/^\d{10}$/.test(formData.consultationMobileNumber)) {
    errors.consultationMobileNumber = "Invalid consultation Number";
  }

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.gender.trim()) {
    errors.gender = "Gender is required";
  }

  if (!formData.dateOfBirth.trim()) {
    errors.dateOfBirth = "Date of Birth is required";
  }

  //   if (!formData.experience || formData.experience < -1) {
  //     errors.experience = "Experience must be greater than or equal to 0";
  //   }
  if (!formData.country.trim()) {
    errors.country = "Country is required";
  }
  if (
    !formData.incomeRatio ||
    formData.incomeRatio < 0 ||
    formData.incomeRatio > 1
  ) {
    errors.incomeRatio = "Income Ratio must be between 0 and 100";
  }

  if (!formData.callStatus.trim()) {
    errors.callStatus = "Call Status is required";
  }

  if (!formData.fullCallFee || formData.fullCallFee <= 0) {
    errors.fullCallFee = "Full Call Fee must be greater than 0";
  }

  if (!formData.CutCallFee || formData.CutCallFee <= 0) {
    errors.CutCallFee = "Cut Call Fee must be greater than 0";
  }
  if (!formData.languages || formData.languages.length === 0) {
    errors.languages = "At least one language is required";
  }

  if (!formData.specialties || formData.specialties.length === 0) {
    errors.specialties = "At least one specialty is required";
  }

  if (!formData.skills || formData.skills.length === 0) {
    errors.skills = "At least one skill is required";
  }

  if (!formData.introduction || formData.introduction.length < 20) {
    errors.introduction = "Add a introduction of at least 20 words";
  }

  if (!formData.profile) {
    errors.profile = "Profile image is required";
  }

  if (!formData.gallery || formData.gallery.length === 0) {
    errors.gallery = "Gallery images are required";
  }

  return errors;
};
