import { BriefcaseIcon } from "@heroicons/react/16/solid";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="w-full bg-white/10 backdrop-blur-md shadow-sm border-b border-white/20 p-4 flex justify-between items-center">
      {/* Left section: Logo */}
      <div className="flex items-center gap-3">
        <BriefcaseIcon className="h-8 w-8 text-indigo-500" />
        <h1 className="text-3xl font-bold text-indigo-500">HireTrail</h1>
      </div>

      {/* Right section: User info + Logout */}
      <div className="flex items-center gap-4">
        {user && <p className="text-white font-medium">Hi, {user.fullName}</p>}

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md font-semibold transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
