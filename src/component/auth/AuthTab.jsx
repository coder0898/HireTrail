const AuthTabs = ({ isLogin, setIsLogin }) => {
  return (
    <div className="flex mb-6 bg-white/20 rounded-lg p-1 backdrop-blur-md">
      <button
        onClick={() => setIsLogin(true)}
        className={`w-1/2 py-2 rounded-md transition ${
          isLogin ? "bg-white text-indigo-600" : "text-white"
        }`}
      >
        Login
      </button>

      <button
        onClick={() => setIsLogin(false)}
        className={`w-1/2 py-2 rounded-md transition ${
          !isLogin ? "bg-white text-indigo-600" : "text-white"
        }`}
      >
        Register
      </button>
    </div>
  );
};

export default AuthTabs;
