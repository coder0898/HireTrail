import { useContext } from "react";

import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { JobContext } from "../../context/JobContext";
import SectionHead from "../layout/SectionHead";
import JobFormContainer from "../job-form/JobFormContainer";
import toast from "react-hot-toast";

const JobFormSection = () => {
  const { state, dispatch } = useContext(JobContext);
  const { jobTrackForm, errors, editingId } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_INPUT", payload: { name, value } });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (editingId) {
      dispatch({
        type: "UPDATE_JOB",
        payload: {
          ...jobTrackForm,
          id: editingId,
          updatedAt: new Date().toISOString().split("T")[0],
        },
      });
      toast.success("Job Edited Successfully");
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
      toast.success("Job Added Successfully");
    }

    dispatch({ type: "RESET_FORM" });
  };

  return (
    <>
      <SectionHead Icon={ClipboardDocumentListIcon} title="Job Tracking Form" />

      <JobFormContainer
        jobTrackForm={jobTrackForm}
        handleInputChange={handleInputChange}
        errors={errors}
        onSubmitHandler={onSubmitHandler}
        resetForm={() => dispatch({ type: "RESET_FORM" })}
        editingId={editingId}
      />
    </>
  );
};

export default JobFormSection;
