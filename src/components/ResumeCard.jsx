function ResumeCard() {
  return (
    <div className="card shadow mt-4">

      <div className="card-header bg-primary text-white">
        <h4>John Doe.pdf</h4>
      </div>

      <div className="card-body">

        <h5>ATS Score</h5>

        <div className="progress mb-3">

          <div
            className="progress-bar bg-success"
            style={{ width: "92%" }}
          >
            92%
          </div>

        </div>

        <div className="row">

          <div className="col-md-6">

            <h5>Matched Skills</h5>

            <span className="badge bg-success me-2">
              Python
            </span>

            <span className="badge bg-success me-2">
              Flask
            </span>

            <span className="badge bg-success">
              SQL
            </span>

          </div>

          <div className="col-md-6">

            <h5>Missing Skills</h5>

            <span className="badge bg-danger me-2">
              Docker
            </span>

            <span className="badge bg-danger">
              AWS
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumeCard;