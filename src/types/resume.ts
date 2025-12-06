export interface ResumeMetadata {
    section_count?: number;
    total_items?: number;
    total_char_count?: number;
    processing_time_ms?: number;
}

export interface ContactInfo {
    full_name?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    location?: string;
}

export interface EducationItem {
    degree?: string;
    institution?: string;
    location?: string;
    dates?: string;
    gpa?: string;
    details?: string[];
}

export interface ExperienceItem {
    title?: string;
    company?: string;
    dates?: string;
    location?: string;
    bullets?: string[];
}

export interface ProjectItem {
    name?: string;
    link?: string;
    bullets?: string[];
    technologies?: string[];
    dates?: string;
}

export interface PublicationItem {
    title?: string;
    authors?: string;
    venue?: string;
    link?: string;
    year?: string;
}

export interface ResumeSections {
    education?: EducationItem[];
    experience?: ExperienceItem[];
    projects?: ProjectItem[];
    publications?: PublicationItem[];
    skills?: string[];
    contact?: ContactInfo;
}

export interface ResumeResponse {
    success?: boolean;
    message?: string;
    sections?: ResumeSections;
    metadata?: ResumeMetadata;
}
