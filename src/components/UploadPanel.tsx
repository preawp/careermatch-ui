import { Spinner } from "./Spinner";

interface UploadPanelProps {
    resumeFile: File | null;
    isLoading: boolean;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function UploadPanel({
    resumeFile,
    isLoading,
    onFileChange,
    onSubmit,
}: UploadPanelProps) {
    return (
        <section className="panel upload-panel">
            <div className="panel-header">
                <h2>Upload Resume</h2>
                <p>Supported formats: PDF, DOC, DOCX</p>
            </div>

            <form onSubmit={onSubmit} className="upload-form">
                <label className="dropzone">
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.rtf"
                        onChange={onFileChange}
                    />
                    <svg
                        className="dropzone-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <div className="dropzone-copy">
                        <p className="dropzone-title">
                            {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="dropzone-sub">
                            {resumeFile
                                ? `${(resumeFile.size / 1024).toFixed(1)} KB`
                                : "Maximum file size: 10MB"}
                        </p>
                    </div>
                </label>

                <button
                    type="submit"
                    className="primary-btn"
                    disabled={isLoading || !resumeFile}
                >
                    {isLoading ? (
                        <>
                            <Spinner size="sm" />
                            Analyzing…
                        </>
                    ) : (
                        "Analyze Resume"
                    )}
                </button>
            </form>
        </section>
    );
}
