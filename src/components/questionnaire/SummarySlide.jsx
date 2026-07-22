import SummaryRow from "./SummaryRow";
import SummaryCard from "./SummaryCard";
import Button from "../Button";


function SummarySlide ({
    answers,
    onSubmit,
    onBack
}) {
    
return (

<div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 md:p-14">
<div className="max-w-3xl mx-auto space-y-6">
    <p className="text-sm uppercase tracking-[0.18em] text-[#9b6cff] text-center">
        Review page
      </p>
      <h2
        className="text-4xl font-bold text-[#24163b] text-center"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Review Your Information
      </h2>

      <div className="w-16 h-1 bg-[#9b6cff] rounded-full mx-auto mt-5 mb-8" />

      <p className="text-center text-[#8d87a1] mt-4 mb-10">
        Please review your answers before submitting your questionnaire.
      </p>
      

      <div className="max-w-2xl mx-auto space-y-5">
    <SummaryCard title="Basic Information">
        <SummaryRow 
            label="Age"
            value={answers.basic_info.age}
        />
        <SummaryRow 
            label="Gender"
            value={answers.basic_info.gender}
        />
        <SummaryRow 
            label="Height"
            value={`${answers.basic_info.height} cm`}
        />
        <SummaryRow 
            label="Current Weight"
            value={`${answers.basic_info.current_weight} kg`}
        />
        <SummaryRow 
            label="Target Weight"
            value={`${answers.basic_info.target_weight} kg`}
        />
    </SummaryCard>

    <SummaryCard title="Goal">
        <SummaryRow
            label="Primary goal"
            value={answers.goal.primary_goal}
        />
    </SummaryCard>

    <SummaryCard title="Lifestyle">
        <SummaryRow
            label="Activity level"
            value={answers.lifestyle.activity_level}
        />
        <SummaryRow
            label="Meals per day"
            value={answers.lifestyle.meals_per_day}
        />
        <SummaryRow
            label="Water intake"
            value={`${answers.lifestyle.water_intake} l`}
        />
        <SummaryRow
            label="Sleep hours"
            value={`${answers.lifestyle.sleep_hours} h`}
        />
    </SummaryCard>

    <SummaryCard title="Health">
        <SummaryRow
            label="Allergies"
            value={answers.health.allergies}
        />
        <SummaryRow
            label="Medical conditions"
            value={answers.health.medical_conditions}
        />
        <SummaryRow
            label="Medications"
            value={answers.health.medications}
        />
        <SummaryRow
            label="Injuries"
            value={answers.health.injuries}
        />
    </SummaryCard>

    <SummaryCard title="Preferences">
        <SummaryRow
            label="Diet type"
            value={answers.preferences.diet_type}
        />
        <SummaryRow
            label="Disliked foods"
            value={answers.preferences.disliked_foods}
        />
    </SummaryCard>

    <SummaryCard title="Notes">
        <SummaryRow
            label="Additional notes"
            value={answers.notes.additional_notes}
        />
    </SummaryCard>
    </div>
    <div className="rounded-2xl bg-[#f7f3ff] border border-[#ece8ff] p-5 mb-10">
        <p>After submitting, your questionnaire
will be available for editing for the
next 24 hours.</p>
    </div>
<div className="flex justify-between items-center mt-10 pt-8 border-t border-[#ece8ff]">

    <Button
        variant="secondary"
        onClick={onBack}
    >
        Back
    </Button>

    <Button
        onClick={onSubmit}
    >
        Submit Questionnaire
    </Button>

</div>
    
</div>

</div>
)
}
export default SummarySlide