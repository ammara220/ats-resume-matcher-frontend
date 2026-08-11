import { useRef, useState } from "react";

function UploadSection() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === "application/pdf"
    );

    setFiles((prev) => [...prev, ...pdfFiles]);
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-4">
      <div
        className={`upload-box ${dragActive ? "border-success bg-light" : ""}`}
        onClick={() => inputRef.current.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <i className="fas fa-cloud-upload-alt fa-4x text-primary mb-3"></i>

        <h3 className="fw-bold">Drag & Drop PDF Resumes</h3>

        <p className="text-muted">
          or click here to browse
        </p>

        <button
          type="button"
          className="btn btn-primary px-4"
        >
          Choose PDF Files
        </button>

        <input
          type="file"
          hidden
          multiple
          accept=".pdf"
          ref={inputRef}
          onChange={handleChange}
        />
      </div>

      {files.length > 0 && (
        <>
          <h4 className="mt-4 mb-3 fw-bold">
            Selected Resumes
          </h4>

          <div className="list-group">

            {files.map((file, index) => (

              <div
                key={index}
                className="list-group-item file-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <i className="fas fa-file-pdf text-danger me-2"></i>

                  <strong>{file.name}</strong>

                  <br />

                  <small className="text-muted">
                    {(file.size / 1024).toFixed(1)} KB
                  </small>
                </div>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFile(index)}
                >
                  <i className="fas fa-times"></i>
                </button>

              </div>

            ))}

          </div>

          <button
            className="btn btn-success analyze-btn w-100 mt-4"
          >
            <i className="fas fa-search me-2"></i>
            Analyze Resumes
          </button>
        </>
      )}
    </div>
  );
}

export default UploadSection;