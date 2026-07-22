function QuestionCard({
  title,
  subtitle,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-3xl border p-7 text-left shadow-sm transition-all duration-200 cursor-pointer

${
  selected
    ? "border-[#9b6cff] bg-[#f7f3ff] shadow-md"
    : "border-[#ece8ff] bg-white hover:border-[#9b6cff]/50 hover:shadow-md"
}`}
    >
      <h3 className="mb-4 text-sm uppercase tracking-[0.18em] font-semibold text-[#5a536e]">
        {title}
      </h3>

      {subtitle && (
        <p className="mt-2 text-[#8d87a1] text-sm leading-6">
          {subtitle}
        </p>
      )}
    </button>
  );
}

export default QuestionCard;