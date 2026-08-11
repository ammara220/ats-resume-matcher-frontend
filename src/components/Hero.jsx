function Hero() {
  return (
    <div className="text-center mb-5">

      <div className="hero-icon mb-3">
        <i className="fas fa-file-circle-check"></i>
      </div>

      <h1 className="fw-bold display-5">
        <span className="text-primary">
          ATS
        </span>{" "}
        Resume Matcher
      </h1>

      <p className="lead text-secondary">
        Smart Resume Screening System powered by OCR,
        Artificial Intelligence and ATS Analysis
      </p>

      <div className="mt-4">

        <span className="badge bg-primary rounded-pill px-4 py-2 me-2">
            ⚡ Smart
        </span>

        <span className="badge bg-success rounded-pill px-4 py-2 me-2">
            🚀 Fast
        </span>

        <span className="badge bg-dark rounded-pill px-4 py-2">
            ✔ Accurate
        </span>

      </div>

    </div>
  );
}

export default Hero;