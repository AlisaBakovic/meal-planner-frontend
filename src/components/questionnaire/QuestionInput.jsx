function QuestionInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  suffix,
}) {
  return (
    <div className="mx-auto max-w-md">
      <label className="mb-2 block text-sm font-medium text-[#24163b]">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="h-14 w-full rounded-2xl border border-[#ece8ff] bg-white px-5 text-lg text-[#24163b] shadow-sm transition outline-none focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/10"
        />

        {suffix && (
          <span className="absolute top-1/2 right-10 -translate-y-1/2 text-[#8d87a1]">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export default QuestionInput;
