import type { Job } from "../types/job";
import { JOB_CATEGORIES, formatCategoryName } from "../constants/categories";

export const JOB_LIMIT_OPTIONS = [5, 10, 20, 50, 100];

interface JobsPanelProps {
  jobs: Job[];
  isLoading?: boolean;
  error?: string | null;
  jobLimit: number;
  selectedCategory: string | null;
  recommendedCategory: string | null;
  onJobLimitChange: (limit: number) => void;
  onCategoryChange: (category: string | null) => void;
  onRetry?: () => void;
}

export function JobsPanel({
  jobs,
  isLoading = false,
  error = null,
  jobLimit,
  selectedCategory,
  recommendedCategory,
  onJobLimitChange,
  onCategoryChange,
  onRetry
}: JobsPanelProps) {

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="jobs-state">
          <div className="jobs-state-icon jobs-state-icon--loading">
            <div className="spinner" />
          </div>
          <h3 className="jobs-state-title">Searching for matches...</h3>
          <p className="jobs-state-text">
            Analyzing your skills and experience to find the best job opportunities
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="jobs-state jobs-state--error">
          <div className="jobs-state-icon jobs-state-icon--error">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="jobs-state-title">Unable to load jobs</h3>
          <p className="jobs-state-text">{error}</p>
          {onRetry && (
            <button className="jobs-state-action" onClick={onRetry}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 4v6h6" />
                <path d="M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
              Try Again
            </button>
          )}
        </div>
      );
    }

    if (jobs.length === 0) {
      return (
        <div className="jobs-state jobs-state--empty">
          <div className="jobs-state-icon jobs-state-icon--empty">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <h3 className="jobs-state-title">No matching jobs found</h3>
          <p className="jobs-state-text">
            We couldn't find jobs matching your profile right now. Try updating your resume with more skills or check back later.
          </p>
          <div className="jobs-state-tips">
            <span className="jobs-state-tip">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Add relevant keywords
            </span>
            <span className="jobs-state-tip">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Include certifications
            </span>
            <span className="jobs-state-tip">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              List technical skills
            </span>
          </div>
        </div>
      );
    }

    return jobs.map((job) => {
      const salary = formatSalary(job.min_amount, job.max_amount, job.currency);
      const postedDate = job.date_posted ? formatDate(job.date_posted) : null;

      return (
        <div key={job.id} className="job-card">
          <div className="job-card-header">
            <div className="job-info">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-company">{job.company}</p>
            </div>
          </div>

          <div className="job-meta">
            <span className="job-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {job.location}
            </span>
            {job.job_type && <span className="job-type">{formatJobType(job.job_type)}</span>}
            {job.is_remote && <span className="job-remote">Remote</span>}
            {postedDate && <span className="job-posted">{postedDate}</span>}
          </div>

          {salary && (
            <div className="job-salary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              {salary}
            </div>
          )}

          {job.category && (
            <div className="job-category">
              <span className="job-category-tag">{formatCategoryName(job.category)}</span>
            </div>
          )}

          <button
            className="job-apply"
            onClick={() => job.job_url && window.open(job.job_url, '_blank')}
          >
            View Job
          </button>
        </div>
      );
    });
  };

  return (
    <div className="jobs-panel">
      <div className="jobs-header">
        <div className="jobs-header-top">
          <h2 className="jobs-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Matching Jobs
          </h2>
          {!isLoading && !error && jobs.length > 0 && (
            <span className="jobs-count">{jobs.length} jobs</span>
          )}
        </div>
        
        {/* Category Filter */}
        {!isLoading && !error && (
          <div className="jobs-filter jobs-filter--category">
            <span className="jobs-filter-label">
              Category:
              {recommendedCategory && (
                <span className="jobs-filter-recommended">
                  Recommended: {formatCategoryName(recommendedCategory)}
                </span>
              )}
            </span>
            <div className="jobs-category-select-wrapper">
              <select
                className="jobs-category-select"
                value={selectedCategory || ""}
                onChange={(e) => onCategoryChange(e.target.value || null)}
                disabled={isLoading}
              >
                <option value="">All Categories</option>
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {formatCategoryName(cat.name)}
                    {cat.name === recommendedCategory ? " ★" : ""}
                  </option>
                ))}
              </select>
              <svg className="jobs-category-select-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        )}

        {/* Limit Filter */}
        {!isLoading && !error && jobs.length > 0 && (
          <div className="jobs-filter">
            <span className="jobs-filter-label">Show:</span>
            <div className="jobs-filter-options">
              {JOB_LIMIT_OPTIONS.map((limit) => (
                <button
                  key={limit}
                  className={`jobs-filter-btn ${jobLimit === limit ? 'jobs-filter-btn--active' : ''}`}
                  onClick={() => onJobLimitChange(limit)}
                  disabled={isLoading}
                >
                  {limit}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="jobs-list">
        {renderContent()}
      </div>
    </div>
  );
}

function formatSalary(min?: number | null, max?: number | null, currency?: string): string | null {
  if (!min && !max) return null;
  const curr = currency || 'USD';
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: curr, maximumFractionDigits: 0 });
  if (min && max) {
    return `${formatter.format(min)} - ${formatter.format(max)}/hr`;
  }
  if (min) return `${formatter.format(min)}/hr`;
  if (max) return `${formatter.format(max)}/hr`;
  return null;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatJobType(type: string): string {
  return type
    .split(',')
    .map(t => t.trim())
    .map(t => t.charAt(0).toUpperCase() + t.slice(1))
    .join(' / ');
}
