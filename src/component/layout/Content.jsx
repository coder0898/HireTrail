import { BriefcaseIcon } from "@heroicons/react/16/solid";
import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import JobFormContainer from "../jobForm/JobFormContainer";
const Content = ({
  activeTab,
  jobTrackForm,
  handleInputChange,
  resetForm,
  errors,
  onSubmitHandler,
}) => {
  return (
    <>
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
    </>
  );
};

export default Content;
