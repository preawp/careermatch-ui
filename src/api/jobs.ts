import type { JobsResponse } from "../types/job";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function fetchMatchingJobs(
    resumeFile: File,
    limit: number = 10,
    category?: string
): Promise<JobsResponse> {
    const formData = new FormData();
    formData.append("file", resumeFile);

    const params = new URLSearchParams({ limit: limit.toString() });
    if (category) {
        params.append("category", category);
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/jobs/match?${params}`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch matching jobs: ${response.status}`);
    }

    return response.json();
}
