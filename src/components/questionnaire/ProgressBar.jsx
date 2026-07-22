function ProgressBar({
  step,
  totalSteps,
}) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="mb-12">

      <div className="flex justify-between mb-3">

        <span className="text-sm uppercase tracking-[0.18em] text-[#9b6cff]">
          Questionnaire
        </span>

        <span className="text-sm text-[#8d87a1]">
          Step {step} of {totalSteps}
        </span>

      </div>

      <div className="h-2 rounded-full bg-[#ede9fe] overflow-hidden">

        <div
          className="h-full bg-[#8b5cf6] transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
}

export default ProgressBar;