import type { ResumeSections } from "../types/resume";
import type { Job } from "../types/job";
import { ResumeCard } from "../components/ResumeCard";
import { JobsPanel } from "../components/JobsPanel";

interface ResultsViewProps {
    sections: ResumeSections;
    jobs: Job[];
    isLoadingJobs: boolean;
    jobsError?: string | null;
    jobLimit: number;
    onJobLimitChange: (limit: number) => void;
    onRetryJobs?: () => void;
    onUploadNew: () => void;
}

export function ResultsView({
    sections,
    jobs,
    isLoadingJobs,
    jobsError,
    jobLimit,
    onJobLimitChange,
    onRetryJobs,
    onUploadNew
}: ResultsViewProps) {
    return (
        <div className="results-view">
            <div className="results-header">
                <h1 className="results-title">Resume Analysis</h1>
                <div className="results-actions">
                    <button className="btn-secondary" onClick={onUploadNew}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 16V4m0 0L8 8m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 16v4h14v-4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Upload New
                    </button>
                </div>
            </div>

            <div className="results-grid">
                <ResumeCard sections={sections} />
                <JobsPanel
                    jobs={jobs}
                    isLoading={isLoadingJobs}
                    error={jobsError}
                    jobLimit={jobLimit}
                    onJobLimitChange={onJobLimitChange}
                    onRetry={onRetryJobs}
                />
            </div>
        </div>
    );
}
