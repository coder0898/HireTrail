import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import ConfirModal from "../modal/ConfirmModal";
import { useState } from "react";
const TableContainer = ({ jobs, handleEdit, handleDelete, headings }) => {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    jobId: null,
  });

  const openDeleteModal = (id) => setDeleteModal({ isOpen: true, jobId: id });
  const closeDeleteModal = () => setDeleteModal({ isOpen: false, jobId: null });
  return (
    <>
      <table className="min-w-full bg-white shadow border-r border-l rounded-lg overflow-y-auto">
        <TableHeader headings={headings} />
        <TableContent
          jobs={jobs}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          openDeleteModal={openDeleteModal}
        />
      </table>
      {/* ONE modal outside tbody */}
      <ConfirModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={() => {
          handleDelete(deleteModal.jobId);
          closeDeleteModal();
        }}
        title="Delete Job"
        message="Are you sure you want to delete this job?"
      />
    </>
  );
};

export default TableContainer;
