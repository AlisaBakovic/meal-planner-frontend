import Button from "../Button";

function NavigationButtons({ onBack, onNext }) {
  return (
    <div className="mt-14 flex justify-between">
      <button
        onClick={onBack}
        className="cursor-pointer text-[#8d87a1] transition hover:text-[#24163b]"
      >
        ← Back
      </button>

      <Button onClick={onNext}>Continue</Button>
    </div>
  );
}

export default NavigationButtons;
