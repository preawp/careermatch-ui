import { useState } from "react";
import "./App.css";

type Category =
  | "Software Engineering"
  | "Data Science"
  | "Product / Project"
  | "Marketing"
  | "Social Media"
  | "Design";

interface Job {
  id: number;
  title: string;
  company: string;
  category: Category;
  location: string;
  matchScore: number; // 0–100
}

const ALL_CATEGORIES: Category[] = [
  "Software Engineering",
  "Data Science",
  "Product / Project",
  "Marketing",
  "Social Media",
  "Design",
];

const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: "Junior Software Engineer",
    company: "TechNova",
    category: "Software Engineering",
    location: "San Francisco, CA",
    matchScore: 88,
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "Bright Labs",
    category: "Software Engineering",
    location: "Remote",
    matchScore: 82,
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "Insightly",
    category: "Data Science",
    location: "New York, NY",
    matchScore: 79,
  },
  {
    id: 4,
    title: "Product Management Intern",
    company: "Aurora Apps",
    category: "Product / Project",
    location: "Remote",
    matchScore: 84,
  },
  {
    id: 5,
    title: "Social Media Coordinator",
    company: "Vibe Studio",
    category: "Social Media",
    location: "Los Angeles, CA",
    matchScore: 90,
  },
  {
    id: 6,
    title: "Marketing Assistant",
    company: "Northwind Co.",
    category: "Marketing",
    location: "Chicago, IL",
    matchScore: 76,
  },
  {
    id: 7,
    title: "UX / UI Design Intern",
    company: "PixelCraft",
    category: "Design",
    location: "Remote",
    matchScore: 81,
  },
];

function App() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  function toggleCategory(cat: Category) {
    setSelectedCategories((prev) => {
      const already = prev.includes(cat);
      if (already) {
        return prev.filter((c) => c !== cat);
      }
      if (prev.length >= 3) {
        alert("You can only choose up to 3 categories.");
        return prev;
      }
      return [...prev, cat];
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please upload your resume file.");
      return;
    }
    if (selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    // In the real version, here you’d call backend with resume + categories.
    // For now we just filter mock jobs by selected categories.
    const matching = MOCK_JOBS
      .filter((job) => selectedCategories.includes(job.category))
      .sort((a, b) => b.matchScore - a.matchScore);

    setJobs(matching);
    setHasSearched(true);
  }

  return (
    <div className="page">
      <header className="header">
        <h1 className="app-title">CareerMatch AI</h1>
        <p className="app-subtitle">
          Upload your resume, choose what you’re interested in, and see jobs you
          might be qualified for.
        </p>
      </header>

      <main className="layout">
        {/* Left: inputs */}
        <section className="card">
          <h2 className="card-title">1. Add your info</h2>

          <form onSubmit={handleSubmit} className="form">
            {/* Resume input */}
            <div className="form-group">
              <label className="label">Resume file</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setResumeFile(e.target.files[0]);
                  }
                }}
              />
              {resumeFile && (
                <p className="helper-text">Selected: {resumeFile.name}</p>
              )}
            </div>

            {/* Category selection */}
            <div className="form-group">
              <label className="label">
                Top 3 categories you’re interested in
              </label>
              <p className="helper-text">
                Pick up to 3. This helps us know what kind of roles to show.
              </p>
              <div className="category-grid">
                {ALL_CATEGORIES.map((cat) => {
                  const active = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      className={
                        "category-pill" + (active ? " category-pill--active" : "")
                      }
                      onClick={() => toggleCategory(cat)}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="submit" className="primary-btn">
              Find matching jobs
            </button>
          </form>
        </section>

        {/* Right: results */}
        <section className="card">
          <h2 className="card-title">2. Your matches</h2>

          {!hasSearched && (
            <p className="placeholder">
              Results will show here after you upload your resume and click
              “Find matching jobs”.
            </p>
          )}

          {hasSearched && jobs.length === 0 && (
            <p className="placeholder">
              No jobs found for these categories yet. Try picking different
              categories.
            </p>
          )}

          {jobs.length > 0 && (
            <ul className="job-list">
              {jobs.map((job) => (
                <li key={job.id} className="job-card">
                  <div className="job-main">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">
                      {job.company} · {job.location}
                    </p>
                    <p className="job-category">{job.category}</p>
                  </div>
                  <div className="job-score">
                    <span className="job-score-value">
                      {job.matchScore}%
                    </span>
                    <span className="job-score-label">Match</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
