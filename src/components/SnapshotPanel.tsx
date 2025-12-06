import type { ContactInfo, ResumeMetadata } from "../types/resume";

interface SnapshotPanelProps {
    contact: ContactInfo | undefined;
    metadata: ResumeMetadata | null;
    hasResults: boolean;
}

export function SnapshotPanel({
    contact,
    metadata,
    hasResults,
}: SnapshotPanelProps) {
    return (
        <section className="panel summary-panel">
            <div className="panel-header">
                <h2>Overview</h2>
                <p>{hasResults ? "Parse results" : "Waiting for upload"}</p>
            </div>

            {contact && hasResults ? (
                <div className="contact-card">
                    {contact.full_name && <h3>{contact.full_name}</h3>}
                    <div className="contact-grid">
                        {contact.email && <span>📧 {contact.email}</span>}
                        {contact.phone && <span>📱 {contact.phone}</span>}
                        {contact.linkedin && <span>LinkedIn: {contact.linkedin}</span>}
                        {contact.github && <span>GitHub: {contact.github}</span>}
                        {contact.website && <span>Web: {contact.website}</span>}
                    </div>
                </div>
            ) : (
                <p className="empty-contact">
                    Upload a resume to see contact details and parsing statistics.
                </p>
            )}

            {metadata && hasResults && (
                <div className="metadata-grid">
                    <article className="stat-card">
                        <p>Sections</p>
                        <strong>{metadata.section_count ?? "—"}</strong>
                    </article>
                    <article className="stat-card">
                        <p>Items</p>
                        <strong>{metadata.total_items ?? "—"}</strong>
                    </article>
                    <article className="stat-card">
                        <p>Characters</p>
                        <strong>
                            {metadata.total_char_count
                                ? metadata.total_char_count.toLocaleString()
                                : "—"}
                        </strong>
                    </article>
                    <article className="stat-card">
                        <p>Time</p>
                        <strong>
                            {metadata.processing_time_ms
                                ? `${metadata.processing_time_ms}ms`
                                : "—"}
                        </strong>
                    </article>
                </div>
            )}
        </section>
    );
}
