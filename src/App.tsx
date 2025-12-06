import { useCallback, useMemo, useState } from "react";
import "./App.css";

import { parseResume } from "./api/resume";
import { fetchMatchingJobs } from "./api/jobs";
import { Toast, ThemeToggle } from "./components";
import { UploadView, ResultsView } from "./views";
import { useTheme } from "./hooks/useTheme";
import type { ResumeSections } from "./types/resume";
import type { Job, CategoryMatch } from "./types/job";

interface ToastState {
  message: string;
  type: "error" | "success" | "info";
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [sections, setSections] = useState<ResumeSections | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [jobLimit, setJobLimit] = useState<number>(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recommendedCategory, setRecommendedCategory] = useState<string | null>(null);
  const [recommendedCategories, setRecommendedCategories] = useState<CategoryMatch[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback(
    (message: string, type: ToastState["type"] = "error") => {
      setToast({ message, type });
    },
    []
  );

  const dismissToast = useCallback(() => setToast(null), []);

  const hasResults = useMemo(() => {
    if (!sections) return false;
    const { education, experience, projects, publications, contact, skills } = sections;
    const hasList = [education, experience, projects, publications, skills].some(
      (items) => Array.isArray(items) && items.length > 0
    );
    const hasContact = contact
      ? Object.values(contact).some((value) => Boolean(value))
      : false;
    return hasList || hasContact;
  }, [sections]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resumeFile) {
      showToast("Please add a resume file first.", "error");
      return;
    }

    setIsLoading(true);
    setToast(null);

    try {
      // Parse resume
      const payload = await parseResume(resumeFile);
      setSections(payload.sections ?? null);
      showToast("Resume parsed successfully!", "success");

      // Fetch matching jobs
      setIsLoadingJobs(true);
      setJobsError(null);
      try {
        const jobsResponse = await fetchMatchingJobs(resumeFile, jobLimit);
        setJobs(jobsResponse.jobs ?? []);
        // Set the recommended categories from the API response
        if (jobsResponse.categories && jobsResponse.categories.length > 0) {
          setRecommendedCategories(jobsResponse.categories);
          setRecommendedCategory(jobsResponse.categories[0].category);
          setSelectedCategory(jobsResponse.categories[0].category);
        } else if (jobsResponse.category) {
          setRecommendedCategory(jobsResponse.category);
          setSelectedCategory(jobsResponse.category);
        }
      } catch (jobError) {
        console.error("Failed to fetch jobs:", jobError);
        setJobs([]);
        setJobsError(
          jobError instanceof Error
            ? jobError.message
            : "Failed to fetch matching jobs. Please try again."
        );
      } finally {
        setIsLoadingJobs(false);
      }
    } catch (error) {
      console.error(error);
      setSections(null);
      setJobs([]);
      showToast(
        error instanceof Error
          ? error.message
          : "Something went wrong while parsing your resume.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setResumeFile(file);
  };

  const handleFileRemove = () => {
    setResumeFile(null);
  };

  const handleUploadNew = () => {
    setResumeFile(null);
    setSections(null);
    setJobs([]);
    setJobsError(null);
    setSelectedCategory(null);
    setRecommendedCategory(null);
    setRecommendedCategories([]);
  };

  const fetchJobs = useCallback(async (limit: number, category?: string | null) => {
    if (!resumeFile) return;

    setIsLoadingJobs(true);
    setJobsError(null);
    try {
      const jobsResponse = await fetchMatchingJobs(resumeFile, limit, category || undefined);
      setJobs(jobsResponse.jobs ?? []);
      // Update recommended category if returned
      if (jobsResponse.category && !recommendedCategory) {
        setRecommendedCategory(jobsResponse.category);
      }
    } catch (jobError) {
      console.error("Failed to fetch jobs:", jobError);
      setJobs([]);
      setJobsError(
        jobError instanceof Error
          ? jobError.message
          : "Failed to fetch matching jobs. Please try again."
      );
    } finally {
      setIsLoadingJobs(false);
    }
  }, [resumeFile, recommendedCategory]);

  const handleRetryJobs = useCallback(() => {
    fetchJobs(jobLimit, selectedCategory);
  }, [fetchJobs, jobLimit, selectedCategory]);

  const handleJobLimitChange = useCallback((newLimit: number) => {
    setJobLimit(newLimit);
    fetchJobs(newLimit, selectedCategory);
  }, [fetchJobs, selectedCategory]);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
    fetchJobs(jobLimit, category);
  }, [fetchJobs, jobLimit]);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <a href="/" className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            CareerMatch
          </a>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={dismissToast}
        />
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p>Analyzing your resume...</p>
        </div>
      )}

      {/* Main Content */}
      {hasResults && sections ? (
        <ResultsView
          sections={sections}
          jobs={jobs}
          isLoadingJobs={isLoadingJobs}
          jobsError={jobsError}
          jobLimit={jobLimit}
          selectedCategory={selectedCategory}
          recommendedCategory={recommendedCategory}
          recommendedCategories={recommendedCategories}
          onJobLimitChange={handleJobLimitChange}
          onCategoryChange={handleCategoryChange}
          onRetryJobs={handleRetryJobs}
          onUploadNew={handleUploadNew}
        />
      ) : (
        <UploadView
          resumeFile={resumeFile}
          isLoading={isLoading}
          onFileChange={handleFileChange}
          onFileRemove={handleFileRemove}
          onSubmit={handleSubmit}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 CareerMatch. Built with React & TypeScript.</p>
      </footer>
    </div>
  );
}

export default App;
