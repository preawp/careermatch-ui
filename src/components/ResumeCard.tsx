import type { ResumeSections } from "../types/resume";

interface ResumeCardProps {
    sections: ResumeSections;
}

function ensureUrl(url: string): string {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
}

export function ResumeCard({ sections }: ResumeCardProps) {
    const displayName = sections.contact?.full_name || sections.contact?.name;

    return (
        <div className="resume-card">
            <div className="resume-card-content">
                {/* Contact Section */}
                {sections.contact && (
                    <div className="resume-section">
                        {displayName && (
                            <h1 className="resume-name">{displayName}</h1>
                        )}
                        <div className="contact-grid">
                            {sections.contact.email && (
                                <div className="contact-item">
                                    <span className="contact-label">Email</span>
                                    <a href={`mailto:${sections.contact.email}`} className="contact-value contact-link">
                                        {sections.contact.email}
                                    </a>
                                </div>
                            )}
                            {sections.contact.phone && (
                                <div className="contact-item">
                                    <span className="contact-label">Phone</span>
                                    <span className="contact-value">{sections.contact.phone}</span>
                                </div>
                            )}
                            {sections.contact.linkedin && (
                                <div className="contact-item">
                                    <span className="contact-label">LinkedIn</span>
                                    <a href={ensureUrl(sections.contact.linkedin)} target="_blank" rel="noopener noreferrer" className="contact-value contact-link">
                                        View Profile
                                    </a>
                                </div>
                            )}
                            {sections.contact.github && (
                                <div className="contact-item">
                                    <span className="contact-label">GitHub</span>
                                    <a href={ensureUrl(sections.contact.github)} target="_blank" rel="noopener noreferrer" className="contact-value contact-link">
                                        View Profile
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Education Section */}
                {sections.education && sections.education.length > 0 && (
                    <div className="resume-section">
                        <h2 className="resume-section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
                            </svg>
                            Education
                        </h2>
                        {sections.education.map((edu, index) => (
                            <div key={index} className="resume-entry">
                                <div className="resume-entry-header">
                                    <h3 className="resume-entry-title">{edu.degree}</h3>
                                    {edu.dates && <span className="resume-entry-date">{edu.dates}</span>}
                                </div>
                                <p className="resume-entry-subtitle">{edu.institution}</p>
                                {edu.gpa && <p className="resume-entry-meta">GPA: {edu.gpa}</p>}
                                {edu.details && edu.details.length > 0 && (
                                    <ul className="resume-entry-list">
                                        {edu.details.map((detail, i) => (
                                            <li key={i}>{detail}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Experience Section */}
                {sections.experience && sections.experience.length > 0 && (
                    <div className="resume-section">
                        <h2 className="resume-section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                            Experience
                        </h2>
                        {sections.experience.map((exp, index) => (
                            <div key={index} className="resume-entry">
                                <div className="resume-entry-header">
                                    <h3 className="resume-entry-title">{exp.title}</h3>
                                    {exp.dates && <span className="resume-entry-date">{exp.dates}</span>}
                                </div>
                                <p className="resume-entry-subtitle">
                                    {exp.company}
                                    {exp.location && ` • ${exp.location}`}
                                </p>
                                {exp.bullets && exp.bullets.length > 0 && (
                                    <ul className="resume-entry-list">
                                        {exp.bullets.map((bullet, i) => (
                                            <li key={i}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects Section */}
                {sections.projects && sections.projects.length > 0 && (
                    <div className="resume-section">
                        <h2 className="resume-section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                            </svg>
                            Projects
                        </h2>
                        {sections.projects.map((project, index) => (
                            <div key={index} className="resume-entry">
                                <div className="resume-entry-header">
                                    <h3 className="resume-entry-title">
                                        {project.name}
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="resume-entry-link">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                    <polyline points="15 3 21 3 21 9" />
                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                </svg>
                                            </a>
                                        )}
                                    </h3>
                                    {project.dates && <span className="resume-entry-date">{project.dates}</span>}
                                </div>
                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="tech-tags">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                )}
                                {project.bullets && project.bullets.length > 0 && (
                                    <ul className="resume-entry-list">
                                        {project.bullets.map((bullet, i) => (
                                            <li key={i}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills Section */}
                {sections.skills && sections.skills.length > 0 && (
                    <div className="resume-section">
                        <h2 className="resume-section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            Skills
                        </h2>
                        <div className="skills-grid">
                            {sections.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Publications Section */}
                {sections.publications && sections.publications.length > 0 && (
                    <div className="resume-section">
                        <h2 className="resume-section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
                            Publications
                        </h2>
                        {sections.publications.map((pub, index) => (
                            <div key={index} className="resume-entry">
                                <h3 className="resume-entry-title">{pub.title}</h3>
                                {pub.authors && <p className="resume-entry-subtitle">{pub.authors}</p>}
                                {pub.venue && <p className="resume-entry-meta">{pub.venue}</p>}
                                {pub.link && (
                                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="resume-entry-external">
                                        View Publication →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
