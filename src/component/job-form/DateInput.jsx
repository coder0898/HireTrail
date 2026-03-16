const DateInput = ({
  label,
  name,
  value,
  onChangeFunction,
  required = false,
  type = "date",
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <sup className="text-red-500">*</sup>}
        </label>
        <input
          name={name}
          value={value}
          onChange={onChangeFunction}
          type={type}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>
    </>
  );
};

export default DateInput;
