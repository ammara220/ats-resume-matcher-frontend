import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Instructions from "../components/Instructions";
import UploadSection from "../components/UploadSection";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      <div className="d-flex justify-content-center gap-3 my-4 flex-wrap">

        <Link 
          to="/jobs" 
          className="btn btn-primary btn-lg px-4"
        >
          <i className="fas fa-briefcase me-2"></i>
          View Jobs
        </Link>


        <Link 
          to="/create-job" 
          className="btn btn-success btn-lg px-4"
        >
          <i className="fas fa-plus me-2"></i>
          Create Job
        </Link>

      </div>


      <hr />

      <Features />

      <hr />

      <Instructions />

      <hr />

      <UploadSection />

    </>
  );
}

export default Home;