import { useState } from "react";
import "./App.css";
import FormInput from "./component/jobForm/FormInput";
import FormSelect from "./component/jobForm/FormSelect";
import DateInput from "./component/jobForm/DateInput";
import JobFormContainer from "./component/jobForm/JobFormContainer";

function App() {
  const [jobTrackForm, setJobTrackForm] = useState({
    companyName: "",
    jobRole: "",
    jobLocation: "",
    jobType: "",
    jobStatus: "Applied",
    jobPriority: "Medium",
    appliedDate: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({});

  let jobTrackList = JSON.parse(localStorage.getItem("jobTrackList")) || [];

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setJobTrackForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validateForm(values) {
    const newErrors = {};

    if (!values.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!values.jobRole.trim()) {
      newErrors.jobRole = "Job role is required";
    }

    if (!values.jobLocation.trim()) {
      newErrors.jobLocation = "Location is required";
    }

    if (!values.jobType.trim()) {
      newErrors.jobType = "Job type is required";
    }

    return newErrors;
  }

  function SaveDataLocal(data) {
    localStorage.setItem("jobTrackList", JSON.stringify(data));
    console.log("data saved to local storage");
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const validationErrors = validateForm(jobTrackForm);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("please fill empty fields...");
      return;
    }

    let applicationData = {
      ...jobTrackForm,
      id: Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0], // updatedAt is always current
    };

    jobTrackList.push(applicationData);
    SaveDataLocal(jobTrackList);
    console.log("Form submitted successfully");
    resetForm();
  }

  function resetForm() {
    setJobTrackForm({
      companyName: "",
      jobRole: "",
      jobLocation: "",
      jobType: "",
      jobStatus: "Applied",
      jobPriority: "Medium",
      appliedDate: new Date().toISOString().split("T")[0],
    });
    setErrors({});
    console.log("form get reset");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="w-full max-w-4xl bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">
          Job Tracking Form
        </h2>

        <JobFormContainer
          jobTrackForm={jobTrackForm}
          handleInputChange={handleInputChange}
          errors={errors}
          onSubmitHandler={onSubmitHandler}
          resetForm={resetForm}
        />
      </section>
    </main>
  );
}

export default App;
