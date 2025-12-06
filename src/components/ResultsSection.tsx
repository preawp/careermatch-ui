import type { ResumeSections } from "../types/resume";
import { Spinner } from "./Spinner";
import {
    EducationSection,
    ExperienceSection,
    ProjectsSection,
    PublicationsSection,
} from "./sections";

interface ResultsSectionProps {
    sections: ResumeSections | null;
    isLoading: boolean;
    hasResults: boolean;
}

export function ResultsSection({
    sections,
    isLoading,
    hasResults,
}: ResultsSectionProps) {
    const education = sections?.education ?? [];
    const experience = sections?.experience ?? [];
    const projects = sections?.projects ?? [];
    const publications = sections?.publications ?? [];

    return (
        <section className={`results ${isLoading ? "results--loading" : ""}`}>
            {isLoading && (
                <div className="loading-overlay">
                    <Spinner size="lg" />
                    <span>Analyzing your resume…</span>
                </div>
            )}

            <div className="results-header">
                <h2>Parsed Sections</h2>
                {isLoading && <span className="status-pill">Processing</span>}
            </div>

            {hasResults ? (
                <div className="sections-grid">
                    <EducationSection education={education} />
                    <ExperienceSection experience={experience} />
                    <ProjectsSection projects={projects} />
                    <PublicationsSection publications={publications} />
                </div>
            ) : (
                !isLoading && (
                    <div className="empty-state">
                        <h3>No data yet</h3>
                        <p>
                            Upload a resume file to extract and view structured sections
                            including education, experience, projects, and publications.
                        </p>
                    </div>
                )
            )}
        </section>
    );
}
