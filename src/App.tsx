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
  matchScore: number;
}

interface ResumeAnalysis {
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  sections: {
    education: {
      degree: string;
      major: string;
      institution: string;
      date: string;
    }[];
  };
  classification: {
    category: string;
    confidence: number;
  };
  metadata: {
    word_count: number;
    processing_time_ms: number;
  };
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
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  function toggleCategory(cat: Category) {
    setSelectedCategories((prev) => {
      if (prev.includes(cat)) return prev.filter((c) => c !== cat);
      if (prev.length >= 3) return prev;
      return [...prev, cat];
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!resumeFile || selectedCategories.length === 0) return;

    setAnalysis({
      contact: {
        name: "Pratik Pujari",
        email: "pratikpujari1000@gmail.com",
        phone: "+1 303 6206112",
      },
      sections: {
        education: [
          {
            degree: "Master of Science",
            major: "Computer Science",
            institution: "University of Colorado Boulder",
            date: "Aug. 2025",
          },
        ],
      },
      classification: {
        category: "HEALTHCARE",
        confidence: 0.37,
      },
      metadata: {
        word_count: 511,
        processing_time_ms: 12251,
      },
    });

    const res = MOCK_JOBS
      .filter((job) => selectedCategories.includes(job.category))
      .sort((a, b) => b.matchScore - a.matchScore);

    setJobs(res);
    setHasSearched(true);
  }

  const topEducation =
    analysis?.sections.education && analysis.sections.education[0];

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
        <section className="card">
          <h2 className="card-title">1. Add your info</h2>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label className="label">Resume file</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setResumeFile(e.target.files[0]);
                  }
                }}
              />
              {resumeFile && (
                <p className="helper-text">Selected: {resumeFile.name}</p>
              )}
            </div>

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

        <section className="card">
          {analysis && (
            <>
              <h2 className="card-title">Resume summary</h2>

              <div className="resume-summary">
                <p className="resume-summary-name">
                  {analysis.contact.name}
                </p>

                <p className="resume-summary-contact">
                  {analysis.contact.email} · {analysis.contact.phone}
                </p>

                {topEducation && (
                  <p className="resume-summary-line">
                    <strong>Education:</strong> {topEducation.degree} in{" "}
                    {topEducation.major}, {topEducation.institution} (
                    {topEducation.date})
                  </p>
                )}

                <p className="resume-summary-line">
                  <strong>Predicted category:</strong>{" "}
                  {analysis.classification.category} (
                  {(analysis.classification.confidence * 100).toFixed(1)}%
                  confidence)
                </p>

                <p className="resume-summary-meta">
                  {analysis.metadata.word_count} words · processed in{" "}
                  {analysis.metadata.processing_time_ms} ms
                </p>
              </div>

              <hr className="resume-divider" />
            </>
          )}

          <h2 className="card-title">Your matches</h2>

          {!hasSearched && (
            <p className="placeholder">
              Results will show here after you upload your resume and click
              “Find matching jobs”.
            </p>
          )}

          {hasSearched && jobs.length === 0 && (
            <p className="placeholder">No jobs found.</p>
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
                    <span className="job-score-value">{job.matchScore}%</span>
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
