import { MapIcon } from "@heroicons/react/20/solid";

const AuthSidebar = ({ isLogin }) => {
  return (
    <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-10 text-white bg-white/5 backdrop-blur-lg border-r border-white/10">
      <div>
        <div className="flex items-center w-full gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <MapIcon className="w-6 h-6" />
          </div>
          <h1 className="text-5xl font-bold">HireTrail</h1>
        </div>

        {/* SAME animation classes preserved */}
        <div className="relative h-[56px] overflow-hidden mt-6">
          <div
            className={`absolute w-full transition-all duration-700 ${isLogin ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
          >
            <p className="text-lg font-medium">
              Track every application. Stay in control.
            </p>
          </div>

          <div
            className={`absolute w-full transition-all duration-700 ${!isLogin ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          >
            <p className="text-lg font-medium">
              Take control of your job search from day one.
            </p>
          </div>
        </div>

        <div className="relative h-[52px] overflow-hidden mt-4">
          <div
            className={`absolute w-full transition-all duration-700 ${isLogin ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
          >
            <p className="text-sm opacity-70">
              A smarter way to manage your job search — without spreadsheets.
            </p>
          </div>

          <div
            className={`absolute w-full transition-all duration-700 ${!isLogin ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          >
            <p className="text-sm opacity-70">
              No spreadsheets. No confusion. Just clarity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSidebar;
