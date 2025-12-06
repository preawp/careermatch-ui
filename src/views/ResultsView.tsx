import type { ResumeSections } from "../types/resume";
import type { Job, CategoryMatch } from "../types/job";
import { ResumeCard } from "../components/ResumeCard";
import { JobsPanel } from "../components/JobsPanel";

interface ResultsViewProps {
    sections: ResumeSections;
    jobs: Job[];
    isLoadingJobs: boolean;
    jobsError?: string | null;
    jobLimit: number;
    selectedCategory: string | null;
    recommendedCategories: CategoryMatch[];
    onJobLimitChange: (limit: number) => void;
    onCategoryChange: (category: string | null) => void;
    onRetryJobs?: () => void;
}

export function ResultsView({
    sections,
    jobs,
    isLoadingJobs,
    jobsError,
    jobLimit,
    selectedCategory,
    recommendedCategories,
    onJobLimitChange,
    onCategoryChange,
    onRetryJobs
}: ResultsViewProps) {
    return (
        <div className="results-view">
            <div className="results-grid">
                <ResumeCard sections={sections} />
                <JobsPanel
                    jobs={jobs}
                    isLoading={isLoadingJobs}
                    error={jobsError}
                    jobLimit={jobLimit}
                    selectedCategory={selectedCategory}
                    recommendedCategories={recommendedCategories}
                    onJobLimitChange={onJobLimitChange}
                    onCategoryChange={onCategoryChange}
                    onRetry={onRetryJobs}
                />
            </div>
        </div>
    );
}
