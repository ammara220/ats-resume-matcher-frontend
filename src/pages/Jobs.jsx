import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Jobs() {

    const location = useLocation();
    const navigate = useNavigate();

    // Get resumes selected on Home page
    const [files, setFiles] = useState(
        location.state?.files || []
    );

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchJobs = async () => {

            try {

                const response = await fetch(
                    "https://flaskapp-caaa.onrender.com/api/jobs"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Failed to load jobs."
                    );
                }

                setJobs(data.jobs || []);

            } catch (err) {

                console.error("Jobs Error:", err);
                setError(err.message);

            } finally {

                setLoading(false);

            }
        };

        fetchJobs();

    }, []);

    // Analyze selected resumes against selected job
    const handleAnalyze = (jobId) => {

        if (files.length === 0) {
            alert(
                "No resumes selected. Please go back and upload resumes."
            );
            return;
        }

        navigate(`/upload/${jobId}`, {
            state: {
                files: files
            }
        });
    };

    // Remove a resume
    const removeFile = (indexToRemove) => {

        setFiles((previousFiles) =>
            previousFiles.filter(
                (_, index) => index !== indexToRemove
            )
        );
    };

    return (

        <div className="container mt-5 mb-5">

            <h2 className="text-center mb-4">
                💼 Available Jobs
            </h2>


            {/* ================================= */}
            {/* SELECTED RESUMES */}
            {/* ================================= */}

            {files.length > 0 && (

                <div className="card shadow-sm mb-5">

                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center">

                            <h4 className="mb-0">
                                📄 Selected Resumes
                            </h4>

                            <span className="badge bg-primary">
                                {files.length}{" "}
                                {files.length === 1
                                    ? "Resume"
                                    : "Resumes"}
                            </span>

                        </div>


                        <hr />


                        {files.map((file, index) => (

                            <div
                                key={`${file.name}-${index}`}
                                className="d-flex justify-content-between align-items-center border rounded p-3 mb-2"
                            >

                                <div>
                                    📄 {file.name}
                                </div>

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                        removeFile(index)
                                    }
                                >
                                    🗑️ Remove
                                </button>

                            </div>

                        ))}

                    </div>

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
            {/* LOADING */}
            {/* ================================= */}

            {loading && (

                <div className="text-center">

                    <div className="spinner-border"></div>

                    <p className="mt-2">
                        Loading jobs...
                    </p>

                </div>

            )}


            {/* ================================= */}
            {/* NO JOBS */}
            {/* ================================= */}

            {!loading && jobs.length === 0 && (

                <div className="alert alert-warning">
                    No jobs available.
                </div>

            )}


            {/* ================================= */}
            {/* JOB CARDS */}
            {/* ================================= */}

            <div className="row">

                {jobs.map((job) => (

                    <div
                        className="col-md-6 mb-4"
                        key={job.job_id}
                    >

                        <div className="card shadow h-100">

                            <div className="card-body">

                                <h4 className="card-title">
                                    {job.job_title}
                                </h4>

                                <p>
                                    <strong>
                                        Experience:
                                    </strong>{" "}
                                    {job.experience} years
                                </p>

                                <p>
                                    <strong>
                                        Degree:
                                    </strong>{" "}
                                    {job.degree}
                                </p>

                                <p>
                                    <strong>
                                        Required Skills:
                                    </strong>
                                </p>

                                <div className="mb-3">

                                    {job.skills?.map(
                                        (skill, index) => (

                                            <span
                                                key={index}
                                                className="badge bg-primary me-2 mb-2"
                                            >
                                                {skill}
                                            </span>

                                        )
                                    )}

                                </div>


                                <button
                                    className="btn btn-success w-100"
                                    onClick={() =>
                                        handleAnalyze(
                                            job.job_id
                                        )
                                    }
                                >
                                    🔍 Analyze Resumes
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Jobs;