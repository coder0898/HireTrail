const StatsCard = ({ title, value, icon, bg }) => {
  return (
    <div className="flex-1 min-w-[200px] flex items-center p-4 bg-white rounded-lg shadow-md">
      <div className={`p-3 rounded-full ${bg} mr-4`}>{icon}</div>

      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
