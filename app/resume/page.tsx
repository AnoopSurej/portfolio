import fs from "fs/promises";
import { GetStaticProps } from "next";
import "../globals.css";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const montserrat = Montserrat({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

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
      <h1 className="flex flex-row justify-center font-montserrat font-bold text-2xl p-4">
        Resume
      </h1>
      <div className="border rounded-3xl border-columbia-blue border-opacity-20 p-5 my-4">
        <h2 className="flex flex-row justify-center text-celeste-green font-montserrat font-semibold text-xl mx-2 mb-2">
          Basic Information
        </h2>
        <div className="">
          <div className="flex justify-center">
            <div className="flex flex-col w-[35%] justify-start ml-2">
              <div className="font-montserrat font-bold text-4xl py-1">
                {resumeData.basic.name}
              </div>
              <div className="font-montserrat font-semibold text-md pb-2">
                {resumeData.basic.designation}
              </div>
              <div>Contact:</div>
              <div>{resumeData.basic.number}</div>
              <div>{resumeData.basic.email}</div>
              <div className="flex flex-row ">
                <Image
                  src="/linkedin-icon.svg"
                  height={20}
                  width={20}
                  alt={"LinkedIn Icon"}
                  className="m"
                />
                <div>
                  <a
                    href="https://linkedin.com/in/anoop-surej/"
                    target="_blank"
                  >
                    {resumeData.basic.linkedin}
                  </a>
                </div>
              </div>
              <div className="mt-3">
                Nationality: {resumeData.basic.nationality}
              </div>
            </div>
            <div className="flex max-w-[60%]">
              <div className="italic text-columbia-blue opacity-45 my-auto">
                {resumeData.basic.summary}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-3xl border-columbia-blue border-opacity-20 my-4">
        <div className="mb-2">
          <h2 className="flex flex-row justify-center text-celeste-green font-montserrat font-semibold text-xl p-3">
            Skills
          </h2>
          <h3 className="flex flex-row justify-center text-lg text-robin-blue pb-3">
            Technical Skills:
          </h3>
          <div className="flex flex-row justify-center mb-4">
            <div className="flex flex-wrap justify-center items-center w-[70%]">
              {resumeData.skills.technical.map((skill, index) => (
                <div key={index} className="flex justify-center p-1">
                  <div className="border-2 border-columbia-blue border-opacity-40 rounded-full p-2">
                    {skill}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-10">
            <h3 className="flex flex-row justify-center text-lg text-robin-blue">
              Soft Skills:
            </h3>
            <div className="flex flex-row justify-center mb-4">
              <div className="flex flex-wrap justify-center items-center w-[70%]">
                {resumeData.skills.soft.map((skill, index) => (
                  <div key={index} className="flex justify-center p-1">
                    <div className="border-2 border-celeste-green border-opacity-40 rounded-full p-2">
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-3xl border-columbia-blue border-opacity-20 my-4 p-5">
        <h2 className="flex flex-row justify-center text-celeste-green font-montserrat font-semibold text-xl p-3">
          Experience
        </h2>
        {resumeData.experience.map((experience, index) => (
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
        ))}
      </div>

      <div className="border rounded-3xl border-columbia-blue border-opacity-20 my-4 p-5">
        <h2 className="flex flex-row justify-center text-celeste-green font-montserrat font-semibold text-xl p-3">
          Education
        </h2>
        {resumeData.education.map((education, index) => (
          <div key={index}>
            <div className="flex justify-center mb-5">
              <div className="font-bold mx-1">{education.degree}</div>
              <div className="opacity-60 italic mx-1"> from </div>
              <div className="font-bold mx-1"> {education.university} </div>
              <div className="italic opacity-60">
                {education.startDate} - {education.endDate}
              </div>
            </div>
            <h3 className="flex flex-row justify-center text-lg text-robin-blue pb-3">
              Modules:
            </h3>
            <div className="flex flex-row justify-center mb-4">
              <div className="flex flex-wrap justify-center items-center w-[70%]">
                {education.modules.map((module, index) => (
                  <div key={index} className="flex flex-row justify-center p-2">
                    <div className="border-2 border-celeste-green border-opacity-40 rounded-full p-3">
                      {module}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border rounded-3xl border-columbia-blue border-opacity-20 my-4 p-5">
        <h2 className="flex flex-row justify-center font-montserrat font-semibold text-xl text-celeste-green p-3">
          Certifications
        </h2>
        {resumeData.certification.map((certification, index) => (
          <div key={index} className="flex justify-center mb-4">
            <div className="font-bold mx-1">{certification.name}</div>
            <div className="opacity-60 italic mx-1">issued by</div>
            <div className="font-bold mx-1">{certification.issuingBody}</div>
            <div className="opacity-60 italic mx-1">in</div>
            <div className="opacity-60 italic mx-1">{certification.date}</div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="flex flex-row justify-center font-montserrat font-semibold text-xl text-celeste-green p-3">
          References
        </h2>
        <p className="flex flex-row justify-center">{resumeData.references}</p>
      </div>
    </div>
  );
}
