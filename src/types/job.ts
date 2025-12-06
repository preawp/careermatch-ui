export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    currency?: string;
    category?: string;
    score: number;
    date_posted?: number;
    job_type?: string;
    is_remote?: boolean;
    min_amount?: number | null;
    max_amount?: number | null;
    job_url?: string;
}

export interface CategoryMatch {
    category: string;
    confidence: number;
}

export interface JobsResponse {
    success?: boolean;
    jobs?: Job[];
    message?: string;
    count?: number;
    category?: string;
    categories?: CategoryMatch[];
}