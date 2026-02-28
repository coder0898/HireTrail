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
  const [jobs, setJobs] = useState(
    JSON.parse(localStorage.getItem("jobTrackList")) || [],
  );
  const [editingId, setEditingId] = useState(null);

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

    if (editingId) {
      const updateJobs = jobs.map((job) =>
        job.id === editingId
          ? {
              ...job,
              ...jobTrackForm,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : job,
      );
      setJobs(updateJobs);
      SaveDataLocal(updateJobs);
      setEditingId(null);
    } else {
      let applicationData = {
        ...jobTrackForm,
        id: Date.now(),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0], // updatedAt is always current
      };
      const updateJobs = [...jobs, applicationData];
      setJobs(updateJobs);
      SaveDataLocal(updateJobs);
    }

    console.log("Form submitted successfully");
    resetForm();
  }

  function resetForm() {
    const initialState = {
      companyName: "",
      jobRole: "",
      jobLocation: "",
      jobType: "",
      jobStatus: "Applied",
      jobPriority: "Medium",
      appliedDate: new Date().toISOString().split("T")[0],
    };

    setJobTrackForm(initialState);
    setErrors({});
    setEditingId(null);
    setActiveTab("list");
  }

  const handleEdit = (data) => {
    setJobTrackForm({
      companyName: data.companyName,
      jobRole: data.jobRole,
      jobLocation: data.jobLocation,
      jobType: data.jobType,
      jobStatus: data.jobStatus,
      jobPriority: data.jobPriority,
      appliedDate: data.appliedDate,
    });
    setEditingId(data.id);
    setActiveTab("form");
  };

  const handleDelete = (id) => {
    const updateJobs = jobs.filter((job) => job.id !== id);
    setJobs(updateJobs);
    SaveDataLocal(updateJobs);
  };

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
            jobs={jobs}
            handleEdit={handleEdit}
            editingId={editingId}
            handleDelete={handleDelete}
          />
        </main>
      </div>
    </>
  );
}

export default App;
