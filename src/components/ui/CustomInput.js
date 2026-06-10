export const CustomInput = ({
  label,
  className = "",
  formik, // ← Must pass formik
  ...props
}) => {
  const { values, handleChange, handleBlur, touched, errors } = formik;
  const fieldName = props.name;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        {...props}
        value={values[fieldName] || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none
          focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white
          ${touched[fieldName] && errors[fieldName] ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}
          ${className}`}
      />
      {touched[fieldName] && errors[fieldName] && (
        <p className="text-xs text-red-500 mt-0.5">{errors[fieldName]}</p>
      )}
    </div>
  );
};
