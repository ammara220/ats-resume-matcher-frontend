import React, { useState } from "react";

function CreateJob() {
    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        description: "",
        skills: ""
    });

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://127.0.0.1:5005/api/jobs",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(job)
                }
            );

            const text = await response.text();

            console.log("Status:", response.status);
            console.log("Response:", text);

            if (!response.ok) {
                throw new Error(
                    `Server error ${response.status}: ${text}`
                );
            }

            const data = JSON.parse(text);

            console.log("Created Job:", data);

            alert("Job Created Successfully! 🎉");

            setJob({
                title: "",
                company: "",
                location: "",
                description: "",
                skills: ""
            });

        } catch (error) {
            console.error("Create Job Error:", error);
            alert("Error creating job: " + error.message);
        }
    };

    return (
        <div className="container mt-5">

            <div
                className="card shadow p-4 mx-auto"
                style={{ maxWidth: "700px" }}
            >

                <h2 className="text-center mb-4">
                    🚀 Create New Job
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* Job Title */}
                    <div className="mb-3">
                        <label className="form-label">
                            Job Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Frontend Developer"
                            name="title"
                            value={job.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Company */}
                    <div className="mb-3">
                        <label className="form-label">
                            Company Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Company name"
                            name="company"
                            value={job.company}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div className="mb-3">
                        <label className="form-label">
                            Location
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Islamabad / Remote"
                            name="location"
                            value={job.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Skills */}
                    <div className="mb-3">
                        <label className="form-label">
                            Required Skills
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="React, Python, SQL..."
                            name="skills"
                            value={job.skills}
                            onChange={handleChange}
                            required
                        />

                        <small className="text-muted">
                            Separate skills with commas
                        </small>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label">
                            Job Description
                        </label>

                        <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Write job details..."
                            name="description"
                            value={job.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn btn-success w-100"
                    >
                        <i className="fas fa-plus me-2"></i>
                        Create Job
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateJob;