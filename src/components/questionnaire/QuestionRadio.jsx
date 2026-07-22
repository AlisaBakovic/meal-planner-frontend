function QuestionRadio({
  label,
  options,
  value,
  onChange,
}) {
  return (
    <div className="max-w-xl mx-auto">

      <label className="block mb-3 text-sm font-medium text-[#24163b]">
        {label}
      </label>

      <div className="grid grid-cols-3 gap-4">

        {options.map((option) => (

          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`h-14 rounded-2xl border transition-all duration-200 cursor-pointer font-medium

            ${
              value === option
                ? "bg-[#f5efff] border-[#9b6cff] text-[#24163b]"
                : "bg-white border-[#ece8ff] text-[#8d87a1] hover:border-[#9b6cff]/50"
            }`}
          >
            {option}
          </button>

        ))}

      </div>

    </div>
  );
}

export default QuestionRadio;