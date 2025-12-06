import type { ProjectItem } from "../../types/resume";

interface ProjectsSectionProps {
    projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    if (projects.length === 0) return null;

    return (
        <article className="section-card">
            <header>
                <p>Projects</p>
                <h3>Highlighted builds</h3>
            </header>
            <ul>
                {projects.map((project, index) => (
                    <li key={`${project.name}-${index}`}>
                        <strong>{project.name}</strong>
                        {project.technologies && <span>{project.technologies.join(", ")}</span>}
                        {project.dates && <span>{project.dates}</span>}
                        {project.bullets && (
                            <ul className="responsibilities">
                                {project.bullets.map((line: string, i: number) => (
                                    <li key={i}>{line}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </article>
    );
}
