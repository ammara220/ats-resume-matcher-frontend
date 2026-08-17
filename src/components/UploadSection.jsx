import React from "react";
import { useNavigate } from "react-router-dom";

function UploadSection() {
    const navigate = useNavigate();

    const handleFiles = (selectedFiles) => {
        const pdfFiles = Array.from(selectedFiles).filter(
            (file) =>
                file.type === "application/pdf" ||
                file.name.toLowerCase().endsWith(".pdf")
        );

        if (pdfFiles.length === 0) {
            alert("Please select PDF files only.");
            return;
        }

        // Go to Jobs and carry the selected files
        navigate("/jobs", {
            state: {
                files: pdfFiles
            }
        });
    };

    const handleFileChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container my-5">

            <div
                className="card shadow-lg p-5 text-center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    border: "3px dashed #0d6efd",
                    borderRadius: "25px",
                    minHeight: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer"
                }}
            >

                <div>

                    <div style={{ fontSize: "70px" }}>
                        ☁️
                    </div>

                    <h2 className="fw-bold mt-3">
                        Drag & Drop PDF Resumes
                    </h2>

                    <p className="text-muted fs-5">
                        or click here to browse
                    </p>

                    <label className="btn btn-primary btn-lg px-4">
                        📄 Choose PDF Files

                        <input
                            type="file"
                            accept=".pdf,application/pdf"
                            multiple
                            hidden
                            onChange={handleFileChange}
                        />
                    </label>

                </div>

            </div>

        </div>
    );
}

export default UploadSection;