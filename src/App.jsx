import Results from "./pages/Results";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import UploadResume from "./pages/UploadResume";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/results" element={<Results />} />
        <Route path="/" element={<Home />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/create-job" element={<CreateJob />} />

        <Route
          path="/upload/:jobId"
          element={<UploadResume />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;