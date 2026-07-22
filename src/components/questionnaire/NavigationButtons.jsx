import Button from "../Button";

function NavigationButtons({
  onBack,
  onNext,
}) {
  return (
    <div className="flex justify-between mt-14">

      <button
        onClick={onBack}
        className="text-[#8d87a1] hover:text-[#24163b] transition cursor-pointer"
      >
        ← Back
      </button>

      <Button onClick={onNext}>
        Continue
      </Button>

    </div>
  );
}

export default NavigationButtons;