import { MapIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import FormInput from "../component/job-form/FormInput";
import Button from "../component/job-form/Button";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [register, setRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e, section) => {
    const { name, value } = e.target;

    if (section === "login") {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegister((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateLogin = () => {
    return loginData.email && loginData.password;
  };

  const validateRegister = () => {
    return (
      register.fullName &&
      register.email &&
      register.password &&
      register.confirmPassword &&
      register.password === register.confirmPassword
    );
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(register);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-5xl rounded-2xl shadow-2xl flex overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20">
        <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-10 text-white bg-white/5 backdrop-blur-lg border-r border-white/10">
          <div>
            <div className="flex items-center w-full gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <MapIcon className="w-6 h-6" />
              </div>
              <h1 className="text-5xl font-bold">HireTrail</h1>
            </div>

            <div className="relative h-[56px] overflow-hidden mt-6">
              <div
                className={`absolute top-0 left-0 w-full transition-all duration-700 ${
                  isLogin
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0"
                }`}
              >
                <p className="text-lg font-medium">
                  Track every application. Stay in control.
                </p>
              </div>

              <div
                className={`absolute top-0 left-0 w-full transition-all duration-700 ${
                  !isLogin
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
              >
                <p className="text-lg font-medium">
                  Take control of your job search from day one.
                </p>
              </div>
            </div>

            <div className="relative h-[52px] overflow-hidden mt-4">
              <div
                className={`absolute top-0 left-0 w-full transition-all duration-700 ${
                  isLogin
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0"
                }`}
              >
                <p className="text-sm opacity-70">
                  A smarter way to manage your job search — without
                  spreadsheets.
                </p>
              </div>

              <div
                className={`absolute top-0 left-0 w-full transition-all duration-700 ${
                  !isLogin
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
              >
                <p className="text-sm opacity-70">
                  No spreadsheets. No confusion. Just clarity.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
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

          <div className="relative h-[420px] overflow-hidden">
            <div
              className={`absolute w-full h-full transition-all duration-700 ${
                isLogin
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              }`}
            >
              <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <h2 className="text-white text-xl font-semibold mb-4">
                  Welcome Back
                </h2>

                <form className="flex flex-col gap-3">
                  <FormInput
                    name="email"
                    value={loginData.email}
                    onChangeFunction={(e) => handleChange(e, "login")}
                    type="email"
                    placeholder="Enter Email"
                    autoComplete="email"
                  />
                  <FormInput
                    name="password"
                    value={loginData.password}
                    onChangeFunction={(e) => handleChange(e, "login")}
                    type="password"
                    placeholder="Enter Password"
                    autoComplete="current-password"
                  />

                  <Button
                    onClick={handleLogin}
                    disable={!validateLogin()}
                    className="w-1/2 py-2 rounded-md bg-white/20 text-white font-semibold hover:bg-white/30 transition"
                  >
                    Login
                  </Button>
                </form>
              </div>
            </div>

            <div
              className={`absolute w-full h-full transition-all duration-700 ${
                !isLogin
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <h2 className="text-white text-xl font-semibold mb-4">
                  Create Account
                </h2>

                <form className="flex flex-col gap-3">
                  <FormInput
                    name="fullName"
                    value={register.fullName}
                    onChangeFunction={(e) => handleChange(e, "register")}
                    placeholder="Enter Full Name"
                    autoComplete="username"
                  />
                  <FormInput
                    name="email"
                    value={register.email}
                    onChangeFunction={(e) => handleChange(e, "register")}
                    type="email"
                    placeholder="Enter Email"
                    autoComplete="email"
                  />
                  <FormInput
                    name="password"
                    value={register.password}
                    onChangeFunction={(e) => handleChange(e, "register")}
                    type="password"
                    placeholder="Enter Password"
                    autoComplete="new-password"
                  />
                  <FormInput
                    name="confirmPassword"
                    value={register.confirmPassword}
                    onChangeFunction={(e) => handleChange(e, "register")}
                    type="password"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                  />

                  <Button
                    onClick={handleRegister}
                    disable={!validateRegister()}
                    className="w-1/2 py-2 rounded-md bg-white/20 text-white font-semibold hover:bg-white/30 transition"
                  >
                    Register
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
