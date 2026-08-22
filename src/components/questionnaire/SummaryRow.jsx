function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-[#f1eefb] py-3">
      <span className="text-[#8d87a1]">{label}</span>

      <span className="font-medium text-[#24163b]">
        {value || "Not specified"}
      </span>
    </div>
  );
}

export default SummaryRow;
