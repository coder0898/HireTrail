import { BriefcaseIcon } from "@heroicons/react/16/solid";
import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import JobFormContainer from "../jobForm/JobFormContainer";
import { useContext } from "react";

import TableContainer from "../table/TableContainer";
import { JobContext } from "../../context/JobContext";
const Content = () => {
  const { state, dispatch } = useContext(JobContext);
  const { jobTrackForm, errors, activeTab, jobs, editingId } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_INPUT", payload: { name, value } });
  };

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(jobTrackForm);

    if (Object.keys(validationErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: validationErrors });
      return;
    }

    if (editingId) {
      dispatch({
        type: "UPDATE_JOB",
        payload: {
          ...jobTrackForm,
          id: editingId,
          updatedAt: new Date().toISOString().split("T")[0],
        },
      });
    } else {
      dispatch({
        type: "ADD_JOB",
        payload: {
          ...jobTrackForm,
          id: Date.now(),
          createdAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
        },
      });
    }

    dispatch({ type: "RESET_FORM" });
  };

  const handleEdit = (job) =>
    dispatch({ type: "SET_EDIT", payload: job, id: job.id });
  const handleDelete = (jobId) =>
    dispatch({ type: "DELETE_JOB", payload: jobId });

  return (
    <>
      <section className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="w-full bg-white shadow-md rounded-xl p-6 md:p-8">
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
                resetForm={() => dispatch({ type: "RESET_FORM" })}
                editingId={editingId}
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
              {jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="text-5xl mb-4">📭</div>
                  <h2 className="text-xl font-semibold text-gray-700">
                    No job applications yet
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Click "Add Job" to start tracking.
                  </p>
                </div>
              ) : (
                <div className="hidden w-full overflow-x-auto md:block">
                  <TableContainer
                    jobs={jobs}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Content;
