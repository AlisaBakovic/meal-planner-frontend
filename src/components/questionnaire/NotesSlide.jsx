import QuestionTextarea from "./QuestionTextarea"
import NavigationButtons from "./NavigationButtons"


function NotesSlide({
    answers,
    setAnswers,
    onNext,
    onBack
}) {

    const note = answers.notes

    const updateField = (field, value) => {
        setAnswers({
            ...answers,
            notes: {
                ...note,
                [field]: value
            },
        });
    }

    return (
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 md:p-14">
            <p className="text-sm uppercase tracking-[0.18em] text-[#9b6cff] text-center">
        Step 6 of 6
      </p>
      <h2
        className="text-4xl font-bold text-[#24163b] text-center"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Is there anything else your trainer should know?
      </h2>

      <div className="w-16 h-1 bg-[#9b6cff] rounded-full mx-auto mt-5 mb-8" />

      <p className="text-center text-[#8d87a1] mt-4 mb-10">
        Share any additional information that may help your trainer create a meal plan tailored to your needs.
      </p>
        <QuestionTextarea
            label="Notes"
            value={note.additional_notes}
            placeholder="Anything else you'd like your trainer to know..."
            onChange={(e) => updateField("additional_notes", e.target.value)}

        />
        <NavigationButtons
            onBack={onBack}
            onNext={onNext}
        />
        </div>
    )
}
export default NotesSlide