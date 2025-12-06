import type { EducationItem } from "../../types/resume";

interface EducationSectionProps {
    education: EducationItem[];
}

export function EducationSection({ education }: EducationSectionProps) {
    if (education.length === 0) return null;

    return (
        <article className="section-card">
            <header>
                <p>Education</p>
                <h3>Academic journey</h3>
            </header>
            <ul>
                {education.map((item, index) => (
                    <li key={`${item.institution}-${index}`}>
                        <strong>{item.degree}</strong>
                        <span>{item.institution}</span>
                        {item.location && <span>{item.location}</span>}
                        {item.dates && <span>{item.dates}</span>}
                        {item.gpa && <span>GPA · {item.gpa}</span>}
                    </li>
                ))}
            </ul>
        </article>
    );
}
