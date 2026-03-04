import { useState } from "react";
import "./App.css";
import Header from "./component/layout/Header";
import Sidebar from "./component/layout/SideBar";
import Content from "./component/layout/Content";
import toast, { Toaster } from "react-hot-toast";

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

  function SaveDataLocal(data) {
    localStorage.setItem("jobTrackList", JSON.stringify(data));
  }

  function onSubmitHandler(e) {
    e.preventDefault();

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
      toast.success("Job Edited successfully! 🎉");
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
      toast.success("Job added successfully! 🎉");
    }

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
    toast.error("Job deleted! 😢");
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        <Header />
        <Toaster position="top-center" />
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
