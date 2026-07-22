import QuestionCard from "./QuestionCard";
import QuestionTextarea from "./QuestionTextarea";
import NavigationButtons from "./NavigationButtons";

function PreferencesSlide({
    answers,
    setAnswers,
    onNext,
    onBack
}) {
    const preference = answers.preferences

    const updateField = (field, value) => {
        setAnswers({
            ...answers,
            preferences: {
                ...preference,
                [field]: value,
            },
        });

    };

    const dietTypes = [
        {
            value: "regular",
            title: "Regular Diet",
            subtitle: "No dietary restrictions."
        },
        {
            value: "vegetarian",
            title: "Vegetarian",
            subtitle: "No meat, dairy and eggs are allowed."
        },
        {
            value: "vegan",
            title: "Vegan",
            subtitle: "Only plant-based foods."
        },
        {
            value: "pescatarian",
            title: "Pescatarian",
            subtitle: "Includes fish and seafood."
        },
        {
            value: "halal",
            title: "Halal",
            subtitle: "Only halal food and ingredients."
        },
        {
            value: "other",
            title: "Other",
            subtitle: "Specify your diet in the notes section."
        }
        ];
    

    return (
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 md:p-14">
         <p className="text-sm uppercase tracking-[0.18em] text-[#9b6cff] text-center">
        Step 5 of 6
      </p>
      <h2
        className="text-4xl font-bold text-[#24163b] text-center"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        What are your preferences
      </h2>

      <div className="w-16 h-1 bg-[#9b6cff] rounded-full mx-auto mt-5 mb-8" />

      <p className="text-center text-[#8d87a1] mt-4 mb-10">
        Select the option that best describes your diet.
      </p>

      <div className="max-w-2xl mx-auto space-y-5">

                        {dietTypes.map((diet) => (
                            <QuestionCard
                                key={diet.value}
                                title={diet.title}
                                subtitle={diet.subtitle}
                                selected={answers.preferences.diet_type === diet.value}
                                onClick={() => 
                                    updateField("diet_type", diet.value)}
                            />
                            ))
                        }

                        <div className="mt-10">

                        <QuestionTextarea
                            fullWidth={true}
                            label="Disliked foods"
                            value={preference.disliked_foods}
                            placeholder="e.g. Onion, fish, beans..."
                            onChange={(e) => updateField("disliked_foods", e.target.value)}
                        />
                        
                        </div>
                    </div>
                              <NavigationButtons
        onBack={onBack}
        onNext={onNext}
      />
                </div>

                

           
    )
    
}
export default PreferencesSlide