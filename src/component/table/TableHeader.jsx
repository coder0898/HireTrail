const TableHeader = () => {
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
      <thead className="bg-blue-500 text-white">
        <tr>
          {headings &&
            headings.map((head) => (
              <th key={head} className="px-4 py-2 text-left">
                {head}
              </th>
            ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
