import { useState } from "react";
import {
    useParams,
    useNavigate,
    useLocation
} from "react-router-dom";
function UploadResume() {
   const { jobId } = useParams();
const navigate = useNavigate();
const location = useLocation();

const [files, setFiles] = useState(
    location.state?.files || []
);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dragActive, setDragActive] = useState(false);

    // Add PDF files
    const addFiles = (selectedFiles) => {
        const fileArray = Array.from(selectedFiles);

        const pdfFiles = fileArray.filter(
            (file) =>
                file.type === "application/pdf" ||
                file.name.toLowerCase().endsWith(".pdf")
        );

        if (pdfFiles.length !== fileArray.length) {
            setError("Only PDF files are allowed.");
        } else {
            setError("");
        }

        setFiles((previousFiles) => [
            ...previousFiles,
            ...pdfFiles
        ]);
    };

    // Normal file selection
    const handleFileChange = (e) => {
        addFiles(e.target.files);
        e.target.value = "";
    };

    // Drag over
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setDragActive(true);
    };

    // Drag leave
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setDragActive(false);
    };

    // Drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setDragActive(false);

        if (e.dataTransfer.files.length > 0) {
            addFiles(e.dataTransfer.files);
        }
    };

    // Remove resume
    const handleRemoveFile = (indexToRemove) => {
        setFiles((previousFiles) =>
            previousFiles.filter(
                (_, index) => index !== indexToRemove
            )
        );

        setError("");
    };

    // Analyze resumes
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (files.length === 0) {
            setError("Please select at least one PDF resume.");
            return;
        }

        if (!jobId) {
            setError("Job ID is missing.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const formData = new FormData();

            files.forEach((file) => {
                formData.append("resume", file);
            });

            const response = await fetch(`https://flaskapp-caaa.onrender.com/api/analyze/${jobId}`, {
                    method: "POST",
                    body: formData
                }
            );

            const text = await response.text();

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(
                    "Server returned an invalid response."
                );
            }

            console.log("Analysis result:", data);

            if (!response.ok) {
                throw new Error(
                    data.error || "Resume analysis failed."
                );
            }

            navigate("/results", {
                state: {
                    results: data
                }
            });

        } catch (err) {
            console.error("Upload Error:", err);

            setError(
                err.message ||
                "Something went wrong while analyzing."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 mb-5">

            <div
                className="card shadow p-4 mx-auto"
                style={{ maxWidth: "800px" }}
            >

                <h2 className="text-center mb-3">
                    📄 Upload Resume
                </h2>

                <p className="text-center text-muted mb-4">
                    Select PDF resumes to calculate their ATS scores.
                </p>


                <form onSubmit={handleSubmit}>

                    {/* ================================= */}
                    {/* SHOW UPLOAD AREA ONLY IF NO FILES */}
                    {/* ================================= */}

                    {files.length === 0 && (

                        <div
                            className={`border border-3 rounded p-5 text-center mb-4 ${
                                dragActive
                                    ? "border-primary bg-light"
                                    : "border-primary"
                            }`}
                            style={{
                                cursor: "pointer",
                                minHeight: "280px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}

                            onDragOver={handleDragOver}
                            onDragEnter={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}

                            onClick={() =>
                                document
                                    .getElementById("resumeInput")
                                    .click()
                            }
                        >

                            <div
                                style={{
                                    fontSize: "60px",
                                    marginBottom: "15px"
                                }}
                            >
                                ☁️
                            </div>

                            <h3 className="fw-bold">
                                {dragActive
                                    ? "Drop your resumes here"
                                    : "Drag & Drop PDF Resumes"}
                            </h3>

                            <p className="text-muted">
                                or click here to browse
                            </p>

                            <button
                                type="button"
                                className="btn btn-primary px-4"
                                onClick={(e) => {
                                    e.stopPropagation();

                                    document
                                        .getElementById("resumeInput")
                                        .click();
                                }}
                            >
                                📁 Choose PDF Files
                            </button>

                            <input
                                id="resumeInput"
                                type="file"
                                className="d-none"
                                accept=".pdf,application/pdf"
                                multiple
                                onChange={handleFileChange}
                            />

                        </div>

                    )}


                    {/* ================================= */}
                    {/* SELECTED RESUMES */}
                    {/* ================================= */}

                    {files.length > 0 && (

                        <div className="mb-4">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <h5 className="fw-bold mb-0">
                                    📋 Selected Resumes
                                </h5>

                                <span className="badge bg-primary">
                                    {files.length}{" "}
                                    {files.length === 1
                                        ? "Resume"
                                        : "Resumes"}
                                </span>

                            </div>


                            {files.map((file, index) => (

                                <div
                                    key={`${file.name}-${index}`}
                                    className="d-flex justify-content-between align-items-center border rounded p-3 mb-2"
                                >

                                    <div
                                        className="text-truncate me-3"
                                        style={{ maxWidth: "80%" }}
                                    >

                                        <span className="me-2">
                                            📄
                                        </span>

                                        {file.name}

                                    </div>


                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={() =>
                                            handleRemoveFile(index)
                                        }
                                    >
                                        🗑️ Remove
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}


                    {/* ================================= */}
                    {/* ADD MORE BUTTON */}
                    {/* ================================= */}

                    {files.length > 0 && (

                        <div className="mb-4 text-center">

                            <label
                                htmlFor="addMoreInput"
                                className="btn btn-outline-primary"
                            >
                                ➕ Add More Resumes
                            </label>

                            <input
                                id="addMoreInput"
                                type="file"
                                className="d-none"
                                accept=".pdf,application/pdf"
                                multiple
                                onChange={handleFileChange}
                            />

                        </div>

                    )}


                    {/* ================================= */}
                    {/* ERROR */}
                    {/* ================================= */}

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}


                    {/* ================================= */}
                    {/* ANALYZE BUTTON */}
                    {/* ================================= */}

                    <button
                        type="submit"
                        className="btn btn-success btn-lg w-100"
                        disabled={
                            loading ||
                            files.length === 0
                        }
                    >

                        {loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                ></span>

                                Analyzing Resumes...
                            </>
                        ) : (
                            <>
                                🔍 Analyze Resumes
                            </>
                        )}

                    </button>

                </form>

            </div>

        </div>
    );
}

export default UploadResume;