interface UploadViewProps {
    resumeFile: File | null;
    isLoading: boolean;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFileRemove: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function UploadView({
    resumeFile,
    isLoading,
    onFileChange,
    onFileRemove,
    onSubmit,
}: UploadViewProps) {
    return (
        <div className="upload-view">
            <div className="upload-container">
                <div className="upload-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                </div>

                <h1 className="upload-heading">Upload your resume</h1>
                <p className="upload-subheading">
                    Get instant insights and discover jobs that match your experience
                </p>

                <form onSubmit={onSubmit}>
                    <label className={`upload-dropzone ${resumeFile ? "upload-dropzone--active" : ""}`}>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={onFileChange}
                        />
                        <svg className="upload-dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <p className="upload-dropzone-text">
                            {resumeFile ? "Click to change file" : "Click to upload or drag and drop"}
                        </p>
                        <p className="upload-dropzone-hint">PDF, DOC, or DOCX up to 10MB</p>
                    </label>

                    {resumeFile && (
                        <div className="upload-file-info">
                            <div className="upload-file-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14,2 14,8 20,8" />
                                </svg>
                            </div>
                            <div className="upload-file-details">
                                <p className="upload-file-name">{resumeFile.name}</p>
                                <p className="upload-file-size">
                                    {(resumeFile.size / 1024).toFixed(1)} KB
                                </p>
                            </div>
                            <button
                                type="button"
                                className="upload-file-remove"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onFileRemove();
                                }}
                                aria-label="Remove file"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="upload-submit"
                        disabled={!resumeFile || isLoading}
                    >
                        {isLoading ? "Analyzing..." : "Analyze Resume"}
                    </button>
                </form>
            </div>
        </div>
    );
}
