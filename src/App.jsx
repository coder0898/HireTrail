import { useState } from "react";
import "./App.css";
import Header from "./component/layout/Header";
import Sidebar from "./component/layout/SideBar";
import Content from "./component/layout/Content";

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
  const [activeTab, setActiveTab] = useState("list");

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
    <>
      <div className="h-screen flex flex-col">
        <Header />
        <main className="flex flex-col md:flex-row flex-1 overflow-hidden bg-gray-100">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content Section */}
          <Content
            activeTab={activeTab}
            jobTrackForm={jobTrackForm}
            onSubmitHandler={onSubmitHandler}
            errors={errors}
            handleInputChange={handleInputChange}
            resetForm={resetForm}
          />
        </main>
      </div>
    </>
  );
}

export default App;
