function QuestionRadio({ label, options, value, onChange }) {
  return (
    <div className="mx-auto max-w-xl">
      <label className="mb-3 block text-sm font-medium text-[#24163b]">
        {label}
      </label>

      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`h-14 cursor-pointer rounded-2xl border font-medium transition-all duration-200 ${
              value === option
                ? "border-[#9b6cff] bg-[#f5efff] text-[#24163b]"
                : "border-[#ece8ff] bg-white text-[#8d87a1] hover:border-[#9b6cff]/50"
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
