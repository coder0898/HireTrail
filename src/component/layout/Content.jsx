import { BriefcaseIcon } from "@heroicons/react/16/solid";
import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import JobFormContainer from "../jobForm/JobFormContainer";
import { useEffect } from "react";

import TableContainer from "../table/TableContainer";
const Content = ({
  activeTab,
  jobTrackForm,
  handleInputChange,
  resetForm,
  errors,
  onSubmitHandler,
  jobs,
  handleEdit,
  editingId,
  handleDelete,
}) => {
  // Fetch jobs from localStorage
  useEffect(() => {
    JSON.parse(localStorage.getItem("jobTrackList"));
  }, [jobs]);

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
                resetForm={resetForm}
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

              <div className="hidden w-full overflow-x-auto md:block">
                <TableContainer
                  jobs={jobs}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Content;
