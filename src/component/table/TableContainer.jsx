import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
const TableContainer = ({ jobs, handleEdit, handleDelete }) => {
  return (
    <>
      <table className="min-w-full bg-white shadow border-r border-l rounded-lg overflow-hidden">
        <TableHeader />
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
