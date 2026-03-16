const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default ChartCard;
