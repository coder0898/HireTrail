import AuthLeftPanel from "./AuthLeftPanel";

const AuthLayout = ({ children, isLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-5xl rounded-2xl shadow-2xl flex overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20">
        <AuthLeftPanel isLogin={isLogin} />

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          {children}

          {/* <div
              className={`absolute w-full h-full transition-all duration-700 ${
                !isLogin
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
           
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
