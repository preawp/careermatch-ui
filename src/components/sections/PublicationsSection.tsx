import type { PublicationItem } from "../../types/resume";

interface PublicationsSectionProps {
    publications: PublicationItem[];
}

export function PublicationsSection({ publications }: PublicationsSectionProps) {
    if (publications.length === 0) return null;

    return (
        <article className="section-card">
            <header>
                <p>Publications</p>
                <h3>Thought leadership</h3>
            </header>
            <ul>
                {publications.map((publication, index) => (
                    <li key={`${publication.title}-${index}`}>
                        <strong>{publication.title}</strong>
                        {publication.authors && <span>{publication.authors}</span>}
                        {publication.venue && <span>{publication.venue}</span>}
                        {publication.year && <span>{publication.year}</span>}
                        {publication.link && <a href={publication.link} target="_blank" rel="noopener noreferrer">View →</a>}
                    </li>
                ))}
            </ul>
        </article>
    );
}
