const TableHeader = ({ headings }) => {
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
