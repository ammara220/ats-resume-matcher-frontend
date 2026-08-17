import { useLocation, useNavigate } from "react-router-dom";

function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    const results = location.state?.results;

    if (!results) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">
                    No analysis results found.
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/jobs")}
                >
                    Back to Jobs
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4">
                📊 ATS Analysis Results
            </h2>

            {results.resumes?.map((resume, index) => (

                <div
                    className="card shadow mb-4"
                    key={index}
                >

                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">
                            📄 {resume.name}
                        </h4>
                    </div>

                    <div className="card-body">

                        {/* ATS SCORE */}

                        <h5>ATS Score</h5>

                        <div className="progress mb-4" style={{ height: "30px" }}>

                            <div
                                className={`progress-bar ${
                                    resume.score >= 70
                                        ? "bg-success"
                                        : resume.score >= 50
                                        ? "bg-warning"
                                        : "bg-danger"
                                }`}
                                style={{
                                    width: `${resume.score}%`
                                }}
                            >
                                {resume.score}%
                            </div>

                        </div>

                        <h2 className="text-center mb-4">
                            {resume.score}%
                        </h2>


                        {/* MATCHED SKILLS */}

                        <div className="row">

                            <div className="col-md-6">

                                <h5 className="text-success">
                                    ✅ Matched Skills
                                </h5>

                                {resume.matched?.length > 0 ? (

                                    resume.matched.map(
                                        (skill, i) => (

                                            <span
                                                key={i}
                                                className="badge bg-success me-2 mb-2"
                                            >
                                                {skill}
                                            </span>

                                        )
                                    )

                                ) : (

                                    <p className="text-muted">
                                        No matching skills found.
                                    </p>

                                )}

                            </div>


                            {/* MISSING SKILLS */}

                            <div className="col-md-6">

                                <h5 className="text-danger">
                                    ❌ Missing Skills
                                </h5>

                                {resume.missing?.length > 0 ? (

                                    resume.missing.map(
                                        (skill, i) => (

                                            <span
                                                key={i}
                                                className="badge bg-danger me-2 mb-2"
                                            >
                                                {skill}
                                            </span>

                                        )
                                    )

                                ) : (

                                    <p className="text-success">
                                        No missing skills 🎉
                                    </p>

                                )}

                            </div>

                        </div>


                        <hr />


                        {/* EXPERIENCE */}

                        <h5>Experience</h5>

                        <p>
                            <strong>Candidate Experience:</strong>{" "}
                            {resume.experience} years
                        </p>

                        <p>
                            <strong>Experience Requirement:</strong>{" "}
                            {resume.experience_match
                                ? "Matched ✅"
                                : "Not Matched ❌"}
                        </p>


                        {/* EDUCATION */}

                        {resume.education && (

                            <>
                                <hr />

                                <h5>Education</h5>

                                <p>
                                    <strong>Degree:</strong>{" "}
                                    {resume.education.degree || "Not detected"}
                                </p>

                                <p>
                                    <strong>University:</strong>{" "}
                                    {resume.education.university || "Not detected"}
                                </p>

                                <p>
                                    <strong>CGPA:</strong>{" "}
                                    {resume.education.cgpa ?? "Not detected"}
                                </p>

                            </>

                        )}


                        {/* COMPANY EXPERIENCE */}

                        {resume.company && (

                            <>
                                <hr />

                                <h5>Company Experience</h5>

                                <p>
                                    {resume.company.company_experience
                                        ? "Company experience requirement matched ✅"
                                        : "Company experience requirement not matched ❌"}
                                </p>
                            </>

                        )}

                    </div>

                </div>

            ))}


            <div className="text-center mb-5">

                <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate("/jobs")}
                >
                    ← Back to Jobs
                </button>

                <button
                    className="btn btn-success"
                    onClick={() => window.history.back()}
                >
                    Analyze Another Resume
                </button>

            </div>

        </div>
    );
}

export default Results;