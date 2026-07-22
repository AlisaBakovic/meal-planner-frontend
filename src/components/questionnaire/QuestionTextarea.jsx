function QuestionTextarea({
label,
value,
onChange,
placeholder,
fullWidth = false
}) {
    return(
    <div className={fullWidth ? "w-full" : "max-w-xl mx-auto"}>

      <label className="block mb-3 uppercase text-xs tracking-[0.18em] font-semibold text-[#5a536e]">
        {label}
      </label>

      
        <textarea 
            placeholder={placeholder}
            rows={4}
            value={value}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#ece8ff] bg-white px-5 py-4 text-[#24163b] outline-none resize-none shadow-sm transition focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/10"
        />
      </div>
      );
} 
export default QuestionTextarea