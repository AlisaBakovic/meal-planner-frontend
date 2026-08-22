function QuestionTextarea({
  label,
  value,
  onChange,
  placeholder,
  fullWidth = false,
}) {
  return (
    <div className={fullWidth ? "w-full" : "mx-auto max-w-xl"}>
      <label className="mb-3 block text-xs font-semibold tracking-[0.18em] text-[#5a536e] uppercase">
        {label}
      </label>

      <textarea
        placeholder={placeholder}
        rows={4}
        value={value}
        onChange={onChange}
        className="w-full resize-none rounded-2xl border border-[#ece8ff] bg-white px-5 py-4 text-[#24163b] shadow-sm transition outline-none focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/10"
      />
    </div>
  );
}
export default QuestionTextarea;
