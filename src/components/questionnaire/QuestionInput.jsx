function QuestionInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  suffix,
}) {
  return (
    <div className="max-w-md mx-auto">

      <label className="block mb-2 text-sm font-medium text-[#24163b]">
        {label}
      </label>

      <div className="relative">

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full h-14 rounded-2xl border border-[#ece8ff] bg-white px-5 text-[#24163b] text-lg outline-none shadow-sm transition focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/10"
        />

        {suffix && (
          <span className="absolute right-10 top-1/2 -translate-y-1/2 text-[#8d87a1]">
            {suffix}
          </span>
        )}

      </div>

    </div>
  );
}

export default QuestionInput;