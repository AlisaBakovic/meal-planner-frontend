import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlanById } from "../services/planService";
import { getMeals } from "../services/planService";
import Layout from "../components/Layout";

function ClientPlanDetails() {
  const { id } = useParams();

  const [plan, setPlan] = useState(null);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const foundPlan = await getPlanById(id);
      setPlan(foundPlan);

      const mealsData = await getMeals(id);
      setMeals(mealsData);
    };
    loadData();
  }, [id]);

  if (!plan) {
    return null;
  }
  return (
    <Layout mode="client">
      <div className="max-w-[1200px] mx-auto">
        <div className="rounded-[40px] border border-white/30 bg-white/40 backdrop-blur-2xl p-8 md:p-10 shadow-[0_10px_40px_rgba(255,140,80,0.06)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[#ff8a4c]">
            Nutrition Plan
          </p>

          <h1
            className="mt-5 text-5xl font-bold tracking-[-0.05em] text-[#1f2937]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {plan.name}
          </h1>

          <p className="mt-4 text-[#5f6f66] leading-relaxed">
            Personalized nutrition structure created for your wellness journey.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {Object.entries(
            meals.reduce((acc, meal) => {
              if (!acc[meal.day_number]) {
                acc[meal.day_number] = [];
              }

              acc[meal.day_number].push(meal);

              return acc;
            }, {}),
          ).map(([day, dayMeals]) => {
            const totalCalories = dayMeals.reduce(
              (sum, meal) =>
                sum +
                meal.foods.reduce(
                  (foodSum, food) =>
                    foodSum + food.grams * food.food_norm?.calories_per_g,
                  0,
                ),
              0,
            );

            const totalProtein = dayMeals.reduce(
              (sum, meal) =>
                sum +
                meal.foods.reduce(
                  (foodSum, food) =>
                    foodSum + food.grams * food.food_norm?.protein_per_g,
                  0,
                ),
              0,
            );
            const totalCarbs = dayMeals.reduce(
              (sum, meal) =>
                sum +
                meal.foods.reduce(
                  (foodSum, food) =>
                    foodSum + food.grams * food.food_norm?.carbs_per_g,
                  0,
                ),
              0,
            );
            const totalFat = dayMeals.reduce(
              (sum, meal) =>
                sum +
                meal.foods.reduce(
                  (foodSum, food) =>
                    foodSum + food.grams * food.food_norm?.fat_per_g,
                  0,
                ),
              0,
            );

            return (
              <div
                key={day}
                className="overflow-hidden rounded-[26px] border border-[#f3f4f6] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.03)]"
              >
                <div className="flex items-center justify-between border-b border-[#fafafa] px-5 py-4 bg-gradient-to-r from-[#fff8f3] to-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffb84d] to-[#ff8a4c] text-sm font-bold text-white shadow-[0_6px_16px_rgba(255,140,80,0.18)]">
                      {day}
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#f59e0b]">
                        Nutrition Day
                      </p>

                      <h2
                        className="text-lg font-bold text-[#1f2937]"
                        style={{ fontFamily: "Plus Jakarta Sans" }}
                      >
                        Day {day}
                      </h2>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#fff7ed] px-3 py-2 text-[11px] font-semibold text-[#ea580c]">
                    {dayMeals.length} meals
                    <p className="mt-2 text-xs text-[#b45309]">
                      {totalCalories.toFixed(0)} kcal ·{" "}
                      {totalProtein.toFixed(0)}P · {totalCarbs.toFixed(0)}C ·{" "}
                      {totalFat.toFixed(0)}F
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {dayMeals.map((meal) => (
                    <div
                      key={meal.id}
                      className="rounded-2xl border border-[#f5f5f5] bg-[#fcfcfc] p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-[#9ca3af]">
                            Meal
                          </p>

                          <h3 className="mt-1 text-base font-semibold text-[#1f2937]">
                            {meal.name}
                          </h3>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        {meal.foods?.length > 0 ? (
                          meal.foods.map((food) => (
                            <div
                              key={food.id}
                              className="flex items-center justify-between rounded-xl bg-white border border-[#fafafa] px-4 py-3"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-[#ffb84d]"></div>

                                <p className="text-sm font-medium text-[#1f2937]">
                                  {food.food_norm?.name}
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-sm text-[#6b7280]">
                                  {food.grams} g ·{" "}
                                  {(
                                    food.grams * food.food_norm.calories_per_g
                                  ).toFixed(0)}{" "}
                                  kcal
                                </p>

                                <p className="mt-1 text-xs text-[#9ca3af]">
                                  {(
                                    food.grams * food.food_norm?.protein_per_g
                                  ).toFixed(0)}
                                  P ·{" "}
                                  {(
                                    food.grams * food.food_norm?.carbs_per_g
                                  ).toFixed(0)}
                                  C ·{" "}
                                  {(
                                    food.grams * food.food_norm?.fat_per_g
                                  ).toFixed(0)}
                                  F
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="rounded-xl border border-dashed border-[#fed7aa] bg-[#fffaf5] px-4 py-3 text-sm text-[#f59e0b]">
                            No foods added yet.
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default ClientPlanDetails;
