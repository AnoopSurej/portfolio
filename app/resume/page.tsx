import fs from "fs/promises";
import { GetStaticProps } from "next";
import "../globals.css";

interface BasicInfo {
  name: string;
  designation: string;
  number: string;
  email: string;
  nationality: string;
  linkedin: string;
  summary: string;
}

interface SkillsInfo {
  technical: string[];
  soft: string[];
  languages: string[];
}

interface ExperienceInfo {
  name: string
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
  };

interface EducationInfo {
  degree: string;
  startDate: string;
  endDate: string;
  university: string;
  modules: string[];
}

interface CertificationInfo {
  name: string;
  date: string;
  issuingBody: string;
}

interface ResumeData {
  basic: BasicInfo;
  skills: SkillsInfo;
  experience: ExperienceInfo[];
  education: EducationInfo[];
  certification: CertificationInfo[];
  references: string;
}

export default async function ResumePage() {
  let resumeData: ResumeData | undefined;
  try {
    console.log(process.cwd());
    const file = await fs.readFile(process.cwd() + "/resume.json", "utf8");
    resumeData = JSON.parse(file);
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
  if (!resumeData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex-row text-justify">
      <h1 className="text-2xl">Resume</h1>
      <div>
        <h2 className="text-xl text-">Basic Information</h2>
        <ul>
          <li>Name: {resumeData.basic.name}</li>
          <li>Designation: {resumeData.basic.designation}</li>
          <li>Number: {resumeData.basic.number}</li>
          <li>Email: {resumeData.basic.email}</li>
          <li>Nationality: {resumeData.basic.nationality}</li>
          <li>LinkedIn: {resumeData.basic.linkedin}</li>
          <li>Summary: {resumeData.basic.summary}</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl text-emerald-500">Skills</h2>
        <h3 className="text-lg text-indigo-500">Technical Skills:</h3>
        <div className="grid grid-flow-row-dense grid-cols-4">
          {resumeData.skills.technical.map((skill, index) => (
            <div key={index} className="flex justify-center p-1">
              <div className="border rounded-full p-2">{skill}</div>
            </div>
          ))}
        </div>
        <h3 className="text-lg text-indigo-500">Soft Skills:</h3>
        <div className="grid grid-flow-row-dense grid-cols-4">
          {resumeData.skills.soft.map((skill, index) => (
            <div key={index} className="flex justify-center p-1">
              <div className="border rounded-full p-2">{skill}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl text-emerald-500">Experience</h2>
        {resumeData.experience.map(
          (experience, index) => (
            <div key={index}>
              <h3>{experience.name}</h3>
              {Object.entries(experience.grade).map(([role, details]) => {
                const roleDetails = details as unknown as {
                  clientName: string;
                  duration: string;
                  highlights: string[];
                };
                return (
                  <div key={role}>
                    <h4>{role}</h4>
                    <p>Client Name: {roleDetails.clientName}</p>
                    <p>Duration: {roleDetails.duration}</p>
                    <ul>
                      {roleDetails.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      <div>
        <h2 className="text-xl text-emerald-500">Education</h2>
        {resumeData.education.map((education, index) => (
          <div key={index}>
            <h3>{education.degree}</h3>
            <p>University: {education.university}</p>
            <p>
              Duration: {education.startDate} - {education.endDate}
            </p>
            <ul>
              {education.modules.map((module, index) => (
                <li key={index}>{module}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl text-emerald-500">Certifications</h2>
        {resumeData.certification.map((certification, index) => (
          <div key={index}>
            <h3>{certification.name}</h3>
            <p>Date: {certification.date}</p>
            <p>Issuing Body: {certification.issuingBody}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl text-emerald-500">References</h2>
        <p>{resumeData.references}</p>
      </div>
    </div>
  );
}
