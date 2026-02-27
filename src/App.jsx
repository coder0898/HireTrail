import { useState } from "react";
import "./App.css";
import FormInput from "./component/jobForm/FormInput";
import FormSelect from "./component/jobForm/FormSelect";
import DateInput from "./component/jobForm/DateInput";
import JobFormContainer from "./component/jobForm/JobFormContainer";
import { BriefcaseIcon } from "@heroicons/react/16/solid";
import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";

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
        <header className="bg-blue-500 p-4">
          <div className="flex items-center gap-3">
            <BriefcaseIcon className="h-8 w-8 text-white" />
            <h1 className="text-3xl font-bold text-white">HireTrail</h1>
          </div>
        </header>

        <main className="flex flex-col md:flex-row flex-1 overflow-hidden bg-gray-100">
          {/* Sidebar */}
          <aside className="bg-white w-full md:w-64 shrink-0 ">
            <ul className="flex md:flex-col mt-6 mb-6 justify-around md:justify-start items-center gap-6 md:gap-4 ">
              <li
                onClick={() => setActiveTab("list")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
                ${
                  activeTab === "list"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                <BriefcaseIcon className="h-5 w-5" />
                <span className="hidden md:inline">Job Applications</span>
              </li>

              <li
                onClick={() => setActiveTab("form")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${activeTab === "form" ? "bg-blue-500 text-white" : "text-gray-700 hover:text-blue-600"}`}
              >
                <ClipboardDocumentListIcon className="h-5 w-5" />
                <span className="hidden md:inline">Tracking Form</span>
              </li>
            </ul>
          </aside>

          {/* Content Section */}
          <section className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">
              {activeTab === "form" && (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <ClipboardDocumentListIcon className="h-7 w-7 text-blue-600" />
                    <h2 className="text-xl md:text-2xl font-semibold text-blue-600">
                      Job Tracking Form
                    </h2>
                  </div>

                  <JobFormContainer
                    jobTrackForm={jobTrackForm}
                    handleInputChange={handleInputChange}
                    errors={errors}
                    onSubmitHandler={onSubmitHandler}
                    resetForm={resetForm}
                  />
                </>
              )}
              {activeTab === "list" && (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <BriefcaseIcon className="h-7 w-7 text-blue-600" />
                    <h2 className="text-xl md:text-2xl font-semibold text-blue-600">
                      Job Applications
                    </h2>
                  </div>

                  {/* Temporary placeholder */}
                  <p className="text-gray-600">
                    Your saved job applications will appear here.
                  </p>
                </>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
