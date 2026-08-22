import QuestionnaireSummary from "./QuestionnaireSummary";
import Button from "../Button";

function SummarySlide({ answers, onSubmit, onBack }) {
  return (
    <div className="rounded-[32px] border border-white/40 bg-white/70 p-8 backdrop-blur-xl md:p-14">
      <div className="mx-auto max-w-3xl space-y-6">
        <p className="text-center text-sm tracking-[0.18em] text-[#9b6cff] uppercase">
          Review page
        </p>
        <h2
          className="text-center text-4xl font-bold text-[#24163b]"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Review Your Information
        </h2>

        <div className="mx-auto mt-5 mb-8 h-1 w-16 rounded-full bg-[#9b6cff]" />

        <p className="mt-4 mb-10 text-center text-[#8d87a1]">
          Please review your answers before submitting your questionnaire.
        </p>

        <QuestionnaireSummary answers={answers} />

        <div className="mb-10 rounded-2xl border border-[#ece8ff] bg-[#f7f3ff] p-5">
          <p>
            After submitting, your questionnaire will be available for editing
            for the next 24 hours.
          </p>
        </div>
        <div className="mt-10 flex items-center justify-between border-t border-[#ece8ff] pt-8">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>

          <Button onClick={onSubmit}>Submit Questionnaire</Button>
        </div>
      </div>
    </div>
  );
}
export default SummarySlide;
