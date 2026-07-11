export const CustomInput = ({ label, className = "", formik, ...props }) => {
  const { values, handleChange, handleBlur, touched, errors, submitCount } = formik;
  const fieldName = props.name;
  const showError = (touched[fieldName] || submitCount > 0) && errors[fieldName];

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#64748b]">
          {label}
        </label>
      )}
      <input
        {...props}
        value={values[fieldName] || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`rounded-xl border bg-[#ffffff] px-3.5 py-3 text-sm text-[#1e293b] outline-none transition-all placeholder:text-[#a7adb5]
          ${showError ? "border-rose-500 focus:border-rose-500 focus:ring-4 focus:ring-rose-100" : "border-[#e2e8f0] focus:border-[#e11d48] focus:ring-4 focus:ring-[#e11d48]/10"}
          ${className}`}
      />
      {showError && <p className="mt-0.5 text-xs text-rose-500">{errors[fieldName]}</p>}
    </div>
  );
};
