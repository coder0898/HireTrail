import FormInput from "../job-form/FormInput";
import Button from "../job-form/Button";

const RegisterForm = ({
  isLogin,
  register,
  handleChange,
  handleRegister,
  validateRegister,
}) => {
  return (
    <div
      className={`absolute w-full h-full transition-all duration-700 ${
        !isLogin ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
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
            className="w-1/2 py-2 rounded-md bg-indigo-500 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
