import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
const TableContainer = ({ jobs, handleEdit, handleDelete }) => {
  return (
    <>
      <table className="min-w-full bg-white shadow border-r border-l rounded-lg overflow-hidden">
        <TableHeader />
        {/* <tbody>
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
        </tbody> */}
        <TableContent
          jobs={jobs}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </table>
    </>
  );
};

export default TableContainer;
