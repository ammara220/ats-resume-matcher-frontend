import Navbar from "../components/Navbar";
import ResumeCard from "../components/ResumeCard";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="container my-5">

        <h2 className="text-center mb-4">
          <i className="fas fa-chart-line me-2"></i>
          ATS Resume Dashboard
        </h2>

        {/* Summary Cards */}
        <div className="row g-4">

          <div className="col-md-3">
            <div className="card text-center shadow border-0 p-3">
              <h2 className="text-primary">5</h2>
              <p className="mb-0">Total Resumes</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-center shadow border-0 p-3">
              <h2 className="text-success">3</h2>
              <p className="mb-0">Qualified</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-center shadow border-0 p-3">
              <h2 className="text-warning">8</h2>
              <p className="mb-0">Required Skills</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-center shadow border-0 p-3">
              <h2 className="text-danger">92%</h2>
              <p className="mb-0">Highest ATS Score</p>
            </div>
          </div>

        </div>

        {/* Search Box */}
        <div className="card shadow border-0 mt-5">
          <div className="card-body">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search Candidate..."
            />
          </div>
        </div>

        {/* Resume Cards */}
        <ResumeCard />
        <ResumeCard />
        <ResumeCard />

      </div>
    </>
  );
}

export default Dashboard;