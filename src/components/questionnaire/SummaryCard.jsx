function SummaryCard({ title, children }) {
  return (
    <div className="mb-3 rounded-3xl border border-[#ece8ff] bg-white p-7 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold tracking-[0.18em] text-[#5a536e] uppercase">
        {title}
      </h3>

      <div className="space-y-2">{children}</div>
    </div>
  );
}
export default SummaryCard;
