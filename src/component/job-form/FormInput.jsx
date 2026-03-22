const FormInput = ({
  isLabel = true,
  label,
  name,
  value,
  onChangeFunction,
  required = false,
  type = "text",
  placeholder,
  autocomplete,
}) => {
  // Basic input classes (no error logic)
  const inputClasses = `w-full rounded-lg border border-gray-300 px-3 py-2  outline-none 
    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`;

  return (
    <div>
      {/* Optional label */}
      {isLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <sup className="text-red-500">*</sup>}
        </label>
      )}

      {/* Input field */}
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder || label}
        onChange={onChangeFunction}
        className={inputClasses}
        autoComplete={isLabel ? "" : autocomplete}
      />
    </div>
  );
};

export default FormInput;
