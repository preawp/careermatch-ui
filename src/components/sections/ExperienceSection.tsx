import type { ExperienceItem } from "../../types/resume";

interface ExperienceSectionProps {
    experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
    if (experience.length === 0) return null;

    return (
        <article className="section-card">
            <header>
                <p>Experience</p>
                <h3>Work history</h3>
            </header>
            <ul>
                {experience.map((role, index) => (
                    <li key={`${role.company}-${index}`}>
                        <strong>{role.title}</strong>
                        <span>
                            {role.company}
                            {role.location ? ` · ${role.location}` : ""}
                        </span>
                        {role.dates && <span>{role.dates}</span>}
                        {role.bullets && role.bullets.length > 0 && (
                            <ul className="responsibilities">
                                {role.bullets.map((item: string, i: number) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </article>
    );
}
