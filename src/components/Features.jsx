const features = [
  "OCR Resume Reading",
  "ATS Score Calculation",
  "Skill Matching",
  "Education Verification",
  "Experience Detection",
  "Company Experience",
  "Resume Ranking",
  "HR Friendly Dashboard",
];

function Features() {
  return (
    <>
      <h3 className="text-primary mb-4">
        System Features
      </h3>

      <div className="row">

        {features.map((feature, index) => (

          <div className="col-md-6 mb-3" key={index}>

            <div className="bg-light rounded p-3 shadow-sm">

              ✅ {feature}

            </div>

          </div>

        ))}

      </div>
    </>
  );
}

export default Features;