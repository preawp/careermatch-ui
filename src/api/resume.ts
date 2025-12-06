import type { ResumeResponse } from "../types/resume";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function parseResume(file: File): Promise<ResumeResponse> {
    if (!API_BASE_URL) {
        throw new Error(
            "Backend URL is missing. Set VITE_API_BASE_URL in your .env file."
        );
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/api/v1/resume/parse`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const details = await response.text();
        throw new Error(details || `Request failed with ${response.status}`);
    }

    const payload = (await response.json()) as ResumeResponse;

    if (payload.success === false) {
        throw new Error(payload.message || "Resume parsing failed.");
    }

    return payload;
}
