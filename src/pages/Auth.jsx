import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import AuthSidebar from "../component/auth/AuthSidebar";
import AuthTabs from "../component/auth/AuthTab";
import LoginForm from "../component/auth/LoginForm";
import RegisterForm from "../component/auth/RegisterForm";
import toast from "react-hot-toast";

const Auth = () => {
  const { user, login, register: registerUser } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

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

  const validateLogin = () => loginData.email && loginData.password;

  const validateRegister = () =>
    register.fullName &&
    register.email &&
    register.password &&
    register.confirmPassword &&
    register.password === register.confirmPassword;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    const res = login(loginData);

    if (res.success) {
      navigate("/home");
      toast.success("Logged in successfully");
    } else {
      toast.error(res.message);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    const res = registerUser(register);

    if (res.success) {
      navigate("/home");
      toast.success("Register successfully");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-5xl rounded-2xl shadow-2xl flex overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20">
        <AuthSidebar isLogin={isLogin} />

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <AuthTabs isLogin={isLogin} setIsLogin={setIsLogin} />

          <div className="relative h-[420px] overflow-hidden">
            <LoginForm
              isLogin={isLogin}
              loginData={loginData}
              handleChange={handleChange}
              handleLogin={handleLogin}
              validateLogin={validateLogin}
            />

            <RegisterForm
              isLogin={isLogin}
              register={register}
              handleChange={handleChange}
              handleRegister={handleRegister}
              validateRegister={validateRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
