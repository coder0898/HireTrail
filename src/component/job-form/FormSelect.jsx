const FormSelect = ({
  label,
  name,
  value,
  onChangeFunction,
  error, // pass the actual error string
  required = false,
  optionValue,
}) => {
  const getInputClasses = (hasError) =>
    `w-full rounded-lg border px-3 py-2 outline-none transition ${
      hasError
        ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    }`;
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <sup className="text-red-500">*</sup>}
        </label>
        <select
          name={name}
          value={value}
          onChange={onChangeFunction}
          className={getInputClasses(Boolean(error))}
        >
          {name === "jobType" ? <option value="">Select Type</option> : ""}
          {optionValue.map((options) => {
            return (
              <option key={options} value={options}>
                {options}
              </option>
            );
          })}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </>
  );
};

export default FormSelect;
