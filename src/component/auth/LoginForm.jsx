import FormInput from "../job-form/FormInput";
import Button from "../job-form/Button";

const LoginForm = ({
  isLogin,
  loginData,
  handleChange,
  handleLogin,
  validateLogin,
}) => {
  return (
    <div
      className={`absolute w-full h-full transition-all duration-700 ${
        isLogin ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
    >
      <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl border border-white/20">
        <h2 className="text-white text-xl font-semibold mb-4">Welcome Back</h2>

        <form className="flex flex-col gap-3">
          <FormInput
            name="email"
            value={loginData.email}
            onChangeFunction={(e) => handleChange(e, "login")}
            type="email"
            placeholder="Enter Email"
          />

          <FormInput
            name="password"
            value={loginData.password}
            onChangeFunction={(e) => handleChange(e, "login")}
            type="password"
            placeholder="Enter Password"
          />

          <Button
            onClick={handleLogin}
            disable={!validateLogin()}
            className="w-1/2 py-2 rounded-md bg-indigo-500 text-white"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
