import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          ATS Resume Matcher
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/jobs">
            Jobs
          </Link>

          <Link className="nav-link" to="/create-job">
            Create Job
          </Link>

          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;