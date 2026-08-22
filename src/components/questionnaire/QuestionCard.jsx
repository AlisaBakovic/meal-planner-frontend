function QuestionCard({ title, subtitle, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full cursor-pointer rounded-3xl border p-7 text-left shadow-sm transition-all duration-200 ${
        selected
          ? "border-[#9b6cff] bg-[#f7f3ff] shadow-md"
          : "border-[#ece8ff] bg-white hover:border-[#9b6cff]/50 hover:shadow-md"
      }`}
    >
      <h3 className="mb-4 text-sm font-semibold tracking-[0.18em] text-[#5a536e] uppercase">
        {title}
      </h3>

      {subtitle && (
        <p className="mt-2 text-sm leading-6 text-[#8d87a1]">{subtitle}</p>
      )}
    </button>
  );
}

export default QuestionCard;
