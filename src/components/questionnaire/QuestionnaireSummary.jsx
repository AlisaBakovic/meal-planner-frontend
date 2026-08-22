import SummaryCard from "./SummaryCard";
import SummaryRow from "./SummaryRow";

function QuestionnaireSummary({ answers }) {
  const goalLabels = {
    lose_weight: "Lose Weight",
    gain_weight: "Gain Weight",
    maintain_weight: "Maintain Weight",
    build_muscle: "Build Muscle",
  };

  const activityLabels = {
    sedentary: "Sedentary",
    light: "Lightly Active",
    moderate: "Moderately Active",
    active: "Very Active",
    athlete: "Athlete",
  };

  const dietLabels = {
    regular: "Regular Diet",
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    pescatarian: "Pescatarian",
    halal: "Halal",
    other: "Other",
  };

  return (
    <div>
      <SummaryCard title="Basic Information">
        <SummaryRow label="Age" value={answers.basic_info.age} />
        <SummaryRow label="Gender" value={answers.basic_info.gender} />
        <SummaryRow label="Height" value={`${answers.basic_info.height} cm`} />
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
          value={goalLabels[answers.goal.primary_goal]}
        />
      </SummaryCard>

      <SummaryCard title="Lifestyle">
        <SummaryRow
          label="Activity level"
          value={activityLabels[answers.lifestyle.activity_level]}
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
        <SummaryRow label="Allergies" value={answers.health.allergies} />
        <SummaryRow
          label="Medical conditions"
          value={answers.health.medical_conditions}
        />
        <SummaryRow label="Medications" value={answers.health.medications} />
        <SummaryRow label="Injuries" value={answers.health.injuries} />
      </SummaryCard>

      <SummaryCard title="Preferences">
        <SummaryRow
          label="Diet type"
          value={dietLabels[answers.preferences.diet_type]}
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
  );
}
export default QuestionnaireSummary;
