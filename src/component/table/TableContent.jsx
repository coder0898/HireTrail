import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
const TableContent = ({ jobs, handleEdit, handleDelete }) => {
  // Helper: status color
  const statusColor = (status) => {
    switch (status.toLowerCase()) {
      case "applied":
        return "bg-blue-800 text-white";
      case "interview":
        return "bg-yellow-800 text-white";
      case "offer":
        return "bg-green-800 text-white";
      case "rejected":
        return "bg-red-800 text-white";
      default:
        return "bg-gray-800 text-white";
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "Low":
        return "bg-blue-500 text-white";
    }
  };
  return (
    <>
      <tbody>
        {jobs.length === 0 && (
          <tr>
            <td colSpan="7" className="text-center py-4 text-gray-500">
              No applications yet
            </td>
          </tr>
        )}
        {jobs.map((job, index) => (
          <tr key={job.id} className="border-b hover:bg-gray-50 transition">
            <td className="px-4 py-4 font-semibold">{index + 1}.</td>
            <td className="px-4 py-4">{job.companyName}</td>
            <td className="px-4 py-4">{job.jobRole}</td>
            <td className="px-4 py-4">{job.jobLocation}</td>
            <td className="px-4 py-4">{job.jobType}</td>
            <td className={`px-4 py-4 `}>
              <span
                className={`p-2 font-semibold rounded ${statusColor(job.jobStatus)}`}
              >
                {job.jobStatus}
              </span>
            </td>
            <td className="px-4 py-4">
              <span
                className={`p-2 font-semibold rounded ${priorityColor(job.jobPriority)}`}
              >
                {job.jobPriority}
              </span>
            </td>
            <td className="px-4 py-4">{job.appliedDate}</td>
            <td className="px-4 py-4 flex gap-2">
              <button
                onClick={() => handleEdit(job)}
                className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                title="Edit Button"
              >
                <PencilSquareIcon className="text-white h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                title="Delete Button"
              >
                <TrashIcon className="text-white h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableContent;
