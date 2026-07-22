function SummaryRow ({
    label,
    value
}) { return (

        <div className="flex justify-between items-center py-3 border-b border-[#f1eefb]">

            <span className="text-[#8d87a1]">
                {label}
            </span>

            <span className="font-medium text-[#24163b]">
                {value || "Not specified"}
            </span>

        </div>

    );

}

export default SummaryRow;