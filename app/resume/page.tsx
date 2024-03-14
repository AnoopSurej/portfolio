import { promises as fs } from 'fs';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from 'react';

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
    grade: ExperienceInfoRole;
}

interface ExperienceInfoRole {
    [role: string]: {
        clientName: string;
        duration: string;
        highlights: string[];
    };
}

function basicDetails(basicInfo: BasicInfo) {
    return (
        <div>
            {
                Object.entries(basicInfo).map(([key,value]) => <h1 key={key}>{key}: {value}</h1>)
            }
        </div>
    );
}

function skillsDetails(skillsInfo: SkillsInfo) {
    return (
        <div>
            <h1>Skills:</h1>
            {Object.entries(skillsInfo).map(([type, skills]) => (
                <div key={type}>
                    <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Skills:</h2>
                    <ul>
                        {skills.map((skill: string, index: Key) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

function experienceDetails(experienceInfo: ExperienceInfo) {
    return (
        <div>
            <h1>Experience:</h1>
            {Object.entries(experienceInfo).map(([name, experience]) => (
                <div key={name}>
                    <h2>{experience.name}:</h2>
                    {Object.entries(experience.grade).map(([role, details]) => {
                        const roleDetails = details as {
                            clientName: string;
                            duration: string;
                            highlights: string[];
                        };
                        return(
                            <div key={role}>
                                <h3>{role}:</h3>
                                <p>Client: {roleDetails.clientName}</p>
                                <p>Duration: {roleDetails.duration}</p>
                                <ol>
                                    {roleDetails.highlights.map((highlight:string, index:Key) => (
                                        <li key={index}>{highlight}</li>
                                    ))}
                                </ol>
                            </div>

                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default async function ResumePage() {
    const file = await fs.readFile(process.cwd() + '/resume.json', 'utf8');
    const info = JSON.parse(file);
    return(
        <div>
            <h1>Resume</h1>
            <div>
                <div>{basicDetails(info.basic)}</div>
                <div>{skillsDetails(info.skills)}</div>
                <div>{experienceDetails(info.experience)}</div>
            </div>
        </div>
    );
}