const ListItem = ({ icon: Icon, label, tabName, activeTab, dispatch }) => {
  const isActive = activeTab === tabName;

  return (
    <>
      <li
        onClick={() => dispatch({ type: "SET_ACTIVE_TAB", payload: tabName })}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
      >
        <Icon className="h-5 w-5" />
        <span className="hidden md:inline">{label}</span>
      </li>
    </>
  );
};

export default ListItem;
