import { useContext } from "react";
import { JobContext } from "../../context/JobContext";
import SectionHeader from "../layout/SectionHead";
import TableContainer from "../table/TableContainer";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const JobListSection = () => {
  const { state, dispatch } = useContext(JobContext);
  const { jobs } = state;

  const handleEdit = (job) =>
    dispatch({ type: "SET_EDIT", payload: job, id: job.id });

  const handleDelete = (jobId) => {
    dispatch({ type: "DELETE_JOB", payload: jobId });
    toast.success("Job Deleted Successfully");
  };

  const headings = [
    "Sr. No.",
    "Company",
    "Role",
    "Location",
    "Type",
    "Status",
    "Priority",
    "Applied",
    "Actions",
  ];

  return (
    <>
      <SectionHeader Icon={BriefcaseIcon} title="Job Applications" />
      <div className=" w-full overflow-x-auto md:block">
        <TableContainer
          jobs={jobs}
          headings={headings}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default JobListSection;
