export interface BasicInfo {
  name: string;
  designation: string;
  number: string;
  email: string;
  nationality: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface SkillsInfo {
  technical: string[];
  soft: string[];
  languages: string[];
}

export interface ExperienceInfo {
  name: string;
  startDate: string;
  endDate: string;
  grade: Record<
    string,
    {
      clientName: string;
      duration: string;
      highlights: string[];
    }
  >;
}

export interface EducationInfo {
  degree: string;
  startDate: string;
  endDate: string;
  university: string;
  modules: string[];
}

export interface CertificationInfo {
  name: string;
  date: string;
  issuingBody: string;
}

export interface ResumeData {
  basic: BasicInfo;
  skills: SkillsInfo;
  experience: ExperienceInfo[];
  education: EducationInfo[];
  certification: CertificationInfo[];
  references: string;
}
