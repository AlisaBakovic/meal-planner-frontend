function SummaryCard ({
    title,
    children
}) {
    return (
    <div className="rounded-3xl bg-white border border-[#ece8ff] p-7 shadow-sm">

        <h3 className="mb-4 text-sm uppercase tracking-[0.18em] font-semibold text-[#5a536e]">
        {title}
        </h3>
    
        <div className="space-y-2">
            {children}
        </div>
    </div>
    );
    
}
export default SummaryCard